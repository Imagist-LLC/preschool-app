
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        const lightPoster = video.querySelector('source[media="(prefers-color-scheme: light)"]').getAttribute('src');
        const darkPoster = video.querySelector('source:not([media])').getAttribute('src');
        const imgFallback = video.querySelector('img');

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            imgFallback.src = lightPoster.replace('.m4v', '.jpeg');
        } else {
            imgFallback.src = darkPoster.replace('.m4v', '.jpeg');
        }
    });
});


    let currentTheme = 'system';

    // Function to update video sources based on color scheme
    function updateVideoSources(isDark) {
        const videos = document.querySelectorAll('.inline-video');
        videos.forEach(video => {
            const currentTime = video.currentTime;
            const isPlaying = !video.paused;
            
            // Update source and poster
            const src = isDark ? video.dataset.darkSrc : video.dataset.lightSrc;
            const poster = isDark ? video.dataset.darkPoster : video.dataset.lightPoster;
            
            video.src = src;
            video.poster = poster;
            
            // Restore playback state
            video.currentTime = currentTime;
            if (isPlaying) {
                video.play();
            }
        });
    }

    // Function to check if should use dark mode
    function shouldUseDark() {
        if (currentTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return currentTheme === 'dark';
    }

    // Function to toggle theme
    function toggleTheme() {
        if (currentTheme === 'system') {
            currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
        } else {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        }
        
        // Update data-theme attribute
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Update videos
        updateVideoSources(shouldUseDark());
    }

    // Initial setup
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateVideoSources(darkModeMediaQuery.matches);

    // Listen for system color scheme changes
    darkModeMediaQuery.addListener((e) => {
        if (currentTheme === 'system') {
            updateVideoSources(e.matches);
        }
    });
