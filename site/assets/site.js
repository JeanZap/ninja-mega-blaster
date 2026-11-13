// Header and footer shared by all pages.
// To add a page to the menu, include it in PAGES.
// The script is loaded right after <body>, so the header appears before the content (without "flashing").
(function () {
  var PAGES = [
    { href: "index.html",     label: "Home" },
    { href: "jogo.html",      label: "The Game" },
    { href: "como-jogar.html", label: "How to Play" },
    { href: "novidades.html", label: "News" },
    { href: "midia.html",     label: "Media" },
    { href: "sobre.html",     label: "About" }
  ];
  // YouTube video ID used in "Open on YouTube" links. The player lives in HTML (index, midia, como-jogar).
  var VIDEO_ID = "XwUCWeQ5r00";
  // Link to the game's Steam store page. While empty, buttons show "Coming soon on Steam".
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
      '<nav class="site-nav" id="site-nav" aria-label="Main">' + links +
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
        '<div><div class="studio-line"><img src="assets/bananie.svg" alt="Bananie logo">' +
          '<div><h4 style="margin:0">Bananie</h4>A small studio making games to play with friends.</div></div></div>' +
        "<div><h4>Pages</h4><ul>" + PAGES.map(function (p) {
          return '<li><a href="' + p.href + '">' + p.label + "</a></li>"; }).join("") + "</ul></div>" +
        "<div><h4>Follow</h4><ul>" +
          '<li><a class="steam-link" href="#">Steam</a></li>' +
          '<li><a href="https://www.youtube.com/watch?v=' + VIDEO_ID + '" target="_blank" rel="noopener">Trailer on YouTube</a></li>' +
          '<li><a href="https://github.com/JeanZap/ninja-mega-blaster" target="_blank" rel="noopener">This site\'s code</a></li>' +
        "</ul></div>" +
        '<div class="legal">Ninja vs Samurai Mega Blaster Battle Royale · © ' + new Date().getFullYear() +
          " Bananie. Inspired by the classic custom map “Ninja vs Samurai” by Shin.hayate and Nintendoman_766.</div>" +
      "</div></footer>");

    // Steam buttons become links when STEAM_URL is filled in.
    document.querySelectorAll("a.steam-link").forEach(function (a) {
      if (STEAM_URL) {
        a.href = STEAM_URL; a.target = "_blank"; a.rel = "noopener";
        a.textContent = a.getAttribute("data-label") || "View on Steam";
      } else {
        a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); a.classList.add("soon");
        a.textContent = "Coming soon on Steam";
      }
    });

    document.querySelectorAll("a.yt-link").forEach(function (a) { a.href = "https://www.youtube.com/watch?v=" + VIDEO_ID; });
  });
})();
