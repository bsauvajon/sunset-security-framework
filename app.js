/* Sunset Security Framework — câblage DOM et interactions. */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  /* ------------------------------------------------------------
     Compteur d'obsolescence
     ------------------------------------------------------------ */
  function initMeter() {
    var text = $('#obsolescence-meter');
    var fill = $('#meter-fill');
    if (!text || !fill) return;

    var ticking = false;
    var maxPercent = 0;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      ratio = Math.max(0, Math.min(1, ratio));
      var percent = Math.round(ratio * 100);
      if (percent <= maxPercent) percent = maxPercent;
      maxPercent = percent;
      text.textContent = 'OBSOLESCENCE ' + percent + ' %';
      fill.style.width = percent + '%';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    window.addEventListener('resize', update);
    update();
  }

  /* ------------------------------------------------------------
     Section courante dans la navigation
     ------------------------------------------------------------ */
  function initNavCurrent() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav a[href^="#"]')
    );
    if (!links.length) return;

    var sections = links.map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    });

    function update() {
      var index = -1;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i] && sections[i].getBoundingClientRect().top <= 120) {
          index = i;
        }
      }
      links.forEach(function (link, i) {
        if (i === index) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------
     Radar
     ------------------------------------------------------------ */
  var radarValues = null;
  var radarFrame = null;

  function drawRadar(canvas, values, animate) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var SIZE = 480;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var cx = SIZE / 2;
    var cy = SIZE / 2;
    var radius = SIZE * 0.34;
    var count = 8;

    function point(index, factor) {
      var angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
      return {
        x: cx + Math.cos(angle) * radius * factor,
        y: cy + Math.sin(angle) * radius * factor,
        angle: angle
      };
    }

    function paint(progress) {
      ctx.clearRect(0, 0, SIZE, SIZE);

      ctx.lineWidth = 1;
      for (var ring = 1; ring <= 3; ring++) {
        ctx.beginPath();
        for (var i = 0; i < count; i++) {
          var p = point(i, ring / 3);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = ring === 3 ? 'rgba(232,237,230,0.18)' : 'rgba(232,237,230,0.07)';
        ctx.stroke();
      }

      for (var a = 0; a < count; a++) {
        var tip = point(a, 1);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(tip.x, tip.y);
        ctx.strokeStyle = 'rgba(232,237,230,0.06)';
        ctx.stroke();
      }

      var shape = [];
      for (var s = 0; s < count; s++) {
        var value = values && typeof values[s] === 'number' ? values[s] : 0;
        var clamped = Math.max(0, Math.min(1, value));
        shape.push(point(s, clamped * progress));
      }

      ctx.beginPath();
      ctx.moveTo(shape[0].x, shape[0].y);
      for (var q = 1; q < shape.length; q++) ctx.lineTo(shape[q].x, shape[q].y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(198,255,74,0.16)';
      ctx.fill();
      ctx.strokeStyle = '#C6FF4A';
      ctx.lineWidth = 2;
      ctx.stroke();

      for (var d = 0; d < shape.length; d++) {
        ctx.beginPath();
        ctx.arc(shape[d].x, shape[d].y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#C6FF4A';
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(110,119,110,0.9)';
      ctx.font = '10px ui-monospace, Menlo, monospace';
      ctx.textBaseline = 'middle';
      for (var l = 0; l < count; l++) {
        var lbl = point(l, 1);
        var lx = cx + Math.cos(lbl.angle) * (radius + 20);
        var ly = cy + Math.sin(lbl.angle) * (radius + 20);
        ctx.textAlign = Math.abs(Math.cos(lbl.angle)) < 0.2
          ? 'center'
          : (Math.cos(lbl.angle) > 0 ? 'left' : 'right');
        ctx.fillText('0' + (l + 1), lx, ly);
      }
    }

    if (!animate || reducedMotion.matches) {
      if (radarFrame) {
        window.cancelAnimationFrame(radarFrame);
        radarFrame = null;
      }
      paint(1);
      return;
    }

    if (radarFrame) window.cancelAnimationFrame(radarFrame);

    var start = null;
    var duration = 400;

    function frame(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(1, elapsed / duration);
      var eased = 1 - Math.pow(1 - progress, 3);
      paint(eased);
      if (progress < 1) {
        radarFrame = window.requestAnimationFrame(frame);
      } else {
        radarFrame = null;
      }
    }

    radarFrame = window.requestAnimationFrame(frame);
  }

  function initRadarResize() {
    var canvas = $('#radar');
    if (!canvas) return;
    var timer = null;
    window.addEventListener('resize', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        drawRadar(canvas, radarValues, false);
      }, 150);
    });
  }

  /* ------------------------------------------------------------
     Grille de maturité
     ------------------------------------------------------------ */
  function initQuiz() {
    var form = $('#quiz');
    var scoreEl = $('#score-value');
    var levelEl = $('#score-level');
    var verdictEl = $('#score-verdict');
    var canvas = $('#radar');
    var api = window.SSFScore;

    if (!form || !scoreEl || !levelEl || !verdictEl || !api) return;

    function idle() {
      radarValues = null;
      scoreEl.textContent = '—';
      scoreEl.classList.add('is-idle');
      levelEl.textContent = 'Niveau en attente';
      verdictEl.textContent = 'Répondez aux huit critères.';
      drawRadar(canvas, null, false);
    }

    function update() {
      var answers = [];
      for (var i = 1; i <= 8; i++) {
        var checked = form.querySelector('input[name="crit-' + i + '"]:checked');
        if (!checked) {
          idle();
          return;
        }
        answers.push(Number(checked.value));
      }

      var score = api.computeScore(answers);
      var level = api.levelFor(score);

      radarValues = answers.map(function (value) { return value / 3; });

      scoreEl.textContent = String(score);
      scoreEl.classList.remove('is-idle');
      levelEl.textContent = 'Niveau ' + level.index + ' · ' + level.name;
      verdictEl.textContent = level.verdict;

      drawRadar(canvas, radarValues, true);
    }

    form.addEventListener('change', update);
    idle();
  }

  /* ------------------------------------------------------------
     Manifeste de zéro octet
     ------------------------------------------------------------ */
  function initManifeste() {
    var triggers = [$('#cta-manifeste'), $('#footer-manifeste')];

    function download(event) {
      event.preventDefault();
      var blob = new Blob([], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'SSF-Manifeste-2026.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    }

    triggers.forEach(function (trigger) {
      if (trigger) trigger.addEventListener('click', download);
    });
  }

  /* ------------------------------------------------------------
     Bannière cookies
     ------------------------------------------------------------ */
  function initCookies() {
    var banner = $('#cookie-banner');
    var button = $('#cookie-ok');
    if (!banner || !button) return;

    var KEY = 'ssf-cookies-ack';
    var acknowledged = false;

    try {
      acknowledged = window.localStorage.getItem(KEY) === '1';
    } catch (error) {
      acknowledged = false;
    }

    if (!acknowledged) banner.hidden = false;

    button.addEventListener('click', function () {
      banner.hidden = true;
      try {
        window.localStorage.setItem(KEY, '1');
      } catch (error) {
        /* Le stockage local est lui aussi optionnel. */
      }
    });
  }

  /* ------------------------------------------------------------
     Extinction du site
     ------------------------------------------------------------ */
  function initExtinction() {
    var trigger = $('#extinction');
    var overlay = $('#extinction-overlay');
    var relight = $('#rallumer');
    if (!trigger || !overlay || !relight) return;

    var previousFocus = null;
    var previousOverflow = '';
    var isOpen = false;
    var regions = [$('.topbar'), $('main'), $('.footer'), $('#cookie-banner')]
      .filter(Boolean);

    function setBackgroundInert(value) {
      regions.forEach(function (region) { region.inert = value; });
    }

    function openOverlay() {
      isOpen = true;
      previousFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      setBackgroundInert(true);
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      relight.focus();
    }

    function closeOverlay() {
      isOpen = false;
      overlay.hidden = true;
      setBackgroundInert(false);
      document.body.style.overflow = previousOverflow;
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    }

    trigger.addEventListener('click', openOverlay);
    relight.addEventListener('click', closeOverlay);

    overlay.addEventListener('pointerdown', function (event) {
      if (event.target === overlay) relight.focus();
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeOverlay();
        return;
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        relight.focus();
      }
    });

    document.addEventListener('focusin', function (event) {
      if (isOpen && !overlay.contains(event.target)) relight.focus();
    });
  }

  /* ------------------------------------------------------------
     Formulaire factice
     ------------------------------------------------------------ */
  function initForm() {
    var form = $('#form-audit');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var done = document.createElement('p');
      done.className = 'form__done';
      done.setAttribute('tabindex', '-1');
      done.textContent = 'Merci. Votre demande a été archivée, puis supprimée.';
      form.replaceWith(done);
      done.focus();
    });
  }

  /* ------------------------------------------------------------ */
  function init() {
    initMeter();
    initNavCurrent();
    initQuiz();
    initRadarResize();
    initManifeste();
    initCookies();
    initExtinction();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
