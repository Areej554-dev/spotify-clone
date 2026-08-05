const likedPlaylist = document.querySelector(".liked-playlist");
const musicLiked = document.querySelector(".music-liked");
let currentSong = new Audio();
const play = document.getElementById("play");
const playIcon = play.querySelector("img");

const songData = {
    "Har Baar - RaagWorld.mp3": {
        artist: "Murtaza Qizilbash, Samar Jafri",
        image: "images/songsCards/harBaar.png"
    },
    "Hum - RaagWorld.mp3": {
        artist: "Murtaza Qizilbash",
        image: "images/songsCards/hum.png"
    },
    "Maskara - RaagWorld.mp3": {
        artist: "Nilanjana Ghosh Dastidar, Vedang Raina",
        image: "images/songsCards/maskara.png"
    },
    "Taylor Swift - Lover.mp3": {
        artist: "Taylor Swift",
        image: "images/songsCards/lover.png"
    },
};

const DEFAULT_IMAGE = "images/songsCards/default.png";
const DEFAULT_ARTIST = "Unknown Artist";

function getSongName(filename) {
    let name = decodeURIComponent(filename).replace(".mp3", "");
    return name.split(" - ")[0].trim();
}

function getSongData(filename) {
    let decoded = decodeURIComponent(filename);
    return songData[decoded] || { artist: DEFAULT_ARTIST, image: DEFAULT_IMAGE };
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

function showInPlaybar(track) {
    let songName = getSongName(track);
    let { artist, image } = getSongData(track);
    document.querySelector(".now-playing-img").src = image;
    document.querySelector(".track-name").innerHTML = songName;
    document.querySelector(".track-artist").innerHTML = artist;
    document.querySelector(".songtime").innerHTML = "0:00 / 0:00";
}

likedPlaylist.addEventListener("click", () => {
    musicLiked.classList.toggle("active");
});

document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const total = track.children.length;
    let index = 0;

    function goTo(i) {
        index = (i + total) % total;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    carousel.addEventListener('click', e => {
        if (e.target.closest('.next-btn')) goTo(index + 1);
        if (e.target.closest('.prev-btn')) goTo(index - 1);
    });
});

async function getSongs() {
    return [
        "Har Baar - RaagWorld.mp3",
        "Hum - RaagWorld.mp3",
        "Maskara - RaagWorld.mp3",
        "Taylor Swift - Lover.mp3",
    ];
}

const playMusic = (track) => {
    currentSong.src = "songs/" + track;
    currentSong.play();
    localStorage.setItem("lastPlayed", track);
    playIcon.src = "icons/pause.svg";
    showInPlaybar(track);
    document.querySelector(".songtime").innerHTML = "0:00 / 0:00";
}

async function main() {
    let songs = await getSongs();

    let songUL = document.querySelector(".music-liked").getElementsByTagName("ul")[0];

    for (const song of songs) {
        let songName = getSongName(song);
        let { artist, image } = getSongData(song);

        songUL.innerHTML += `
        <li>
            <img class="play-liked-music" src="${image}" alt="${songName}">
            <div class="song-info">
                <div class="real-name" style="display:none;">${song}</div>
                <div>${songName}</div>
                <div>
                    <a class="song-artist" href="">${artist}</a>
                </div>
            </div>
            <button class="musicPlay">
                <img src="icons/playButton.svg" alt="">
            </button>
        </li>`;
    }

    Array.from(document.querySelector(".music-liked").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".real-name").innerHTML);
        });
    });

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playIcon.src = "icons/pause.svg";
        } else {
            currentSong.pause();
            playIcon.src = "icons/playButton.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;

        if (!isSeeking) {
            const percent = (currentSong.currentTime / currentSong.duration) * 100;
            document.querySelector(".seek-fill").style.width = `${percent}%`;
            document.querySelector(".circle").style.left = `${percent}%`;
        }
    });

    const seekbar = document.querySelector(".seekbar");
    const seekFill = document.querySelector(".seek-fill");
    const seekCircle = document.querySelector(".circle");
    let isSeeking = false;

    function seekTo(e) {
        const rect = seekbar.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;
        percent = Math.min(Math.max(percent, 0), 1);
        currentSong.currentTime = percent * currentSong.duration;
        seekFill.style.width = `${percent * 100}%`;
        seekCircle.style.left = `${percent * 100}%`;
    }

    seekbar.addEventListener("mousedown", (e) => { isSeeking = true; seekTo(e); });
    document.addEventListener("mousemove", (e) => { if (isSeeking) seekTo(e); });
    document.addEventListener("mouseup", () => { isSeeking = false; });

    const volumeBar = document.querySelector(".volume-bar");
    const volumeFill = document.querySelector(".volume-fill");
    const volumeCircle = document.querySelector(".volume-circle");
    const volumeIcon = document.querySelector(".volume-icon");

    let lastVolume = 1;
    currentSong.volume = 1;
    volumeFill.style.width = "100%";
    volumeCircle.style.left = "100%";

    function setVolume(e) {
        const rect = volumeBar.getBoundingClientRect();
        let percent = (e.clientX - rect.left) / rect.width;
        percent = Math.min(Math.max(percent, 0), 1);
        currentSong.volume = percent;
        volumeFill.style.width = `${percent * 100}%`;
        volumeCircle.style.left = `${percent * 100}%`;
        volumeIcon.src = percent === 0 ? "icons/mute.svg" : "icons/volume.svg";
    }

    let isAdjustingVolume = false;

    volumeBar.addEventListener("mousedown", (e) => { isAdjustingVolume = true; setVolume(e); });
    document.addEventListener("mousemove", (e) => { if (isAdjustingVolume) setVolume(e); });
    document.addEventListener("mouseup", () => { isAdjustingVolume = false; });

    volumeIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            lastVolume = currentSong.volume;
            currentSong.volume = 0;
            volumeFill.style.width = "0%";
            volumeCircle.style.left = "0%";
            volumeIcon.src = "icons/mute.svg";
        } else {
            currentSong.volume = lastVolume;
            volumeFill.style.width = `${lastVolume * 100}%`;
            volumeCircle.style.left = `${lastVolume * 100}%`;
            volumeIcon.src = "icons/volume.svg";
        }
    });

    let lastPlayed = localStorage.getItem("lastPlayed");
    let defaultSong = (lastPlayed && songs.includes(lastPlayed)) ? lastPlayed : songs[0];

    if (defaultSong) {
        showInPlaybar(defaultSong);
        currentSong.src = "songs/" + defaultSong;
    }
}

main();

document.querySelectorAll(".card-carousel-wrapper").forEach(wrapper => {
    const container = wrapper.querySelector(".card-container");
    const prevBtn = wrapper.querySelector(".card-prev-btn");
    const nextBtn = wrapper.querySelector(".card-next-btn");

    prevBtn.classList.add("dimmed");

    const scrollAmount = () => {
        const card = container.querySelector(".card");
        return card ? card.offsetWidth + 16 : 200;
    };

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        container.scrollLeft += scrollAmount();
    });

    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        container.scrollLeft -= scrollAmount();
    });

    container.addEventListener("scroll", () => {
        if (container.scrollLeft <= 0) {
            prevBtn.classList.add("dimmed");
        } else {
            prevBtn.classList.remove("dimmed");
        }
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
            nextBtn.classList.add("dimmed"); } 
        else {
            nextBtn.classList.remove("dimmed");
        }
    });
});
