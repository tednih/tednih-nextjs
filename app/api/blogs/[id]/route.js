import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";
import blog from "@/models/blogs";
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

    const blogs = await blog.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!blogs) {
      return Response.json(
        { message: "blog tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json({ blogs });
  } catch (error) {
    console.error("Error getting blog by ID:", error);
    return Response.json({ message: "Gagal mengambil blog" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  await dbConnect();

  const formData = await req.formData();
  const judul = formData.get("judul");
  const tanggal = formData.get("tanggal");
  const deskripsi = formData.get("deskripsi");

  const files = formData.getAll("foto");
  const uploadedUrls = [];
  const oldImages = formData.getAll("oldImageUrl[]");

  function getNextImageIndex(existingUrls, judul) {
    const base = `blog-${judul.replace(/\s+/g, "-").toLowerCase()}`;
    const usedIndexes = existingUrls
      .map((url) => {
        const match = url.match(new RegExp(`${base}-(\\d+)`));
        return match ? parseInt(match[1], 10) : null;
      })
      .filter((n) => n !== null);

    const maxIndex = usedIndexes.length ? Math.max(...usedIndexes) : -1;
    return maxIndex + 1;
  }

  const existingBlog = await blog.findById(id);
  const existingUrls = existingBlog.foto || [];

  let imageIndex = getNextImageIndex(existingUrls, judul);
  // 1. Upload gambar baru ke Cloudinary
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const publicId = `blog-${judul
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
    deskripsi,
    foto: [...oldImages, ...uploadedUrls],
  };

  // 3. Update blog ke DB
  await blog.findByIdAndUpdate(id, update);

  return Response.json({ message: "Blog updated!" });
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const deletedBlog = await blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return Response.json(
        { message: "Blog tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Blog berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus blog:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
