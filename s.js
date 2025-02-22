document.addEventListener('DOMContentLoaded', function () {
    // Update fallback images for videos with source elements
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        const lightSource = video.querySelector('source[media="(prefers-color-scheme: light)"]');
        const darkSource = video.querySelector('source:not([media])');
        const imgFallback = video.querySelector('img');
        if (lightSource && darkSource && imgFallback) {
            const lightPoster = lightSource.getAttribute('src');
            const darkPoster = darkSource.getAttribute('src');
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                imgFallback.src = lightPoster.replace('.m4v', '.jpeg');
            } else {
                imgFallback.src = darkPoster.replace('.m4v', '.jpeg');
            }
        }
    });

    // Consolidated dark/light mode and inline video source update logic
    let currentTheme = 'system'; // 'system', 'dark', or 'light'

    function updateVideoSources(isDark) {
        const videos = document.querySelectorAll('.inline-video');
        videos.forEach(video => {
            const currentTime = video.currentTime;
            const isPlaying = !video.paused;
            const src = isDark ? video.dataset.darkSrc : video.dataset.lightSrc;
            const poster = isDark ? video.dataset.darkPoster : video.dataset.lightPoster;
            if (src) video.src = src;
            if (poster) video.poster = poster;
            video.currentTime = currentTime;
            if (isPlaying) {
                video.play();
            }
        });
    }

    function shouldUseDark() {
        return currentTheme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : currentTheme === 'dark';
    }

    // Toggle theme manually
    function toggleTheme() {
        if (currentTheme === 'system') {
            // If system mode, choose the opposite of the system's current mode
            currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
        } else {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        }
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateVideoSources(shouldUseDark());
    }

    // Expose toggleTheme globally for HTML onclick usage
    window.toggleTheme = toggleTheme;

    // Initial update based on current theme preference
    updateVideoSources(shouldUseDark());

    // Listen for system color scheme changes if in 'system' mode
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
        if (currentTheme === 'system') {
            updateVideoSources(e.matches);
        }
    });
});
