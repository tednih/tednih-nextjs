"use client";
import { useEffect, useState } from "react";

const UpdateProfileForm = ({ profileId, onLoadingChange, onSuccess }) => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fotoFiles, setFotoFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [oldImageUrl, setOldImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/about/aboutProfile/${profileId}`);
      const data = await res.json();
      try {
        setNama(data.profiles.nama);
        setDeskripsi(data.profiles.deskripsi);
        setUsername(data.profiles.username);
        setPassword(data.profiles.password);
        setPreview(data.profiles.foto || []);
        setOldImageUrl(data.profiles.foto || []);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [profileId]);

  const handleSubmit = async (e) => {
    if (onLoadingChange) onLoadingChange(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("username", username);
    formData.append("password", password);

    // Kalau oldImageUrl hanya 1 string
    if (oldImageUrl) {
      formData.append("oldImageUrl", oldImageUrl);
    }

    // Kalau hanya 1 file foto
    if (fotoFiles) {
      formData.append("foto", fotoFiles);
    }

    const res = await fetch(`/api/about/aboutProfile/${profileId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("✅ Berhasil update profile!");
      if (onLoadingChange) onLoadingChange(false);
      if (onSuccess) onSuccess(true);
    } else {
      alert("❌ Gagal update project.");
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
          placeholder="Nama Profile"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button 
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
             focus:border-button focus:ring-2 focus:ring-button 
             focus:outline-none"
          readOnly={isLoading}
          placeholder="Deskripsi Profile"
          rows={4}
          required
        />

        <div className="border border-button rounded-md p-2 mb-4">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button 
             focus:outline-none"
            readOnly={isLoading}
            placeholder="Username"
            rows={4}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 rounded 
             border-2 border-gray-400 dark:border-gray-600 
             focus:border-button focus:ring-2 focus:ring-button 
             focus:outline-none"
            readOnly={isLoading}
            placeholder="Password"
            rows={4}
            required
          />
        </div>

        <label>Photo</label>
        <div className="border border-button rounded-md p-2 mb-4">
          <div className="flex flex-wrap gap-2">
            {preview && (
              <div className="relative w-40">
                <img
                  src={preview}
                  className="w-40 h-auto rounded mb-4"
                  alt="preview"
                />
                <button
                  type="button"
                  onClick={() => setPreview(null)} // hapus foto
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  title="Hapus gambar"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <input
            placeholder="Photo Profile"
            type="file"
            accept="image/*"
            disabled={preview != null} // kalau sudah ada foto lama, input disable
            onChange={(e) => {
              const file = e.target.files?.[0]; // hanya ambil 1 file
              if (!file) return;

              // Validasi: kalau user coba pilih lebih dari 1 file
              if (e.target.files.length > 1) {
                alert("Hanya boleh pilih 1 foto!");
                return;
              }

              const newPreview = URL.createObjectURL(file);
              setFotoFiles(file); // replace, bukan append
              setPreview(newPreview);
            }}
          />

          {/* simpan foto lama */}
          {oldImageUrl && (
            <input type="hidden" name="oldImageUrl" value={oldImageUrl} />
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-button text-text dark:text-darktext px-4 py-2 rounded hover:bg-button/60"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfileForm;
