// Cabeçalho e rodapé compartilhados por todas as páginas.
// Para adicionar uma página ao menu, inclua-a em PAGES.
// O script é carregado logo após <body>, então o cabeçalho aparece antes do conteúdo (sem "piscar").
(function () {
  var PAGES = [
    { href: "index.html",     label: "Início" },
    { href: "jogo.html",      label: "O Jogo" },
    { href: "como-jogar.html", label: "Como Jogar" },
    { href: "novidades.html", label: "Novidades" },
    { href: "midia.html",     label: "Mídia" },
    { href: "sobre.html",     label: "Sobre" }
  ];
  // ID do vídeo do YouTube usado nos links "Abrir no YouTube". O player fica no HTML (index, midia, como-jogar).
  var VIDEO_ID = "XwUCWeQ5r00";
  // Link da página do jogo na loja Steam. Enquanto estiver vazio, os botões mostram "Em breve na Steam".
  var STEAM_URL = "";

  var here = location.pathname.split("/").pop() || "index.html";
  var links = PAGES.map(function (p) {
    return '<a href="' + p.href + '"' + (p.href === here ? ' aria-current="page"' : "") + ">" + p.label + "</a>";
  }).join("");

  document.body.insertAdjacentHTML("afterbegin",
    '<header class="site-header"><div class="bar">' +
      '<a class="brand" href="index.html"><img src="assets/bananie.svg" alt="">' +
        '<span>Ninja vs Samurai<small>MEGA BLASTER BATTLE ROYALE</small></span></a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
      '<nav class="site-nav" id="site-nav" aria-label="Principal">' + links +
        '<a class="nav-steam steam-link" href="#">Steam</a></nav>' +
    "</div></header>");

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("beforeend",
      '<footer class="site-footer"><div class="inner">' +
        '<div><div class="studio-line"><img src="assets/bananie.svg" alt="Logo da Bananie">' +
          '<div><h4 style="margin:0">Bananie</h4>Um estúdio pequeno fazendo jogos para jogar com os amigos.</div></div></div>' +
        "<div><h4>Páginas</h4><ul>" + PAGES.map(function (p) {
          return '<li><a href="' + p.href + '">' + p.label + "</a></li>"; }).join("") + "</ul></div>" +
        "<div><h4>Acompanhe</h4><ul>" +
          '<li><a class="steam-link" href="#">Steam</a></li>' +
          '<li><a href="https://www.youtube.com/watch?v=' + VIDEO_ID + '" target="_blank" rel="noopener">Trailer no YouTube</a></li>' +
          '<li><a href="https://github.com/JeanZap/ninja-mega-blaster" target="_blank" rel="noopener">Código deste site</a></li>' +
        "</ul></div>" +
        '<div class="legal">Ninja vs Samurai Mega Blaster Battle Royale · © ' + new Date().getFullYear() +
          " Bananie. Inspirado no mapa customizado clássico “Ninja vs Samurai”, de Shin.hayate e Nintendoman_766.</div>" +
      "</div></footer>");

    // Botões da Steam: viram link quando STEAM_URL for preenchido.
    document.querySelectorAll("a.steam-link").forEach(function (a) {
      if (STEAM_URL) {
        a.href = STEAM_URL; a.target = "_blank"; a.rel = "noopener";
        a.textContent = a.getAttribute("data-label") || "Ver na Steam";
      } else {
        a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); a.classList.add("soon");
        a.textContent = "Em breve na Steam";
      }
    });

    document.querySelectorAll("a.yt-link").forEach(function (a) { a.href = "https://www.youtube.com/watch?v=" + VIDEO_ID; });
  });
})();
