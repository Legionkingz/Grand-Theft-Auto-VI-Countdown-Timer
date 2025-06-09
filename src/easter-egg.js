document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('img[alt="Grand Theft Auto VI Logo"]');
    let clickCount = 0;

    if (logo) {
        logo.style.cursor = 'pointer'; // Hint that it's clickable
        logo.addEventListener('click', () => {
            clickCount++;
            
            // Visual feedback
            logo.classList.add('drop-shadow-red-glow-click');
            logo.classList.remove('drop-shadow-pink-glow');
            setTimeout(() => {
                logo.classList.add('drop-shadow-pink-glow');
                logo.classList.remove('drop-shadow-red-glow-click');
            }, 200);

            if (clickCount >= 6) {
                unlockLeaks();
                clickCount = 0; // reset
            }
        });
    }

    function unlockLeaks() {
        const leaksSection = document.getElementById('leaks');
        if (leaksSection) {
            if (leaksSection.style.display === 'none') {
                leaksSection.style.display = 'block';
                if (window.populateLeaksGrid) {
                    window.populateLeaksGrid();
                }
                leaksSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

window.populateLeaksGrid = function() {
    const leaksGrid = document.getElementById('leaksGrid');
    if (!leaksGrid) return;

    const leaks = [
        "GTA 6 LEAK/Americas 2022-09-13 17-16-42.mp4",
        "GTA 6 LEAK/Americas_1 2022-09-13 16-32-43.mp4",
        "GTA 6 LEAK/Americas_1 2022-09-12 14-42-12.mp4",
        "GTA 6 LEAK/Americas 2022-09-13 17-17-43.mp4",
        "GTA 6 LEAK/Americas_1 2022-09-13 16-24-02.mp4",
        "GTA 6 LEAK/Americas 2022-09-13 19-08-17.mp4",
        "GTA 6 LEAK/Americas 2022-08-11 10-01-02.mp4",
        "GTA 6 LEAK/Americas 2022-09-12 12-43-19.mp4",
        "GTA 6 LEAK/Americas 2022-05-13 08-48-26.mp4",
        "GTA 6 LEAK/Americas_1 2022-09-12 16-42-30.mp4",
        "GTA 6 LEAK/Americas 2021-07-12 12-19-51.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-29 12-44-36.mp4",
        "GTA 6 LEAK/Americas 2022-06-14 19-28-07.mp4",
        "GTA 6 LEAK/Americas 2022-04-11 11-58-10.mp4",
        "GTA 6 LEAK/Americas 2022-05-20 10-56-34.mp4",
        "GTA 6 LEAK/Americas 2022-09-12 14-51-59.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-24 07-48-28.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-19 14-40-45.mp4",
        "GTA 6 LEAK/Americas 2022-04-12 18-36-00.mp4",
        "GTA 6 LEAK/Americas 2021-07-09 15-18-02.mp4",
        "GTA 6 LEAK/Americas_1 2022-05-20 11-20-13.mp4",
        "GTA 6 LEAK/Americas 2022-04-21 16-26-26.mp4",
        "GTA 6 LEAK/Americas 2021-05-18 13-37-55.mp4",
        "GTA 6 LEAK/Americas 2022-08-05 17-01-51.mp4",
        "GTA 6 LEAK/Americas 2022-09-07 13-04-13.mp4",
        "GTA 6 LEAK/Americas_1 2022-09-01 14-37-21.mp4",
        "GTA 6 LEAK/Americas 2021-06-04 09-40-46.mp4",
        "GTA 6 LEAK/Americas_1 2021-05-17 16-38-34.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-16 16-03-45.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-23 15-56-16.mp4",
        "GTA 6 LEAK/Americas 2022-07-22 15-33-32.mp4",
        "GTA 6 LEAK/Americas 2021-05-19 14-04-19.mp4",
        "GTA 6 LEAK/Americas 2022-03-23 14-37-56.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-03 12-19-05.mp4",
        "GTA 6 LEAK/Americas 2022-09-06 17-13-34.mp4",
        "GTA 6 LEAK/Americas 2022-07-14 13-42-00.mp4",
        "GTA 6 LEAK/Americas 2022-07-20 08-34-27.mp4",
        "GTA 6 LEAK/Americas 2022-08-03 10-02-00.mp4",
        "GTA 6 LEAK/Americas 2022-08-03 10-05-49.mp4",
        "GTA 6 LEAK/Americas 2022-06-27 14-52-04.mp4",
        "GTA 6 LEAK/Americas_1 2021-12-14 19-52-44.mp4",
        "GTA 6 LEAK/Americas 2022-07-13 16-47-50.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-02 18-34-23.mp4",
        "GTA 6 LEAK/Americas 2022-06-17 17-14-50.mp4",
        "GTA 6 LEAK/Americas 2022-07-22 18-24-50.mp4",
        "GTA 6 LEAK/Americas 2022-06-01 17-16-15.mp4",
        "GTA 6 LEAK/Americas_1 2021-05-19 14-07-04.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-02 20-20-00.mp4",
        "GTA 6 LEAK/Americas_1 2022-04-12 10-28-55.mp4",
        "GTA 6 LEAK/Americas 2022-07-08 19-10-17.mp4",
        "GTA 6 LEAK/Americas_1 2022-03-03 10-43-31.mp4",
        "GTA 6 LEAK/Americas 2022-05-19 15-18-13.mp4",
        "GTA 6 LEAK/Americas 2022-08-08 14-56-53.mp4",
        "GTA 6 LEAK/Americas 2022-04-05 12-04-09.mp4",
        "GTA 6 LEAK/Americas 2022-05-03 11-20-11.mp4",
        "GTA 6 LEAK/Americas_1 2022-07-20 17-59-49.mp4",
        "GTA 6 LEAK/Americas 2022-03-21 14-58-10.mp4",
        "GTA 6 LEAK/Americas 2022-05-06 16-10-30.mp4",
        "GTA 6 LEAK/Americas 2022-04-27 14-24-08.mp4",
        "GTA 6 LEAK/Americas 2022-05-25 13-29-33.mp4",
        "GTA 6 LEAK/Americas 2022-01-20 11-18-26.mp4",
        "GTA 6 LEAK/Americas_1 2022-08-10 12-27-03.mp4",
        "GTA 6 LEAK/Americas 2021-10-29 20-21-10.mp4",
        "GTA 6 LEAK/Americas 2022-03-11 17-20-23.mp4",
        "GTA 6 LEAK/Americas 2022-04-28 13-08-47.mp4",
        "GTA 6 LEAK/Americas 2022-04-06 15-55-26.mp4",
        "GTA 6 LEAK/Americas_1 2022-05-24 17-19-42.mp4",
        "GTA 6 LEAK/Americas 2022-06-08 16-19-55.mp4",
        "GTA 6 LEAK/Americas 2022-02-10 20-25-15.mp4",
        "GTA 6 LEAK/Americas 2021-10-06 17-10-46.mp4",
        "GTA 6 LEAK/Americas 2022-01-11 10-57-01.mp4",
        "GTA 6 LEAK/Americas 2022-02-07 14-18-40.mp4",
        "GTA 6 LEAK/Americas 2022-04-06 15-42-03.mp4",
        "GTA 6 LEAK/Americas 2021-09-01 14-44-53.mp4",
        "GTA 6 LEAK/Americas 2021-06-22 20-24-48.mp4",
        "GTA 6 LEAK/Americas_1 2022-04-13 17-42-41.mp4",
        "GTA 6 LEAK/Americas 2022-07-13 19-08-11.mp4",
        "GTA 6 LEAK/Americas 2021-11-23 16-57-31.mp4",
        "GTA 6 LEAK/Americas 2021-12-02 10-38-02.mp4",
        "GTA 6 LEAK/Americas 2021-12-17 10-31-22.mp4",
        "GTA 6 LEAK/AIWE_ americas - AIWorldEditor 2021-04-15 18-59-33.mp4",
        "GTA 6 LEAK/Americas 2021-11-05 11-09-23.mp4",
        "GTA 6 LEAK/Americas_1 2022-04-13 09-08-46.mp4",
        "GTA 6 LEAK/Americas 2021-05-28 16-56-02.mp4",
        "GTA 6 LEAK/Americas_1 2021-09-10 16-37-50.mp4",
        "GTA 6 LEAK/Americas 2021-03-03 10-55-27.mp4",
        "GTA 6 LEAK/Americas 2021-03-23 09-58-52.mp4",
        "GTA 6 LEAK/Americas_1 2022-05-05 10-00-47.mp4",
        "GTA 6 LEAK/GAME_TEST_RAKESH_TEST_AMERICAS_02.mp4",
        "GTA 6 LEAK/Americas 2021-11-29 16-23-34.mp4"
    ];

    leaksGrid.innerHTML = ''; // Clear existing content

    leaks.forEach(leak => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'gallery-item';

        const video = document.createElement('video');
        video.src = leak;
        video.controls = true;
        video.style.width = '100%';
        video.preload = "metadata";

        const source = document.createElement('source');
        source.src = leak;
        source.type = 'video/mp4';

        video.appendChild(source);
        videoContainer.appendChild(video);
        leaksGrid.appendChild(videoContainer);
    });
} 