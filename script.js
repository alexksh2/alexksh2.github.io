/* ===========================
   Alex Khoo - Portfolio JS
   Pure vanilla, no libraries
   =========================== */

(function () {
  "use strict";

  // ---------- Theme toggle ----------
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", function () {
    const isDark = html.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  // ---------- Mobile menu ----------
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  mobileToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    mobileToggle.classList.toggle("open", isOpen);
    mobileToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      mobileToggle.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- Active section highlight ----------
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = navLinks.querySelectorAll("a");

  function highlightNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          a.classList.remove("active");
          if (a.getAttribute("href") === "#" + id) {
            a.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

  // ---------- Scroll reveal (IntersectionObserver) ----------
  var revealSections = document.querySelectorAll(".reveal-section");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealSections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    // Fallback: just show everything
    revealSections.forEach(function (s) {
      s.classList.add("revealed");
    });
  }

  // ---------- Project filtering ----------
  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = this.getAttribute("data-filter");

      filterButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      this.classList.add("active");
      this.setAttribute("aria-selected", "true");

      projectCards.forEach(function (card) {
        var category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ---------- Toast notifications ----------
  var toastContainer = document.getElementById("toastContainer");

  function showToast(message) {
    var toast = document.createElement("div");
    toast.className = "toast toast-enter";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(function () {
      toast.classList.remove("toast-enter");
      toast.classList.add("toast-exit");
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2500);
  }

  // ---------- Navbar background on scroll ----------
  var navbar = document.getElementById("navbar");
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 20) {
        navbar.style.borderBottomColor = "var(--border)";
      } else {
        navbar.style.borderBottomColor = "transparent";
      }
    },
    { passive: true }
  );
})();
