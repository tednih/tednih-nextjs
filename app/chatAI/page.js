"use client";
import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UploadIcon, RefreshIcon } from "@heroicons/react/solid";
import ReactMarkdown from "react-markdown";

function GeminiChat() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [responseImages, setResponseImages] = useState([]);
  const [inputImages, setInputImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash-lite",
  });

  // Handle file input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setInputImages(files);
  };

  // Handle paste event (copy–paste image)
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

      const result = await model.generateContent([
        { text: prompt },
        ...imageParts,
      ]);
      const apiResponse = result.response;

      let text = "";
      const images = [];

      apiResponse.candidates[0].content.parts.forEach((part) => {
        if (part.text) {
          text += part.text;
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
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResponseText("");
    setResponseImages([]);
    setPrompt("");
    setInputImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4" onPaste={handlePaste}>
      <div className="card-glass lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl w-full h-full items-center p-4">
        <h2 className="uppercase text-headline dark:text-darkheadline text-center mb-4">
          Ask me Anything 😁
        </h2>

        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded">
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="Enter your prompt"
              rows={1}
              className="w-full py-2 px-3 bg-primary dark:bg-darkprimary resize-none overflow-hidden border border-1 border-button/80 dark:border-darkbutton/80  rounded focus:border-none focus:ring-2 focus:ring-button dark:focus:ring-darkbutton dark:focus:ring-darkbutton focus:outline-none"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <div className="bg-button dark:bg-darkbutton dark:bg-darkbutton rounded py-1">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-3 py-2 bg-transparent"
              >
                <UploadIcon className="w-5 h-5 text-text dark:text-darktext" />
              </button>
            </div>
          </div>

          {inputImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {inputImages.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`Upload ${idx + 1}`}
                  className="w-full rounded shadow object-cover h-24"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-button dark:bg-darkbutton dark:bg-darkbutton text-text dark:text-darktext px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Ask AI!"}
          </button>
        </form>

        <div className="flex">
          {(responseText || responseImages.length > 0) && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto text-button hover:text-button/50"
              title="Reset"
            >
              <RefreshIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {responseText && (
          <div className="mb-4 text-justify w-full">
            💬 AI Answer:
            <article className="mt-4 w-full max-w-none prose prose-sm leading-snug dark:prose-invert [&>strong]:text-primary dark:[&>strong]:text-darkprimary [&>li>strong]:text-primary dark:[&>li>strong]:text-darkprimary">
              <ReactMarkdown>{responseText}</ReactMarkdown>
            </article>
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
                  className="rounded shadow-md w-full object-cover"
                />
              ))}
            </p>
          </div>
        )}

        <p className="text-sm text-text dark:text-darktext border-t-2 py-2 mt-4 border-headline dark:border-darkheadline">
          Made using{" "}
          <a
            href="https://ai.google.dev/gemini-api/docs/models#gemini-2.5-flash-lite"
            target="_blank"
            rel="noopener noreferrer"
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
