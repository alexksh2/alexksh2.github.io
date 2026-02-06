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

  // ---------- Project detail modal ----------
  var modal = document.getElementById("projectModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalBody = document.getElementById("modalBody");
  var modalClose = document.getElementById("modalClose");
  var detailButtons = document.querySelectorAll(".project-details-btn");

  var projectDetails = {
    efe: {
      title: "Self-Evolving Fuzzy Ensemble (eFE) for Algorithmic Trading",
      body:
        "<p>Final Year Project (2026) developing a novel algorithmic trading framework that self-adapts to changing market conditions.</p>" +
        "<ul>" +
        "<li><strong>Regime Detection:</strong> Unsupervised clustering to identify market states (trending, mean-reverting, volatile) in real-time.</li>" +
        "<li><strong>Deep Temporal Models:</strong> GRU and TCN architectures with attention mechanisms for multi-horizon forecasting.</li>" +
        "<li><strong>Drift Detection:</strong> Online concept drift detection to trigger model retraining when distribution shifts occur.</li>" +
        "<li><strong>RL Optimization:</strong> Reinforcement Learning-based fuzzy rule optimization for dynamic strategy blending.</li>" +
        "<li><strong>Backtesting:</strong> Comprehensive evaluation across multiple asset classes, benchmarked against market indices with Sharpe ratio and max drawdown analysis.</li>" +
        "</ul>",
    },
    cassava: {
      title: "Kaggle Cassava Leaf Disease Classification",
      body:
        "<p>Competitive machine learning challenge achieving 90.1% accuracy in classifying five cassava disease categories from leaf images.</p>" +
        "<ul>" +
        "<li><strong>Architecture:</strong> Hybrid ensemble combining ResNeXt-50, Vision Transformer (ViT), EfficientNet-B4, and CropNet.</li>" +
        "<li><strong>Ensemble Strategy:</strong> Multi-level stacking with soft voting to maximize predictive diversity.</li>" +
        "<li><strong>Data Augmentation:</strong> Advanced augmentation pipeline including CutMix, MixUp, and progressive resizing.</li>" +
        "<li><strong>Result:</strong> 90.1% test accuracy, demonstrating robust generalization to real-world agricultural imaging.</li>" +
        "</ul>",
    },
    nlp: {
      title: "NLP Sentiment Classification",
      body:
        "<p>Large-scale sentiment analysis using deep learning with automated hyperparameter optimization.</p>" +
        "<ul>" +
        "<li><strong>Architecture:</strong> Bidirectional LSTM (BiLSTM) with attention mechanism for context-aware feature extraction.</li>" +
        "<li><strong>Optimization:</strong> Optuna-based Bayesian hyperparameter search over learning rate, hidden dimensions, dropout, and embedding size.</li>" +
        "<li><strong>Result:</strong> 79% accuracy on a challenging multi-class sentiment benchmark.</li>" +
        "</ul>",
    },
    yolo: {
      title: "YOLOv8 Maze Robot Image Recognition",
      body:
        "<p>Real-time computer vision system for autonomous robot navigation through complex maze environments.</p>" +
        "<ul>" +
        "<li><strong>Model:</strong> YOLOv8 fine-tuned for maze element detection (walls, paths, markers, decision points).</li>" +
        "<li><strong>Deployment:</strong> Optimized for edge inference on embedded robot hardware.</li>" +
        "<li><strong>Result:</strong> 85.7% detection accuracy enabling reliable autonomous navigation.</li>" +
        "</ul>",
    },
    rl: {
      title: "Reinforcement Learning Double Q-Learning",
      body:
        "<p>Implementation of Double Q-Learning to solve the overestimation bias problem in standard Q-Learning.</p>" +
        "<ul>" +
        "<li><strong>Algorithm:</strong> Double Q-Learning with experience replay and epsilon-greedy exploration.</li>" +
        "<li><strong>Environment:</strong> OpenAI Gym CartPole with stochastic dynamics.</li>" +
        "<li><strong>Result:</strong> Average reward exceeding 195 within 100 training episodes, demonstrating stable and efficient convergence.</li>" +
        "</ul>",
    },
    sql: {
      title: "LLM-based SQL Plan Explanation & Cost Comparison",
      body:
        "<p>Database systems project leveraging LLMs to make query optimization accessible and understandable.</p>" +
        "<ul>" +
        "<li><strong>Plan Explanation:</strong> LLM interprets PostgreSQL EXPLAIN ANALYZE output into plain English, highlighting bottlenecks.</li>" +
        "<li><strong>Cost Comparison:</strong> Automated comparison of alternative query plans with cost breakdowns and optimization recommendations.</li>" +
        "<li><strong>Interface:</strong> Interactive tool for students and developers to learn query optimization through natural language feedback.</li>" +
        "</ul>",
    },
  };

  function openModal(projectKey) {
    var data = projectDetails[projectKey];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    modal.removeAttribute("hidden");
    // Trigger reflow before adding class for animation
    void modal.offsetWidth;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(function () {
      modal.setAttribute("hidden", "");
    }, 300);
  }

  detailButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(this.getAttribute("data-project"));
    });
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
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
