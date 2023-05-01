import Foto1 from "../../public/luxspace.png";
import Foto2 from "../../public/portfolio2.jpg";
import Foto3 from "../../public/GieStore.jpg";
import Foto4 from "../../public/tednih.jpg";
import React from "react";
import Image from "next/image";

const linkName = "Build With Angga";
const link = (
  <>
    <a
      className="underline"
      href="https://class.buildwithangga.com/course_playing/master-class-react-js-dan-tailwind-css-website-development/"
      target="_blank"
    >
      {linkName}
    </a>
  </>
);
const linkLuxspace = "Luxspace";
const luxspace = (
  <>
    <a
      className="underline"
      href="https://luxspace-ted.vercel.app/"
      target="_blank"
    >
      {linkLuxspace}
    </a>
  </>
);
const linkPustaka = "Pustaka Booking";
const pustaka = (
  <>
    <a
      className="underline"
      href="https://github.com/tednih/pustaka-booking"
      target="_blank"
    >
      {linkPustaka}
    </a>
  </>
);

// const sertifikatBwa = (
//   <>
//     <Image
//       src="/sertifikat-BWA.jpg"
//       alt="Sertifikat BWA"
//       width={300}
//       height={300}
//     />
//   </>
// );

const Projects = [
  {
    id: 1,
    judul: "Luxspace",
    tanggal: "13 Februari 2023",
    foto: Foto1,
    bahasa: ["HTML", "CSS", "JavaScript"],
    tools: ["React", "Tailwind"],
    deskripsi: (
      <>
        Project ini dibuat saat saya mengikuti kelas online dari {link}. Di
        project ini saya mempelajari menggunakan ReactJs dan Tailwind serta
        bagaimana membuat skeleton loading, hooks, router, dan lainnya didalam
        reactJs. Lihat Project : {luxspace}
      </>
    ),
  },

  {
    id: 2,
    judul: "Pustaka Booking",
    tanggal: "28 Mei 2019",
    foto: Foto2,
    bahasa: ["HTML","CSS","PHP", "SQL"],
    tools: ["CodeIgniter", "Bootstrap", "PhpMyAdmin"],
    deskripsi: (
      <>
        Aplikasi Web dengan Framework Codeigniter. Ini adalah aplikasi web yang
        dibuat berdasarkan modul materi Web Programming II Universitas Bina
        Sarana Informatika, dengan menggunakan framework Codeigniter 3. di
        project ini saya mempelajari bahasa pemrograman PHP dan cara CRUD
        menggunakan framework CodeIgniter 3. Lihat sourcecode : {pustaka}
      </>
    ),
  },
  {
    id: 3,
    judul: "GieStore",
    tanggal: "14 April 2023",
    foto: Foto3,
    bahasa: ["HTML","CSS","C#", "SQL"],
    tools: [".NET", "Bootstrap", "SqlServer"],
    deskripsi: (
      <>
        Project bootcamp offline dari PT.Global Service Academy. Disini kami membuat sebuah website toko online, dimana ada pengguna, admin dan pemilik. yang dimana masing-masing memiliki perannya tersendiri. pengguna, hanya dapat melihat stock dan harga yg tersedia. kasir, merestock barang dan harga serta mencatat laporan harian. pemilik, melihat lapor dari kasir. 
      </>
    ),
  },
  {
    id: 4,
    judul: "Tednih",
    tanggal: "26 Februari 2023",
    foto: Foto4,
    bahasa: ["HTML","CSS","JavaScript"],
    tools: ["React", "Tailwind", "NextJS"],
    deskripsi: (
      <>
        Portfolio sederhana menggunakan NextJS "appDir" dan TailwindCSS
        </>
    ),
  },
];

export { Projects };
