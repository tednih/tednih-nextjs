import Foto1 from "./img/luxspace.png";
import Foto2 from "./img/portfolio1.png";
import Foto3 from "./img/portfolio2.jpg";

const Projects = [
  {
    id: 1,
    judul: "Luxspace",
    tanggal: "20 Januari 2023",
    foto: Foto1,
    new: true,
    languages: ["HTML", "CSS", "JavaScript"],
    tools: ["React", "Tailwind"],
  },
  {
    id: 2,
    judul: "Portfolio pertama",
    tanggal: "23 Januari 2023",
    foto: Foto2,
    new: true,
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 3,
    judul: "CRUD CodeIgniter",
    tanggal: "25 Januari 2023",
    foto: Foto3,
    new: true,
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
];

export { Projects };
