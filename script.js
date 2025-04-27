// This JavaScript file will control some simple interactivity

function showAlert() {
  alert("Welcome to Alex Khoo's Website!");
}

document.addEventListener("DOMContentLoaded", function() {
  const heroContent = document.querySelector('.hero-content');
  heroContent.classList.add('visible');
});
