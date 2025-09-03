"use client";

import { useState, useRef } from "react";

export default function ProfileForm() {
  const [foto, setFoto] = useState("");
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("deskripsi", deskripsi);
    formData.append("foto", file);

    try {
      const res = await fetch("/api/about/aboutProfile", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("✅ Profile berhasil ditambahkan!");
        setNama("");
      } else {
        setMessage("❌ Gagal menambahkan Profile.", error);
      }
    } catch (error) {
      setMessage("❌ Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-[500px] overflow-y-auto max-w-xl mx-auto p-4 shadow-md border border-button rounded"
    >
      <label>Nama</label>
      <input
        type="text"
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button focus:outline-none"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Dimas Tedi S"
        required
      />

      <label>Deskripsi</label>
      <textarea
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button focus:outline-none"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
        placeholder="Deskripsi"
        required
        rows={5}
      />

      <label>Username</label>
      <input
        type="text"
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <label>Password</label>
      <input
        type="password"
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <label>Foto Profile</label>
      <input
        type="file"
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button focus:outline-none"
        value={foto}
        accept="image/*"
        ref={fileRef}
        onChange={(e) => setFoto(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-button hover:bg-button/60 text-text dark:text-darktext font-semibold py-2 px-4 rounded transition disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Profile"}
      </button>
    </form>
  );
}
