"use client";

import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    let raf: number;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("three").then((THREE) => {
      if (disposed || !canvas) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
      camera.position.z = 6;

      // Particle field
      const count = 700;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 24;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xc8ff00,
        size: 0.016,
        transparent: true,
        opacity: 0.38,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // Perspective grid
      const gridHelper = new THREE.GridHelper(40, 36, 0x1e1e1c, 0x161614);
      gridHelper.position.y = -5;
      gridHelper.rotation.x = Math.PI * 0.07;
      scene.add(gridHelper);

      let t = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        t += 0.004;
        particles.rotation.y = t * 0.055;
        particles.rotation.x = Math.sin(t * 0.12) * 0.035;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (!canvas) return;
        const nw = canvas.clientWidth;
        const nh = canvas.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh, false);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        pGeo.dispose();
        pMat.dispose();
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
