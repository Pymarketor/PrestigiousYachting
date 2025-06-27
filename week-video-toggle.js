document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("weekCharterVideo");
  const toggleButton = document.getElementById("videoToggleButton");
  const pauseIcon = document.getElementById("pauseIcon");
  const playIcon = document.getElementById("playIcon");
  if (!video || !toggleButton) return;
  function updateIcons() {
    if (video.paused) {
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
      toggleButton.setAttribute("aria-label", "Play hero video");
    } else {
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
      toggleButton.setAttribute("aria-label", "Pause hero video");
    }
  }
  video.addEventListener("play", updateIcons);
  video.addEventListener("pause", updateIcons);
  toggleButton.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });
  if (!video.paused) updateIcons();
});