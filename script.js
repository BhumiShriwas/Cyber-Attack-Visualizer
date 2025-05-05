const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Make canvas responsive
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.9;
  canvas.height = 400;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Sound effect
const alertSound = new Audio('alert.mp3');

function drawUser() {
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(100, 150, 100, 100);
  ctx.fillStyle = '#fff';
  ctx.fillText('User', 130, 140);
}

function drawServer() {
  ctx.fillStyle = '#007bff';
  ctx.fillRect(canvas.width - 200, 150, 100, 100);
  ctx.fillStyle = '#fff';
  ctx.fillText('Server', canvas.width - 175, 140);
}

function drawArrow(fromX, fromY, toX, toY, color = '#ff0000') {
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function simulateSQLInjection() {
  clearCanvas();
  drawUser();
  drawServer();

  let x = 200;
  const interval = setInterval(() => {
    clearCanvas();
    drawUser();
    drawServer();
    ctx.fillStyle = 'lime';
    ctx.fillText("' OR '1'='1", x, 200);
    drawArrow(x, 205, x + 40, 205);

    x += 10;
    if (x > canvas.width - 220) {
      clearInterval(interval);
      ctx.fillStyle = 'red';
      ctx.font = '20px Arial';
      ctx.fillText("🚨 Server Compromised!", canvas.width / 2 - 100, 300);
      alertSound.play(); // Play sound here
    }
  }, 40);
}

function simulatePhishing() {
  clearCanvas();
  drawUser();
  drawServer();
  ctx.fillStyle = '#ffcc00';
  ctx.fillText("Fake Email Sent →", canvas.width / 2 - 80, 100);
  drawArrow(canvas.width / 2 + 10, 105, canvas.width - 250, 105, '#ffcc00');

  let y = 170;
  const interval = setInterval(() => {
    clearCanvas();
    drawUser();
    drawServer();
    ctx.fillStyle = '#00ffff';
    ctx.fillText("🔐 Credentials", 200, y);
    drawArrow(200, y + 5, 300, y + 5, '#00ffff');

    y -= 5;
    if (y < 100) {
      clearInterval(interval);
      ctx.fillStyle = 'red';
      ctx.font = '20px Arial';
      ctx.fillText("⚠️ Credentials Stolen!", canvas.width / 2 - 100, 300);
      alertSound.play(); // Play sound here
    }
  }, 40);
}

document.getElementById("startBtn").addEventListener("click", () => {
  const attackType = document.getElementById("attackType").value;
  if (attackType === "sql") {
    simulateSQLInjection();
  } else if (attackType === "phishing") {
    simulatePhishing();
  }
});
