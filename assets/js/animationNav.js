document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // Toggle the menu on button click
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active"); // Add or remove the "active" class
    });
});
