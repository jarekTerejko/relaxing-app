const app = () => {
  const sound = document.querySelector(".sound");
  const playBtn = document.querySelector(".play");
  const outlineToAnimate = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".video-container video");

  const sounds = document.querySelectorAll(".sound button");
  const timeBtns = document.querySelectorAll(".time button");
  const timeCounter = document.querySelector(".time-display");

  // długość outline
  const outlineLength = outlineToAnimate.getTotalLength();

  // czas trwania dzwięku
  let duration = 180;

  outlineToAnimate.style.strokeDasharray = outlineLength;
  outlineToAnimate.style.strokeDashoffset = outlineLength;

  sounds.forEach(soundPara => {
    soundPara.addEventListener("click", function() {
      sound.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      resetPlayer();
    });
  });

  // play / pause
  playBtn.addEventListener("click", () => {
    checkPlaying(sound);
  });

  timeBtns.forEach(timeBtn => {
    timeBtn.addEventListener("click", function() {
      duration = this.getAttribute("data-time");
      timeCounter.textContent = `${Math.floor(duration / 60)}:${Math.floor(
        duration % 60
      )}`;
      resetPlayer();
    });
  });

  const resetPlayer = () => {
    sound.pause();
    video.pause();
    playBtn.src = "./svg/play.svg";
    sound.currentTime = 0;
  };
  // play / pause
  const checkPlaying = sound => {
    if (sound.paused) {
      sound.play();
      video.play();
      playBtn.src = "./svg/pause.svg";
    } else {
      sound.pause();
      video.pause();
      playBtn.src = "./svg/play.svg";
    }
  };

  // animacja circle
  sound.ontimeupdate = () => {
    let currentTime = sound.currentTime;
    let elapsed = duration - currentTime;
    // let seconds = Math.floor(elapsed % 60)
    let minutes = Math.floor(elapsed / 60);

    const formatSeconds = () => {
      let seconds = Math.floor(elapsed % 60);

      if (seconds < 10) {
        seconds = `0${Math.floor(elapsed % 60)}`;
      }
      return seconds;
    };
    const seconds = formatSeconds();

    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outlineToAnimate.style.strokeDashoffset = progress;

    //  counter
    timeCounter.textContent = `${minutes}:${seconds}`;

    // stop / reset player kiedy czas dojdzie do 0
    if (currentTime >= duration) {
      
      resetPlayer();
    }
  };
};

app();
