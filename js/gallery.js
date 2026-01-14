// Gallery Filtering and Lightbox Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    // Add animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Scroll to gallery section after filtering
            document.querySelector('.gallery-grid-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Lightbox Functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    
    let currentImageIndex = 0;
    let galleryImages = [];
    
    // Collect all gallery images
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach((button, index) => {
        const imageSrc = button.getAttribute('data-image');
        const imageTitle = button.getAttribute('data-title');
        const galleryCard = button.closest('.gallery-card');
        const description = galleryCard.querySelector('.gallery-info p').textContent;
        
        galleryImages.push({
            src: imageSrc,
            title: imageTitle,
            description: description,
            index: index
        });
        
        button.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(imageSrc, imageTitle, description);
        });
    });
    
    function openLightbox(src, title, description) {
        lightboxImage.src = src;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    function closeLightboxModal() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset image for smooth transition
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        const image = galleryImages[currentImageIndex];
        openLightbox(image.src, image.title, image.description);
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        const image = galleryImages[currentImageIndex];
        openLightbox(image.src, image.title, image.description);
    }
    
    function updateNavButtons() {
        // Show/hide navigation buttons based on current index
        prevButton.style.display = galleryImages.length > 1 ? 'flex' : 'none';
        nextButton.style.display = galleryImages.length > 1 ? 'flex' : 'none';
    }
    
    // Event listeners
    closeLightbox.addEventListener('click', closeLightboxModal);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightboxModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightboxModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Image loading optimization
    const galleryImgs = document.querySelectorAll('.gallery-img');
    
    // Lazy loading for gallery images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load if not already loaded
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        galleryImgs.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Smooth scrolling for filter buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize
    updateNavButtons();
    
    // Add loading animation to gallery cards
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});