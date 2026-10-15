import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'dust' | 'leaf' | 'thread';
}

interface ParallaxParticlesProps {
  color: string;
  theme: 'gold' | 'emerald' | 'crimson' | 'sapphire' | 'platinum';
}

export const ParallaxParticles: React.FC<ParallaxParticlesProps> = ({ color, theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = 32;
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (theme === 'crimson' ? 16 : 8) + 3,
      speed: Math.random() * 0.4 + 0.15,
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.6,
      type: theme === 'crimson' ? (i % 3 === 0 ? 'thread' : 'petal') : i % 2 === 0 ? 'leaf' : 'dust',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'thread') {
          // Saffron thread
          ctx.strokeStyle = '#ff3344';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.bezierCurveTo(-p.size / 2, -6, p.size / 2, 6, p.size, 0);
          ctx.stroke();
        } else if (p.type === 'leaf') {
          // Delicate tea leaf
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'petal') {
          // Soft botanical petal
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size, 0, 0, -p.size);
          ctx.fill();
        } else {
          // Luminous golden / astral dust
          ctx.fillStyle = color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [color, theme]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
    </div>
  );
};
