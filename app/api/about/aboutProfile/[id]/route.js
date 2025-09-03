import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";
import profile from "@/models/aboutProfile";
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

    const profiles = await profile.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!profiles) {
      return Response.json(
        { message: "profile tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json({ profiles });
  } catch (error) {
    console.error("Error getting profile by ID:", error);
    return Response.json(
      { message: "Gagal mengambil profile" },
      { status: 500 }
    );
  }
}

// export async function PUT(req, { params }) {
//   const { id } = params;
//   await dbConnect();

//   const formData = await req.formData();
//   const nama = formData.get("nama");
//   const deskripsi = formData.get("deskripsi");
//   const username = formData.get("username");
//   const password = formData.get("password");

//   const file = formData.get("foto"); // hanya 1 file
//   const oldImage = formData.get("oldImageUrl"); // hanya 1 url lama
//   let finalImageUrl = oldImage || null;

//   // Jika ada foto baru, upload ke Cloudinary
//   if (file && file.size > 0) {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const publicId = `profile-${nama.replace(/\s+/g, "-").toLowerCase()}`;

//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             public_id: publicId,
//             resource_type: "image",
//             overwrite: true, // timpa foto lama kalau ada
//           },
//           (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//           }
//         )
//         .end(buffer);
//     });

//     finalImageUrl = uploadResult.secure_url;
//   }

//   // Update data profile
//   const update = {
//     nama,
//     username,
//     password,
//     deskripsi,
//     foto: finalImageUrl, // hanya simpan 1 url
//   };

//   await profile.findByIdAndUpdate(id, update);

//   return Response.json({ message: "profile updated!" });
// }

// export async function DELETE(req, { params }) {
//   try {
//     await dbConnect();

//     const { id } = params;
//     const deletedBlog = await blog.findByIdAndDelete(id);

//     if (!deletedBlog) {
//       return Response.json(
//         { message: "Blog tidak ditemukan" },
//         { status: 404 }
//       );
//     }

//     return Response.json({ message: "Blog berhasil dihapus" });
//   } catch (error) {
//     console.error("Gagal hapus blog:", error);
//     return Response.json({ message: "Server error" }, { status: 500 });
//   }
// }

export async function PUT(req, { params }) {
  const { id } = params;
  await dbConnect();

  const formData = await req.formData();
  const nama = formData.get("nama");
  const deskripsi = formData.get("deskripsi");
  const username = formData.get("username");
  const password = formData.get("password");

  const file = formData.get("foto"); // hanya 1 file
  const oldImageUrl = formData.get("oldImageUrl"); // hanya 1 url lama
  let finalImageUrl = oldImageUrl || null;

  // --- jika ada foto baru ---
  if (file && file.size > 0) {
    let publicId;

    if (oldImageUrl) {
      // Extract public_id dari URL lama
      const parts = oldImageUrl.split("/");
      const filename = parts[parts.length - 1]; // contoh: profile-namaabc.jpg
      publicId = filename.split(".")[0]; // ambil tanpa ekstensi

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Gagal hapus foto lama:", err);
      }
    } else {
      // kalau tidak ada foto lama, buat public_id baru
      publicId = `profile-${nama.replace(/\s+/g, "-").toLowerCase()}`;
    }

    // 2. Upload ulang dengan public_id yang sama
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: publicId,
            resource_type: "image",
            overwrite: true, // pastikan timpa jika ada
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    finalImageUrl = uploadResult.secure_url;
  }

  // --- Update data profile ---
  const update = {
    nama,
    username,
    password,
    deskripsi,
    foto: finalImageUrl,
  };

  await profile.findByIdAndUpdate(id, update);

  return Response.json({ message: "Profile updated!" });
}
