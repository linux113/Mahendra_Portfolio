/* Shared behaviour: preloader, reveal-on-scroll, typewriter, counters, comments */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  window.$h = { $, $$ };

  /* preloader */
  window.addEventListener("load", () => {
    setTimeout(() => { const p = $("#preloader"); if (p) p.classList.add("done"); }, 900);
  });

  /* nav scrolled state */
  const nav = $(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* mobile nav */
  const tg = $(".nav-toggle"), links = $(".nav-links");
  if (tg && links) {
    tg.addEventListener("click", () => links.classList.toggle("open"));
    links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });
  }

  /* active nav link on scroll */
  const sections = $$("section[id]");
  if (sections.length) {
    const spy = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = sections[0].id;
      sections.forEach((s) => { if (s.offsetTop <= y) cur = s.id; });
      $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
  }

  /* reveal on scroll */
  const io = ("IntersectionObserver" in window)
    ? new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.12 })
    : null;
  window.observeReveals = () => $$(".reveal:not(.in)").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  /* typewriter */
  window.typewriter = (el, words, speed = 85, pause = 1600) => {
    let wi = 0, ci = 0, del = false;
    (function tick() {
      const w = words[wi % words.length];
      ci += del ? -1 : 1;
      el.textContent = w.slice(0, ci);
      let d = del ? speed / 2 : speed;
      if (!del && ci === w.length) { del = true; d = pause; }
      else if (del && ci === 0) { del = false; wi++; d = 350; }
      setTimeout(tick, d);
    })();
  };

  /* animated counters */
  window.animateCounters = (root) => {
    $$("[data-count]", root || document).forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const t0 = performance.now(), dur = 1400;
      (function step(t) {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  };

  /* ---------- comments (localStorage) ---------- */
  const KEY = "mkp_comments_v1";
  window.comments = {
    all() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } },
    add(c) { const list = this.all(); list.unshift(c); localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50))); return list; },
  };
  window.timeAgo = (ts) => {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return Math.floor(s / 60) + "m ago";
    if (s < 86400) return Math.floor(s / 3600) + "h ago";
    return Math.floor(s / 86400) + "d ago";
  };
  window.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* bind a comment form: {form, name, msg, photoInput, list, count} */
  window.bindComments = (sel) => {
    const form = $(sel.form); if (!form) return;
    const render = () => {
      const list = comments.all();
      $(sel.count).textContent = "(" + list.length + ")";
      $(sel.list).innerHTML = list.length ? list.map((c) => `
        <div class="c-item">
          <div class="c-ava">${c.photo ? `<img src="${c.photo}" alt="">` : esc((c.name || "?")[0].toUpperCase())}</div>
          <div style="flex:1">
            <div class="c-name">${esc(c.name)} <span class="c-time">${timeAgo(c.ts)}</span></div>
            <div class="c-msg">${esc(c.msg)}</div>
          </div>
        </div>`).join("") : `<p style="font-size:.75rem;color:var(--muted);margin-top:10px">No comments yet — be the first!</p>`;
    };
    let photoData = null;
    const pick = $(sel.pick), file = $(sel.photo);
    if (pick && file) {
      pick.addEventListener("click", () => file.click());
      file.addEventListener("change", () => {
        const f = file.files[0]; if (!f) return;
        if (f.size > 5 * 1024 * 1024) { alert("Max file size: 5MB"); return; }
        const r = new FileReader();
        r.onload = () => { photoData = r.result; pick.textContent = "✓ " + f.name; };
        r.readAsDataURL(f);
      });
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $(sel.name).value.trim(), msg = $(sel.msg).value.trim();
      if (!name || !msg) return;
      comments.add({ name, msg, photo: photoData, ts: Date.now() });
      form.reset(); photoData = null; if (pick) pick.textContent = pick.dataset.label || "Choose Profile Photo";
      render();
    });
    render();
    setInterval(render, 30000);
  };

  /* contact form (demo submit) */
  window.bindContact = (formSel, btnSel) => {
    const form = $(formSel); if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = $(btnSel, form) || form.querySelector("button[type=submit]");
      const old = btn.innerHTML;
      btn.innerHTML = "✓ Message Sent!";
      btn.disabled = true;
      setTimeout(() => { btn.innerHTML = old; btn.disabled = false; form.reset(); }, 2600);
    });
  };

  /* back to top */
  window.bindTop = (sel) => {
    const b = $(sel); if (!b) return;
    b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  };
})();
