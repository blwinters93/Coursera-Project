/**
 * Portfolio Website JavaScript
 * Adds interactivity, form validation, and smooth scrolling
 * Created: February 25, 2025
 */

// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // ---------- NAVIGATION & SMOOTH SCROLLING ----------
    
    // Mobile navigation toggle
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '☰';
    document.querySelector('header nav').before(hamburgerMenu);
    
    const navMenu = document.querySelector('nav ul');
    
    // Toggle mobile menu function
    function toggleMenu() {
        navMenu.classList.toggle('active');
        hamburgerMenu.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    }
    
    // Event listener for hamburger menu click
    hamburgerMenu.addEventListener('click', toggleMenu);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, footer nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        toggleMenu();
                    }
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ---------- PROJECT FILTERING ----------
    
    // Project data (can be expanded with more projects and categories)
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'web',
            description: 'A fully responsive e-commerce solution with shopping cart functionality, user authentication, and payment processing integration.',
            image: 'project1.jpg',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 2,
            title: 'Data Dashboard',
            category: 'data',
            description: 'An interactive dashboard that visualizes complex data sets with filtering capabilities and real-time updates.',
            image: 'project2.jpg',
            technologies: ['Vue.js', 'D3.js', 'Firebase', 'REST API'],
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 3,
            title: 'Fitness Tracker App',
            category: 'mobile',
            description: 'A progressive web app that helps users track their workouts, set fitness goals, and monitor their progress over time.',
            image: 'project3.jpg',
            technologies: ['React Native', 'GraphQL', 'AWS Amplify', 'TypeScript'],
            demoLink: '#',
            githubLink: '#'
        }
    ];
    
    // Create project filter buttons
    const projectsSection = document.querySelector('#projects .container');
    const projectsHeading = projectsSection.querySelector('h2');
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        <button class="filter-btn" data-filter="web">Web</button>
        <button class="filter-btn" data-filter="mobile">Mobile</button>
        <button class="filter-btn" data-filter="data">Data</button>
    `;
    
    // Insert filter buttons after the heading
    projectsHeading.after(filterContainer);
    
    // Add filter button styles to CSS
    const style = document.createElement('style');
    style.textContent = `
        .project-filters {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            padding: 0.5rem 1.5rem;
            border: 2px solid var(--primary-color);
            background-color: transparent;
            color: var(--primary-color);
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .filter-btn:hover, .filter-btn.active {
            background-color: var(--primary-color);
            color: white;
        }
        
        /* Lightbox styles */
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
            pointer-events: auto;
        }
        
        .lightbox-content {
            max-width: 80%;
            max-height: 80%;
            position: relative;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            border: 4px solid white;
            border-radius: 4px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            padding: 1rem 0;
            font-weight: 600;
        }
        
        /* Form validation styles */
        .form-group.error input, .form-group.error textarea {
            border-color: var(--error-color);
        }
        
        .error-message {
            color: var(--error-color);
            font-size: 0.85rem;
            margin-top: 0.3rem;
            display: none;
        }
        
        .form-group.error .error-message {
            display: block;
        }
        
        .form-success {
            background-color: rgba(56, 176, 0, 0.1);
            border: 1px solid var(--success-color);
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 4px;
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // Filter projects function
    function filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                const projectId = parseInt(card.dataset.id);
                const project = projects.find(p => p.id === projectId);
                
                if (project && project.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
    
    // Add filter button event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            const category = this.dataset.filter;
            filterProjects(category);
        });
    });
    
    // Set data-id attribute for existing project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.setAttribute('data-id', projects[index].id);
    });
    
    // ---------- PROJECT LIGHTBOX ----------
    
    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="Project image">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Lightbox functions
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    function openLightbox(imageSrc, caption) {
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add click event listeners to project images
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const project = projects[index];
            openLightbox(this.src, project.title);
        });
    });
    
    // Close lightbox when clicking close button or outside the image
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // ---------- FORM VALIDATION ----------
    
    const contactForm = document.querySelector('.contact-form');
    
    // Add error message elements to form fields
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        
        const input = group.querySelector('input, textarea');
        if (input) {
            const inputName = input.name;
            let errorText = '';
            
            switch (inputName) {
                case 'name':
                    errorText = 'Please enter your name';
                    break;
                case 'email':
                    errorText = 'Please enter a valid email address';
                    break;
                case 'subject':
                    errorText = 'Please enter a subject';
                    break;
                case 'message':
                    errorText = 'Please enter your message';
                    break;
                default:
                    errorText = 'This field is required';
            }
            
            errorMessage.textContent = errorText;
            group.appendChild(errorMessage);
        }
    });
    
    // Add success message container
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.textContent = 'Your message has been sent successfully! I will get back to you soon.';
    contactForm.prepend(successMessage);
    
    // Validate single form field
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        let isValid = true;
        
        // Check if field is empty
        if (field.value.trim() === '') {
            formGroup.classList.add('error');
            isValid = false;
        } else if (field.name === 'email') {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                formGroup.classList.add('error');
                isValid = false;
            } else {
                formGroup.classList.remove('error');
            }
        } else {
            formGroup.classList.remove('error');
        }
        
        return isValid;
    }
    
    // Real-time validation for form fields
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Validate on blur (when user leaves the field)
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear error when user starts typing
        input.addEventListener('input', function() {
            this.closest('.form-group').classList.remove('error');
        });
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Simulate form submission (replace with actual form submission in production)
            successMessage.style.display = 'block';
            
            // Reset form after successful submission
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    // ---------- SCROLL ANIMATIONS ----------
    
    // Add simple reveal animation for sections
    const sections = document.querySelectorAll('section');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animate')) {
                section.classList.add('animate');
            }
        });
    }
    
    // Add some basic animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
});
