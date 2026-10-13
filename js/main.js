(function () {
  "use strict";
  const C = window.STUDIO_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Links de contato ---------- */
  const igUser = (C.instagram || "").replace("@", "");
  const igUrl = igUser ? `https://www.instagram.com/${igUser}/` : "#";
  const phone = (C.whatsapp || "").replace(/\D/g, "");
  const waUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(C.mensagemWhatsapp || "")}`
    : igUser ? `https://ig.me/m/${igUser}` : "#";

  $$("[data-whatsapp]").forEach(a => setExternal(a, waUrl));
  $$("[data-instagram]").forEach(a => setExternal(a, igUrl));

  function setExternal(a, url) {
    a.href = url;
    if (url.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
  }

  /* ---------- Imagens com fallback elegante ---------- */
  function mountImage(figure, data, eager) {
    if (!data || !data.src) { figure.classList.add("is-empty"); return null; }
    const img = new Image();
    img.alt = data.alt || "";
    img.decoding = "async";
    img.loading = eager ? "eager" : "lazy";
    if (eager) img.fetchPriority = "high";
    img.onerror = () => { img.remove(); figure.classList.add("is-empty"); figure.closest(".gallery__item")?.classList.add("is-placeholder"); };
    img.src = data.src;
    figure.appendChild(img);
    return img;
  }
  $$("[data-img]").forEach(f => mountImage(f, (C.imagens || {})[f.dataset.img], f.dataset.img === "hero"));

  /* ---------- Galeria + lightbox ---------- */
  const gallery = $("#gallery");
  const items = C.galeria || [];
  items.forEach((it, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery__item reveal";
    btn.setAttribute("aria-label", `Ampliar foto: ${it.alt || "resultado " + (i + 1)}`);
    const fig = document.createElement("figure");
    fig.className = "media";
    fig.dataset.label = `Galeria · ${it.src.split("/").pop()}`;
    btn.appendChild(fig);
    mountImage(fig, it);
    btn.addEventListener("click", () => { if (!btn.classList.contains("is-placeholder")) openLb(i, btn); });
    gallery.appendChild(btn);
  });

  const lb = $("#lightbox"), lbImg = $(".lightbox__img", lb);
  let lbIndex = 0, lbReturn = null;
  const visible = () => $$(".gallery__item", gallery).map((b, i) => (b.classList.contains("is-placeholder") ? null : i)).filter(i => i !== null);

  function showLb(i) { lbIndex = i; lbImg.src = items[i].src; lbImg.alt = items[i].alt || ""; }
  function openLb(i, from) {
    lbReturn = from; showLb(i); lb.hidden = false;
    document.body.style.overflow = "hidden"; $(".lightbox__close", lb).focus();
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; lbReturn && lbReturn.focus(); }
  function step(d) {
    const v = visible(); if (!v.length) return;
    const pos = v.indexOf(lbIndex);
    showLb(v[(pos + d + v.length) % v.length]);
  }
  $(".lightbox__close", lb).addEventListener("click", closeLb);
  $(".lightbox__prev", lb).addEventListener("click", () => step(-1));
  $(".lightbox__next", lb).addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "Tab") { // focus trap
      const f = $$("button", lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let tx = 0;
  lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });

  /* ---------- Antes e depois ---------- */
  const pairs = (C.antesDepois || []).filter(p => p.antes && p.depois);
  if (pairs.length) {
    $("#compareWrap").hidden = false;
    const list = $("#compareList");
    pairs.forEach((p, i) => {
      const el = document.createElement("div");
      el.className = "compare reveal";
      el.innerHTML = `
        <img src="${p.antes}" alt="Antes — ${p.alt || "cliente " + (i + 1)}" loading="lazy">
        <img class="compare__after" src="${p.depois}" alt="Depois — ${p.alt || "cliente " + (i + 1)}" loading="lazy">
        <span class="compare__tag compare__tag--a">Antes</span><span class="compare__tag compare__tag--d">Depois</span>
        <span class="compare__bar" aria-hidden="true"></span>
        <input type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois">`;
      const r = $("input", el);
      r.addEventListener("input", () => el.style.setProperty("--pos", r.value + "%"));
      list.appendChild(el);
    });
  }

  /* ---------- Depoimentos ---------- */
  const deps = (C.depoimentos || []).filter(d => d.texto);
  if (deps.length) {
    const grid = $("#testimonials");
    deps.forEach(d => {
      const f = document.createElement("figure");
      f.className = "testimonial reveal";
      const q = document.createElement("blockquote"); q.textContent = d.texto;
      const c = document.createElement("figcaption"); c.textContent = d.nome || "";
      f.innerHTML = '<span class="quote-mark" aria-hidden="true">“</span>';
      f.append(q, c); grid.appendChild(f);
    });
  } else {
    $("#testimonialsEmpty").hidden = false;
  }

  /* ---------- Rodapé ---------- */
  const info = $("#footerInfo");
  [["Endereço", C.endereco], ["Horário", C.horario]].forEach(([k, v]) => {
    if (!v) return;
    const p = document.createElement("p");
    p.innerHTML = `<strong>${k}</strong>`; p.append(v); info.appendChild(p);
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Header + menu ---------- */
  const header = $(".header"), burger = $(".burger"), nav = $("#nav"), fab = $(".float-wa");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 30);
    fab.classList.toggle("is-visible", y > window.innerHeight * .7);
  };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  function setMenu(open) {
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); burger.focus(); } });

  /* ---------- Link ativo ---------- */
  const links = $$(".nav ul a");
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["inicio", "studio", "megahair", "resultados", "contato"].forEach(id => { const s = document.getElementById(id); s && spy.observe(s); });

  /* ---------- FAQ: só um aberto por vez ---------- */
  const accs = $$(".acc");
  accs.forEach(d => d.addEventListener("toggle", () => { if (d.open) accs.forEach(o => o !== d && (o.open = false)); }));

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: .05, rootMargin: "0px 0px -20px 0px" });
  $$(".reveal").forEach((el, i) => {
    const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.transitionDelay = Math.min(sib, 5) * 70 + "ms";
    io.observe(el);
  });
})();
