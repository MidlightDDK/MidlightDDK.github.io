(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle: follows the OS until the visitor picks one, then remembers it.
  var toggle = document.getElementById('theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    return root.dataset.theme ? root.dataset.theme === 'dark' : media.matches;
  }
  function syncToggle() {
    toggle.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  }
  toggle.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncToggle();
  });
  media.addEventListener('change', syncToggle);
  syncToggle();

  // Copy the email address, with a visible confirmation.
  var copyBtn = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');
  copyBtn.addEventListener('click', function () {
    var email = copyBtn.dataset.email;
    function done(ok) {
      copyStatus.textContent = ok ? 'Copied ' + email + ' to your clipboard.' : 'Copy failed. The address is ' + email + '.';
      clearTimeout(done.t);
      done.t = setTimeout(function () { copyStatus.textContent = ''; }, 4000);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Border under the sticky nav once the page scrolls.
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.chart').forEach(function (c) { c.classList.add('is-in'); });
    return;
  }

  // Grow chart bars when they scroll into view.
  var chartObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('.chart').forEach(function (c) { chartObserver.observe(c); });

  // Highlight the nav link for the section in view.
  var links = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = links[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(links).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
})();
