"use client";

import type { PointerEvent } from "react";
import { useRef } from "react";

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 100,
  y: (index * 61 + 17) % 100,
  z: (index % 7) * 22 - 55,
  delay: -(index % 9) * 0.37,
  size: 2 + (index % 3),
}));

export default function Hero3DObject() {
  const fieldRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const field = fieldRef.current;
    if (!field || event.pointerType === "touch") return;

    const bounds = field.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    field.style.setProperty("--orb-rotate-y", `${(x - 0.5) * 18}deg`);
    field.style.setProperty("--orb-rotate-x", `${(0.5 - y) * 14}deg`);
    field.style.setProperty("--orb-light-x", `${x * 100}%`);
    field.style.setProperty("--orb-light-y", `${y * 100}%`);
  };

  const resetField = () => {
    const field = fieldRef.current;
    if (!field) return;
    field.style.setProperty("--orb-rotate-y", "0deg");
    field.style.setProperty("--orb-rotate-x", "0deg");
    field.style.setProperty("--orb-light-x", "50%");
    field.style.setProperty("--orb-light-y", "50%");
  };

  return (
    <div
      ref={fieldRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetField}
      className="hero-future-field"
      aria-hidden="true"
    >
      <div className="hero-future-aurora" />
      <div className="hero-future-orb">
        <div className="hero-future-halo hero-future-halo-one" />
        <div className="hero-future-halo hero-future-halo-two" />
        <div className="hero-future-halo hero-future-halo-three" />

        <div className="hero-future-sphere">
          <div className="hero-future-latitude hero-future-latitude-one" />
          <div className="hero-future-latitude hero-future-latitude-two" />
          <div className="hero-future-latitude hero-future-latitude-three" />
          <div className="hero-future-longitude hero-future-longitude-one" />
          <div className="hero-future-longitude hero-future-longitude-two" />
          <div className="hero-future-longitude hero-future-longitude-three" />
          <div className="hero-future-energy" />
          <div className="hero-future-scan" />
        </div>

        <div className="hero-future-arc hero-future-arc-one" />
        <div className="hero-future-arc hero-future-arc-two" />
        <div className="hero-future-arc hero-future-arc-three" />

        {particles.map((particle) => (
          <span
            key={particle.id}
            className="hero-future-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
              transform: `translateZ(${particle.z}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
