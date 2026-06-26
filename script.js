const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const colors = [
    "#5EEAD4",
    "#60A5FA",
    "#FACC15",
    "#FFFFFF",
    "#A78BFA"
];

let confetti = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createConfetti() {
    confetti = [];

    for (let i = 0; i < 180; i++) {

        confetti.push({

            x: random(0, canvas.width),

            y: random(-canvas.height, 0),

            size: random(5, 12),

            speed: random(2, 6),

            angle: random(0, 360),

            rotate: random(-0.1, 0.1),

            color: colors[Math.floor(Math.random() * colors.length)]

        });

    }
}

function drawConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((c) => {

        ctx.save();

        ctx.translate(c.x, c.y);

        ctx.rotate(c.angle);

        ctx.fillStyle = c.color;

        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);

        ctx.restore();

        c.y += c.speed;

        c.angle += c.rotate;

        if (c.y > canvas.height + 20) {

            c.y = -20;

            c.x = random(0, canvas.width);

        }

    });

    requestAnimationFrame(drawConfetti);

}

createConfetti();
drawConfetti();


// Mouse glow effect

document.addEventListener("mousemove", (e) => {

    document.body.style.background =
        `radial-gradient(circle at ${e.clientX}px ${e.clientY}px,
        rgba(94,234,212,.10),
        transparent 260px),
        linear-gradient(135deg,#071021,#0d1b2a,#132238)`;

});


// Button ripple

document.querySelectorAll("a").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;

        circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;

        circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        this.appendChild(circle);

    });

});


// Floating cards

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    card.animate(
        [
            { transform: "translateY(0px)" },
            { transform: "translateY(-10px)" },
            { transform: "translateY(0px)" }
        ],
        {
            duration: 3500 + index * 300,
            iterations: Infinity,
            easing: "ease-in-out"
        }
    );

});


// Smooth appearance

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});
