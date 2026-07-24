<script>
document.addEventListener('DOMContentLoaded', function () {
  const serviceRadios = document.querySelectorAll(
    'input[name="Service"]'
  );

  const yachtTypeRadios = document.querySelectorAll(
    'input[name="Type"]'
  );

  const nextSection = document.getElementById('YachtSelectedQuestion');

  if (
    !serviceRadios.length ||
    !yachtTypeRadios.length ||
    !nextSection
  ) {
    console.warn('Automatic form scroll: required elements not found.');
    return;
  }

  let hasAutomaticallyScrolled = false;
  let scrollTimer = null;

  function hasSelectedValue(radios) {
    return Array.from(radios).some(function (radio) {
      return radio.checked;
    });
  }

  function isElementVisible(element) {
    if (!element) return false;

    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      parseFloat(style.opacity) > 0 &&
      rect.height > 0
    );
  }

  function scrollToNextSection() {
    /*
     * Empêche plusieurs scrolls pendant les animations
     * ou les changements successifs de classes Webflow.
     */
    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(function () {
      const serviceSelected = hasSelectedValue(serviceRadios);
      const yachtTypeSelected = hasSelectedValue(yachtTypeRadios);

      if (!serviceSelected || !yachtTypeSelected) return;
      if (!isElementVisible(nextSection)) return;
      if (hasAutomaticallyScrolled) return;

      hasAutomaticallyScrolled = true;

      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 450);
  }

  function resetAutomaticScrollIfIncomplete() {
    const serviceSelected = hasSelectedValue(serviceRadios);
    const yachtTypeSelected = hasSelectedValue(yachtTypeRadios);

    if (!serviceSelected || !yachtTypeSelected) {
      hasAutomaticallyScrolled = false;
    }
  }

  serviceRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      resetAutomaticScrollIfIncomplete();
      scrollToNextSection();
    });
  });

  yachtTypeRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      resetAutomaticScrollIfIncomplete();
      scrollToNextSection();
    });
  });
});
</script>
