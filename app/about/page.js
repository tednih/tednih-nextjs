import React from "react";
import CardAbout from "../about/cardAbout";
import "animate.css";
// export const metadata = {
//   title: "About | Tednih.",
// };
import { generateEntityMetadata } from "@/lib/metadata";

export const metadata = await generateEntityMetadata("about", null, "About");

const About = () => {
  return (
    <div>
      <CardAbout />
    </div>
  );
};

export default About;
