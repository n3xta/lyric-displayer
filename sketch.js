let audioEl;
let lyricDiv;
let currentLyric = '';
let lyrics = [];

let bpm = 185;
let beatDuration = 60 / bpm;
let totalBeatsElapsed = 0;

let overlayRemoved = false;

function setup() {

    fetch('lib/processed_lyrics.json')
    .then(response => response.json())
    .then(data => {
        lyrics = data;
        console.log("Lyrics loaded:", lyrics);
    })
    .catch(error => console.error("Error loading lyrics:", error));

    audioEl = createAudio('https://raw.githubusercontent.com/n3xta/image-hosting/main/audio/letter_to_the_black_world.mp3');
    audioEl.showControls();
  
    lyricDiv = createDiv('');
    lyricDiv.addClass('lyric-text');
    //lyricDiv.style('font-size', '48px');
    //lyricDiv.style('padding', '10px');
    //lyricDiv.style('margin', 'auto');
  
    audioEl.play();
    setInterval(updateLyrics, 100); 

    createCanvas(windowWidth, windowHeight);
    background(223,223,223,255);

}
  
function updateLyrics() {
    let currentTime = audioEl.time();
    let totalBeats = Math.floor(currentTime / beatDuration);

    if (totalBeats >= 23 && !overlayRemoved) { //考虑这边改一下时机
      const overlay = document.getElementById('black-overlay');
      overlay.remove();
      overlayRemoved = true;
    }

    let accumulatedBeats = 0;
        for (let i = 0; i < lyrics.length; i++) {
            accumulatedBeats += lyrics[i].beats;
            if (totalBeats < accumulatedBeats) {
            showLyric(lyrics[i].text);
            break;
            }
        }
}

// function showLyric(lyric) {
//   if (lyric !== currentLyric) {
//     currentLyric = lyric;
//     lyricDiv.html('');
//   }
// }

function showLyric(lyric) {
  if (lyric !== currentLyric) {
      currentLyric = lyric;
      lyricDiv.html('');

      let chars = lyric.split(/(<br>|<span[^>]*>.*?<\/span>)/).map(part => {
        if (part === '<br>') {
            return part;
        } else if (part.match(/<span[^>]*>.*?<\/span>/)) {
            return part;
        } else {
            return part.split('').map(char => {
                return `<span>${char}</span>`;
            }).join('');
        }
    }).join('');

    lyricDiv.html(chars);
    console.log(lyricDiv.html());

    anime({
        targets: 'span:not([class^="block-"])',
        opacity: [0, 1],
        duration: 1,
        delay: anime.stagger(35),
    });

    anime({
        targets: 'span:not([class^="block-"])',
        translateX: [50, 0],
        delay: anime.stagger(35),
        duration: 500,
        easing: 'easeOutExpo'
    });

    anime({
      targets: '.block-1',
      opacity: 1,
      width: '20px',
      height: '20px',
      easing: 'easeOutExpo',
      duration: 800,
    });

    anime({
      targets: '.block-2',
      opacity: 1,
      width: '20px', // 从 0 到目标宽度
      height: '20px',
      easing: 'easeOutExpo',
      duration: 0,
    });

}
}
