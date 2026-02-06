// Live Time Update
function updateLiveTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Africa/Casablanca'
    };
    const formatter = new Intl.DateTimeFormat('ar-MA', options);
    const timeElement = document.getElementById('liveTime');
    if (timeElement) {
        timeElement.textContent = formatter.format(now);
    }

    // Update publish date
    const publishDate = document.getElementById('publishDate');
    if (publishDate) {
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Africa/Casablanca'
        };
        const dateFormatter = new Intl.DateTimeFormat('ar-MA', dateOptions);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        publishDate.textContent = 'تاريخ النشر: ' + dateFormatter.format(now) + ' | ' + hours + ':' + minutes;
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuToggle.classList.add('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('header')) {
                mobileMenu.classList.remove('open');
                menuToggle.classList.add('active');
            }
        });
    }
}

// Smooth scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.article-container, .sidebar-section, .dua-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Share buttons functionality
function setupShareButtons() {
    document.querySelectorAll('.share-section a').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i').className;
            const url = window.location.href;
            const title = 'محمد الهدوني يلج سلك القضاء';

            if (icon.includes('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            } else if (icon.includes('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
            } else if (icon.includes('whatsapp')) {
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
    setupMobileMenu();
    setupScrollAnimations();
    setupShareButtons();

    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// Add CSS animations
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

    @supports (padding: max(0px)) {
        body {
            padding-left: max(0px, env(safe-area-inset-left));
            padding-right: max(0px, env(safe-area-inset-right));
        }
    }
`;
document.head.appendChild(style);
