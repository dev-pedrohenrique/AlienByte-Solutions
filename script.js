(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear().toString();

  if (window.lucide) {
    lucide.createIcons();
  }

  // Animação de Fundo (Canvas)
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const config = { particles: 60, maxDistance: 150, speed: 0.2 };
    let nodes = [];
    let width = 0; height = 0;

    class Node {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
        this.r = Math.random() * 2 + 1;
      }
      move() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes = Array.from({ length: config.particles }, () => new Node());
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node, i) => {
        node.move();
        ctx.beginPath(); ctx.fillStyle = `rgba(0, 255, 153, ${0.4})`; ctx.arc(node.x, node.y, node.r, 0, Math.PI*2); ctx.fill();
        for (let j = i + 1; j < nodes.length; j++) {
          let dx = node.x - nodes[j].x, dy = node.y - nodes[j].y;
          let d = Math.sqrt(dx*dx + dy*dy);
          if (d < config.maxDistance) {
            ctx.strokeStyle = `rgba(0, 255, 153, ${1 - d/config.maxDistance * 0.15})`;
            ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    resize(); window.addEventListener("resize", resize); requestAnimationFrame(draw);
  }
})();

/* --- FUNÇÃO COMERCIAL B2B --- */
function contactSales(interest) {
    const phone = "5517981866362"; // SEU NÚMERO AQUI
    
    // Mensagem mais corporativa
    const message = encodeURIComponent(
        `Olá, equipe AlienByte. Tenho interesse em saber mais sobre: *${interest}*. Gostaria de falar com um consultor técnico.`
    );
    
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
}