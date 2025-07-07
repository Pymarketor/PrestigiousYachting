document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll('[highlight="block"]');

    blocks.forEach(block => {
      const elements = block.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .text-block-119');

      elements.forEach(el => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = Array.from(range.getClientRects());

        const originalText = el.textContent;
        const words = originalText.split(' ');
        el.innerHTML = ''; // clean original

        let tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        el.appendChild(tempSpan);

        let lineIndex = -1;
        let prevTop = null;
        let line = [];

        words.forEach((word, i) => {
          tempSpan.textContent += word + ' ';
          const rects = tempSpan.getClientRects();
          const lastRect = rects[rects.length - 1];

          if (prevTop === null || Math.abs(lastRect.top - prevTop) > 2) {
            // nouvelle ligne détectée
            if (line.length) {
              const span = document.createElement('span');
              span.className = 'highlight-line';
              span.textContent = line.join(' ');
              el.appendChild(span);
              el.appendChild(document.createElement('br'));
            }
            line = [word];
            prevTop = lastRect.top;
            lineIndex++;
          } else {
            line.push(word);
          }
        });

        // dernière ligne
        if (line.length) {
          const span = document.createElement('span');
          span.className = 'highlight-line';
          span.textContent = line.join(' ');
          el.appendChild(span);
        }

        tempSpan.remove();
      });
    });

    const handleScroll = () => {
      const lines = document.querySelectorAll('.highlight-line');
      const center = window.innerHeight / 2;
      const tolerance = 20;

      lines.forEach(line => {
        const rect = line.getBoundingClientRect();
        if (rect.top < center + tolerance && rect.bottom > center - tolerance) {
          line.classList.add('is-reading');
        } else {
          // enlever la classe seulement si la ligne est au-dessus du viewport
          if (rect.bottom < center - tolerance) {
            line.classList.add('is-reading'); // on garde le highlight
          } else if (rect.top > center + tolerance) {
            line.classList.remove('is-reading'); // ligne pas encore lue
          } else {
            // reste dans le flou
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    setTimeout(handleScroll, 100); // initial run avec un léger délai
  });
