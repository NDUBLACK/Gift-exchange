/* Form submission functions */

// To get the form and button
const form = document.getElementById("gift-form");
const submitButton = document.querySelector(".submit-button");

form.addEventListener("submit", function (event) {
  event.preventDefault(); //stops page reloading

  let isValid = true;

  // Form validation check 
  const name = form.querySelector("input[name='Name']");
  const number = form.querySelector("input[name='Number']");

  //check if name is at least 11 characters long
  if (name.value.trim().length < 11) {
    name.classList.add("shake", "invalid"); //add shake
    isValid = false;
  } else {
    name.classList.remove("shake", "invalid"); //remove shake
  }

  //check if number is exactly 11 digits
  if (number.value.trim().length !== 11 || isNaN(number.value)) {
    number.classList.add("shake"); //add shake
    isValid = false;
  } else {
    number.classList.remove("shake"); //remove shake
  }

  //show modal and trigger confetti on successful submission
  if (isValid) {
    modal.style.display = "flex";
    triggerConfetti(); 
  }
});

// confetti 
function triggerConfetti() {
  confetti ({
    particleCount: 100,
    spread: 70,
    origin: {x: 0.5, y: 0.5}
  });
}














/* For the MODAL */

// To get the modal and close button
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

// Close the modal when the 'x' button is clicked
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Close the modal when clicking outside of it
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none"
  }
});