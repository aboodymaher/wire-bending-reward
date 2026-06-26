const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createConfetti() {
  particles = [];

  for (let i = 0; i < 160; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 7 + 4,
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 360,
      rotation: Math.random() * 0.2,
      opacity: Math.random() * 0.7 + 0.3
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = randomColor(p.x);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    p.y += p.speed;
    p.angle += p.rotation;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawConfetti);
}

function randomColor(seed) {
  const colors = ["#60a5fa", "#5eead4", "#ffffff", "#facc15", "#c084fc"];
  return colors[Math.floor(seed) % colors.length];
}

createConfetti();
drawConfetti();

setTimeout(() => {
  particles = particles.slice(0, 60);
}, 4500);
