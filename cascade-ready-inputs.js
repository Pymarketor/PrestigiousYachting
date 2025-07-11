document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const allBlocks = Array.from(document.querySelectorAll('[input-order]'));

    const groupsMap = {};
    allBlocks.forEach(block => {
      const order = block.getAttribute("input-order");
      if (!groupsMap[order]) groupsMap[order] = [];
      groupsMap[order].push(block);
    });

    const sortedOrders = Object.keys(groupsMap).sort((a, b) => {
      if (a === "last") return 1;
      if (b === "last") return -1;
      return parseFloat(a) - parseFloat(b);
    });

    function isBlockValid(block) {
      const role = block.getAttribute("role");

      if (role === "radiogroup") {
        return !!block.querySelector('input[type="radio"]:checked');
      }

      const inputs = block.querySelectorAll('[input-key]');
      if (inputs.length === 0) return false;

      return Array.from(inputs).every(input => input.value.trim() !== "");
    }

    function isGroupTouched(group) {
      return group.some(b => b.dataset.touched === "true");
    }

    function isGroupValid(group) {
      return group.some(isBlockValid); // ✅ un seul bloc completement rempli suffit
    }

    function markGroupTouched(group) {
      group.forEach(b => b.dataset.touched = "true");
    }

    function checkAndToggleNextGroup(currentIndex) {
      const currentGroup = groupsMap[sortedOrders[currentIndex]];
      const nextGroup = groupsMap[sortedOrders[currentIndex + 1]];
      if (!nextGroup || !currentGroup) return;

      const isTouched = isGroupTouched(currentGroup);
      const isValid = isGroupValid(currentGroup);
      const shouldUnlock = isTouched && isValid;

      nextGroup.forEach(block => {
        block.classList.toggle("not-ready", !shouldUnlock);
      });
    }

    // Initialisation
    sortedOrders.forEach((orderKey, index) => {
      const group = groupsMap[orderKey];

      group.forEach(block => {
        const role = block.getAttribute("role");
        const hasInputKey = !!block.querySelector('[input-key]');

        const trigger = () => {
          markGroupTouched(group);
          checkAndToggleNextGroup(index);
        };

        if (role === "radiogroup") {
          const radios = block.querySelectorAll('input[type="radio"]');
          radios.forEach(radio => radio.addEventListener("change", trigger));
        }

        if (hasInputKey) {
          const inputs = block.querySelectorAll('[input-key]');
          inputs.forEach(input => input.addEventListener("input", trigger));
          block.addEventListener("click", trigger);
        } else {
          block.addEventListener("click", () => {
            block.dataset.touched = "true";
          });
        }
      });
    });
  }, 100);
});
