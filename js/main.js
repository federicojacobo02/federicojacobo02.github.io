/* =========================================================
   FEDERICO JACOBO — PORTFOLIO
   Main JavaScript
   ========================================================= */

/* ================= LANGUAGE ================= */

const defaultLanguage = "en";

let currentLanguage =
  localStorage.getItem("portfolioLanguage") || defaultLanguage;

function getNestedValue(object, path) {
  return path.split(".").reduce((current, key) => current?.[key], object);
}

function updateTranslations(language) {
  if (!translations[language]) {
    language = defaultLanguage;
  }

  currentLanguage = language;

  localStorage.setItem("portfolioLanguage", language);

  document.documentElement.lang = language;

  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");

    const value = getNestedValue(translations[language], key);

    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });
}

/* ================= LANGUAGE BUTTONS ================= */

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    updateTranslations(button.dataset.lang);
  });
});

/* ================= MOBILE MENU ================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");

const mobileNav = document.getElementById("mobileNav");

if (mobileMenuButton && mobileNav) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    mobileMenuButton.setAttribute("aria-expanded", isOpen);

    const icon = mobileMenuButton.querySelector(".material-symbols-outlined");

    if (icon) {
      icon.textContent = isOpen ? "close" : "menu";
    }
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");

      mobileMenuButton.setAttribute("aria-expanded", "false");

      const icon = mobileMenuButton.querySelector(".material-symbols-outlined");

      if (icon) {
        icon.textContent = "menu";
      }
    });
  });
}

/* ================= PROFILE IMAGE ================= */

const profilePhoto = document.getElementById("profilePhoto");

const profilePlaceholder = document.getElementById("profilePlaceholder");

if (profilePhoto) {
  profilePhoto.addEventListener("load", () => {
    profilePhoto.classList.add("loaded");

    if (profilePlaceholder) {
      profilePlaceholder.style.opacity = "0";
    }
  });

  profilePhoto.addEventListener("error", () => {
    profilePhoto.style.display = "none";

    if (profilePlaceholder) {
      profilePlaceholder.style.opacity = "1";
    }
  });
}

/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", () => {
  updateTranslations(currentLanguage);
});
