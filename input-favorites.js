document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('[fs-formsubmit-element="form"]');
    const list = document.querySelector('[fs-list-element="list"]');
    if (!form || !list) return;

    function updateInputsFromVisibleBoats() {
      const oldInputs = form.querySelectorAll('input[name^="Boat"][name$="_Record_ID_Salesforce"], input[name="Number_Boat"]');
      oldInputs.forEach(input => input.remove());

      const boats = list.querySelectorAll('[boatRecord]');
      const ids = [];

      boats.forEach(el => {
        const id = el.getAttribute('boatRecord')?.trim();
        if (id) ids.push(id);
      });

      ids.forEach((id, index) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = `Boat${index + 1}_Record_ID_Salesforce`;
        input.value = id;
        form.appendChild(input);
      });

      const counter = document.createElement('input');
      counter.type = 'hidden';
      counter.name = 'Number_Boat';
      counter.value = ids.length;
      form.appendChild(counter);
    }

    setTimeout(updateInputsFromVisibleBoats, 750);

    const triggers = document.querySelectorAll('[sync-favorites-trigger]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        setTimeout(updateInputsFromVisibleBoats, 250);
      });
    });

    window.addEventListener('sync-favorites-update', () => {
      setTimeout(updateInputsFromVisibleBoats, 250);
    });
  });
