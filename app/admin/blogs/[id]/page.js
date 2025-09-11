"use client";
import { TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const UpdateBlogForm = ({ blogId, onLoadingChange, onSuccess }) => {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fotoFiles, setFotoFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [oldImageUrl, setOldImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formatDate = (isoString) => {
    return new Date(isoString).toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/blogs/${blogId}`);
      const data = await res.json();
      try {
        setJudul(data.blogs.judul);
        setTanggal(data.blogs.tanggal);
        setDeskripsi(data.blogs.deskripsi);
        setPreview(data.blogs.foto || []);
        setOldImageUrl(data.blogs.foto || []);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

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
    formData.append("deskripsi", deskripsi);
    // formData.append("oldImageUrl", JSON.stringify(oldImageUrl));
    oldImageUrl.forEach((url) => formData.append("oldImageUrl[]", url));
    fotoFiles.forEach((file) => formData.append("foto", file));

    const res = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Berhasil update blog!");
      if (onLoadingChange) onLoadingChange(false);
      if (onSuccess) onSuccess(true);
    } else {
      alert("❌ Gagal update project.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(`Yakin ingin menghapus blog ${judul}?`);
    if (!confirmDelete) return;

    const res = await fetch(`/api/blogs/${blogId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Blog berhasil dihapus!");
      onSuccess(true);
    } else {
      alert("Gagal menghapus blog");
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
          placeholder="Judul Blog"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
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
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
          readOnly={isLoading}
          required
        />
        <label>Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button dark:focus:ring-darkbutton 
             focus:outline-none"
          readOnly={isLoading}
          placeholder="Deskripsi Blog"
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
                  className="w-40 h-auto rounded mb-4"
                  alt={`preview-${idx}`}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-red rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  title="Hapus gambar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <input
            placeholder="Photo Blog"
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
            className="bg-button dark:bg-darkbutton text-text dark:text-darktext px-4 py-2 rounded hover:bg-button/60"
          >
            Update Blog
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

export default UpdateBlogForm;
