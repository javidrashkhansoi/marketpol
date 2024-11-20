/** @type {NodeListOf<HTMLDivElement>} */
const counters = document.querySelectorAll("[data-counter]");

counters.forEach((counter) => {
  /** @type {HTMLInputElement} */
  const input = counter.querySelector("[data-input]");
  /** @type {HTMLButtonElement} */
  const plus = counter.querySelector("[data-plus]");
  /** @type {HTMLButtonElement} */
  const minus = counter.querySelector("[data-minus]");

  if (input && plus && minus) {
    const calcBlock = input.closest("[data-calc]");

    input.addEventListener("focus", () => {
      const { value } = input;

      input.value = parseFloat(value);
      input.type = "number";
    });

    input.addEventListener("blur", () => {
      const { value, dataset } = input;
      const { unit } = dataset;

      input.type = "text";
      input.value = unit ? `${value} ${unit}` : value;
    });

    if (calcBlock) {
      input.addEventListener("change", () => {
        calcBlock.dispatchEvent(new Event("calc"));
      });
    }

    plus.addEventListener("click", () => {
      counter("plus");
    });

    minus.addEventListener("click", () => {
      counter("minus");
    });

    /** @param {"plus" | "minus"} action */
    function counter(action) {
      const { dataset } = input;
      const { unit } = dataset;

      let { value, min, max, step } = input;

      value = parseFloat(value);
      min = +min;
      max = +max;
      step = +step;

      if (action === "plus") value += step;
      if (action === "minus") value -= step;
      if (value > max) value = max;
      if (value < min) value = min;

      input.value = unit ? `${value} ${unit}` : value;
      input.dispatchEvent(new Event("change"));
    }
  }
});
