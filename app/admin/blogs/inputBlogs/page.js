"use client";

import { useState, useRef } from "react";

export default function BlogForm({ onSuccess }) {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tanggal", tanggal);
    formData.append("deskripsi", deskripsi);
    // Tambahkan semua file
    for (const file of files) {
      formData.append("foto", file);
    }

    const res = await fetch("/api/blogs", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("✅ Blog berhasil ditambahkan!");
      setJudul("");
      setTanggal("");
      setDeskripsi("");
      setFiles([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setLoading(false);
      onSuccess(true);
    } else {
      setMessage("❌ Gagal menambahkan Blog.", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-[500px] overflow-y-auto max-w-xl border rounded border-button mx-auto p-4 shadow-md"
    >
      <label>Judul</label>
      <input
        type="text"
        className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul Blog"
        required
      />

      <label>Tanggal</label>
      <input
        type="date"
        className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        placeholder="Tanggal Blog"
        required
      />

      <label>Deskripsi</label>
      <textarea
        className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        placeholder="deskripsi Blog"
        required
        rows={5}
      />

      <label>Foto Blog</label>
      <input
        type="file"
        multiple
        onChange={(e) => {
          setFiles([...e.target.files]); // ← ini mengisi state files
        }}
        ref={inputRef} // untuk clear form input foto
        className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-button dark:bg-darkbutton hover:bg-button/60 hover:dark:bg-darkbutton/60 text-text dark:text-darktext font-semibold py-2 px-4 rounded transition disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Blog"}
      </button>
    </form>
  );
}
