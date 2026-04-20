const projects = [
  {
    title: "AI Workflow Studio",
    desc: "Plataforma de automação com agentes de IA para operações e atendimento.",
    metric: "-63% tempo operacional"
  },
  {
    title: "WP Headless Commerce",
    desc: "Arquitetura headless com WordPress + React para alto desempenho.",
    metric: "+2.8x taxa de conversão"
  },
  {
    title: "Growth Signal Engine",
    desc: "Motor de dados para priorização de campanhas e decisões em tempo real.",
    metric: "+41% ROI de mídia"
  }
];

const techStack = [
  "Python",
  "OpenAI API",
  "FastAPI",
  "Node.js",
  "WordPress REST",
  "React",
  "Docker",
  "AWS",
  "PostgreSQL",
  "Redis"
];

const projectGrid = document.getElementById("project-grid");
projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.desc}</p>
    <strong>${project.metric}</strong>
  `;
  projectGrid.appendChild(card);
});

const techChips = document.getElementById("tech-chips");
techStack.forEach((tech) => {
  const chip = document.createElement("span");
  chip.className = "chip";
  chip.textContent = tech;
  techChips.appendChild(chip);
});

document.getElementById("year").textContent = new Date().getFullYear();

// Background particle effect
const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");

let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

const dots = Array.from({ length: 42 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6
}));

function draw() {
  ctx.clearRect(0, 0, w, h);

  dots.forEach((d) => {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > w) d.vx *= -1;
    if (d.y < 0 || d.y > h) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = "#7a93ff";
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});
