// ===== Edit these two values before publishing =====
const CONTACT_EMAIL = "geargen.edu@gmail.com"; // support / privacy contact e-mail
const DEVELOPER_NAME = "biexce";                 // developer / publisher name shown in the policies
// ===================================================

(function () {
  const STORAGE_KEY = "spacehawk-policy-lang";

  function getSavedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* storage unavailable - ignore */ }
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.setLang === lang);
    });
  }

  // Language: saved choice > ?lang= in URL > browser language > English
  const urlLang = new URLSearchParams(location.search).get("lang");
  const browserLang = (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
  let initial = getSavedLang() || urlLang || browserLang;
  if (initial !== "vi" && initial !== "en") initial = "en";

  document.addEventListener("DOMContentLoaded", function () {
    setLang(initial);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () { setLang(btn.dataset.setLang); });
    });

    // Fill in contact e-mail / developer name everywhere
    document.querySelectorAll("[data-email]").forEach(function (el) {
      el.textContent = CONTACT_EMAIL;
      if (el.tagName === "A") el.href = "mailto:" + CONTACT_EMAIL;
    });
    document.querySelectorAll("[data-developer]").forEach(function (el) {
      el.textContent = DEVELOPER_NAME;
    });

    // Highlight the current page in the nav
    const page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      if (a.getAttribute("href") === page) a.classList.add("active");
    });

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
