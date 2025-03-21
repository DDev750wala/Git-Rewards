"use client";
import { useEffect, useRef, useState } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect system dark mode preference
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateDarkMode = () => {
      setIsDarkMode(darkModeMediaQuery.matches);
    };

    updateDarkMode(); // Set initial theme
    darkModeMediaQuery.addEventListener("change", updateDarkMode);

    return () => darkModeMediaQuery.removeEventListener("change", updateDarkMode);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle System
    const particles: {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background color fix
      ctx.fillStyle = isDarkMode ? "black" : "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Move particles
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Keep particles in bounds
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        // Particle hover effect
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          particle.x -= dx * 0.02;
          particle.y -= dy * 0.02;
        }

        // Set particle color dynamically
        const particleColor = isDarkMode ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDarkMode]); // Reacts to theme changes

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10"></canvas>
  );
}