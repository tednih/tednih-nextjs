"use client";
import { TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const UpdateProjectForm = ({ projectId, onLoadingChange, onSuccess }) => {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [link, setLink] = useState("");
  const [bahasaOptions, setBahasaOptions] = useState([]);
  const [toolsOptions, setToolsOptions] = useState([]);
  const [bahasa, setBahasa] = useState([]);
  const [tools, setTools] = useState([]);
  const [deskripsi, setDeskripsi] = useState("");
  const [fotoFiles, setFotoFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [oldImageUrl, setOldImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (isoString) => {
    return new Date(isoString).toISOString().split("T")[0];
  };

  // Ambil data project lama dan opsi dropdown
  useEffect(() => {
    const fetchProjectAndOptions = async () => {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();

      setJudul(data.projects.judul);
      setTanggal(data.projects.tanggal);
      setLink(data.projects.link);
      setDeskripsi(data.projects.deskripsi);
      setBahasa(
        (data.projects.bahasa || []).map((b) => ({ label: b, value: b }))
      );
      setTools(
        (data.projects.tools || []).map((t) => ({ label: t, value: t }))
      );
      setPreview(data.projects.foto || []);
      setOldImageUrl(data.projects.foto || []);
      // Ambil opsi bahasa/tools dari DB
      try {
        const optsRes = await fetch("/api/projects/from-projects");
        const opts = await optsRes.json();
        setBahasaOptions(
          [...new Set(opts.bahasaList)].map((b) => ({ value: b, label: b }))
        );
        setToolsOptions(
          [...new Set(opts.toolsList)].map((t) => ({ value: t, label: t }))
        );
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectAndOptions();
  }, [projectId]);

  const handleDeleteImage = (index) => {
    const updatedPreview = [...preview];
    updatedPreview.splice(index, 1);
    setPreview(updatedPreview);

    const updatedOldImages = [...oldImageUrl];
    updatedOldImages.splice(index, 1);
    setOldImageUrl(updatedOldImages);
  };

  const handleSubmit = async (e) => {
    if (onLoadingChange) onLoadingChange(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tanggal", tanggal);
    formData.append("link", link);
    formData.append("deskripsi", deskripsi);
    // formData.append("oldImageUrl", JSON.stringify(oldImageUrl));
    oldImageUrl.forEach((url) => formData.append("oldImageUrl[]", url));

    bahasa.forEach((b) => formData.append("bahasa[]", b.value));
    tools.forEach((t) => formData.append("tools[]", t.value));
    fotoFiles.forEach((file) => formData.append("foto", file));

    const res = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Berhasil update project!");
      if (onLoadingChange) onLoadingChange(false);
      if (onSuccess) onSuccess(true);
    } else {
      alert("❌ Gagal update project.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(`Yakin ingin menghapus Project ${judul}?`);
    if (!confirmDelete) return;

    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Project berhasil dihapus!");
      onSuccess(true);
    } else {
      alert("Gagal menghapus Project");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-h-[500px] overflow-y-auto max-w-xl p-4 border border-button rounded shadow-md"
      >
        <label>Judul</label>
        <input
          type="text"
          placeholder="Judul Project"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full p-2 mb-4 rounded 
          border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button 
             focus:outline-none"
          readOnly={isLoading}
          required
        />
        <label>Tanggal</label>
        <input
          type="date"
          value={tanggal ? formatDate(tanggal) : ""}
          onChange={(e) => setTanggal(e.target.value)}
          className="w-full p-2 mb-4 rounded 
          border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button 
             focus:outline-none"
          readOnly={isLoading}
          required
        />
        <label>Url</label>
        <input
          type="text"
          placeholder="Link Project"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 mb-4 rounded 
          border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button 
             focus:outline-none"
          readOnly={isLoading}
        />
        <label>Bahasa</label>
        <CreatableSelect
          isMulti
          options={bahasaOptions}
          value={bahasa}
          onChange={(selected) => setBahasa(selected)}
          placeholder="Pilih atau tambahkan Bahasa"
          menuPlacement="auto" // biar dropdown buka ke atas/bawah sesuai ruang
          menuPosition="fixed" // fix posisi relatif viewport, bukan parent
          menuPortalTarget={
            typeof window !== "undefined" ? document.body : null
          }
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menu: (base) => ({ ...base, position: "fixed" }), // lebih stabil saat keyboard naik
          }}
        />

        <label>Tools</label>
        <CreatableSelect
          isMulti
          options={toolsOptions}
          value={tools}
          onChange={(selected) => setTools(selected)}
          placeholder="Pilih atau tambahkan tools"
          menuPlacement="auto" // biar dropdown buka ke atas/bawah sesuai ruang
          menuPosition="fixed" // fix posisi relatif viewport, bukan parent
          menuPortalTarget={
            typeof window !== "undefined" ? document.body : null
          }
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menu: (base) => ({ ...base, position: "fixed" }), // lebih stabil saat keyboard naik
          }}
        />

        <label>Deskripsi</label>
        <textarea
          value={deskripsi}
          placeholder="Deskripsi Project"
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full p-2 mb-4 rounded 
          border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button 
             focus:outline-none"
          readOnly={isLoading}
          rows={4}
          required
        />
        <label>Photo</label>
        <div className="border border-button rounded-md p-2 mb-4">
          <div className="flex flex-wrap gap-2">
            {preview.map((img, idx) => (
              <div key={idx} className="relative w-40">
                <img
                  src={img}
                  className="w-40 h-auto rounded mb-2"
                  alt={`preview-${idx}`}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  title="Hapus gambar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              const newPreviews = files.map((f) => URL.createObjectURL(f));
              setFotoFiles((prev) => [...prev, ...files]);
              setPreview((prev) => [...prev, ...newPreviews]);
            }}
          />
          {oldImageUrl.map((url, idx) => (
            <input key={idx} type="hidden" name="oldImageUrl[]" value={url} />
          ))}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-button text-text dark:text-darktext px-4 py-2 rounded hover:bg-button/60"
          >
            Update Project
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

export default UpdateProjectForm;
