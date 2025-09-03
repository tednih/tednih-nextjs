import aboutSkill from "@/models/aboutSkills";
import dbConnect from "@/lib/mongodb";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newSkill = new aboutSkill(body);
    await newSkill.save();

    return Response.json({
      message: "Skill berhasil disimpan",
    });
  } catch (error) {
    console.error("Error inserting Skill:", error);
    return Response.json({ message: "Gagal menyimpan Skill" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const skills = await aboutSkill.find();

    return Response.json({ skills });
  } catch (error) {
    console.error("Error ambil skills:", error);
    return Response.json({ message: "Gagal ambil skills" }, { status: 500 });
  }
}
