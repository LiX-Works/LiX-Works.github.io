/* Live embeds for the hub drafts.
   <div class="live" data-live="proxitouch|edl" [data-chart="off"] [data-fit="cover"] [data-badge="off"]></div>
   Posters show first; the live page or video starts after the rest of the page has
   loaded. ProxiTouch uses the live page; the EDL homepage preview uses
   data-mode="video" to avoid another continuous 3-D render workload.
   Videos loop silently and pause off screen. */
(function () {
  const ROOT = document.currentScript.src.replace(/shared\/live\/embed\.js.*$/, '');
  const MEDIA = ROOT + 'shared/media/';
  const SPEC = {
    proxitouch: {
      src: o => new URL('/Capacitance-Demos/proxitouch/?scene=S19', ROOT).href,
      poster: o => MEDIA + (o.chart === 'off' ? 'proxitouch-device-poster.webp' : 'proxitouch-poster.jpg'),
      video:  o => MEDIA + (o.chart === 'off' ? 'proxitouch-device.mp4' : 'proxitouch-loop.mp4'),
      badge: 'Live · click to interact'
    },
    edl: {
      src: o => ROOT + 'shared/live/edl/index.html?fit=' + (o.fit || 'cover') + (o.nocap === 'on' ? '&nocap' : '') + (o.fy ? '&fy=' + o.fy : '') + (o.fx ? '&fx=' + o.fx : ''),
      poster: o => MEDIA + 'edl-poster.webp',
      video:  o => MEDIA + 'edl-breakdown.mp4',
      badge: 'Live · rendered from code'
    }
  };

  // Strip ProxiTouch's own page chrome so only the device and its two signal channels remain.
  function ptCSS(opts) {
    return `.header,.footer,.text-panel,.toast{display:none!important}
        #app .layout{position:absolute!important;inset:0!important;display:block!important;padding:0!important;margin:0!important;width:auto!important;height:auto!important;max-width:none!important}
        .visual-panel{position:absolute!important;inset:0 ${opts.chart === 'off' ? '0' : '44px'} 0 0!important;width:auto!important;height:100%!important}
        ${opts.chart === 'off' ? '#chart-zone{display:none!important} #model-zone{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;max-width:none!important}' : ''}
        html,body{background:transparent!important}`;
  }
  function cleanProxiTouch(frame, opts) {
    try {
      const d = frame.contentDocument;
      const s = d.createElement('style');
      s.textContent = ptCSS(opts);
      d.head.appendChild(s);
      frame.contentWindow.dispatchEvent(new Event('resize'));
      return true;
    } catch (e) { return false; }   // cross-origin: leave the page as it is
  }

  const hasGL2 = (() => { try { const gl = document.createElement('canvas').getContext('webgl2'); if (!gl) return false; gl.getExtension('WEBGL_lose_context')?.loseContext(); return true; } catch (e) { return false; } })();

  function mountVideo(box, spec, opts) {
    const v = document.createElement('video');
    Object.assign(v, { muted: true, defaultMuted: true, loop: true, autoplay: true, playsInline: true, preload: 'auto', src: spec.video(opts) });
    v.className = 'live-frame'; v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.setAttribute('aria-label', opts.live === 'edl' ? 'Looping EDL film preview' : 'Looping ProxiTouch preview');
    const play = () => { if (box._visible === false || document.hidden) return; v.play().catch(() => {}); };
    v.addEventListener('playing', () => box.classList.add('is-ready'));
    v.addEventListener('loadeddata', () => { box.classList.add('is-ready'); if (box._visible === false || document.hidden) v.pause(); else play(); });
    box.append(v); box._video = v; box._play = play; box.dataset.playback = 'video'; play();
  }

  // The heavy part waits for the page's own images, so posters and figures arrive first.
  const afterLoad = fn => document.readyState === 'complete' ? setTimeout(fn, 0) : addEventListener('load', () => setTimeout(fn, 0), { once: true });

  function mount(box) {
    if (box.dataset.mounted) return; box.dataset.mounted = '1';
    const kind = box.dataset.live, spec = SPEC[kind], opts = Object.assign({}, box.dataset);
    // Narrow boxes show the device alone; the two signal plots need room.
    if (kind === 'proxitouch' && !opts.chart && box.clientWidth < 560) opts.chart = 'off';
    box.classList.add('live-box');
    const poster = new Image(); poster.className = 'live-poster'; poster.alt = ''; poster.decoding = 'async'; poster.fetchPriority = 'high'; poster.src = spec.poster(opts);
    box.appendChild(poster);
    afterLoad(() => mountHeavy(box, kind, spec, opts));
  }

  function mountHeavy(box, kind, spec, opts) {
    if (!hasGL2 || box.dataset.mode === 'video') {
      mountVideo(box, spec, opts);
      return;
    }
    const f = document.createElement('iframe');
    f.className = 'live-frame'; f.loading = 'eager'; f.title = kind === 'edl' ? 'Live excerpt: electric-double-layer gating film' : 'Live demo: ProxiTouch';
    f.setAttribute('allow', 'fullscreen'); f.tabIndex = -1;
    f.src = spec.src(opts);
    f.addEventListener('load', () => {
      if (kind === 'proxitouch') { cleanProxiTouch(f, opts); setTimeout(() => box.classList.add('is-ready'), 700); }
    });
    box.appendChild(f); box._frame = f;
    if (box.dataset.badge !== 'off') {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'live-badge' + (box.dataset.badgePos === 'bl' ? ' bl' : ''); b.innerHTML = '<i></i>' + spec.badge;
      b.addEventListener('click', () => {
        box.classList.add('is-active'); f.tabIndex = 0; f.focus();
        // The live page only takes drag and wheel in its explore mode, normally entered with its E key.
        try { const w = f.contentWindow; w.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'e' })); } catch (e) {}
        b.disabled = true; b.innerHTML = '<i></i>Drag to rotate · scroll to zoom';
      });
      box.appendChild(b);
    }
  }

  addEventListener('message', e => {
    if (e.data && e.data.live === 'edl' && e.data.ready) {
      document.querySelectorAll('.live-box[data-live="edl"]').forEach(b => { if (b._frame && b._frame.contentWindow === e.source) b.classList.add('is-ready'); });
    }
  });

  function setPlaying(box, on) {
    box._visible = on;
    if (box._video) { on && !document.hidden ? box._play() : box._video.pause(); return; }
    if (!box._frame) return;
    if (box.dataset.live === 'edl') box._frame.contentWindow && box._frame.contentWindow.postMessage(on ? 'play' : 'pause', '*');
  }
  document.addEventListener('visibilitychange', () => document.querySelectorAll('[data-live]').forEach(b => setPlaying(b, b._visible !== false)));

  const near = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) mount(e.target); }), { rootMargin: '600px 0px' });
  const seen = new IntersectionObserver(es => es.forEach(e => setPlaying(e.target, e.isIntersecting)), { threshold: 0.05 });
  function init() { document.querySelectorAll('[data-live]').forEach(b => { near.observe(b); seen.observe(b); }); }
  window.HubLive = { init, mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  const css = document.createElement('style');
  css.textContent = `.live-box{position:relative;overflow:hidden;isolation:isolate}
  .live-box .live-poster,.live-box .live-frame{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;object-fit:cover}
  .live-box .live-frame{opacity:0;transition:opacity .9s ease;pointer-events:none}
  .live-box.is-ready .live-frame{opacity:1}
  .live-box.is-active .live-frame{pointer-events:auto}
  .live-box[data-live="edl"] .live-poster,.live-box[data-live="edl"] .live-frame{object-position:0 0}
  /* Wide boxes: render the live page larger than its box and crop, so the device sits closer at full resolution. */
  @media (min-width:681px){.live-box[data-live="proxitouch"] .live-frame{inset:auto;left:-10%;top:-12%;width:120%;height:120%}}
  .live-badge{position:absolute;right:14px;top:14px;z-index:3;display:inline-flex;align-items:center;gap:8px;font:600 12px/1 Inter,system-ui,sans-serif;letter-spacing:.02em;
    color:#16212d;background:rgba(255,255,255,.86);backdrop-filter:blur(8px);border:1px solid rgba(20,40,60,.12);border-radius:99px;padding:8px 12px;cursor:pointer}
  .live-badge i{width:7px;height:7px;border-radius:50%;background:#e5484d;box-shadow:0 0 0 0 rgba(229,72,77,.5);animation:livepulse 1.8s infinite}
  .live-badge.bl{right:auto;top:auto;left:14px;bottom:14px}
  .live-box.is-active .live-badge{pointer-events:none;cursor:default}
  @keyframes livepulse{0%{box-shadow:0 0 0 0 rgba(229,72,77,.45)}70%{box-shadow:0 0 0 8px rgba(229,72,77,0)}100%{box-shadow:0 0 0 0 rgba(229,72,77,0)}}`;
  document.head.appendChild(css);
})();
