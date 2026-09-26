(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navbar-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  const onScroll = () => {
    let current = sections[0] ? sections[0].id : "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const langButtons = document.querySelectorAll(".lang-btn");
  const translations = window.I18N || {};

  const applyLanguage = (lang) => {
    const pack = translations[lang];
    if (!pack) {
      return;
    }

    document.documentElement.lang = lang;
    document.title = pack.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", pack.description);
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (pack[key]) {
        el.textContent = pack[key];
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (pack[key]) {
        el.setAttribute("alt", pack[key]);
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (pack[key]) {
        el.setAttribute("aria-label", pack[key]);
      }
    });

    langButtons.forEach((button) => {
      const active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    localStorage.setItem("homepage-lang", lang);
  };

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.getAttribute("data-lang"));
    });
  });

  const savedLang = localStorage.getItem("homepage-lang");
  const startLang = translations[savedLang] ? savedLang : "ko";
  applyLanguage(startLang);
})();
