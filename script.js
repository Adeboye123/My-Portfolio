// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.classList.toggle('dark');
    
    // Save theme preference
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    hamburger.innerHTML = navList.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Back to top functionality
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
// Initial check on page load
animateSkillBars();

// Animate tech stack items on scroll
const techItems = document.querySelectorAll('.tech-item');

function animateTechItems() {
    techItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', animateTechItems);
// Initial check on page load
animateTechItems();

// Animate project cards on scroll
const projectCardsToAnimate = document.querySelectorAll('.project-card');

function animateProjectCards() {
    projectCardsToAnimate.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', animateProjectCards);
// Initial check on page load
animateProjectCards();

// Testimonial Slider
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;

function goToSlide(slideIndex) {
    testimonialTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Update dots
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    testimonialDots[slideIndex].classList.add('active');
    
    currentSlide = slideIndex;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Auto slide testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialDots.length;
    goToSlide(currentSlide);
}, 5000);

// Form Validation
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        clearError(input);
    });
});

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    
    if (field.value.trim() === '') {
        showError(field, errorElement, 'This field is required');
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            showError(field, errorElement, 'Please enter a valid email address');
            return false;
        }
    }
    
    clearError(field);
    return true;
}

function showError(field, errorElement, message) {
    field.style.borderColor = '#ff4d4d';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(field) {
    field.style.borderColor = 'rgba(110, 69, 226, 0.1)';
    const errorElement = document.getElementById(`${field.id}-error`);
    errorElement.style.display = 'none';
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
});

// Particle Canvas Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(110, 69, 226, ${Math.random() * 0.5})`;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Connect particles with lines
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(110, 69, 226, ${0.1 * (1 - distance/100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Typewriter effect
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    // Reset animation for potential re-triggering
    setTimeout(() => {
        typewriterElement.style.animation = 'none';
        setTimeout(() => {
            typewriterElement.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
        }, 10);
    }, 4000); // Reset after animation completes
}

// NEW: Magnetic button effect
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX * 10;
        const deltaY = (y - centerY) / centerY * 10;
        
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// NEW: Stagger animation for section elements
const staggerItems = document.querySelectorAll('.stagger-item');

function animateStaggerItems() {
    staggerItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', animateStaggerItems);
animateStaggerItems();

// NEW: Scroll-triggered animations for section titles
const sectionTitles = document.querySelectorAll('.section-title');

function animateSectionTitles() {
    sectionTitles.forEach(title => {
        const titlePosition = title.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;
        
        if (titlePosition < screenPosition) {
            title.classList.add('flip-in');
        }
    });
}

window.addEventListener('scroll', animateSectionTitles);
animateSectionTitles();

// NEW: Parallax effect for floating elements
const floatingElements = document.querySelectorAll('.floating-element');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingElements.forEach((element, index) => {
        element.style.transform = `translateY(${rate * (index + 1) * 0.1}px)`;
    });
});

// NEW: Text highlight effect on scroll
const highlightTexts = document.querySelectorAll('.highlight-text');

function animateHighlightTexts() {
    highlightTexts.forEach(text => {
        const textPosition = text.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (textPosition < screenPosition) {
            text.classList.add('highlighted');
        }
    });
}

window.addEventListener('scroll', animateHighlightTexts);
animateHighlightTexts();