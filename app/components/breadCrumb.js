"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const [dynamicTitle, setDynamicTitle] = useState(null);

  const pathParts = pathname.split("/").filter(Boolean);

  useEffect(() => {
    const resource = pathParts[0];
    const idParam = Object.keys(params)[0]; // ex: "id" / "slug"
    const entityId = params?.[idParam];

    if (entityId && resource) {
      // 🔄 fetch ulang setiap kali param berubah
      fetch(`/api/${resource}/${entityId}`)
        .then((res) => res.json())
        .then((data) => {
          const item = data?.[resource];
          const title = item?.judul || item?.title || item?.name || entityId;
          setDynamicTitle(title);
        })
        .catch((err) =>
          console.error(`❌ Gagal fetch breadcrumb ${resource}:`, err)
        );
    } else {
      // ⬅️ reset kalau tidak ada params.id (contoh balik ke /projects)
      setDynamicTitle(null);
    }
  }, [pathname, params]); // dependensi refetch

  return (
    <nav className="flex mt-2 w-max px-2 py-1 text-xs text-text dark:text-darktext rounded-r-xl shadow-lg backdrop-blur-md bg-primary/50 dark:bg-darkprimary/50 border border-primary/60 dark:border-darkprimary/60 transition-opacity duration-200">
      {/* Home link */}
      <Link
        href="/"
        className="flex items-center text-headline dark:text-darkheadline hover:text-headline/60 hover:dark:text-darkheadline/60"
      >
        <HomeIcon className="h-4 w-4" />
      </Link>

      {pathParts.map((part, index) => {
        const href = "/" + pathParts.slice(0, index + 1).join("/");
        const isLast = index === pathParts.length - 1;

        let label = part
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        if (isLast && dynamicTitle) {
          label = dynamicTitle;
        }

        return (
          <div key={href} className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 mx-2 text-headline dark:text-darkheadline" />
            {isLast ? (
              <span className="capitalize font-medium text-primary dark:text-darkprimary bg-darkprimary/80 dark:bg-primary rounded-r-xl px-2">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="capitalize text-headline dark:text-darkheadline hover:text-headline/60 hover:dark:text-darkheadline/60 transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
