"use client";
import { TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const UpdateSkillForm = ({ skillId, onLoadingChange, onSuccess }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkill = async () => {
      const res = await fetch(`/api/about/aboutSkills/${skillId}`);
      const data = await res.json();

      try {
        setName(data.skills.name);
        setIcon(data.skills.icon);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkill();
  }, [skillId]);

  const handleSubmit = async (e) => {
    if (onLoadingChange) onLoadingChange(true);
    e.preventDefault();

    const res = await fetch(`/api/about/aboutSkills/${skillId}`, {
      method: "PUT",
      body: JSON.stringify({ name, icon }),
    });

    if (res.ok) {
      alert("✅ Berhasil update profile!");
      setName("");
      setIcon("");
      onSuccess(true);
    } else {
      const errData = await res.json();
      alert("❌ Gagal edit skill: " + (errData.message || "Unknown error"));
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(`Yakin ingin menghapus skill ${name}?`);
    if (!confirmDelete) return;

    const res = await fetch(`/api/about/aboutSkills/${skillId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Skill berhasil dihapus!");
      onSuccess(true);
    } else {
      alert("Gagal menghapus Skill");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-h-[500px] overflow-y-auto max-w-xl p-4 border border-button rounded shadow-md"
      >
        <label>Nama</label>
        <input
          type="text"
          placeholder="Nama Skill"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 rounded 
               border-2 border-gray-400 dark:border-gray-600 
               focus:border-button focus:ring-2 focus:ring-button 
               focus:outline-none"
          readOnly={isLoading}
          required
        />
        <label>Icon</label>
        <input
          type="text"
          placeholder="Icon Skill"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full p-2 mb-4 rounded 
               border-2 border-gray-400 dark:border-gray-600 
               focus:border-button focus:ring-2 focus:ring-button 
               focus:outline-none"
          readOnly={isLoading}
          required
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-button text-text dark:text-darktext px-4 py-2 rounded hover:bg-button/60"
          >
            Update Skill
          </button>
          <TrashIcon
            onClick={handleDelete}
            className="h-6 w-6 fill-red-700 hover:fill-red-500 stroke-red-900 my-auto cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};
export default UpdateSkillForm;
