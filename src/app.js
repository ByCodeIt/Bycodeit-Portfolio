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


// Navigation Effect and accessibility
const menuToggle = document.querySelector('#menuToggle');
const mobileMenu = document.querySelector('#mobileMenu');
const menuBackdrop = document.querySelector('#menuBackdrop');
const navbar = document.querySelector('#navbar');
const navLinks = document.querySelectorAll('#navbarNav a');
const indicator = document.querySelector('.nav-active-indicator');

// Fade-in Navbar on load
setTimeout(() => {
    navbar.classList.remove('opacity-0', '-translate-y-5');
    navbar.classList.add('opacity-100', 'translate-y-0');
}, 250);

// Active link indicator
function updateIndicator(link) {
    const rect = link.getBoundingClientRect();
    const containerRect = link.parentElement.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - containerRect.left}px`;
}

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateIndicator(link));
    link.addEventListener('mouseleave', () => indicator.style.width = '0');
    link.addEventListener('click', () => updateIndicator(link));
});

// Mobile Menu Controls
window.openMenu = () => {
    mobileMenu.classList.replace('-translate-x-full', 'translate-x-0');
    menuBackdrop.classList.remove('hidden');
    setTimeout(() => menuBackdrop.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
};

window.closeMenu = () => {
    mobileMenu.classList.replace('translate-x-0', '-translate-x-full');
    menuBackdrop.classList.remove('opacity-100');
    setTimeout(() => menuBackdrop.classList.add('hidden'), 400);
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
};

// ScrollSpy
const sections = document.querySelectorAll("section[id]");

// --- Optimized Scroll Events ---
let ticking = false;
let counterStarted = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
}

function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / docHeight;

    // ✅ Navbar shadow toggle
    navbar.classList.toggle("shadow-lg", scrollY > 20);

    // ✅ ScrollSpy highlight
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("text-blue-400");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("text-blue-400");
                }
            });
        }
    });

    // ✅ Counter animation trigger
    const statsSection = document.getElementById("stats");
    if (statsSection && !started && scrollY > statsSection.offsetTop - window.innerHeight + 100) {
        animateCounters();
        counterStarted = true;
    }

    // ✅ Progress ring + back to top (optional)
    if (typeof updateProgress === "function") updateProgress(scrollPercent);
}

window.addEventListener("scroll", onScroll);

document.documentElement.style.scrollBehavior = "smooth";
// End of Navigation Effect and accessibility


// Hero Section Animation on Load
window.addEventListener('load', () => {
    document.querySelector('#hero .z-10').classList.remove('opacity-0', 'translate-y-6');
});
// End of Hero Section Animation on Load


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


// Back to Top Button and Scroll Progress Indicator with Pulse Animation Script
const backToTop = document.getElementById("backToTop");
const scrollProgress = document.querySelector("#scrollProgress circle:nth-child(2)");
const progressGlow = document.getElementById("progressGlow");
let pulseTimeout;

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    // Show/hide button
    if (scrollTop > 300) {
        backToTop.classList.remove("opacity-0", "invisible", "translate-y-4");
        backToTop.classList.add("opacity-100", "visible", "translate-y-0");
    } else {
        backToTop.classList.remove("opacity-100", "visible", "translate-y-0");
        backToTop.classList.add("opacity-0", "invisible", "translate-y-4");
    }

    // Scroll progress ring update
    const dashArray = 125.6;
    const dashOffset = dashArray * (1 - scrollPercent);
    scrollProgress.style.strokeDashoffset = dashOffset;

    // Blue → Indigo tone blend (no pinks)
    const blue = { r: 59, g: 130, b: 246 }; // #3b82f6
    const indigo = { r: 99, g: 102, b: 241 }; // #6366f1

    const r = Math.round(blue.r + (indigo.r - blue.r) * scrollPercent);
    const g = Math.round(blue.g + (indigo.g - blue.g) * scrollPercent);
    const b = Math.round(blue.b + (indigo.b - blue.b) * scrollPercent);
    const color = `rgb(${r}, ${g}, ${b})`;

    // Apply color to circle and glow
    scrollProgress.style.stroke = color;
    progressGlow.style.background = `radial-gradient(circle, ${color}90, transparent)`;

    // Sync button gradient (blue → indigo)
    backToTop.style.background = `linear-gradient(to right, ${color}, rgba(${r - 10}, ${g - 10}, ${b - 5}, 1))`;

    // Subtle pulse feedback
    scrollProgress.classList.add("animate-[pulse_1s_ease-out]");
    progressGlow.classList.add("opacity-100", "scale-105");

    clearTimeout(pulseTimeout);
    pulseTimeout = setTimeout(() => {
        scrollProgress.classList.remove("animate-[pulse_1s_ease-out]");
        progressGlow.classList.remove("opacity-100", "scale-105");
    }, 400);
});
// End of Back to Top Button and Scroll Progress Indicator with Pulse Animation Script


// Small JS to make Enter / Space toggle expand for keyboard users(no framework required)
// Toggle 'group-expanded' class on button when toggled via keyboard (Enter/Space)
document.querySelectorAll('#services button[type="button"]').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.classList.toggle('group-expanded');
        }
    });
    // Also ensure focus shows expanded state (optional)
    btn.addEventListener('focus', () => btn.classList.add('group-focused'));
    btn.addEventListener('blur', () => {
        btn.classList.remove('group-focused');
        // don't auto-collapse after focus out (keeps hover behaviour natural)
    });
});
// End of Expand Toggle Accessibility


// Make sure service buttons are keyboard-accessible and announce press
document.querySelectorAll('#services .service-item').forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.classList.toggle('active');
            }
        });
});
// End of Service Buttons Accessibility


// Auto-update year
document.getElementById("year").textContent = new Date().getFullYear();
// End of Dynamic Year
