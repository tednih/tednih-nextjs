import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";
import project from "@/models/projects";
import dbConnect from "@/lib/mongodb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const id = params.id;
    if (!ObjectId.isValid(id)) {
      return Response.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const projects = await project.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!projects) {
      return Response.json(
        { message: "Project tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json({ projects });
  } catch (error) {
    console.error("Error getting project by ID:", error);
    return Response.json(
      { message: "Gagal mengambil project" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  await dbConnect();

  const formData = await req.formData();
  const judul = formData.get("judul");
  const tanggal = formData.get("tanggal");
  const link = formData.get("link");
  const deskripsi = formData.get("deskripsi");
  const bahasa = formData.getAll("bahasa[]");
  const tools = formData.getAll("tools[]");

  const files = formData.getAll("foto");
  const uploadedUrls = [];
  const oldImages = formData.getAll("oldImageUrl[]");

  function getNextImageIndex(existingUrls, judul) {
    const base = `project-${judul.replace(/\s+/g, "-").toLowerCase()}`;
    const usedIndexes = existingUrls
      .map((url) => {
        const match = url.match(new RegExp(`${base}-(\\d+)`));
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((n) => n !== null);

    const maxIndex = usedIndexes.length ? Math.max(...usedIndexes) : -1;
    return maxIndex + 1;
  }

  const existingProject = await project.findById(id);
  const existingUrls = existingProject.foto || [];

  let imageIndex = getNextImageIndex(existingUrls, judul);
  // 1. Upload gambar baru ke Cloudinary
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const publicId = `project-${judul
      .replace(/\s+/g, "-")
      .toLowerCase()}-${imageIndex++}`;

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: publicId,
            resource_type: "image",
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    uploadedUrls.push(uploadResult.secure_url);
  }

  // 2. Siapkan object update setelah semua data siap
  const update = {
    judul,
    tanggal,
    link,
    deskripsi,
    bahasa,
    tools,
    foto: [...oldImages, ...uploadedUrls],
  };

  // 3. Update project ke DB
  await project.findByIdAndUpdate(id, update);

  return Response.json({ message: "Project updated!" });
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const deletedProject = await project.findByIdAndDelete(id);

    if (!deletedProject) {
      return Response.json(
        { message: "Project tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Project berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus Project:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
