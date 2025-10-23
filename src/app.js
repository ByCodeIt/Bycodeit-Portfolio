// Project Counter
const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower = faster

const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
};

    // Trigger animation when section is visible
    const statsSection = document.getElementById('stats');
    let started = false;

window.addEventListener('scroll', () => {
    const sectionTop = statsSection.offsetTop - window.innerHeight + 100;
    if (!started && window.scrollY > sectionTop) {
        animateCounters();
    started = true;
    }
});
// End of Project Counter




// Navigation Effects and Accessibility
const menuToggle = document.querySelector('#menuToggle');
const mobileMenu = document.querySelector('#mobileMenu');
const menuBackdrop = document.querySelector('#menuBackdrop');
const navbar = document.querySelector('#navbar');
let scrollTimeout;

// --- 1. Sticky Shadow Transition ---
window.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => {
        const scrolled = window.scrollY > 10;
        navbar.classList.toggle("bg-[#0a0f2c]/95", scrolled);
        navbar.classList.toggle("shadow-lg", scrolled);
    });
});

// --- Open / Close Menu ---
function openMenu() {
    mobileMenu.classList.replace('translate-x-full', 'translate-x-0');
    menuBackdrop.classList.remove('hidden');
    menuToggle.setAttribute('aria-expanded', 'true');

    // Auto-focus first link
    const firstLink = mobileMenu.querySelector("a");
    if (firstLink) firstLink.focus();
}

function closeMenu() {
    mobileMenu.classList.replace('translate-x-0', 'translate-x-full');
    menuBackdrop.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
}

// --- Close menu when clicking outside ---
document.addEventListener('click', (e) => {
    if (!e.target.closest('#mobileMenu, #menuToggle')) closeMenu();
});

// --- ScrollSpy with ARIA current ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navbarNav a");

function activateLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("text-blue-400", "after:w-full");
                link.removeAttribute("aria-current");

                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("text-blue-400", "after:w-full");
                    link.setAttribute("aria-current", "page");
                }
            });
        }
    });
}

// --- Debounced scroll activation ---
window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(activateLink, 75);
});

// --- Smooth scroll globally ---
document.documentElement.style.scrollBehavior = "smooth";
// End of Navigation Effect and accessibility


// Hero Section Animation on Load
window.addEventListener('load', () => {
    document.querySelector('#hero .z-10').classList.remove('opacity-0', 'translate-y-6');
});


// AOS Initialization
AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    mirror: false,
    disableMutationObserver: true, // helps prevent layout reflows causing lag or double bars
});
// End of AOS Initialization
