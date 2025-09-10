"use client";
import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UploadIcon, RefreshIcon } from "@heroicons/react/solid";
import ReactMarkdown from "react-markdown";

function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [responseImages, setResponseImages] = useState([]); // multiple images
  const [inputImages, setInputImages] = useState([]); // images user uploads
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    // model: "gemini-2.5-flash-image-preview",
    model: "models/gemini-2.5-flash-lite",
  });

  // 🔹 Handle file input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setInputImages(files);
  };

  // 🔹 Handle paste event (copy–paste image)
  const handlePaste = (e) => {
    const items = Array.from(e.clipboardData.items);
    const files = items
      .filter((item) => item.type.startsWith("image/"))
      .map((item) => item.getAsFile());

    if (files.length > 0) {
      setInputImages((prev) => [...prev, ...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 🔹 Convert inputImages ke base64
      const imageParts = await Promise.all(
        inputImages.map(async (file) => {
          const buffer = await file.arrayBuffer();
          const base64 = Buffer.from(buffer).toString("base64");
          return {
            inlineData: {
              data: base64,
              mimeType: file.type,
            },
          };
        })
      );

      // 🔹 Request ke Gemini
      const result = await model.generateContent([
        { text: prompt },
        ...imageParts,
      ]);
      const apiResponse = result.response;

      let text = "";
      const images = [];

      apiResponse.candidates[0].content.parts.forEach((part) => {
        if (part.text) {
          text += part.text + "\n";
        }
        if (part.inlineData) {
          const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          images.push(imageUrl);
        }
      });

      setResponseText(text.trim());
      setResponseImages(images);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setResponseText("❌ Error generating content. Please try again.");
      setResponseImages([]);
    }
  };

  return (
    <div className="p-4" onPaste={handlePaste}>
      <div className="card-glass lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl w-full h-full items-center p-4">
        <h2 className="uppercase text-center mb-4">Ask me Anything 😁</h2>

        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
          <div className="flex items-center rounded overflow-hidden">
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                e.target.style.height = "auto"; // reset dulu
                e.target.style.height = `${e.target.scrollHeight}px`; // sesuaikan height
              }}
              placeholder="Enter your prompt"
              rows={1}
              className="w-full px-3 py-2 bg-primary dark:bg-darkprimary resize-none overflow-hidden border-none rounded focus:border-button"
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload button */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-3 py-2 bg-transparent"
            >
              <UploadIcon className="w-5 h-5 text-darkprimary dark:text-primary" />
            </button>
          </div>

          {/* 🔹 Preview input images */}
          {inputImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {inputImages.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`Upload ${idx + 1}`}
                  className="w-full rounded shadow"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-button text-text dark:text-darktext px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Ask AI!"}
          </button>
        </form>
        <div className="flex">
          {(responseText || responseImages.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setResponseText("");
                setResponseImages([]);
                setPrompt("");
                setInputImages([]);
              }}
              className="ml-auto text-button hover:text-button/50"
              title="Reset"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {responseText && (
          <div className="mb-4 whitespace-pre-line text-justify">
            💬 AI Answer:
            <ReactMarkdown>{responseText}</ReactMarkdown>
          </div>
        )}

        {responseImages.length > 0 && (
          <div>
            🖼️ AI Generated Images:
            <p className="grid grid-cols-2 gap-4 mt-2">
              {responseImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`AI Generated ${idx + 1}`}
                  className="rounded shadow-md max-w-full"
                />
              ))}
            </p>
          </div>
        )}

        <p className="text-sm border-t-2 py-2 mt-4 border-text dark:border-darktext">
          Made using{" "}
          <a
            href="https://ai.google.dev/gemini-api/docs/models#gemini-2.5-flash-lite"
            target="_blank"
            className="underline"
          >
            Gemini 2.5 Flash-Lite
          </a>
        </p>
      </div>
    </div>
  );
}

export default GeminiChat;
