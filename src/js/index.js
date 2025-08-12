"use strict";

function main() {
    // Nabvar movement
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 10) {
            navbar.classList.add('navbar-shadow');
        } else {
            navbar.classList.remove('navbar-shadow');
        }
    });

    // card interaction
    const card = document.querySelector('.card');
    const img = card.querySelector('img');

    let targetRotateX = 0;
    let targetRotateY = -30; // Inicial en -30
    let currentX = 0;
    let currentY = -30;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function animate() {
        currentX = lerp(currentX, targetRotateX, 0.08);
        currentY = lerp(currentY, targetRotateY, 0.08);
        img.style.transform = `
    perspective(3000px)
    rotateX(${currentX}deg)
    rotateY(${currentY}deg)
  `;
        requestAnimationFrame(animate);
    }

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Movimiento suave: solo ±4° desde la posición inicial
        targetRotateX = ((y - centerY) / centerY) * -8;
        targetRotateY = -30 + ((x - centerX) / centerX) * 6;
    });

    card.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = -30; // volver a posición inicial
    });

    animate();
}

document.addEventListener("DOMContentLoaded", main);