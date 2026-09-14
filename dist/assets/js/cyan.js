/* Neon-cyan variant renderer */
(function () {
  const { $ } = window.$h;
  const D = window.PORTFOLIO;
  const esc = window.esc;

  $("#heroName").textContent = D.name;
  $("#heroLead").textContent = D.heroLine + " " + D.aboutIntro;
  typewriter($("#typeTarget"), D.roles);

  $("#socials").innerHTML = `
    <a href="${D.contact.github}" target="_blank" rel="noopener" aria-label="GitHub">${svg("github")}</a>
    <a href="mailto:${D.contact.email}" aria-label="Email">${svg("mail")}</a>
    <a href="${D.contact.phoneHref}" aria-label="Phone">${svg("phone")}</a>
    <a href="#contact" aria-label="Contact">${svg("link")}</a>`;

  $("#aboutP1").textContent = D.about[0];
  $("#aboutP2").textContent = D.about[1];

  $("#svcGrid").innerHTML = D.services.map((s) => `
    <div class="svc reveal">
      <div class="ic">${s.icon}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
      <a class="btn-mini" href="#contact">read more</a>
    </div>`).join("");

  $("#prjGrid").innerHTML = D.projects.map((p) => `
    <a class="prj reveal" href="${p.link || "#contact"}" ${p.link ? 'target="_blank" rel="noopener"' : ""}>
      <div class="bg" style="background:linear-gradient(150deg,hsl(${p.hue} 60% 20%),hsl(${(p.hue + 60) % 360} 65% 10%))">${p.emoji}</div>
      <span class="badge">${esc(p.cat)}</span>
      <div class="ov"><b>${esc(p.title)}</b><span>${esc(p.tags.slice(0, 3).join(" • "))}</span></div>
    </a>`).join("");

  $("#copyright").innerHTML = `Copyright © 2026 by ${esc(D.name)} | All Rights Reserved.`;
  bindTop("#topBtn");
  bindContact("#contactForm");
  observeReveals();

  function svg(n) {
    const p = {
      github: "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.13v3.16c0 .31.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z",
      mail: "M2 5h20v14H2V5Zm2 2v.4l8 5.3 8-5.3V7H4Zm16 2.6-8 5.3-8-5.3V17h16V9.6Z",
      phone: "M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z",
      link: "M10.6 13.4a1 1 0 0 0 1.4 1.4l4-4a3 3 0 0 0-4.2-4.2l-2 2a1 1 0 1 0 1.4 1.4l2-2a1 1 0 0 1 1.4 1.4l-4 4Zm2.8-2.8a1 1 0 0 0-1.4-1.4l-4 4a3 3 0 0 0 4.2 4.2l2-2a1 1 0 1 0-1.4-1.4l-2 2a1 1 0 0 1-1.4-1.4l4-4Z"
    }[n];
    return `<svg viewBox="0 0 24 24"><path d="${p}"/></svg>`;
  }
})();
