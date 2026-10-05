document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline with ScrollTrigger for #about-details section
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#about-details", // Target the section
            start: "top 80%", // Animation starts when top of section is 80% down the viewport
            end: "bottom 20%", // Animation can continue until bottom of section is 20% into the viewport
            toggleActions: "play none none none", // Play animation on enter, do nothing on exit
            markers: false, // Enable markers for debugging if needed
        },
        defaults: { duration: 1, ease: "power2.out" }
    });

    // Animate Header (h2) in the #about-details section
    timeline.from("#about-details h2", {
        opacity: 0,
        y: -50,
        visibility: "visible"
    }, "-=0.5");

    // Animate Intro Paragraph (assuming `.intro` is the first paragraph in #about-details)
    timeline.from("#about-details .intro", {
        opacity: 0,
        y: 20,
        visibility: "visible"
    }, "-=0.5");

    // Animate Paragraphs inside #about-details, alternating directions
    gsap.utils.toArray("#about-details p:not(.intro)").forEach((el, index) => {
        timeline.from(
            el,
            {
                opacity: 0,
                x: index % 2 === 0 ? 100 : -100,
                visibility: "visible",
            },
            "-=0.5"
        );
    });

    // Ensure that only p and h2 elements are hidden before the animation starts
    ScrollTrigger.create({
        trigger: "#about-details",
        start: "top 80%",
        onEnter: () => {
            gsap.set("#about-details p, #about-details h2", { visibility: "visible" });
        },
        onLeaveBack: () => {
            gsap.set("#about-details p, #about-details h2", { visibility: "hidden" });
        }
    });
});
