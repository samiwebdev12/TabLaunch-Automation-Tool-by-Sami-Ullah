/* set the theme before the page paints */

/* pick saved or system theme */
(function applyInitialTheme() {
  function setTheme(themeName) {
    if (themeName === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme'); // dark = default
    }
  }

  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {
    /* storage unavailable — fall back to system preference */
  }

  var theme =
    saved ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(theme);
})();

/* run the rest after the page is ready */
document.addEventListener('DOMContentLoaded', function () {
  /* top banner: restore dismissal + rotate messages */
  var banner = document.querySelector('.updates-banner');
  if (banner) {
    var version = banner.getAttribute('data-announcement-version');

    try {
      if (localStorage.getItem('dismissedAnnouncementVersion') === version) {
        banner.classList.add('js-hidden');
        document.documentElement.classList.add('banner-hidden');
      }
    } catch (e) {
      /* ignore storage errors */
    }

    var messages = banner.querySelectorAll('[data-banner-message]');
    if (messages.length > 1) {
      // pick a random starting message (remembered per session)
      var startIndex = Math.floor(Math.random() * messages.length);
      try {
        var stored = sessionStorage.getItem('initialAnnouncementMessage:' + version);
        if (stored !== null) startIndex = Number(stored);
        else sessionStorage.setItem('initialAnnouncementMessage:' + version, String(startIndex));
      } catch (e) {
        /* ignore storage errors */
      }

      function activate(index) {
        for (var i = 0; i < messages.length; i++) {
          var isActive = i === index;
          messages[i].classList.toggle('active', isActive);
          messages[i].setAttribute('aria-hidden', String(!isActive));
        }
      }
      activate(startIndex);

      var seconds = Number(banner.getAttribute('data-rotation-interval-seconds')) || 8;
      window.setInterval(function () {
        var current = -1;
        for (var j = 0; j < messages.length; j++) {
          if (messages[j].classList.contains('active')) {
            current = j;
            break;
          }
        }
        activate((current + 1) % messages.length);
      }, seconds * 1000);
    }

    var dismissBtn = document.getElementById('banner-dismiss-btn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        banner.classList.add('js-hidden');
        document.documentElement.classList.add('banner-hidden');
        try {
          localStorage.setItem('dismissedAnnouncementVersion', version);
        } catch (e) {
          /* ignore storage errors */
        }
      });
    }
  }

  /* theme toggle */
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme'); // dark
        try {
          localStorage.setItem('theme', 'dark');
        } catch (e) {
          /* ignore */
        }
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        try {
          localStorage.setItem('theme', 'light');
        } catch (e) {
          /* ignore */
        }
      }
    });
  }

  /* mobile hamburger menu */
  var navToggle = document.getElementById('navbar-toggle');
  var navContainer = document.querySelector('.navbar-fixed-container');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navContainer) {
    function closeMenu() {
      navContainer.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', function () {
      var open = navContainer.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    if (navMenu) {
      var links = navMenu.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', closeMenu);
      }
    }

    // close the menu when clicking outside or pressing Escape
    document.addEventListener('click', function (event) {
      if (!navContainer.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }
});