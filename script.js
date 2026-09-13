/* Portfolio interactions: filter + status line. Content owners: edit the TODOs in index.html; no JS config needed. */
(function () {
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('.log-row'));
  var ink = document.querySelector('.filter-ink');
  var empty = document.getElementById('logEmpty');

  function moveInk(btn) {
    if (!ink || !btn) return;
    ink.style.width = btn.offsetWidth + 'px';
    ink.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
  }

  function applyFilter(value, btn) {
    var shown = 0;
    rows.forEach(function (row) {
      var domains = (row.getAttribute('data-domains') || '').split(/\s+/);
      var show = value === 'all' || domains.indexOf(value) !== -1;
      row.classList.toggle('is-hidden', !show);
      if (show) shown += 1;
    });
    buttons.forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (empty) empty.hidden = shown !== 0;
    moveInk(btn);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'), btn);
    });
  });

  window.addEventListener('resize', function () {
    var active = document.querySelector('.filter.is-active');
    moveInk(active);
  });
  window.addEventListener('load', function () {
    moveInk(document.querySelector('.filter.is-active'));
  });
  moveInk(document.querySelector('.filter.is-active'));

  // One authored moment: status line types after the trace draws.
  var line = document.getElementById('statusLine');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // TODO(owner): set your real email here to match the hero button.
  var msg = 'link: ready — hansprielasantos02@gmail.com';
  if (!line) return;
  if (reduce) {
    line.textContent = msg;
    return;
  }
  var full = msg;
  var i = 0;
  line.textContent = 'link: warming up…';
  setTimeout(function tick() {
    i += 1;
    line.textContent = full.slice(0, i);
    if (i < full.length) setTimeout(tick, 34);
  }, 1750);
})();
