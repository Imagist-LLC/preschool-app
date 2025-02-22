
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
