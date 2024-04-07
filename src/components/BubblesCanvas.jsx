// BubblesCanvas.jsx
import React, { useEffect, useRef } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

class Bubble {
  constructor(color = 'rgba(44,44,44,0.8)') {
    this.r = 0.1; // Start radius small to grow.
    this.x = rand(0, window.innerWidth);
    this.y = rand(0, window.innerHeight);
    this.speedModifier = 2;
    this.vy = this.speedModifier * rand(0.1, 0.5) + 5;
    this.vx = this.speedModifier * rand(-3, 3);
    this.vr = 0;
    this.targetR = rand(20, 120) * 0.125;
    this.c = color;
    this.life = true;
    this.growing = true;
  }

  update(dt) {
    this.vy += 0.07 * this.speedModifier;
    this.vr += 0.012;
    this.y -= this.vy * dt;
    this.x += this.vx * dt;

    if (this.r < this.targetR && this.growing) {
      this.r += this.vr * dt;
    } else if (this.r >= this.targetR) {
      this.growing = false;
    }

    if (this.y < -100 || this.x < 0 || this.x > window.innerWidth || this.y > window.innerHeight) {
      this.life = false;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = this.c;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

const BubblesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let aBubbles = [];
    let bRunning = true;

    function addBubble() {
      const coinFlip = Math.random() > 0.5;
      const color = coinFlip ? 'rgba(255,169,99,0.73)' : undefined;
      aBubbles.push(new Bubble(color));
    }

    function update() {
      const now = Date.now();
      const dt = now / 1000;

      aBubbles.forEach((bubble, index) => {
        bubble.update(dt);
        if (!bubble.life) aBubbles.splice(index, 1);
      });

      if (aBubbles.length < window.innerWidth / 70) {
        addBubble();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      aBubbles.forEach(bubble => {
        bubble.draw(ctx);
      });
    }

    function run() {
      if (!bRunning) return;
      update();
      draw();
      requestAnimationFrame(run);
    }

    function handleClick(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const leniencyFactor = 1.5;

      aBubbles.forEach(bubble => {
        const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
        if (distance < bubble.r * leniencyFactor) {
          bubble.life = false;
          return;
        }
      });
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('click', handleClick);

    run();

    return () => {
      bRunning = false;
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default BubblesCanvas;
