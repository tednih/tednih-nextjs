"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const [theme, setTheme] = useState("light");
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Particles init failed:", error);
    }
  }, []);

  // Deteksi mode gelap/terang dari sistem (bisa nanti disambungkan ke toggle juga)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    const handler = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Warna dinamis berdasarkan tema
  //   const bgColor = theme === "dark" ? "#0d1117" : "#f8fafc";
  const particleColor = theme === "dark" ? "#006400" : "#04a804";
  const linkColor = particleColor;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        autoPlay: true,
        // background: {
        //   color: { value: bgColor },
        // },
        detectRetina: true,
        fpsLimit: 120,
        interactivity: {
          detectsOn: "window",
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: {
              enable: true,
              mode: "grab",
              parallax: { enable: true, force: 60, smooth: 10 },
            },
            resize: { enable: true, delay: 0.5 },
          },
          modes: {
            attract: {
              distance: 200,
              duration: 0.4,
              easing: "ease-out-quad",
              factor: 1,
              maxSpeed: 50,
              speed: 1,
            },
            grab: {
              distance: 400,
              links: { opacity: 1 },
            },
            push: { quantity: 4 },
            repulse: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad",
            },
          },
        },
        particles: {
          number: {
            // density: { enable: true, width: 1920, height: 1080 },
            value: 40,
          },
          color: { value: particleColor },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            outModes: { default: "out" },
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
              enable: true,
              speed: 3,
              startValue: "random",
            },
          },
          shape: { type: "star" },
          size: {
            value: { min: 3, max: 7 },
            animation: { enable: true, speed: 20, startValue: "random" },
          },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
      }}
      className=""
    />
  );
}
