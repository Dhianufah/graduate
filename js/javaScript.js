document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // ELEMENTS
  // =========================================================

  const giftBox = document.getElementById("gift-box");

  const giftScreen = document.getElementById("gift-screen");
  const dashboardScreen = document.getElementById("dashboard-screen");
  const memoriesScreen = document.getElementById("memories-screen");
  const letterScreen = document.getElementById("letter-screen");
  const playlistScreen = document.getElementById("playlist-screen");
  const surpriseScreen = document.getElementById("surprise-screen");

  const backButtons =
    document.querySelectorAll(".back-to-dash");

  const menuCards =
    document.querySelectorAll(".menu-card");

  const photoCards =
    document.querySelectorAll(".photo-card");


  // =========================================================
  // LETTER
  // =========================================================

  const envelope =
    document.getElementById("envelope");

  const letterModal =
    document.getElementById("letter-modal");

  const closeLetter =
    document.getElementById("close-letter");


  // =========================================================
  // PHOTO MODAL
  // =========================================================

  const photoModal =
    document.getElementById("photo-modal");

  const modalImg =
    document.getElementById("modal-img");

  const modalCaption =
    document.getElementById("modal-caption");


  // =========================================================
  // MEMORY JAR
  // =========================================================

  const jar =
    document.getElementById("jar");

  const shakeBtn =
    document.getElementById("shake-btn");

  const noteModal =
    document.getElementById("note-modal");

  const noteContent =
    document.getElementById("note-content");

  const closeNote =
    document.getElementById("close-note");


  // =========================================================
  // AUDIO
  // =========================================================

  const bgMusic =
    document.getElementById("bg-music");

  const playBtn =
    document.getElementById("play-btn");

  const playerTitle =
    document.getElementById("player-title");

  const playerArtist =
    document.getElementById("player-artist");

  const playerImg =
    document.getElementById("player-img");

  const playerCover =
    document.querySelector(".player-cover");

  const progressBar =
    document.getElementById("progress-bar");

  const currentTimeEl =
    document.getElementById("current-time");

  const totalDurationEl =
    document.getElementById("total-duration");

  const songItems =
    document.querySelectorAll(".song-item");


  // =========================================================
  // MEMORY NOTES
  // =========================================================

  const surpriseNotes = [
    "Life is good when you spend it with the people who make your heart happy.",

    "Best chapter of my life was meeting the Sasaeng I have right now.",

    "Thank you for being present in a life that includes me. I'm so happy to know you, guys.",

    "Becoming friends with you was the best decision I've ever made.",

    "In the end, memories are the greatest treasures we hold.",

    "We never planned this friendship. The universe just knew I needed someone like you to make life feel brighter & better. Love you guys. And see you again. Peace ✌🏻 = iyad."
  ];

  let currentNoteIndex = 0;


  // =========================================================
  // SONG DATA
  // =========================================================

  const songs = [

    {
      title: "Kita Ke Sana",
      artist: "Hindia",

      src:
        "audio/Hindia - Kita ke Sana (Official Lyric Video).mp3",

      cover:
        "images/song.png"
    },

    {
      title: "Everything U Are",
      artist: "Hindia",

      src:
        "audio/Hindia - everything u are.mp3",

      cover:
        "images/song.png"
    },

    {
      title: "Ramai Sepi Bersama",
      artist: "Hindia",

      src:
        "audio/Hindia - Ramai Sepi Bersama (Official Lyric Video).mp3",

      cover:
        "images/song.png"
    },

    {
      title: "Di Akhir Perang",
      artist: "Nadin Amizah",

      src:
        "audio/Nadin Amizah - Di Akhir Perang (Official Lyric Video).mp3",

      cover:
        "images/song.png"
    }

  ];


  let currentSongIndex = 0;


  // =========================================================
  // IMAGE FALLBACK
  // =========================================================

  playerImg.addEventListener("error", () => {

    console.warn(
      "Gambar playlist tidak ditemukan, pakai fallback:",
      playerImg.src
    );

    playerCover.classList.add("image-error");

    playerImg.style.display = "none";
  });


  playerImg.addEventListener("load", () => {

    playerCover.classList.remove("image-error");

    playerImg.style.display = "block";
  });


  // =========================================================
  // FORMAT TIME
  // =========================================================

  function formatTime(seconds) {

    if (!seconds || isNaN(seconds)) {
      return "0:00";
    }

    const minutes =
      Math.floor(seconds / 60);

    const secs =
      Math.floor(seconds % 60);

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }


  // =========================================================
  // LOAD SONG
  // =========================================================

  function loadSong(index, autoPlay = false) {

    currentSongIndex = index;

    const song = songs[index];

    if (!song) {
      console.log(
        "Song tidak ditemukan:",
        index
      );

      return;
    }


    // Update text

    playerTitle.textContent =
      song.title;

    playerArtist.textContent =
      song.artist;


    // Update image

    playerImg.style.display = "block";

    playerCover.classList.remove(
      "image-error"
    );

    playerImg.src = song.cover;


    // Update audio

    bgMusic.src = song.src;

    bgMusic.load();


    // Reset progress

    progressBar.style.width = "0%";

    currentTimeEl.textContent = "0:00";

    totalDurationEl.textContent = "0:00";


    // Active song

    songItems.forEach((item, i) => {

      item.classList.toggle(
        "active",
        i === index
      );

    });


    // Auto play

    if (autoPlay) {

      bgMusic
        .play()
        .then(() => {

          playBtn.textContent = "⏸ Pause";

        })
        .catch((error) => {

          console.log(
            "Audio gagal diputar:",
            error
          );

          playBtn.textContent = "▶ Play";

        });

    } else {

      playBtn.textContent = "▶ Play";

    }

  }


  // =========================================================
  // PLAY / PAUSE
  // =========================================================

  function togglePlay() {

    if (bgMusic.paused) {

      bgMusic
        .play()
        .then(() => {

          playBtn.textContent =
            "⏸ Pause";

        })
        .catch((error) => {

          console.log(
            "Audio gagal diputar:",
            error
          );

        });

    } else {

      bgMusic.pause();

      playBtn.textContent =
        "▶ Play";

    }

  }


  playBtn.addEventListener(
    "click",
    togglePlay
  );


  // =========================================================
  // SONG CLICK
  // =========================================================

  songItems.forEach((item) => {

    item.addEventListener(
      "click",
      () => {

        const index =
          parseInt(
            item.getAttribute("data-index"),
            10
          );

        loadSong(index, true);

      }
    );

  });


  // =========================================================
  // AUDIO TIME
  // =========================================================

  bgMusic.addEventListener(
    "timeupdate",
    () => {

      if (
        !bgMusic.duration ||
        isNaN(bgMusic.duration)
      ) {
        return;
      }


      const progressPercent =
        (bgMusic.currentTime /
          bgMusic.duration) *
        100;


      progressBar.style.width =
        `${progressPercent}%`;


      currentTimeEl.textContent =
        formatTime(
          bgMusic.currentTime
        );


      totalDurationEl.textContent =
        formatTime(
          bgMusic.duration
        );

    }
  );


  // =========================================================
  // METADATA
  // =========================================================

  bgMusic.addEventListener(
    "loadedmetadata",
    () => {

      totalDurationEl.textContent =
        formatTime(
          bgMusic.duration
        );

    }
  );


  // =========================================================
  // NEXT SONG
  // =========================================================

  bgMusic.addEventListener(
    "ended",
    () => {

      let nextSongIndex =
        currentSongIndex + 1;


      if (
        nextSongIndex >=
        songs.length
      ) {

        nextSongIndex = 0;

      }


      loadSong(
        nextSongIndex,
        true
      );

    }
  );


  // =========================================================
  // GIFT CLICK
  // =========================================================

  giftBox.addEventListener(
    "click",
    () => {

      // Play lagu pertama

      loadSong(0, true);


      // Gift animation

      giftScreen.style.opacity = "0";

      giftScreen.style.transform =
        "scale(0.9)";


      setTimeout(() => {

        giftScreen.classList.add(
          "hidden"
        );

        giftScreen.style.opacity = "";

        giftScreen.style.transform = "";

        dashboardScreen.classList.remove(
          "hidden"
        );

      }, 500);

    }
  );


  // =========================================================
  // DASHBOARD NAVIGATION
  // =========================================================

  menuCards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const action =
          card.getAttribute(
            "data-action"
          );


        dashboardScreen.classList.add(
          "hidden"
        );


        if (action === "memories") {

          memoriesScreen.classList.remove(
            "hidden"
          );

        }


        if (action === "letter") {

          letterScreen.classList.remove(
            "hidden"
          );

        }


        if (action === "playlist") {

          playlistScreen.classList.remove(
            "hidden"
          );

        }


        if (action === "surprise") {

          surpriseScreen.classList.remove(
            "hidden"
          );

        }

      }
    );

  });


  // =========================================================
  // BACK TO DASHBOARD
  // =========================================================

  backButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        memoriesScreen.classList.add(
          "hidden"
        );

        letterScreen.classList.add(
          "hidden"
        );

        playlistScreen.classList.add(
          "hidden"
        );

        surpriseScreen.classList.add(
          "hidden"
        );


        dashboardScreen.classList.remove(
          "hidden"
        );


        envelope.classList.remove(
          "open"
        );

      }
    );

  });


  // =========================================================
  // SHAKE JAR
  // =========================================================

  shakeBtn.addEventListener(
    "click",
    () => {

      if (
        jar.classList.contains("shaking")
      ) {
        return;
      }


      jar.classList.add(
        "shaking"
      );


      setTimeout(() => {

        jar.classList.remove(
          "shaking"
        );


        noteContent.textContent =
          surpriseNotes[
            currentNoteIndex
          ];


        noteModal.classList.remove(
          "hidden"
        );


        currentNoteIndex =
          (currentNoteIndex + 1) %
          surpriseNotes.length;

      }, 1000);

    }
  );


  // =========================================================
  // CLOSE NOTE
  // =========================================================

  closeNote.addEventListener(
    "click",
    () => {

      noteModal.classList.add(
        "hidden"
      );

    }
  );


  // =========================================================
  // OPEN ENVELOPE (ANIMASI 3D)
  // =========================================================

  envelope.addEventListener(
    "click",
    () => {

      if (
        !envelope.classList.contains(
          "open"
        )
      ) {

        envelope.classList.add(
          "open"
        );

        // Delay lebih lama (1200ms) supaya kertas sempet keluar dulu
        setTimeout(() => {

          letterModal.classList.remove(
            "hidden"
          );

        }, 1200);

      } else {

        letterModal.classList.remove(
          "hidden"
        );

      }

    }
  );


  // =========================================================
  // CLOSE LETTER
  // =========================================================

  closeLetter.addEventListener(
    "click",
    () => {

      letterModal.classList.add(
        "hidden"
      );

      letterScreen.classList.add(
        "hidden"
      );

      dashboardScreen.classList.remove(
        "hidden"
      );

      envelope.classList.remove(
        "open"
      );

    }
  );


  // =========================================================
  // PHOTO MODAL
  // =========================================================

  photoCards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const img =
          card.querySelector("img");

        const caption =
          card.getAttribute(
            "data-caption"
          );


        modalImg.src =
          img.src;

        modalCaption.textContent =
          caption;


        photoModal.classList.remove(
          "hidden"
        );

      }
    );

  });


  // =========================================================
  // CLOSE PHOTO MODAL
  // =========================================================

  photoModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === photoModal ||
        event.target === modalImg ||
        event.target === modalCaption
      ) {

        photoModal.classList.add(
          "hidden"
        );

      }

    }
  );


  // =========================================================
  // CLOSE MODAL WITH ESC
  // =========================================================

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        photoModal.classList.add(
          "hidden"
        );

        noteModal.classList.add(
          "hidden"
        );

        letterModal.classList.add(
          "hidden"
        );

      }

    }
  );


  // =========================================================
  // INITIAL SONG
  // =========================================================

  loadSong(0, false);

});