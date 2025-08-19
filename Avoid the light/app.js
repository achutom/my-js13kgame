const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let catX = 200; // start in the middle
let catY = 200;
let targetX = catX;
let targetY = catY;
let speed = 2; // pixels per frame
let frame = 0;
let frameTimer = 0;
let frameInterval = 100; // ms per frame

function setTarget(x, y) {
  targetX = x;
  targetY = y;
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  setTarget(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener("touchstart", (e) => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  setTarget(touch.clientX - rect.left, touch.clientY - rect.top);
});

function drawCat() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(catX, catY, 15, 0, Math.PI * 2);
  ctx.fill();
}

function updateCat() {
  const dx = targetX - catX;
  const dy = targetY - catY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > speed) {
    // Move toward target
    catX += (dx / distance) * speed;
    catY += (dy / distance) * speed;
  } else {
    // Close enough — snap to target
    catX = targetX;
    catY = targetY;
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateCat();
  drawCat();
  requestAnimationFrame(loop);
}

loop();
