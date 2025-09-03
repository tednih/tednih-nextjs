import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";
import skill from "@/models/aboutSkills";
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

    const skills = await skill.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!skills) {
      return Response.json(
        { message: "skill tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json({ skills });
  } catch (error) {
    console.error("Error getting skill by ID:", error);
    return Response.json({ message: "Gagal mengambil skill" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const body = await req.json();
    const { name, icon } = body;

    const update = { name, icon };

    await skill.findByIdAndUpdate(id, update);

    return Response.json({
      message: "Skill berhasil diupdate",
      id,
      update,
    });
  } catch (error) {
    console.error("Error update skill:", error);
    return Response.json(
      { message: "Gagal update skill", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const deletedSkill = await skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return Response.json(
        { message: "Skill tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json({ message: "Skill berhasil dihapus" });
  } catch (error) {
    console.error("Gagal hapus skill:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
