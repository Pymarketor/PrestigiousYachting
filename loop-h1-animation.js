const loopWrapper = document.querySelector('.h1-loop-wrapper');
const words = document.querySelectorAll('.h1-word');
function highlightCurrentWord() {
  const wrapperRect = loopWrapper.getBoundingClientRect();
  const centerY = wrapperRect.top + wrapperRect.height / 2;
  words.forEach(word => {
    const wordRect = word.getBoundingClientRect();
    const wordCenter = wordRect.top + wordRect.height / 2;
    const diff = Math.abs(centerY - wordCenter);
    word.style.opacity = diff < 5 ? 1 : 0.5;
  });
  requestAnimationFrame(highlightCurrentWord);
}
highlightCurrentWord();