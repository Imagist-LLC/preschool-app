document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".inline-video");

    function updateVideoSources() {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        videos.forEach((video) => {
            const source = prefersDarkMode ? video.dataset.dark : video.dataset.light;
            const poster = prefersDarkMode ? video.dataset.darkPoster : video.dataset.lightPoster;

            if (source) video.src = source;
            if (poster) video.poster = poster;
        });
    }

    // Initial update
    updateVideoSources();

    // Listen for theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateVideoSources);
});
