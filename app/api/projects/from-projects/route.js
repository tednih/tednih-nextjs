import project from "@/models/projects";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();

    const bahasaList = await project.distinct("bahasa");
    const toolsList = await project.distinct("tools");

    return Response.json({
      bahasaList,
      toolsList,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to get data" }, { status: 500 });
  }
}
