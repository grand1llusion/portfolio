// The time-travelling desk: a slider blends one illustration into the next, and each scene has 2-3 callouts.
// It exposes window.Journey so the terminal can drive it (cd 2016, cat <object>, traceroute career).
(function () {
  'use strict';
  var years = window.JOURNEY, $ = function (s) { return document.querySelector(s); };
  var dialog = $('#memory'), scene = $('.scene'), slider = $('#year-slider');
  var index = 0, position = 0, frame = null, settle = null, rendered = -1;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function childrenIn(year) {
    var n = null;
    Object.keys(window.FAMILY).forEach(function (y) { if (year >= +y) n = window.FAMILY[y]; });
    return n;
  }

  function openStory(meta, title, paragraphs, extra) {
    $('#memory-meta').textContent = meta;
    $('#memory-title').textContent = title;
    var box = $('#memory-content'); box.textContent = '';
    paragraphs.forEach(function (t) { var p = document.createElement('p'); p.textContent = t; box.appendChild(p); });
    if (extra) { var e = document.createElement('p'); e.className = 'from-year'; e.textContent = extra; box.appendChild(e); }
    if (!dialog.open) dialog.showModal();
  }

  function openCallout(r, c) {
    openStory(r.year + ' · ' + r.chapter.toUpperCase(), c.label, [c.text], r.summary);
  }

  function marker(c, onClick, extraClass) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'marker' + (c.x < 16 ? ' l' : c.x > 84 ? ' r' : '') + (c.y < 34 || c.below ? ' low' : '') + (extraClass ? ' ' + extraClass : '');
    b.style.setProperty('--x', c.x + '%'); b.style.setProperty('--y', c.y + '%');
    b.setAttribute('aria-label', c.aria || ('Open story: ' + c.label));
    var dot = document.createElement('span'); dot.className = 'dot'; if (c.dot) dot.textContent = c.dot;
    var label = document.createElement('span'); label.className = 'label'; label.textContent = c.label;
    b.appendChild(dot); b.appendChild(label);
    b.addEventListener('click', onClick);
    return b;
  }

  function person(child) {
    var e = document.createElement('span'); e.className = 'person' + (child ? ' child' : '');
    ['h', 'b', 'a', 'g'].forEach(function (k) { var i = document.createElement('i'); i.className = k; e.appendChild(i); });
    return e;
  }

  function render(i) {
    if (i === rendered) return;
    rendered = index = i;
    var r = years[i];
    slider.setAttribute('aria-valuetext', r.year + ', ' + r.chapter);
    $('#year-label').textContent = r.year + (r.age ? ' · AGE ' + r.age : '');
    $('#headline').textContent = r.headline;
    $('#chapter').textContent = r.chapter.toUpperCase();
    $('#selected-year').textContent = r.year;
    $('#note-label').textContent = r.year + ' / ON THE DESK';
    $('#note-text').textContent = r.note;
    document.querySelectorAll('[data-year-index]').forEach(function (b, n) { b.setAttribute('aria-pressed', String(n === i)); });

    var marks = r.callouts.map(function (c) { return marker(c, function () { openCallout(r, c); }); });
    marks.push(marker({ x: r.screen[0], y: r.screen[1], label: 'Open the terminal', dot: '>_', aria: 'Open the terminal on this screen' },
      function () { if (window.Terminal) window.Terminal.open(); }, 'screen'));
    $('#markers').replaceChildren.apply($('#markers'), marks);

    var kids = childrenIn(r.year), photo = $('#family-photo');
    photo.hidden = kids === null;
    if (kids !== null) {
      var people = [person(false), person(false)];
      for (var k = 0; k < kids; k++) people.push(person(true));
      $('#family-drawing').replaceChildren.apply($('#family-drawing'), people);
      $('#family-caption').textContent = kids + (kids === 1 ? ' CHILD' : ' CHILDREN');
      photo.setAttribute('aria-label', 'Family photo: my wife, me and ' + kids + (kids === 1 ? ' child' : ' children') + '. Open its story.');
    }
    var fam = { 2014: 'Our first child, a daughter, was born.', 2016: 'Our second child was born.', 2019: 'Our third child was born.', 2026: 'My wife and I have four children.' }[r.year] || '';
    $('#family-context').textContent = fam; $('#family-context').hidden = !fam;
    $('#year-summary').textContent = r.summary;
    $('#announcement').textContent = r.year + '. ' + r.chapter + '. ' + r.headline;
    if (window.Terminal) window.Terminal.setYear(r.year);
  }

  // images: the first loads right away, the rest after the page has loaded
  var art = $('#year-art');
  var images = years.map(function (r, i) {
    var img = document.createElement('img'); img.alt = ''; img.decoding = 'async';
    img.dataset.src = 'images/years/' + r.year + '.jpg';
    if (i === 0) img.src = img.dataset.src;
    art.appendChild(img); return img;
  });
  function loadAll() { images.forEach(function (img) { if (!img.src) img.src = img.dataset.src; }); }
  if (document.readyState === 'complete') loadAll(); else window.addEventListener('load', loadAll);

  years.forEach(function (r, i) {
    var b = document.createElement('button'); b.type = 'button'; b.dataset.yearIndex = i; b.textContent = r.year;
    b.style.setProperty('--p', (i / (years.length - 1) * 100) + '%'); b.setAttribute('aria-label', 'Go to ' + r.year);
    b.addEventListener('click', function () { animateTo(i); });
    $('#year-ticks').appendChild(b);
  });

  function paint(value) {
    position = Math.max(0, Math.min(years.length - 1, value));
    var low = Math.floor(position), high = Math.min(low + 1, years.length - 1), mix = position - low;
    images.forEach(function (img, i) {
      if ((i === low || i === high) && !img.src) img.src = img.dataset.src;
      img.style.opacity = i === low ? 1 : i === high ? mix : 0; img.style.zIndex = i === high ? 2 : 1;
    });
    slider.value = position;
    render(Math.round(position));
  }
  function finish() { clearTimeout(settle); scene.classList.remove('is-traveling'); }
  function stop() { if (frame !== null) { cancelAnimationFrame(frame); frame = null; } }
  function animateTo(target, done, ms) {
    stop();
    if (reduced.matches) { paint(target); finish(); if (done) done(); return; }
    var start = position, duration = ms || Math.min(1800, 650 + Math.abs(target - start) * 60), t0 = performance.now();
    scene.classList.add('is-traveling');
    (function tick(now) {
      var t = Math.min(1, (now - t0) / duration), ease = t * t * (3 - 2 * t);
      paint(start + (target - start) * ease);
      if (t < 1) frame = requestAnimationFrame(tick); else { frame = null; finish(); if (done) done(); }
    })(t0);
  }

  slider.max = years.length - 1;
  slider.addEventListener('input', function (e) {
    stop(); scene.classList.add('is-traveling'); paint(Number(e.target.value));
    clearTimeout(settle); settle = setTimeout(finish, 160);
  });
  slider.addEventListener('change', function () { animateTo(Math.round(position)); });
  slider.addEventListener('keydown', function (e) {
    var keys = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
    if (e.key in keys || e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      var t = e.key === 'Home' ? 0 : e.key === 'End' ? years.length - 1 : Math.max(0, Math.min(years.length - 1, Math.round(position) + keys[e.key]));
      animateTo(t);
    }
  });

  $('#family-photo').addEventListener('click', function () {
    var r = years[index], kids = childrenIn(r.year);
    openStory(r.year + ' · OUR FAMILY', 'The photo on my desk',
      ['My wife and I have four children. This photo shows our family as it was in ' + r.year + ': ' + kids + (kids === 1 ? ' child.' : ' children.'),
       'Technology has always been part of the story, but family is the center of it.']);
  });
  $('#future').addEventListener('click', function () {
    openStory('2027 · WHAT’S NEXT', window.NEXT.title, [window.NEXT.text, 'These are goals, not finished achievements.']);
  });
  $('#close-memory').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (e) {
    var b = dialog.getBoundingClientRect();
    if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) dialog.close();
  });

  window.Journey = {
    years: years,
    current: function () { return years[index]; },
    go: function (year, done) {
      var i = years.findIndex(function (r) { return r.year === year; });
      if (i < 0) return false;
      document.getElementById('journey').scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
      animateTo(i, done); return true;
    },
    step: function (i, ms, done) { animateTo(i, done, ms); },
    indexOf: function (year) { return years.findIndex(function (r) { return r.year === year; }); },
    open: function (c) { openCallout(years[index], c); },
    next: function () { openStory('2027 · WHAT’S NEXT', window.NEXT.title, [window.NEXT.text]); }
  };
  paint(0);
})();
