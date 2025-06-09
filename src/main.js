// --- Radio Player Logic ---
const radioStations = [
    { name: "RADIO OFF", url: null },
    { name: "Fever 105", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/FEVER.mp3" },
    { name: "V-Rock", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/VROCK.mp3" },
    { name: "Flash FM", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/FLASH.mp3" },
    { name: "Wildstyle", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/WILDSTYLE.mp3" },
    { name: "Emotion 98.3", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/EMOTION.mp3" },
    { name: "Radio Espantoso", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/ESPANT.mp3" },
    { name: "Wave 103", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/WAVE.mp3" },
    { name: "K-Chat", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/KCHAT.mp3" },
    { name: "VCPR", url: "https://two66.com/mirrors/GTA-Radio-Stations/GTA-Vice-City/VCPR.mp3" }
];

let stationPlayers = [];
let isPlaying = false;
let currentStationIndex = 0;
let radioInteracted = false;

function initRadio() {
    const stationNameEl = document.getElementById('station-name');
    const songInfoEl = document.getElementById('song-info');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevStationBtn = document.getElementById('prev-station-btn');
    const nextStationBtn = document.getElementById('next-station-btn');
    const volumeSlider = document.getElementById('volume-slider');

    radioStations.forEach((station, index) => {
        if (station.url) {
            const audio = new Audio(station.url);
            audio.loop = true;
            audio.volume = 0;
            stationPlayers[index] = audio;

            audio.addEventListener('play', () => {
                if (index === currentStationIndex) {
                    isPlaying = true;
                    playPauseBtn.innerHTML = '❚❚';
                    songInfoEl.textContent = 'Now Playing';
                }
            });
            audio.addEventListener('pause', () => {
                 if (index === currentStationIndex) {
                    isPlaying = false;
                    playPauseBtn.innerHTML = '▶';
                    songInfoEl.textContent = 'Paused';
                }
            });
        } else {
            stationPlayers[index] = null;
        }
    });

    setupRadioControls();
    updateDisplay();
}

function handleFirstInteraction() {
    if (!radioInteracted) {
        stationPlayers.forEach(p => {
            if (p) {
                p.play().catch(e => console.error("Autoplay failed:", e));
                p.pause(); // Start paused but loaded
            }
        });
        radioInteracted = true;
    }
}

function setupRadioControls() {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevStationBtn = document.getElementById('prev-station-btn');
    const nextStationBtn = document.getElementById('next-station-btn');
    const volumeSlider = document.getElementById('volume-slider');

    playPauseBtn.addEventListener('click', () => {
        handleFirstInteraction();
        togglePlayPause();
    });
    prevStationBtn.addEventListener('click', () => {
        handleFirstInteraction();
        prevStation();
    });
    nextStationBtn.addEventListener('click', () => {
        handleFirstInteraction();
        nextStation();
    });
    volumeSlider.addEventListener('input', (e) => {
        const currentPlayer = stationPlayers[currentStationIndex];
        if (currentPlayer) {
            currentPlayer.volume = e.target.value / 100;
        }
    });
}

function togglePlayPause() {
    if (currentStationIndex === 0) { // If "RADIO OFF"
        nextStation(); // Start with the first station
        return;
    }
    const player = stationPlayers[currentStationIndex];
    if (player) {
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    }
}

function loadCurrentStation() {
    const volumeSlider = document.getElementById('volume-slider');
    updateDisplay();
    
    stationPlayers.forEach((player, index) => {
        if (player) {
            if (index === currentStationIndex) {
                player.volume = volumeSlider.value / 100;
                if (isPlaying) player.play();
            } else {
                player.pause();
            }
        }
    });

    if (currentStationIndex === 0) { // RADIO OFF
         isPlaying = false;
    }
}

function prevStation() {
    currentStationIndex--;
    if (currentStationIndex < 0) {
        currentStationIndex = radioStations.length - 1;
    }
    loadCurrentStation();
}

function nextStation() {
    currentStationIndex++;
    if (currentStationIndex >= radioStations.length) {
        currentStationIndex = 0; // Wrap around to RADIO OFF
    }
    loadCurrentStation();
}

function updateDisplay() {
    const stationNameEl = document.getElementById('station-name');
    const songInfoEl = document.getElementById('song-info');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const station = radioStations[currentStationIndex];
    stationNameEl.textContent = station.name;

    if (currentStationIndex === 0) {
        songInfoEl.textContent = ' ';
        playPauseBtn.innerHTML = '▶';
    } else {
        const player = stationPlayers[currentStationIndex];
        if (player && !player.paused) {
            songInfoEl.textContent = 'Now Playing';
            playPauseBtn.innerHTML = '❚❚';
        } else {
            songInfoEl.textContent = 'Paused';
            playPauseBtn.innerHTML = '▶';
        }
    }
}

let currentGalleryFiles = [];
let currentImageIndex = 0;

// Background slideshow images
const backgroundImages = [
    'GTAVI_Screenshots/Places/Vice City/Vice_City_01.jpg',
    'GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_01.jpg',
    'GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_01.jpg',
    'GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_01.jpg',
    'GTAVI_Screenshots/Places/Grassrivers/Grassrivers_01.jpg',
    'GTAVI_Screenshots/Places/Ambrosia/Ambrosia_01.jpg'
];

// Initialize Gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    // Add Places section
    const placesTitle = document.createElement('h3');
    placesTitle.className = 'col-span-full text-2xl font-bold text-center mb-4 mt-8';
    placesTitle.textContent = 'Places';
    galleryGrid.appendChild(placesTitle);

    // Add Places items
    const places = [
        { name: 'Vice City', path: 'GTAVI_Screenshots/Places/Vice City/' },
        { name: 'Port Gellhorn', path: 'GTAVI_Screenshots/Places/Port Gellhorn/' },
        { name: 'Mount Kalaga National Park', path: 'GTAVI_Screenshots/Places/Mount Kalaga National Park/' },
        { name: 'Leonida Keys', path: 'GTAVI_Screenshots/Places/Leonida Keys/' },
        { name: 'Grassrivers', path: 'GTAVI_Screenshots/Places/Grassrivers/' },
        { name: 'Ambrosia', path: 'GTAVI_Screenshots/Places/Ambrosia/' }
    ];

    places.forEach(place => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item places';
        const imageName = place.name.replace(/ /g, '_') + '_01.jpg';
        const imagePath = `${place.path}${imageName}`;
        galleryItem.innerHTML = `
            <img src="${imagePath}" alt="${place.name}" class="w-full h-full object-cover">
            <div class="gallery-overlay">
                <h3 class="text-lg font-bold text-white">${place.name}</h3>
            </div>
        `;
        galleryItem.addEventListener('click', () => {
            loadDirectoryContents(place.path, place.name);
        });
        galleryGrid.appendChild(galleryItem);
    });

    // Add People section
    const peopleTitle = document.createElement('h3');
    peopleTitle.className = 'col-span-full text-2xl font-bold text-center mb-4 mt-8';
    peopleTitle.textContent = 'People';
    galleryGrid.appendChild(peopleTitle);

    // Add People items
    const people = [
        { name: 'Real Dimez', path: 'GTAVI_Screenshots/People/Real Dimez/' },
        { name: 'Raul Bautista', path: 'GTAVI_Screenshots/People/Raul Bautista/' },
        { name: 'Lucia Caminos', path: 'GTAVI_Screenshots/People/Lucia Caminos/' },
        { name: 'Jason Duval', path: 'GTAVI_Screenshots/People/Jason Duval/' },
        { name: 'DreQuan Priest', path: 'GTAVI_Screenshots/People/DreQuan Priest/' },
        { name: 'Cal Hampton', path: 'GTAVI_Screenshots/People/Cal Hampton/' },
        { name: 'Brian Heder', path: 'GTAVI_Screenshots/People/Brian Heder/' },
        { name: 'Boobie Ike', path: 'GTAVI_Screenshots/People/Boobie Ike/' }
    ];

    people.forEach(person => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item people';
        const imageName = person.name.replace(/ /g, '_') + '_01.jpg';
        const imagePath = `${person.path}${imageName}`;
        galleryItem.innerHTML = `
            <img src="${imagePath}" alt="${person.name}" class="w-full h-full object-cover">
            <div class="gallery-overlay">
                <h3 class="text-lg font-bold text-white">${person.name}</h3>
            </div>
        `;
        galleryItem.addEventListener('click', () => {
            loadDirectoryContents(person.path, person.name);
        });
        galleryGrid.appendChild(galleryItem);
    });

    // Add Videos section
    const videosTitle = document.createElement('h3');
    videosTitle.className = 'col-span-full text-2xl font-bold text-center mb-4 mt-8';
    videosTitle.textContent = 'Videos';
    galleryGrid.appendChild(videosTitle);

    // Add video items
    const videos = [
        { title: 'Trailer 1', path: 'GTAVI_Videos/Trailer_1/' },
        { title: 'Trailer 2', path: 'GTAVI_Videos/Trailer_2/' },
        { title: 'Real Dimez Video', path: 'GTAVI_Videos/Real_Dimez_Video_Clip.mp4' },
        { title: 'Raul Bautista Video', path: 'GTAVI_Videos/Raul_Bautista_Video_Clip.mp4' },
        { title: 'Lucia Caminos Video', path: 'GTAVI_Videos/Lucia_Caminos_Video_Clip.mp4' },
        { title: 'Jason Duval Video', path: 'GTAVI_Videos/Jason_Duval_Video_Clip.mp4' },
        { title: 'DreQuan Priest Video', path: 'GTAVI_Videos/DreQuan_Priest_Video_Clip.mp4' },
        { title: 'Cal Hampton Video', path: 'GTAVI_Videos/Cal_Hampton_Video_Clip.mp4' },
        { title: 'Brian Heder Video', path: 'GTAVI_Videos/Brian_Heder_Video_Clip.mp4' },
        { title: 'Boobie Ike Video', path: 'GTAVI_Videos/Boobie_Ike_Video_Clip.mp4' }
    ];

    videos.forEach(video => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item videos';
        
        if (video.path.endsWith('.mp4')) {
            galleryItem.innerHTML = `
                <div class="relative w-full h-full">
                    <video src="${video.path}" class="w-full h-full object-cover">
                        Your browser does not support the video tag.
                    </video>
                    <div class="loading">Loading video...</div>
                    <div class="error-message" style="display: none;">Failed to load video</div>
                </div>
                <div class="gallery-overlay">
                    <h3 class="text-lg font-bold text-white">${video.title}</h3>
                    <p class="text-sm text-gray-300">Video</p>
                </div>
            `;
            const videoElement = galleryItem.querySelector('video');
            const loadingElement = galleryItem.querySelector('.loading');
            const errorElement = galleryItem.querySelector('.error-message');

            videoElement.addEventListener('loadeddata', () => {
                loadingElement.style.display = 'none';
            });

            videoElement.addEventListener('error', () => {
                loadingElement.style.display = 'none';
                errorElement.style.display = 'block';
            });

            galleryItem.addEventListener('click', () => {
                showVideoModal(video.path, video.title);
            });
        } else {
            galleryItem.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-800">
                    <div class="text-center">
                        <h3 class="text-lg font-bold text-white mb-2">${video.title}</h3>
                        <p class="text-sm text-gray-300">Click to view gallery</p>
                    </div>
                </div>
            `;
            galleryItem.addEventListener('click', () => {
                loadDirectoryContents(video.path, video.title);
            });
        }
        
        galleryGrid.appendChild(galleryItem);
    });

    // Add Artwork section
    const artworkTitle = document.createElement('h3');
    artworkTitle.className = 'col-span-full text-2xl font-bold text-center mb-4 mt-8';
    artworkTitle.textContent = 'Artwork & Wallpapers';
    galleryGrid.appendChild(artworkTitle);
    
    const artworks = [
        { name: 'Boobie Ike', path: 'GTAVI_Artwork_Wallpapers/Boobie_Ike/' },
        { name: 'Brian Heder', path: 'GTAVI_Artwork_Wallpapers/Brian_Heder/' },
        { name: 'Cal Hampton', path: 'GTAVI_Artwork_Wallpapers/Cal_Hampton/' },
        { name: 'DreQuan Priest', path: 'GTAVI_Artwork_Wallpapers/DreQuan_Priest/' },
        { name: 'Jason and Lucia 01', path: 'GTAVI_Artwork_Wallpapers/Jason_and_Lucia_01/' },
        { name: 'Jason and Lucia 01 With Logos', path: 'GTAVI_Artwork_Wallpapers/Jason_and_Lucia_01_With_Logos/' },
        { name: 'Jason and Lucia 02', path: 'GTAVI_Artwork_Wallpapers/Jason_and_Lucia_02/' },
        { name: 'Jason and Lucia 02 With Logos', path: 'GTAVI_Artwork_Wallpapers/Jason_and_Lucia_02_With_Logos/' },
        { name: 'Jason Lucia Motel', path: 'GTAVI_Artwork_Wallpapers/Jason_Lucia_Motel/' },
        { name: 'Postcards', path: 'GTAVI_Artwork_Wallpapers/Postcards/' },
        { name: 'Raul Bautista', path: 'GTAVI_Artwork_Wallpapers/Raul_Bautista/' },
        { name: 'Real Dimez', path: 'GTAVI_Artwork_Wallpapers/Real_Dimez/' }
    ];

    artworks.forEach(artwork => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item artwork';
        let imageName;
        if (artwork.name === 'Postcards') {
            imageName = 'Vice_City/Vice_City_Postcard_landscape.jpg';
        } else if (artwork.name === 'Jason Lucia Motel') {
            imageName = 'Jason_and_Lucia_Motel_landscape.jpg';
        } else {
            imageName = artwork.name.replace(/ /g, '_') + '_landscape.jpg';
        }
        const imagePath = `${artwork.path}${imageName}`;
        galleryItem.innerHTML = `
            <img src="${imagePath}" alt="${artwork.name}" class="w-full h-full object-cover">
            <div class="gallery-overlay">
                <h3 class="text-lg font-bold text-white">${artwork.name}</h3>
            </div>
        `;
        galleryItem.addEventListener('click', () => {
            loadDirectoryContents(artwork.path, artwork.name);
        });
        galleryGrid.appendChild(galleryItem);
    });
}

// Gallery Filtering
function setupFilters() {
    const filterAll = document.getElementById('filterAll');
    const filterPlaces = document.getElementById('filterPlaces');
    const filterPeople = document.getElementById('filterPeople');
    const filterVideos = document.getElementById('filterVideos');
    const filterArtwork = document.getElementById('filterArtwork');
    const filters = [filterAll, filterPlaces, filterPeople, filterVideos, filterArtwork];

    function setActiveFilter(activeBtn) {
        filters.forEach(btn => {
            if(btn) {
                btn.classList.remove('bg-pink-600');
                btn.classList.add('bg-gray-700');
            }
        });
        if(activeBtn) {
            activeBtn.classList.remove('bg-gray-700');
            activeBtn.classList.add('bg-pink-600');
        }
    }

    function filterGallery(type) {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (type === 'all' || item.classList.contains(type)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if(filterAll) filterAll.addEventListener('click', () => {
        setActiveFilter(filterAll);
        filterGallery('all');
    });

    if(filterPlaces) filterPlaces.addEventListener('click', () => {
        setActiveFilter(filterPlaces);
        filterGallery('places');
    });

    if(filterPeople) filterPeople.addEventListener('click', () => {
        setActiveFilter(filterPeople);
        filterGallery('people');
    });

    if(filterVideos) filterVideos.addEventListener('click', () => {
        setActiveFilter(filterVideos);
        filterGallery('videos');
    });

    if(filterArtwork) filterArtwork.addEventListener('click', () => {
        setActiveFilter(filterArtwork);
        filterGallery('artwork');
    });
}

// Video Modal
function showTrailer(trailerUrl) {
    const modal = document.getElementById('trailerModal');
    if(!modal) return;
    const videoContainer = modal.querySelector('.video-container');
    if(videoContainer) {
        videoContainer.innerHTML = `<iframe width="560" height="315" src="${trailerUrl}?autoplay=1&color=white&theme=dark" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="color-scheme: dark; width: 100%; height: 100%; aspect-ratio: 16/9;"></iframe>`;
        modal.style.display = "block";
    }
}

function showVideoModal(src, title) {
    const modal = document.getElementById('trailerModal');
    if(!modal) return;
    const videoContainer = modal.querySelector('.video-container');
    if(videoContainer) {
        videoContainer.innerHTML = `
            <video controls autoplay class="w-full h-full">
                <source src="${src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        modal.style.display = "block";
    }
}

// Load Directory Contents
async function loadDirectoryContents(directory, title) {
    const galleryGrid = document.getElementById('galleryGrid');
    if(!galleryGrid) return;

    galleryGrid.innerHTML = '';
    
    const backButton = document.createElement('div');
    backButton.className = 'col-span-full mb-4';
    backButton.innerHTML = `
        <button class="w-full p-4 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition">
            ← Back to Gallery
        </button>
    `;
    backButton.addEventListener('click', () => {
        initGallery();
    });
    galleryGrid.appendChild(backButton);
    
    const titleElement = document.createElement('h3');
    titleElement.className = 'col-span-full text-2xl font-bold text-center mb-4';
    titleElement.textContent = title;
    galleryGrid.appendChild(titleElement);

    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'col-span-full text-center p-8';
    loadingIndicator.innerHTML = `
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
        <p class="mt-4 text-gray-300">Loading images...</p>
    `;
    galleryGrid.appendChild(loadingIndicator);

    try {
        const response = await fetch('gallery-data.json');
        if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        loadingIndicator.remove();

        let files = [];
        if (directory.includes('Places')) files = data.places[title] || [];
        else if (directory.includes('People')) files = data.people[title] || [];
        else if (directory.includes('Trailer')) files = data.videos[title.replace(' ', '_')] || [];
        else if (directory.includes('Artwork')) files = data.artwork[title] || [];

        if (files.length === 0) {
            const noImages = document.createElement('div');
            noImages.className = 'col-span-full text-center p-8';
            noImages.innerHTML = `<p class="text-gray-300">No images found for ${title}.</p>`;
            galleryGrid.appendChild(noImages);
            return;
        }

        files.forEach((file, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            const itemPath = `${directory}${file}`;
            
            if (itemPath.endsWith('.mp4')) {
                galleryItem.innerHTML = `
                    <div class="relative w-full h-full">
                        <video src="${itemPath}" class="w-full h-full object-cover" controls>
                            Your browser does not support the video tag.
                        </video>
                        <div class="loading">Loading video...</div>
                        <div class="error-message" style="display: none;">Failed to load video</div>
                    </div>
                    <div class="gallery-overlay">
                        <h3 class="text-lg font-bold text-white">${file}</h3>
                    </div>
                `;

                const videoElement = galleryItem.querySelector('video');
                const loadingElement = galleryItem.querySelector('.loading');
                const errorElement = galleryItem.querySelector('.error-message');

                videoElement.addEventListener('loadeddata', () => {
                    loadingElement.style.display = 'none';
                });

                videoElement.addEventListener('error', () => {
                    loadingElement.style.display = 'none';
                    errorElement.style.display = 'block';
                });

                galleryItem.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'VIDEO') {
                        showVideoModal(itemPath, file);
                    }
                });

            } else {
                galleryItem.innerHTML = `
                    <div class="relative w-full h-full">
                        <img src="${itemPath}" alt="${file}" class="w-full h-full object-cover">
                        <div class="loading">Loading image...</div>
                        <div class="error-message" style="display: none;">Failed to load image</div>
                    </div>
                    <div class="gallery-overlay">
                        <h3 class="text-lg font-bold text-white">${file}</h3>
                    </div>
                `;

                const img = galleryItem.querySelector('img');
                const loadingElement = galleryItem.querySelector('.loading');
                const errorElement = galleryItem.querySelector('.error-message');

                img.addEventListener('load', () => {
                    loadingElement.style.display = 'none';
                });

                img.addEventListener('error', () => {
                    loadingElement.style.display = 'none';
                    errorElement.style.display = 'block';
                    img.classList.add('error');
                });

                galleryItem.addEventListener('click', () => {
                    showFullscreenImage(itemPath, file, index, files, directory);
                });
            }

            galleryGrid.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error in loadDirectoryContents:', error);
        loadingIndicator.remove();
        const errorMessage = document.createElement('div');
        errorMessage.className = 'col-span-full text-center p-8';
        errorMessage.innerHTML = `<p class="text-red-500">Error loading gallery contents.</p>`;
        galleryGrid.appendChild(errorMessage);
    }
}

// Fullscreen Image Modal
function showFullscreenImage(src, title, index, files, directory) {
    const modal = document.getElementById('fullscreenModal');
    if(!modal) return;
    const img = document.getElementById('fullscreenImage');
    
    currentGalleryFiles = files.map(f => `${directory}${f}`);
    currentImageIndex = index;

    if(img) {
        img.src = src;
        img.alt = title;
    }
    modal.style.display = 'block';
    
    updateFullscreenImage();
    document.addEventListener('keydown', handleKeyPress);
}

function updateFullscreenImage() {
    const img = document.getElementById('fullscreenImage');
    const counter = document.getElementById('imageCounter');
    if(!img || !counter) return;

    const newSrc = currentGalleryFiles[currentImageIndex];
    img.src = newSrc;
    img.alt = newSrc.split('/').pop();
    counter.textContent = `${currentImageIndex + 1} / ${currentGalleryFiles.length}`;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryFiles.length;
    updateFullscreenImage();
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryFiles.length) % currentGalleryFiles.length;
    updateFullscreenImage();
}

function handleKeyPress(e) {
    const modal = document.getElementById('fullscreenModal');
    if (!modal || modal.style.display !== "block") return;
    switch(e.key) {
        case 'ArrowRight': showNextImage(); break;
        case 'ArrowLeft': showPreviousImage(); break;
        case 'Escape': 
            const closeBtn = document.getElementById('closeFullscreen');
            if(closeBtn) closeBtn.click();
            break;
    }
}

function toggleImageFullscreen() {
    const modal = document.getElementById('fullscreenModal');
    if (!modal) return;
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Navigation Dots
function setupNavigation() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = ['countdown', 'gallery', 'features'];

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetSection = document.getElementById(sections[index]);
            if(targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    dots.forEach(d => d.classList.remove('active'));
                    dots[index].classList.add('active');
                }
            }
        });
    });
}

// Countdown Timer
function startCountdown() {
    const countdownDate = new Date("May 26, 2026 00:00:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if(!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysEl.innerText = "000";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        daysEl.innerText = (Math.floor(distance / (1000 * 60 * 60 * 24))).toString().padStart(3, '0');
        hoursEl.innerText = (Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, '0');
        minutesEl.innerText = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0');
        secondsEl.innerText = (Math.floor((distance % (1000 * 60)) / 1000)).toString().padStart(2, '0');
    }, 1000);
}

// Background Slideshow
function setupBackgroundSlideshow() {
    const backgroundContainer = document.getElementById('background-container');
    if(!backgroundContainer) return;
    let currentBgImageIndex = 0;

    function changeBackground() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * backgroundImages.length);
        } while (randomIndex === currentBgImageIndex);
        currentBgImageIndex = randomIndex;
        const nextImage = backgroundImages[currentBgImageIndex];
        backgroundContainer.style.backgroundImage = `url('${nextImage}')`;
    }

    backgroundImages.forEach(src => { (new Image()).src = src; });
    changeBackground();
    setInterval(changeBackground, 5000);
}

// Modal Functionality
function setupModals() {
    const trailerModal = document.getElementById('trailerModal');
    const closeModal = document.getElementById('closeModal');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const closeFullscreen = document.getElementById('closeFullscreen');

    if(closeModal) closeModal.onclick = () => {
        if(trailerModal) {
            trailerModal.style.display = "none";
            const videoContainer = trailerModal.querySelector('.video-container');
            if(videoContainer) videoContainer.innerHTML = "";
        }
    };

    if(closeFullscreen) closeFullscreen.onclick = () => {
        if(fullscreenModal) fullscreenModal.style.display = "none";
        document.removeEventListener('keydown', handleKeyPress);
    };

    window.onclick = (event) => {
        if (event.target == trailerModal) {
            trailerModal.style.display = "none";
            const videoContainer = trailerModal.querySelector('.video-container');
            if(videoContainer) videoContainer.innerHTML = "";
        }
        if (event.target == fullscreenModal) {
            fullscreenModal.style.display = "none";
            document.removeEventListener('keydown', handleKeyPress);
        }
    };
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

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize everything
    startCountdown();
    initGallery();
    setupFilters();
    setupNavigation();
    setupBackgroundSlideshow();
    setupModals();

    // New trailer buttons logic
    const trailerBtn1 = document.getElementById('trailerBtn1');
    if(trailerBtn1) trailerBtn1.addEventListener('click', () => showTrailer('https://www.youtube.com/embed/QdBZY2fkU-0'));

    const trailerBtn2 = document.getElementById('trailerBtn2');
    if(trailerBtn2) trailerBtn2.addEventListener('click', () => showTrailer('https://www.youtube.com/embed/VQRLujxTm3c'));

    // Konami code setup
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if(fullscreenBtn) fullscreenBtn.addEventListener('click', toggleImageFullscreen);
    
    const nextImageBtn = document.getElementById('nextImage');
    if(nextImageBtn) nextImageBtn.addEventListener('click', showNextImage);

    const prevImageBtn = document.getElementById('prevImage');
    if(prevImageBtn) prevImageBtn.addEventListener('click', showPreviousImage);

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const newsletterMessage = document.getElementById('newsletter-message');
            if (emailInput.value && newsletterMessage) {
                newsletterMessage.textContent = 'Thank you for subscribing!';
                newsletterMessage.classList.remove('text-red-400');
                newsletterMessage.classList.add('text-green-400');
                newsletterMessage.style.display = 'block';
                emailInput.value = '';
                setTimeout(() => { newsletterMessage.style.display = 'none'; }, 3000);
            } else if(newsletterMessage) {
                newsletterMessage.textContent = 'Please enter a valid email address.';
                newsletterMessage.classList.remove('text-green-400');
                newsletterMessage.classList.add('text-red-400');
                newsletterMessage.style.display = 'block';
            }
        });
    }

    const logo = document.querySelector('img[alt="Grand Theft Auto VI Logo"]');
    if (logo) {
        let clickCount = 0;
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            clickCount++;
            logo.style.filter = 'drop-shadow(0 0 20px #ff0000)';
            setTimeout(() => { logo.style.filter = 'drop-shadow(0 0 10px #ff69b4)'; }, 200);
            if (clickCount >= 6) {
                unlockLeaks();
                clickCount = 0;
            }
        });
    }
});

function populateLeaksGrid() {
    const leaksGrid = document.getElementById('leaksGrid');
    if (!leaksGrid || leaksGrid.hasChildNodes()) return;

    const leakVideos = [
        "GTA 6 LEAK/Americas 2022-09-13 17-16-42.mp4",
        "GTA 6 LEAK/Americas_1 2022-09-13 16-32-43.mp4",
        "GTA 6 LEAK/Americas_1 2022-09-12 14-42-12.mp4"
    ];

    leakVideos.forEach(videoSrc => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item video';
        
        const video = document.createElement('video');
        video.src = encodeURI(videoSrc);
        video.setAttribute('preload', 'metadata');
        video.controls = true;
        
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'w-full h-full bg-black relative';

        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        playIcon.innerHTML = '▶';

        thumbnailContainer.appendChild(playIcon);
        galleryItem.appendChild(thumbnailContainer);

        video.addEventListener('loadedmetadata', function() {
            video.currentTime = 1;
        });

        video.addEventListener('seeked', function() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const img = document.createElement('img');
            img.src = canvas.toDataURL();
            img.className = 'w-full h-full object-cover';
            thumbnailContainer.insertBefore(img, playIcon);
        });

        galleryItem.addEventListener('click', () => {
            showVideoModal(videoSrc, videoSrc.split('/').pop());
        });
        leaksGrid.appendChild(galleryItem);
    });
}

window.populateLeaksGrid = populateLeaksGrid; 