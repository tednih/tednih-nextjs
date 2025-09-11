"use client";
import { useEffect, useState, useRef } from "react";
import Select from "react-select";

export default function ProjectForm({ onSuccess }) {
  const [bahasaOptions, setBahasaOptions] = useState([]);
  const [toolsOptions, setToolsOptions] = useState([]);

  const [selectedBahasa, setSelectedBahasa] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);

  const [customBahasa, setCustomBahasa] = useState("");
  const [customTools, setCustomTools] = useState("");

  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [link, setLink] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  // data dropdown
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/projects/from-projects");
      const data = await res.json();

      setBahasaOptions(data.bahasaList.map((b) => ({ label: b, value: b })));
      setToolsOptions(data.toolsList.map((t) => ({ label: t, value: t })));
    }
    fetchData();
  }, []);
  // data dropdown
  const handleSubmit = async (e) => {
    e.preventDefault();

    const bahasa = [
      ...selectedBahasa.map((item) => item.value),
      ...(customBahasa
        ? customBahasa
            .split(",")
            .map((b) => b.trim())
            .filter((b) => b !== "")
        : []),
    ];

    const tools = [
      ...selectedTools.map((item) => item.value),
      ...(customTools
        ? customTools
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "")
        : []),
    ];

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tanggal", tanggal);
    formData.append("link", link);
    formData.append("bahasa", JSON.stringify(bahasa)); // array to JSON
    formData.append("tools", JSON.stringify(tools));
    formData.append("deskripsi", deskripsi);

    // Tambahkan semua file
    for (const file of files) {
      formData.append("foto", file);
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Berhasil simpan!");
      // Kosongkan semua field
      setJudul("");
      setTanggal("");
      setLink("");
      setSelectedBahasa([]);
      setSelectedTools([]);
      setDeskripsi("");
      setFiles([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      onSuccess(true);
    } else {
      const err = await res.json();
      alert("Gagal simpan: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-[500px] overflow-y-auto max-w-xl mx-auto p-4 shadow-md border border-button rounded"
    >
      <label>Judul</label>
      <input
        type="text"
        placeholder="Judul Project"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
      />

      <label>Tanggal</label>
      <input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
      />

      <label>Url</label>
      <input
        type="url"
        placeholder="Link Project"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
      />

      {/* Bahasa multiselect */}
      <label>Bahasa</label>
      <div className="border border-button rounded-md p-2 mb-4">
        <Select
          isMulti
          options={bahasaOptions}
          value={selectedBahasa}
          onChange={setSelectedBahasa}
          className="w-full mb-4 rounded text-text dark:text-darktext
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
        />
        <input
          type="text"
          placeholder="Bahasa baru (opsional) Pakai , (jika lebih dari 1)"
          value={customBahasa}
          onChange={(e) => setCustomBahasa(e.target.value)}
          className="w-full p-2 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
        />
      </div>

      {/* Tools multiselect */}
      <label>Tools</label>
      <div className="border border-button rounded-md p-2 mb-4">
        <Select
          isMulti
          options={toolsOptions}
          value={selectedTools}
          onChange={setSelectedTools}
          className="w-full mb-4 rounded text-text dark:text-darktext border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
        />
        <input
          type="text"
          placeholder="Bahasa baru (opsional) Pakai , (jika lebih dari 1)"
          value={customTools}
          onChange={(e) => setCustomTools(e.target.value)}
          className="w-full p-2 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
        />
      </div>

      <label>Deskripsi</label>
      <textarea
        placeholder="Deskripsi Project"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
        required
        rows={5}
      />

      <label>Photo</label>
      <input
        placeholder="Photo Project"
        type="file"
        multiple
        onChange={(e) => {
          setFiles([...e.target.files]); // ← ini mengisi state files
        }}
        ref={inputRef} // untuk clear form input foto
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
      />

      <button
        type="submit"
        className="bg-button dark:bg-darkbutton text-text dark:text-darktext px-4 py-2 rounded hover:bg-button/60"
      >
        Add Project
      </button>
    </form>
  );
}
