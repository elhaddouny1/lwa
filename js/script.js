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

    // Update publish date to "Today"
    const publishDate = document.getElementById('publishDate');
    if (publishDate) {
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Africa/Casablanca'
        };
        const dateFormatter = new Intl.DateTimeFormat('ar-MA', dateOptions);
        publishDate.textContent = 'تاريخ النشر: ' + dateFormatter.format(now) + ' | تحديث الساعة: ' + now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);

    // Add subtle scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.article-container, .sidebar-section, .dua-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
