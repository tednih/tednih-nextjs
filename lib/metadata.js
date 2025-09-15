export async function getEntity(resource, id) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/${resource}/${id}`,

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
