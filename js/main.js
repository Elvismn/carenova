// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const dropdowns = document.querySelectorAll('.dropdown');
const faqQuestions = document.querySelectorAll('.faq-question');
const currentYearSpan = document.getElementById('currentYear');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Close dropdowns when closing mobile menu
    if (!navMenu.classList.contains('active')) {
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Also close all dropdowns when clicking outside
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Dropdown functionality
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Desktop hover
    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        }
    });
    
    dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
        }
    });
    
    // Mobile click
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu.active').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            menu.classList.toggle('active');
        } else {
            // On desktop, if clicking Services link, prevent navigation to keep dropdown open
            if (toggle.getAttribute('href') === 'services.html') {
                e.preventDefault();
            }
        }
    });
    
    // Allow dropdown links to work normally on mobile
    const dropdownLinks = menu.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // On mobile, close dropdown and menu when clicking a dropdown item
            if (window.innerWidth <= 768) {
                // Close mobile menu after clicking a dropdown item
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    });
});

// Close mobile dropdowns when clicking elsewhere
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        // Check if click is outside any dropdown
        let clickedInsideDropdown = false;
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(e.target)) {
                clickedInsideDropdown = true;
            }
        });
        
        if (!clickedInsideDropdown) {
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-menu').classList.remove('active');
            });
        }
    } else {
        // On desktop, check if clicking outside dropdown
        let clickedInsideDropdown = false;
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(e.target)) {
                clickedInsideDropdown = true;
            }
        });
        
        if (!clickedInsideDropdown) {
            // Reset all dropdowns to hidden state
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
        }
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Toggle
if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
            
            // Close other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherAnswer.classList.remove('active');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
        });
    });
}

// Set current year in footer
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Check if this link matches the current page
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage === 'services.html' && 
             ['equipment.html', 'consumables.html', 'maintenance.html', 'consultancy.html'].includes(currentPage))) {
            
            // Add active class to current link
            link.classList.add('active');
            
            // If it's a service page, also activate the services dropdown parent
            if (['equipment.html', 'consumables.html', 'maintenance.html', 'consultancy.html'].includes(currentPage)) {
                const servicesLink = document.querySelector('.nav-link[href="services.html"]');
                if (servicesLink) {
                    servicesLink.classList.add('active');
                }
            }
        }
    });
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Initialize tooltips if using any
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltipText;
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.left = rect.left + (rect.width / 2) + 'px';
            tooltipEl.style.top = rect.top - tooltipEl.offsetHeight - 10 + 'px';
            
            this.tooltipElement = tooltipEl;
        });
        
        tooltip.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    
    // Add loading animation to buttons on click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only for submit buttons or buttons with href="#"
            if (this.type === 'submit' || this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Add loading animation
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                this.disabled = true;
                
                // Reset after 2 seconds (for demo)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // On resize, reset dropdown states
        if (window.innerWidth > 768) {
            // Reset mobile-specific states
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        } else {
            // On mobile, ensure CSS styles are reset
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                menu.style.opacity = '';
                menu.style.visibility = '';
                menu.style.transform = '';
            });
        }
    }, 250);
});

// Touch support for mobile dropdowns
document.addEventListener('touchstart', function(e) {
    if (window.innerWidth <= 768) {
        const dropdownToggle = e.target.closest('.dropdown-toggle');
        if (dropdownToggle) {
            const dropdown = dropdownToggle.closest('.dropdown');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // Toggle the dropdown
            menu.classList.toggle('active');
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu.active').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('active');
                }
            });
            
            e.preventDefault();
        }
    }
}, { passive: false });