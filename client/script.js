/* Form submission functions */

// To get the form and button
const form = document.getElementById("gift-form");
const submitButton = document.querySelector(".submit-button");

// confetti
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
  });
}
