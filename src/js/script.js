(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const header = $(".header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const toggle = $(".menu-toggle");
  const navList = $(".nav-list");

  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const open = navList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    navList.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        navList.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navList.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  const yearEl = $("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const revealEls = $$(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  const counters = $$("[data-counter]");
  if (counters.length && "IntersectionObserver" in window) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.counter, 10) || 0;
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        el.textContent = value.toLocaleString("pt-BR") + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString("pt-BR") + suffix;
      };
      requestAnimationFrame(step);
    };

    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterIO.observe(el));
  }

  const quizTabs = $$(".quiz-tab");
  const quizResult = $("#quiz-result");

  const quizData = {
    fps: {
      title: "Atirador competitivo",
      tagline: "FPS · Precisão & velocidade",
      desc: "Você precisa de precisão cirúrgica, latência mínima e equipamento que não falha sob pressão. Mouse ultraleve, teclado mecânico de resposta imediata e monitor 240Hz fazem você ver o alvo antes do inimigo piscar.",
      recos: [
        { icon: "🖱️", name: "Mouse AeroLite FPS Lightspeed", spec: "47g · 25k DPI · 1ms latência", price: 749, oldPrice: 999, cat: "periferico", img: "../src/assets/img/product-mouse-fps.jpg" },
        { icon: "⌨️", name: "Teclado RaidKey TKL Mecânico", spec: "TKL · RGB per-key · Hot-swap", price: 729, oldPrice: 899, cat: "periferico", img: "../src/assets/img/product-keyboard.jpg" },
        { icon: "🖥️", name: 'Monitor Vortex 27" 240Hz', spec: "240Hz · QHD IPS · 1ms GtG", price: 2499, oldPrice: 2999, cat: "monitor", img: "../src/assets/img/product-monitor.jpg" },
      ],
    },
    moba: {
      title: "Estrategista MOBA",
      tagline: "MOBA · Macros & comunicação",
      desc: "Cliques rápidos com side panel programável, áudio direcional pra ouvir o jungler subindo e mousepad XL pra não ter limite de movimento naquele teamfight de 5min.",
      recos: [
        { icon: "🖱️", name: "Mouse SilentClick MMO 16", spec: "16 botões · 18k DPI · 80M cliques", price: 549, oldPrice: 699, cat: "periferico", img: "../src/assets/img/product-mouse-mmo.jpg" },
        { icon: "🎧", name: "Headset Echo Surround 7.1", spec: "50mm · 7.1 surround · ENC mic", price: 599, oldPrice: 799, cat: "audio", img: "../src/assets/img/product-headset.jpg" },
        { icon: "🟪", name: "Mousepad XL Hyperion RGB", spec: "90x40cm · 14 zonas RGB · Speed", price: 249, oldPrice: 329, cat: "mobiliario", img: "../src/assets/img/product-mousepad.jpg" },
      ],
    },
    rpg: {
      title: "Explorador de mundos abertos",
      tagline: "RPG · Imersão & conforto",
      desc: "Monitor ultrawide pra abraçar o horizonte, headset wireless premium pra cada sussurro da floresta e cadeira que aguenta as 8h da raid de domingo sem dor nas costas.",
      recos: [
        { icon: "🖥️", name: 'Monitor UltraWide Apex 34" 165Hz', spec: '34" 1500R · 165Hz · USB-C 65W', price: 3499, oldPrice: 4199, cat: "monitor", img: "../src/assets/img/product-monitor-ultrawide.jpg" },
        { icon: "🎧", name: "Headset TitanX Wireless", spec: "Planar 50mm · 40h · 2.4GHz", price: 1799, oldPrice: 2299, cat: "audio", img: "../src/assets/img/product-headset-wireless.jpg" },
        { icon: "🪑", name: "Cadeira Throne Elite", spec: "180° reclina · 4D braços · 150kg", price: 1899, oldPrice: 2299, cat: "mobiliario", img: "../src/assets/img/product-chair.jpg" },
      ],
    },
    streamer: {
      title: "Criador de conteúdo",
      tagline: "Streaming · Áudio & vídeo profissional",
      desc: "Imagem nítida em 4K, microfone dinâmico cardioide que corta barulho de fundo e kit completo com mentoria 1:1 pra você crescer no jogo da live.",
      recos: [
        { icon: "🎤", name: "Microfone StreamCast XLR + USB", spec: "Dinâmico · XLR + USB-C · 4 presets", price: 1099, oldPrice: 1399, cat: "streaming", img: "../src/assets/img/product-mic.jpg" },
        { icon: "📹", name: "Webcam StreamView 4K", spec: "Sony STARVIS · 4K · HDR", price: 999, oldPrice: 1299, cat: "streaming", img: "../src/assets/img/product-webcam.jpg" },
        { icon: "💡", name: "Streamer Kit Starter", spec: "Cam + mic + ring light + mentoria", price: 1499, oldPrice: 1999, cat: "streaming", img: "../src/assets/img/product-streamer.jpg" },
      ],
    },
    casual: {
      title: "Gamer casual relax",
      tagline: "Casual · Plug & play",
      desc: "Setup pronto pra ligar e jogar. Console 4K com dois controles inclusos, headset confortável pro fim de noite e biblioteca AAA pra encher o fim de semana.",
      recos: [
        { icon: "🎮", name: "Console NextGen Pro 1TB", spec: "4K · 120fps · 2 controles", price: 4299, oldPrice: 4999, cat: "pc", img: "../src/assets/img/product-console.jpg" },
        { icon: "🎧", name: "Headset EsportPlay Lite", spec: "40mm · mute físico · 3.5mm", price: 249, oldPrice: 349, cat: "audio", img: "../src/assets/img/product-headset-lite.jpg" },
        { icon: "💿", name: "Jogos AAA · Steam Keys", spec: "Steam oficial · entrega instantânea", price: 89, oldPrice: null, cat: "jogo", img: "../src/assets/img/product-game.jpg" },
      ],
    },
  };

  const fmtBRL = (n) => "R$ " + n.toLocaleString("pt-BR");

  const renderQuizResult = (key) => {
    if (!quizResult) return;
    const data = quizData[key];
    if (!data) {
      quizResult.classList.add("is-empty");
      quizResult.innerHTML = `
        <div class="quiz-empty">
          <div class="quiz-orb-icon" aria-hidden="true">
            <span class="quiz-orb-ring"></span>
            <span class="quiz-orb-ring quiz-orb-ring--2"></span>
            <span class="quiz-orb-emoji">🤖</span>
          </div>
          <h4>SetupAI pronta pra analisar</h4>
          <p>Escolha o seu estilo de jogo acima — em milissegundos a IA monta um setup com 3 itens reais do catálogo, mostra a economia e prepara o seu carrinho.</p>
          <div class="quiz-empty-hint" aria-hidden="true">
            <span class="quiz-empty-arrow">↑</span> selecione um estilo de gamer
          </div>
        </div>`;
      return;
    }

    const total = data.recos.reduce((s, r) => s + r.price, 0);
    const oldTotal = data.recos.reduce((s, r) => s + (r.oldPrice || r.price), 0);
    const savings = oldTotal - total;

    quizResult.classList.remove("is-empty");
    quizResult.innerHTML = `
      <span class="quiz-scan" aria-hidden="true"></span>
      <div class="quiz-result-content">
        <span class="quiz-tagline">${data.tagline}</span>
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
        <div class="quiz-summary">
          <div class="quiz-summary-row">
            <span>Setup completo (3 itens)</span>
            <strong>${fmtBRL(total)}</strong>
          </div>
          ${savings > 0 ? `
            <div class="quiz-summary-row is-savings">
              <span>Você economiza</span>
              <strong>${fmtBRL(savings)}</strong>
            </div>` : ""}
        </div>
        <button type="button" class="btn btn-primary quiz-cta" data-add-setup="${key}">
          <span>Pedir setup completo</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
        </button>
        <small class="quiz-cta-hint">Os 3 itens vão direto pro seu carrinho com o desconto.</small>
      </div>
      <div class="quiz-recos">
        <div class="quiz-recos-head">
          <strong>3 itens reais do catálogo</strong>
          <span>toque pra abrir no portfólio</span>
        </div>
        ${data.recos.map((r, i) => `
          <a href="pages/portifolio.html?cat=${r.cat}#produtos" class="quiz-reco">
            <span class="quiz-reco-step" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
            <div class="icon" aria-hidden="true">${r.icon}</div>
            <div class="quiz-reco-body">
              <strong>${r.name}</strong>
              <span>${r.spec}</span>
            </div>
            <div class="quiz-reco-price">
              <span class="price">${fmtBRL(r.price)}</span>
              ${r.oldPrice ? `<small>${fmtBRL(r.oldPrice)}</small>` : ""}
            </div>
            <svg class="quiz-reco-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
          </a>
        `).join("")}
      </div>
    `;
  };

  if (quizTabs.length && quizResult) {
    renderQuizResult(null);
    const playEntering = () => {
      quizResult.classList.remove("is-entering");
      void quizResult.offsetWidth;
      quizResult.classList.add("is-entering");
    };

    quizTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const wasActive = tab.classList.contains("active");
        quizTabs.forEach((t) => t.classList.remove("active"));
        if (wasActive) {
          playEntering();
          renderQuizResult(null);
          return;
        }
        tab.classList.add("active");
        playEntering();
        renderQuizResult(tab.dataset.style);
      });
    });

    quizResult.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add-setup]");
      if (!btn) return;
      const key = btn.dataset.addSetup;
      const data = quizData[key];
      if (!data) return;

      const STORAGE_KEY = "hyperloot.cart";
      let cart = [];
      try {
        cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch {}

      data.recos.forEach((r) => {
        const existing = cart.find((it) => it.name === r.name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name: r.name, price: r.price, img: r.img, qty: 1 });
        }
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch {}

      window.location.href = "pages/portifolio.html?cart=open#produtos";
    });
  }

  const planToggle = $(".plans-toggle");
  if (planToggle) {
    const buttons = $$("button", planToggle);
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.mode;
        $$(".plan-price strong").forEach((el) => {
          const m = el.dataset.monthly;
          const y = el.dataset.yearly;
          if (m && y) el.textContent = mode === "yearly" ? y : m;
        });
        $$(".plan-price span").forEach((el) => {
          if (el.dataset.mode) {
            el.textContent = mode === "yearly" ? "/ ano" : "/ mês";
          }
        });
      });
    });
  }

  const filterPills = $$(".filter-pill");
  const applyFilter = (cat) => {
    filterPills.forEach((p) => p.classList.toggle("active", p.dataset.category === cat));
    $$(".product-row").forEach((row) => {
      if (cat === "all" || row.dataset.category === cat) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => applyFilter(pill.dataset.category));
  });

  if (filterPills.length) {
    const params = new URLSearchParams(window.location.search);
    const initialCat = params.get("cat");
    if (initialCat && filterPills.some((p) => p.dataset.category === initialCat)) {
      applyFilter(initialCat);
    }
  }

  const form = $("#contact-form");

  const validators = {
    nome: (value) => {
      if (!value.trim()) return "Por favor, informe seu nome.";
      if (value.trim().length < 3) return "Nome deve ter pelo menos 3 caracteres.";
      return "";
    },
    email: (value) => {
      const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Informe seu e-mail.";
      if (!rx.test(value)) return "E-mail invalido. Confira o formato.";
      return "";
    },
    telefone: (value) => {
      if (!value.trim()) return "";
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10) return "Telefone deve ter DDD + numero.";
      return "";
    },
    descricao: (value) => {
      if (!value.trim()) return "Conte como podemos ajudar.";
      if (value.trim().length < 10) return "Pelo menos 10 caracteres, por favor.";
      return "";
    },
  };

  const setFieldError = (field, message) => {
    const group = field.closest(".form-group");
    if (!group) return;
    const errorEl = group.querySelector(".form-error");
    if (message) {
      group.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
    } else {
      group.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }
  };

  const validateField = (field) => {
    const validator = validators[field.name];
    if (!validator) return true;
    const msg = validator(field.value);
    setFieldError(field, msg);
    return !msg;
  };

  const phoneInput = form?.querySelector('input[name="telefone"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
      } else if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5}).*/, "($1) $2");
      } else if (v.length > 0) {
        v = v.replace(/(\d{0,2})/, "($1");
      }
      e.target.value = v;
    });
  }

  if (form) {
    form.querySelectorAll(".form-control").forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-group").classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll(".form-control").forEach((field) => {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        const firstError = form.querySelector(".has-error .form-control");
        if (firstError) firstError.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      setTimeout(() => {
        const success = $("#form-success");
        if (success) {
          success.classList.add("show");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        setTimeout(() => success?.classList.remove("show"), 6000);
      }, 900);
    });
  }

  const newsletter = $("#newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletter.querySelector("input");
      const button = newsletter.querySelector("button");
      if (!input.value.includes("@")) {
        input.style.borderColor = "var(--danger)";
        input.placeholder = "E-mail invalido!";
        setTimeout(() => {
          input.style.borderColor = "";
          input.placeholder = "Seu melhor e-mail";
        }, 2000);
        return;
      }
      const originalText = button.textContent;
      button.textContent = "Conectado!";
      button.style.background = "var(--success)";
      input.value = "";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
      }, 2500);
    });
  }

  // ===========================
  // TIMELINE — Drag, nav, progress
  // ===========================
  const timelineWrap = $(".timeline-wrap");
  const timelineTrack = $("[data-timeline-track]");
  if (timelineWrap && timelineTrack) {
    const prevBtn = $("[data-timeline-prev]");
    const nextBtn = $("[data-timeline-next]");
    const progressFill = $("[data-timeline-progress]");

    const updateProgress = () => {
      const max = timelineTrack.scrollWidth - timelineTrack.clientWidth;
      const pct = max > 0 ? (timelineTrack.scrollLeft / max) * 100 : 0;
      if (progressFill) progressFill.style.width = pct + "%";
      if (prevBtn) prevBtn.disabled = timelineTrack.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = timelineTrack.scrollLeft >= max - 2;
      if (timelineTrack.scrollLeft > 10) timelineWrap.classList.add("has-scrolled");
    };

    const scrollByCard = (dir) => {
      const card = timelineTrack.querySelector(".timeline-card");
      if (!card) return;
      const gap = parseInt(getComputedStyle(timelineTrack).gap, 10) || 0;
      const step = card.offsetWidth + gap;
      timelineTrack.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));
    timelineTrack.addEventListener("scroll", updateProgress, { passive: true });

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let movedDistance = 0;

    const onDown = (e) => {
      isDown = true;
      movedDistance = 0;
      startX = (e.pageX ?? e.touches?.[0]?.pageX ?? 0) - timelineTrack.offsetLeft;
      startScroll = timelineTrack.scrollLeft;
      timelineTrack.classList.add("dragging");
    };
    const onUp = () => {
      isDown = false;
      timelineTrack.classList.remove("dragging");
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = (e.pageX ?? e.touches?.[0]?.pageX ?? 0) - timelineTrack.offsetLeft;
      const walk = (x - startX) * 1.6;
      movedDistance = Math.abs(walk);
      timelineTrack.scrollLeft = startScroll - walk;
      if (e.cancelable && movedDistance > 6) e.preventDefault();
    };

    timelineTrack.addEventListener("mousedown", onDown);
    timelineTrack.addEventListener("mouseleave", onUp);
    timelineTrack.addEventListener("mouseup", onUp);
    timelineTrack.addEventListener("mousemove", onMove);

    timelineTrack.addEventListener("click", (e) => {
      if (movedDistance > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    updateProgress();
  }

  // ===========================
  // CART — Simulação de loja (FIAP CP3)
  // ===========================
  const cartToggle = $(".cart-toggle");
  const cartDrawer = $(".cart-drawer");

  if (cartToggle && cartDrawer) {
    const STORAGE_KEY = "hyperloot.cart";
    const cartOverlay = $("[data-cart-overlay]");
    const cartCloseBtn = $(".cart-close");
    const cartBadge = $("[data-cart-count]");
    const cartEmpty = $("[data-cart-empty]");
    const cartItemsEl = $("[data-cart-items]");
    const cartFooter = $("[data-cart-footer]");
    const cartSubtotalEl = $("[data-cart-subtotal]");
    const cartTotalEl = $("[data-cart-total]");
    const cartClearBtn = $("[data-cart-clear]");
    const cartCheckoutBtn = $(".cart-checkout");
    const toast = $("[data-cart-toast]");
    const toastTitle = $("[data-toast-title]");
    const toastMsg = $("[data-toast-msg]");

    const parsePrice = (str) => {
      if (!str) return 0;
      const cleaned = str.replace(/R\$\s*/g, "").replace(/\+/g, "").replace(/\./g, "").replace(",", ".").trim();
      const n = parseFloat(cleaned);
      return isNaN(n) ? 0 : n;
    };

    const formatBRL = (n) =>
      "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const loadCart = () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch {
        return [];
      }
    };

    const saveCart = (cart) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      } catch {}
    };

    let cart = loadCart();
    let toastTimer = null;

    const showToast = (title, msg, type = "ok") => {
      if (!toast) return;
      toastTitle.textContent = title;
      toastMsg.textContent = msg;
      toast.classList.toggle("warn", type === "warn");
      toast.classList.add("show");
      toast.setAttribute("aria-hidden", "false");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
        toast.setAttribute("aria-hidden", "true");
      }, type === "warn" ? 5000 : 2200);
    };

    const renderBadge = () => {
      const count = cart.reduce((sum, it) => sum + it.qty, 0);
      cartBadge.textContent = count;
      cartBadge.hidden = count === 0;
    };

    const renderItems = () => {
      if (cart.length === 0) {
        cartEmpty.hidden = false;
        cartItemsEl.hidden = true;
        cartFooter.hidden = true;
        return;
      }
      cartEmpty.hidden = true;
      cartItemsEl.hidden = false;
      cartFooter.hidden = false;
      cartItemsEl.innerHTML = cart
        .map(
          (it, idx) => `
        <li class="cart-item" data-idx="${idx}">
          <div class="cart-item-img"><img src="${it.img}" alt="" loading="lazy" /></div>
          <div class="cart-item-body">
            <span class="cart-item-name" title="${it.name}">${it.name}</span>
            <span class="cart-item-price">${formatBRL(it.price * it.qty)}</span>
            <div class="cart-item-qty">
              <button type="button" class="cart-qty-btn" data-qty-dec aria-label="Diminuir">−</button>
              <span class="cart-qty-val">${it.qty}</span>
              <button type="button" class="cart-qty-btn" data-qty-inc aria-label="Aumentar">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove" data-remove aria-label="Remover ${it.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </li>`
        )
        .join("");
      const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
      cartSubtotalEl.textContent = formatBRL(subtotal);
      cartTotalEl.textContent = formatBRL(subtotal);
    };

    const render = () => {
      renderBadge();
      renderItems();
    };

    const openCart = () => {
      cartDrawer.classList.add("open");
      cartOverlay.classList.add("open");
      cartDrawer.setAttribute("aria-hidden", "false");
      cartOverlay.setAttribute("aria-hidden", "false");
      cartToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("cart-open");
    };

    const closeCart = () => {
      cartDrawer.classList.remove("open");
      cartOverlay.classList.remove("open");
      cartDrawer.setAttribute("aria-hidden", "true");
      cartOverlay.setAttribute("aria-hidden", "true");
      cartToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("cart-open");
    };

    cartToggle.addEventListener("click", openCart);
    cartCloseBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && cartDrawer.classList.contains("open")) closeCart();
    });

    // Add to cart
    $$(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = btn.closest(".product-row");
        if (!row) return;
        const name = row.querySelector("h3")?.textContent.trim() || "Produto";
        const priceStr = row.querySelector(".product-row-price strong")?.textContent || "";
        const price = parsePrice(priceStr);
        const img = row.querySelector(".product-row-img img")?.getAttribute("src") || "";

        const existing = cart.find((it) => it.name === name);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name, price, img, qty: 1 });
        }
        saveCart(cart);
        render();
        showToast("Adicionado!", `${name} foi pro carrinho`);
      });
    });

    // Qty +/- and remove (event delegation)
    cartItemsEl.addEventListener("click", (e) => {
      const item = e.target.closest(".cart-item");
      if (!item) return;
      const idx = parseInt(item.dataset.idx, 10);
      if (e.target.closest("[data-qty-inc]")) {
        cart[idx].qty += 1;
      } else if (e.target.closest("[data-qty-dec]")) {
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
      } else if (e.target.closest("[data-remove]")) {
        cart.splice(idx, 1);
      } else {
        return;
      }
      saveCart(cart);
      render();
    });

    // Clear cart
    cartClearBtn.addEventListener("click", () => {
      cart = [];
      saveCart(cart);
      render();
    });

    // Checkout (simulation message)
    cartCheckoutBtn.addEventListener("click", () => {
      showToast(
        "Loja em desenvolvimento",
        "Este é um trabalho acadêmico (FIAP CP3). Em breve, vendas reais!",
        "warn"
      );
    });

    render();

    const cartParams = new URLSearchParams(window.location.search);
    if (cartParams.get("cart") === "open") {
      setTimeout(openCart, 250);
    }
  }
})();
