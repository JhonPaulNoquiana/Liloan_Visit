// Navbar Hide/Show Logic
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
        navbar.style.top = '-70px';
    } else {
        navbar.style.top = '0';
    }
    lastScrollY = currentScrollY;
});

// Section Alignment on Scroll Logic
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const currentScrollY = window.scrollY;

        if (currentScrollY >= sectionTop - window.innerHeight / 2 &&
            currentScrollY < sectionTop + sectionHeight) {
            section.style.transform = `translateY(0px)`;
        } else {
            section.style.transform = "translateY(0)";
        }
    });
});
