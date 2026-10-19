"use strict";

// Native links and FAQ remain usable without JavaScript.
document.documentElement.classList.add("js-ready");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

if (menuButton && navigation) {
  const setMenuOpen = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Tutup menu navigasi" : "Buka menu navigasi",
    );
    navigation.classList.toggle("is-open", open);
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-shell")) setMenuOpen(false);
  });
  window
    .matchMedia("(max-width: 850px)")
    .addEventListener("change", () => setMenuOpen(false));
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const calculator = document.querySelector("#print-calculator");
if (calculator) {
  const sheetsInput = calculator.querySelector("#sheet-count");
  const totalOutput = calculator.querySelector("#print-total");
  const errorMessage = calculator.querySelector("#quantity-error");
  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const updateEstimate = () => {
    const sheets = sheetsInput.valueAsNumber;
    const valid = sheetsInput.validity.valid && Number.isInteger(sheets);
    sheetsInput.setAttribute("aria-invalid", String(!valid));
    errorMessage.hidden = valid;
    if (!valid) {
      totalOutput.textContent = "—";
      return;
    }
    const rate = Number(
      calculator.querySelector('input[name="print-type"]:checked').value,
    );
    totalOutput.textContent = currency.format(sheets * rate).replace(/\s/g, "");
  };

  // Announce changes without moving keyboard focus away from the input.
  totalOutput.setAttribute("aria-live", "polite");
  totalOutput.setAttribute("aria-atomic", "true");
  calculator.addEventListener("input", updateEstimate);
  calculator.addEventListener("change", updateEstimate);
  calculator.addEventListener("submit", (event) => {
    event.preventDefault();
    updateEstimate();
  });
  updateEstimate();
}
