// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Add to Cart Function
function addToCart(productName, price) {
    showCartNotification(`${productName} added to cart! ₹${price}`);
    // You can expand this to include actual cart functionality
    console.log(`Added to cart: ${productName} - ₹${price}`);
}

// Show Cart Notification
function showCartNotification(message) {
    const notification = document.getElementById('cartNotification');
    const messageSpan = document.getElementById('cartMessage');
    
    messageSpan.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Send email via mailto (basic implementation)
        // In production, you'd want to use a backend service
        const subject = 'New Contact from Mukund Enterprises Website';
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        // Show success message
        showCartNotification('Message sent successfully!');
        
        // Reset form
        contactForm.reset();
        
        // Log for debugging
        console.log('Contact Form Submitted:', { name, email, message });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.style.display = 'none';
        }
    });
});

// Mobile Menu Close on Click Outside
document.addEventListener('click', (e) => {
    if (hamburger && navLinks && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.style.display = 'none';
        hamburger.classList.remove('active');
    }
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to cards
document.querySelectorAll('.product-card, .feature').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add CSS animation for fade-in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Active Navigation Link Highlight
function highlightActiveNav() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

highlightActiveNav();

// Add active class styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: bold;
    }
`;
document.head.appendChild(activeStyle);

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mukund Enterprises website loaded successfully!');
});

// Window Resize Handler for Responsive Hamburger
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.style.display = 'flex';
        }
    }, 250);
});
