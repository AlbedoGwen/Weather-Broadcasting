// Circuit board background animation
const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawCircuit() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.lineWidth = 1;

    // Draw random circuit lines
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    // Draw random nodes
    for (let i = 0; i < 20; i++) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 3,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

setInterval(drawCircuit, 100);

// Easter Egg: Shake to mutate (for mobile)
let lastAcceleration = { x: 0, y: 0, z: 0 };
window.addEventListener('devicemotion', (e) => {
    const { x, y, z } = e.acceleration;
    const delta = Math.abs(x - lastAcceleration.x) + Math.abs(y - lastAcceleration.y) + Math.abs(z - lastAcceleration.z);
    if (delta > 30) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
    }
    lastAcceleration = { x, y, z };
});

// Auto-show weather result if Flask passes data
document.addEventListener('DOMContentLoaded', () => {
    const weatherResult = document.getElementById('weatherResult');
    if (weatherResult && weatherResult.innerHTML.trim() !== '') {
        weatherResult.style.opacity = '1';
    }
});