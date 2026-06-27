// Mobile Nav Logic
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobile-nav');
ham.addEventListener('click', () => { mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block'; });
function closeNav() { mobileNav.style.display = 'none'; }

// Navbar Active State Logic
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) {
            cur = s.id;
        }
    });

    if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        cur = 'contact';
    }

    navLinks.forEach(a => {
        if (a.getAttribute('href') === '#' + cur) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
}, { passive: true });

// Contact Form Logic
function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const message = document.getElementById('senderMessage').value;

    const targetEmail = "youssefammar1742007@gmail.com";
    const subject = encodeURIComponent("message from " + name);
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = '> Initializing Mail Client...';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('cf-ok').style.display = 'block';
        btn.textContent = 'Execute Send';
        btn.disabled = false;
        e.target.reset();
        setTimeout(() => document.getElementById('cf-ok').style.display = 'none', 4500);
    }, 1500);
}

// Lightbox Logic
function openLightbox(htmlContent) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightbox-content').innerHTML = htmlContent;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    void lb.offsetWidth; // Force reflow
    lb.classList.remove('opacity-0');
    lb.classList.add('opacity-100');
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('opacity-100');
    lb.classList.add('opacity-0');
    setTimeout(() => {
        lb.classList.add('hidden');
        lb.classList.remove('flex');
    }, 200);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Carousel Logic
document.addEventListener("DOMContentLoaded", function () {
    const cCards = document.querySelectorAll('.carousel-card');
    const totalCards = cCards.length;
    let currIndex = 0;

    function updateCarousel() {
        cCards.forEach((card, index) => {
            card.className = 'carousel-card absolute w-full max-w-[280px] sm:max-w-[320px] bg-[#020804] border border-[#163E4F] rounded-[4px] transition-all duration-300 ease-out cursor-pointer flex flex-col overflow-hidden';

            if (index === currIndex) {
                card.classList.add('left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-100', 'opacity-100', 'z-10');
                card.style.borderColor = '#389DC6';
            } else if (index === (currIndex - 1 + totalCards) % totalCards) {
                card.classList.add('left-[15%]', 'sm:left-[20%]', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-90', 'opacity-50', 'z-0');
            } else if (index === (currIndex + 1) % totalCards) {
                card.classList.add('left-[85%]', 'sm:left-[80%]', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-90', 'opacity-50', 'z-0');
            } else {
                card.classList.add('left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2', 'scale-50', 'opacity-0', 'z-[-1]', 'pointer-events-none');
            }
        });
    }

    if (totalCards > 0) {
        document.getElementById('carousel-next').addEventListener('click', () => {
            currIndex = (currIndex + 1) % totalCards;
            updateCarousel();
        });

        document.getElementById('carousel-prev').addEventListener('click', () => {
            currIndex = (currIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });

        cCards.forEach((card, index) => {
            const imgTrigger = card.querySelector('.lightbox-trigger');
            if (imgTrigger) {
                imgTrigger.addEventListener('click', (e) => {
                    if (currIndex === index) {
                        e.stopPropagation();
                        const innerImgHtml = imgTrigger.querySelector('.inner-img').outerHTML;
                        openLightbox(innerImgHtml);
                    }
                });
            }

            card.addEventListener('click', () => {
                if (currIndex !== index) {
                    currIndex = index;
                    updateCarousel();
                }
            });
        });

        updateCarousel();
    }
});
