# 🎵 Spotify Clone

A fully functional Spotify web player clone built with pure HTML, CSS, and JavaScript — no frameworks, no libraries.


## ✨ Features

- 🎵 **Play & Pause** songs with a single click
- ⏩ **Seekbar** — click or drag anywhere to jump to that point
- 🔊 **Volume Control** — drag slider or click icon to mute/unmute
- 💾 **Last Played Memory** — remembers last song after page reload same
- 🖼️ **Dynamic Song Info** — name, artist, cover update automatically in playbar
- ❤️ **Liked Songs Sidebar** — expandable playlist with art, name, artist
- 🎠 **Card Carousels** — smooth prev/next navigation on all sections
- 📱 **Fully Responsive** — works on desktop, tablet, and mobile
- 🕒 **Live Time Display** — shows current and total duration
- 🎨 **Spotify-accurate UI** — dark theme, green accents, matching layout


## 🛠️ Built With

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure and layout |
| CSS3 | Styling, animations, responsive design |
| JavaScript (Vanilla) | Audio playback, DOM manipulation, localStorage |


## 📁 Project Structure

```
spotify-clone/
├── index.html
├── script.js
├── style.css
├── utility.css
├── favicon.ico
├── cover.jpg
├── icons/
│   ├── logo.svg
│   ├── home.svg
│   ├── search.svg
│   ├── play-icon.svg
│   ├── playButton.svg
│   ├── pause.svg
│   ├── volume.svg
│   ├── mute.svg
│   └── ... other icons
├── images/
│   ├── Liked-Songs.png
│   ├── taylor.png
│   ├── arijit.png
│   └── songsCards/
│       ├── hum.png
│       ├── harBaar.png
│       ├── maskara.png
│       ├── lover.png
│       └── ... other card images
└── songs/
    ├── Har Baar - RaagWorld.mp3
    ├── Hum - RaagWorld.mp3
    ├── Maskara - RaagWorld.mp3
    └── Taylor Swift - Lover.mp3
```



## 🚀 How to Run

1. Clone the repository
```bash
git clone https://github.com/Areej554-dev/spotify-clone.git
```
2. Open `index.html` in your browser — no server needed!


## 🎵 Songs Included

| Song | Artist |
|------|--------|
| Har Baar | Murtaza Qizilbash, Samar Jafri |
| Hum | Murtaza Qizilbash |
| Maskara | Nilanjana Ghosh Dastidar, Vedang Raina |
| Lover | Taylor Swift |


## 🔑 Key JavaScript Concepts Used

- `Audio()` API for music playback
- `localStorage` for remembering last played song and offline storing songs ability
- `getBoundingClientRect()` for seekbar and volume drag
- `timeupdate` event for live time and seekbar sync
- DOM manipulation for dynamic song list generation


## 📱 Responsive Breakpoints

| Screen Size | Behavior |
|-------------|----------|
| Desktop 1024px+ | Full layout with sidebar |
| Tablet 768px-1024px | Smaller sidebar, compact nav |
| Mobile below 768px | Sidebar hidden, simplified playbar |
| Small Mobile below 480px | Minimal UI, core features only |


## 📄 License

MIT License — © 2026 Alisha Areej


## 👩‍💻 Author

**Alisha Areej** — [@Areej554-dev](https://github.com/Areej554-dev)


⭐ If you found this helpful, please give it a star!
