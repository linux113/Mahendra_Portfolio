/* Purple variant renderer */
(function () {
  const { $, $$ } = window.$h;
  const D = window.PORTFOLIO;
  const esc = window.esc;

  /* nav */
  $("#navLinks").innerHTML = D.navLinks.map((l) => `<li><a href="#${l.id}">${l.label}</a></li>`).join("");
  $(".brand").textContent = D.brand;

  /* hero */
  $("#heroBadge").innerHTML = `<span class="dot"></span> ${esc(D.badge)}`;
  $("#heroName").innerHTML = `Flutter<br><span class="grad">Developer</span>`;
  $("#heroLead").textContent = D.heroLine;
  $("#heroChips").innerHTML = ["Flutter", "Dart", "Firebase", "GetX"].map((t) => `<span class="chip">${t}</span>`).join("");
  typewriter($("#typeTarget"), D.roles.slice(1).concat([D.roles[0]]));

  /* about */
  $("#aboutName").textContent = D.name;
  $("#aboutText").innerHTML = D.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats.map((s) => `
    <div class="stat reveal">
      <div class="top"><span class="ico">${icon(s.icon)}</span><span class="num"><span data-count="${s.value}">0</span>${s.suffix}</span></div>
      <span class="lbl">${esc(s.label)}</span>
      <span class="dsc">${esc(s.desc)}</span>
      <span class="arrow">↗</span>
    </div>`).join("");

  /* experience */
  $("#timeline").innerHTML = D.experience.map((x) => `
    <div class="t-item reveal">
      <div class="t-period">${esc(x.period)}</div>
      <h4>${esc(x.company)}</h4>
      <div class="t-role">${esc(x.role)}</div>
      <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>`).join("");

  /* showcase tabs */
  const panels = { projects: $("#panel-projects"), certs: $("#panel-certs"), tech: $("#panel-tech") };
  $$(".tab").forEach((t) => t.addEventListener("click", () => {
    $$(".tab").forEach((o) => o.classList.toggle("active", o === t));
    Object.entries(panels).forEach(([k, el]) => (el.style.display = k === t.dataset.tab ? "" : "none"));
  }));

  /* projects */
  const grid = $("#projGrid");
  const renderProjects = (filter) => {
    const list = filter === "all" ? D.projects : D.projects.filter((p) => p.category === filter);
    grid.innerHTML = list.map((p) => `
      <article class="p-card reveal in" data-id="${p.id}">
        <div class="p-thumb" style="background:linear-gradient(140deg,hsl(${p.hue} 70% 22%),hsl(${(p.hue + 60) % 360} 75% 12%))">${p.emoji}</div>
        <div class="p-body">
          <div class="cat">${esc(p.cat)}</div>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.desc)}</p>
          <div class="p-tags">${p.tags.slice(0, 3).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
    grid.querySelectorAll(".p-card").forEach((c) => c.addEventListener("click", () => openDetail(c.dataset.id)));
  };
  $("#pFilters").innerHTML = D.projectFilters.map((f, i) => `<button class="p-filter${i === 0 ? " active" : ""}" data-f="${f.id}">${f.label}</button>`).join("");
  $$(".p-filter").forEach((b) => b.addEventListener("click", () => {
    $$(".p-filter").forEach((o) => o.classList.toggle("active", o === b));
    renderProjects(b.dataset.f);
  }));
  renderProjects("all");

  /* tech stack */
  $("#techGrid").innerHTML = D.techStack.map((t) => `
    <div class="tech reveal"><div class="ti">${t.icon}</div><div class="tn">${esc(t.name)}</div><span class="lv ${t.level}">${t.level}</span></div>`).join("");

  /* education */
  $("#eduGrid").innerHTML = D.education.map((e) => `
    <div class="edu reveal"><div class="yr">${e.year}</div><h4>${esc(e.title)}</h4><div class="bd">${esc(e.board)}</div><span class="sc">${esc(e.score)}</span></div>`).join("");

  /* project detail modal */
  const modal = $("#modal");
  function openDetail(id) {
    const p = D.projects.find((x) => x.id === id); if (!p) return;
    $("#modalBody").innerHTML = `
      <div class="crumb"><button id="backBtn">← Back</button><span>Projects</span><span>›</span><span style="color:#e9d5ff">${esc(p.title)}</span></div>
      <div class="detail-grid">
        <div>
          <h2>${esc(p.title)}</h2><div class="underline"></div>
          <p class="desc">${esc(p.long)}</p>
          <div class="metric-row">${p.metrics.map((m) => `<div class="metric"><span style="font-size:1.1rem">${p.emoji}</span><div><b>${m.v}</b><br><span>${esc(m.l)}</span></div></div>`).join("")}</div>
          <div class="hero-cta" style="margin:14px 0">
            ${p.link ? `<a class="btn btn-fill" href="${p.link}" target="_blank" rel="noopener">Live Demo ↗</a>` : ""}
            <a class="btn btn-ghost" href="${D.contact.github}" target="_blank" rel="noopener">GitHub ⌥</a>
          </div>
          <h5 style="font-size:.82rem;margin:14px 0 10px;color:#e9d5ff">&lt;/&gt; Technologies Used</h5>
          <div class="chips">${p.tags.map((t) => `<span class="chip">◈ ${esc(t)}</span>`).join("")}</div>
        </div>
        <div>
          <div class="mock"><div class="bar"><i></i><i></i><i></i></div><div class="screen" style="background:linear-gradient(150deg,hsl(${p.hue} 65% 20%),hsl(${(p.hue + 70) % 360} 70% 10%))">${p.emoji}</div></div>
          <div class="keybox"><h5>✦ Key Features</h5><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
        </div>
      </div>`;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    $("#backBtn").addEventListener("click", closeDetail);
  }
  function closeDetail() { modal.classList.remove("open"); document.body.style.overflow = ""; }
  modal.addEventListener("click", (e) => { if (e.target.classList.contains("scrim")) closeDetail(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDetail(); });

  /* contact info + comments */
  $("#connectList").innerHTML = `
    <a href="mailto:${D.contact.email}"><span class="ci">✉</span><div><b>Email</b><small>${D.contact.email}</small></div></a>
    <a href="${D.contact.phoneHref}"><span class="ci">☎</span><div><b>Phone</b><small>${D.contact.phone}</small></div></a>
    <a href="${D.contact.github}" target="_blank" rel="noopener"><span class="ci">⌥</span><div><b>GitHub</b><small>${D.contact.githubUser}</small></div></a>`;
  $("#socials").innerHTML = `
    <a href="${D.contact.github}" target="_blank" rel="noopener" aria-label="GitHub">${svgIcon("github")}</a>
    <a href="mailto:${D.contact.email}" aria-label="Email">${svgIcon("mail")}</a>
    <a href="${D.contact.phoneHref}" aria-label="Phone">${svgIcon("phone")}</a>`;
  bindComments({ form: "#commentForm", name: "#cName", msg: "#cMsg", photo: "#cPhoto", pick: "#cPick", list: "#cList", count: "#cCount" });
  bindContact("#contactForm");

  /* footer */
  $("#foot").innerHTML = `<span>© 2026 ${esc(D.name)}. All rights reserved.</span>
    <span>Crafted with <span class="heart">♥</span> using Flutter &amp; React</span>
    <a class="theme-switch" style="position:static" href="cyan.html">Switch theme ▸ Neon Cyan</a>`;

  /* init observers */
  observeReveals();
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { animateCounters(e.target); cio.unobserve(e.target); }
    }), { threshold: 0.4 });
    cio.observe($("#stats"));
  } else {
    animateCounters($("#stats"));
  }

  function icon(n) {
    return {
      code: "&lt;/&gt;", award: "🏅", globe: "🌐"
    }[n] || "◆";
  }
  function svgIcon(n) {
    const p = {
      github: "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.13v3.16c0 .31.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z",
      mail: "M2 5h20v14H2V5Zm2 2v.4l8 5.3 8-5.3V7H4Zm16 2.6-8 5.3-8-5.3V17h16V9.6Z",
      phone: "M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"
    }[n];
    return `<svg viewBox="0 0 24 24"><path d="${p}"/></svg>`;
  }
})();
