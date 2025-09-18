export async function getEntity(resource, id) {
  try {
    let baseUrl;
    if (process.env.VERCEL_ENV === "production") {
      baseUrl = "https://tednih.com";
    } else if (process.env.VERCEL_ENV === "preview") {
      baseUrl = "https://dev-tednih.vercel.app";
    } else {
      baseUrl = "http://localhost:3000";
    }
    const res = await fetch(
      `${baseUrl}/api/${resource}/${id}`,

      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    // kalau API bungkus entity di dalam { projects } atau { blogs }
    const entity =
      data?.[resource] || data?.project || data?.blog || data || null;

    return entity;
  } catch (err) {
    console.error("Gagal fetch entity:", err);
    return null;
  }
}

export async function generateEntityMetadata(resource, id, fallbackTitle) {
  if (!id) {
    return {
      title: `${fallbackTitle} | Tednih.`,
      description: `Daftar ${fallbackTitle} di Tednih.`,
    };
  }

  const data = await getEntity(resource, id);
  const name =
    data?.title || data?.judul || data?.name || data?.nama || "Detail";

  return {
    title: `${name} | Tednih.`,
    description:
      data?.excerpt || data?.summary || `Detail ${resource} dari Tednih.`,
  };
}
