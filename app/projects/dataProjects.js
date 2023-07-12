import Foto1 from "../../public/luxspace.png";
import Foto2 from "../../public/portfolio2.jpg";
import Foto3 from "../../public/GieStore.jpg";
import Foto4 from "../../public/tednih.jpg";
import Foto5 from "../../public/bp.jpg";
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
        This project was created while I was taking an online class from {link}.
        In this project, I learned how to use ReactJs and Tailwind, as well as
        how to create skeleton loading, hooks, routers, and other features in
        ReactJs. View Project: {luxspace}.
      </>
    ),
  },

  {
    id: 2,
    judul: "Pustaka Booking",
    tanggal: "28 Mei 2019",
    foto: Foto2,
    bahasa: ["HTML", "CSS", "PHP", "SQL"],
    tools: ["CodeIgniter", "Bootstrap", "PhpMyAdmin"],
    deskripsi: (
      <>
        This is a web application built with the CodeIgniter 3 framework. It is
        based on the Web Programming II module at Bina Sarana Informatika
        University, using CodeIgniter 3. In this project, I learned the PHP
        programming language and how to perform CRUD operations using the
        CodeIgniter 3 framework and how to use MySQL for the backend. View
        source code:{pustaka}
      </>
    ),
  },
  {
    id: 3,
    judul: "GieStore",
    tanggal: "14 April 2023",
    foto: Foto3,
    bahasa: ["HTML", "CSS", "C#", "SQL"],
    tools: [".NET", "Bootstrap", "SqlServer"],
    deskripsi: (
      <>
        This is a project from PT. Global Service Academy's offline bootcamp.
        Here, we created an online store website with different user roles:
        users, admins, and owners. Each role has its own responsibilities. Users
        can only view available stock and prices. Admins can restock items, set
        prices, and keep daily reports. Owners can view the reports generated by
        the admins. The project was developed using the ASP.NET MVC framework,
        and SqlServer was used for the backend.
      </>
    ),
  },
  {
    id: 4,
    judul: "Tednih",
    tanggal: "26 Februari 2023",
    foto: Foto4,
    bahasa: ["HTML", "CSS", "JavaScript"],
    tools: ["React", "Tailwind", "NextJS"],
    deskripsi: (
      <>A simple portfolio built using Next.js "appDir" and Tailwind CSS</>
    ),
  },
  {
    id: 5,
    judul: "Peminjaman Asset BP",
    tanggal: "14 Juni 2023",
    foto: Foto5,
    bahasa: ["HTML", "CSS", "PHP", "SQL"],
    tools: ["Laravel", "Tailwind", "Laragon"],
    deskripsi: (
      <>
        I was assigned to make an asset lending website at PT. BinaPertiwi uses
        laravel 10 and tailwind css. for the database I use mysql from laragon
        (Adminer). On this website, the main page is a loan form for employees
        to borrow assets such as laptops, printers or other items. then there is
        an admin page to manage the availability of goods and accept or not
        borrow. This website has also been integrated by email.
      </>
    ),
  },
];

export { Projects };
