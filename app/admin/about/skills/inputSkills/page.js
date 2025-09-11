"use client";

import { useState } from "react";

export default function SkillForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [iconSlug, setIconSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/about/aboutSkills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, icon: iconSlug }),
      });

      if (res.ok) {
        setMessage("✅ Skill berhasil ditambahkan!");
        setName("");
        setIconSlug("");
        onSuccess(true);
      } else {
        setMessage("❌ Gagal menambahkan skill.", error);
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
      className="max-h-[500px] overflow-y-auto max-w-xl p-4 border border-button rounded shadow-md"
    >
      <label>Nama</label>
      <input
        type="text"
        className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama Skills"
        required
      />
      <div className="border border-button rounded-md p-2 mb-4">
        <label>Icon</label>
        <input
          type="text"
          className="w-full p-2 mb-4 rounded border-2 border-gray-400 dark:border-gray-600 focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton focus:outline-none"
          value={iconSlug}
          onChange={(e) => setIconSlug(e.target.value)}
          placeholder="Contoh: material-icon-theme:react"
          required
        />
        <p>
          Source :{" "}
          <a
            href="https://icon-sets.iconify.design/"
            target="_blank"
            className="italic text-button dark:hover:text-primary hover:text-darkprimary"
          >
            Iconify
          </a>
        </p>
        <label>copy Icon name, pilih iconify icon</label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-button dark:bg-darkbutton hover:bg-button/60 hover:dark:bg-darkbutton/60 text-text dark:text-darktext font-semibold py-2 px-4 rounded transition disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Skill"}
      </button>
      {message}
    </form>
  );
}
