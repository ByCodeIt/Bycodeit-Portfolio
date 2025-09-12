// const text = [
//     "Professional Front-End Services.",
//     "Modern Web Design Solutions.",
//     "Responsive & User-Focused Experiences."
//     ];

//     let i = 0;
//     let j = 0;
//     let currentText = "";
//     let isDeleting = false;
//     const speed = 100;
//     const target = document.getElementById("typewriter");

//     function type() {
//         currentText = text[i];
//     let display = isDeleting
//     ? currentText.substring(0, j--)
//     : currentText.substring(0, j++);

//     target.textContent = display;

//     if (!isDeleting && j === currentText.length + 1) {
//         isDeleting = true;
//     setTimeout(type, 1000);
//         } else if (isDeleting && j === 0) {
//         isDeleting = false;
//     i = (i + 1) % text.length;
//     setTimeout(type, 500);
//         } else {
//         setTimeout(type, speed);
//         }
//     }

// document.addEventListener("DOMContentLoaded", type);
    

//     function initOgunMap() {
//     // Abeokuta, Ogun State (adjust if you have a specific address)
//     const ogunCenter = {lat: 7.1600, lng: 3.3483 };

//     // Map style (subtle dark-green accents to match your brand)
//     const styledMap = [
//     {elementType: "geometry", stylers: [{color: "#f5f5f5" }] },
//     {elementType: "labels.icon", stylers: [{visibility: "off" }] },
//     {elementType: "labels.text.fill", stylers: [{color: "#616161" }] },
//     {elementType: "labels.text.stroke", stylers: [{color: "#f5f5f5" }] },
//     {featureType: "poi", elementType: "geometry", stylers: [{color: "#e7f1ed" }] },
//     {featureType: "poi.park", elementType: "geometry", stylers: [{color: "#d6efe6" }] },
//     {featureType: "road", elementType: "geometry", stylers: [{color: "#ffffff" }] },
//     {featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{color: "#757575" }] },
//     {featureType: "road.highway", elementType: "geometry", stylers: [{color: "#cfd8dc" }] },
//     {featureType: "transit.line", elementType: "geometry", stylers: [{color: "#e0e0e0" }] },
//     {featureType: "water", elementType: "geometry", stylers: [{color: "#c9e7df" }] },
//     {featureType: "administrative.land_parcel", stylers: [{visibility: "off" }] },
//     {featureType: "administrative", elementType: "geometry.stroke", stylers: [{color: "#a5d6c6" }] }
//     ];

//     const map = new google.maps.Map(document.getElementById("ogunMap"), {
//         center: ogunCenter,
//     zoom: 11,
//     disableDefaultUI: false,
//     styles: styledMap,
//     mapTypeControl: false,
//     streetViewControl: false,
//     fullscreenControl: true
//     });

//     // Custom pin (replace with your own SVG or PNG if you like)
//     const icon = {
//         url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
//     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
//         <path d="M24 2C14.1 2 6 10.1 6 20c0 10.3 13.1 24.9 17.2 28.9a1.2 1.2 0 0 0 1.6 0C28.9 44.9 42 30.3 42 20 42 10.1 33.9 2 24 2z" fill="%230b3d2e" />
//         <circle cx="24" cy="20" r="7" fill="%23ffffff" />
//     </svg>
//     `),
//     scaledSize: new google.maps.Size(40, 40),
//     anchor: new google.maps.Point(20, 40)
//     };

//     const marker = new google.maps.Marker({
//         position: ogunCenter,
//     map,
//     title: "ByCODEIT — Ogun State",
//     icon,
//     animation: google.maps.Animation.DROP
//     });

//     const info = new google.maps.InfoWindow({
//         content: '<strong>ByCODEIT — Ogun State</strong><br />Click for directions.'
//     });

//     marker.addListener("click", () => {
//         info.open(map, marker);
//     });
// }


//     const counters = document.querySelectorAll('.counter');

//     const animateCounters = () => {
//             counters.forEach(counter => {
//                 const update = () => {
//                     const target = +counter.getAttribute('data-target');
//                     const count = +counter.innerText;
//                     const increment = target / 100;

//                     if (count < target) {
//                         counter.innerText = Math.ceil(count + increment);
//                         setTimeout(update, 30);
//                     } else {
//                         counter.innerText = target;
//                     }
//                 };
//                 update();
//             });
//     };

//         // Trigger animation when section is in view
//         const statsSection = document.getElementById('stats');
//         let statsStarted = false;

//     window.addEventListener('scroll', () => {
//         const sectionTop = statsSection.getBoundingClientRect().top;
//         if (sectionTop < window.innerHeight && !statsStarted) {
//             statsStarted = true;
//         animateCounters();
//         }
// });
    

    // PRELOADER
    // window.addEventListener('load', () => {
    //     const preloader = document.getElementById('preloader');
    //     preloader.style.opacity = '0';
    //     setTimeout(() => {
    //         preloader.style.display = 'none';
    //     }, 500);
// });

// document.getElementById("darkToggle").addEventListener("click", () => {
//     document.body.classList.toggle("dark-mode");
// });
    

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
    

    // BACK TO TOP
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

