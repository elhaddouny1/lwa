// Update Date and Time
function updateDateTime() {
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

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('ar-MA', options);
    document.getElementById('dateTime').textContent = formatter.format(now);

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
        publishDate.textContent = 'نُشر في: ' + dateFormatter.format(now);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Share button functionality
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i').className;
            
            if (icon.includes('facebook')) {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank');
            } else if (icon.includes('twitter')) {
                window.open('https://twitter.com/intent/tweet?url=' + window.location.href + '&text=محمد الهدوني يلج سلك القضاء', '_blank');
            } else if (icon.includes('whatsapp')) {
                window.open('https://wa.me/?text=' + window.location.href, '_blank');
            } else if (icon.includes('link')) {
                navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ الرابط بنجاح!');
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-in-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.article-section, .inspiration-section, .dua-section').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS animation
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
