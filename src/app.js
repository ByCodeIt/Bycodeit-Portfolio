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

// Navigation Effect and accessibility
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuBackdrop = document.getElementById('menuBackdrop');
const navbar = document.getElementById('navbar');

// --- 1. Sticky Shadow Transition ---
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("shadow-lg", "bg-[#0a0f2c]/95");
    } else {
        navbar.classList.remove("shadow-lg", "bg-[#0a0f2c]/95");
    }
});

// --- Open / Close Menu ---
function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    menuBackdrop.classList.remove('hidden');
    menuToggle.setAttribute('aria-expanded', 'true');

    // --- 2. Auto-focus first link ---
    const firstLink = mobileMenu.querySelector("a");
    if (firstLink) firstLink.focus();
}

function closeMenu() {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    menuBackdrop.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !e.target.closest('#menuToggle')) {
        closeMenu();
    }
});

// --- ScrollSpy with ARIA current ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navbarNav a");

function activateLink() {
    let scrollY = window.pageYOffset;

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
                    link.setAttribute("aria-current", "page"); // 3. ARIA current
                }
            });
        }
    });
}

window.addEventListener("scroll", activateLink);


// Progress Bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
});


// Dark mode
const html = document.documentElement;

// Desktop toggle
const themeToggleDesktop = document.getElementById('themeToggleDesktop');
const toggleCircleDesktop = document.getElementById('toggleCircleDesktop');

// Mobile toggle
const themeToggleMobile = document.getElementById('themeToggleMobile');
const toggleCircleMobile = document.getElementById('toggleCircleMobile');

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    toggleCircleDesktop?.classList.add('translate-x-6');
    toggleCircleMobile?.classList.add('translate-x-6');
}

function toggleTheme() {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        toggleCircleDesktop?.classList.add('translate-x-6');
        toggleCircleMobile?.classList.add('translate-x-6');
    } else {
        localStorage.setItem('theme', 'light');
        toggleCircleDesktop?.classList.remove('translate-x-6');
        toggleCircleMobile?.classList.remove('translate-x-6');
    }
}

themeToggleDesktop?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);


