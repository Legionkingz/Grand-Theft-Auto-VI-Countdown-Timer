const fs = require('fs');
const path = require('path');

const galleryData = {
  places: {},
  people: {},
  videos: {},
  artwork: {},
};

const screenshotsDir = 'GTAVI_Screenshots';
const videosDir = 'GTAVI_Videos';
const artworkDir = 'GTAVI_Artwork_Wallpapers';

// Process places
const placesDir = path.join(screenshotsDir, 'Places');
const placeSubDirs = fs.readdirSync(placesDir).filter(d => fs.statSync(path.join(placesDir, d)).isDirectory());

placeSubDirs.forEach(dir => {
  const files = fs.readdirSync(path.join(placesDir, dir));
  galleryData.places[dir] = files;
});

// Process people
const peopleDir = path.join(screenshotsDir, 'People');
const peopleSubDirs = fs.readdirSync(peopleDir).filter(d => fs.statSync(path.join(peopleDir, d)).isDirectory());

peopleSubDirs.forEach(dir => {
  const files = fs.readdirSync(path.join(peopleDir, dir));
  galleryData.people[dir] = files;
});

// Process videos
const videoSubDirs = fs.readdirSync(videosDir).filter(d => fs.statSync(path.join(videosDir, d)).isDirectory());
videoSubDirs.forEach(dir => {
    const files = fs.readdirSync(path.join(videosDir, dir));
    galleryData.videos[dir] = files;
});

const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));
videoFiles.forEach(file => {
    const title = path.basename(file, '.mp4').replace(/_/g, ' ');
    galleryData.videos[title] = file;
})

// Process artwork
const artworkSubDirs = fs.readdirSync(artworkDir).filter(d => {
    const fullPath = path.join(artworkDir, d);
    return fs.statSync(fullPath).isDirectory() && !d.startsWith('.');
});

artworkSubDirs.forEach(dir => {
  const files = fs.readdirSync(path.join(artworkDir, dir)).filter(f => !f.startsWith('.'));
  galleryData.artwork[dir.replace(/_/g, ' ')] = files;
});

fs.writeFileSync('gallery-data.json', JSON.stringify(galleryData, null, 2));

console.log('gallery-data.json has been generated.'); 