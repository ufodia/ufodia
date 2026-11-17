(() => {
  const language = document.documentElement.lang === 'tr' ? 'tr' : 'en';
  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const options = Array.from(document.querySelectorAll('[data-select]'));
  const panels = Array.from(document.querySelectorAll('[data-panel]'));
  const list = document.querySelector('.project-list');
  const results = document.querySelector('.results');
  const search = document.getElementById('project-search');
  const empty = document.querySelector('.project-empty');
  const workbench = document.querySelector('.workbench');
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ı/g, 'i');
  const index = new Map(options.map(option => [option.dataset.select, normalize(option.dataset.search || option.textContent)]));
  let active = 'decision', activeFilter = 'all';

  // Preserve previously shared language-query links; canonical pages determine language.
  const currentUrl = new URL(location.href);
  const requested = currentUrl.searchParams.get('lang');
  if (requested === 'en' || requested === 'tr') {
    currentUrl.searchParams.delete('lang');
    if (requested !== language) {
      currentUrl.pathname = requested === 'tr' ? '/tr/' : '/';
      location.replace(currentUrl.href);
      return;
    }
    history.replaceState(null, '', currentUrl);
  }

  const visible = () => options.filter(option => !option.hidden);
  const horizontalTabs = () => matchMedia('(min-width:401px) and (max-width:720px)').matches;
  function count() {
    const n = visible().length;
    results.textContent = language === 'tr'
      ? (n === options.length ? n + ' proje' : options.length + ' projeden ' + n + ' gösteriliyor')
      : (n === options.length ? n + ' projects' : n + ' of ' + options.length + ' projects');
  }
  function revealSelected() {
    const selected = options.find(option => option.dataset.select === active);
    if (!selected || selected.hidden) return;
    requestAnimationFrame(() => {
      const item = selected.getBoundingClientRect(), box = list.getBoundingClientRect();
      if (horizontalTabs()) {
        if (item.left < box.left) list.scrollLeft += item.left - box.left;
        else if (item.right > box.right) list.scrollLeft += item.right - box.right;
      } else {
        if (item.top < box.top) list.scrollTop += item.top - box.top;
        else if (item.bottom > box.bottom) list.scrollTop += item.bottom - box.bottom;
      }
    });
  }
  function updateLanguageLinks() {
    document.querySelectorAll('[data-lang]').forEach(link => {
      link.href = (link.dataset.lang === 'tr' ? '/tr/' : '/') + location.hash;
    });
  }
  function select(id, focus = false, sync = true) {
    if (!options.some(option => option.dataset.select === id && !option.hidden)) return;
    active = id;
    options.forEach(option => {
      const selected = option.dataset.select === id;
      option.setAttribute('aria-selected', String(selected));
      option.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => panel.hidden = panel.dataset.panel !== id);
    if (focus) options.find(option => option.dataset.select === id).focus();
    if (sync) {
      const url = new URL(location.href);
      url.hash = 'project-' + id;
      history.replaceState(null, '', url);
    }
    revealSelected();
    updateLanguageLinks();
  }
  function applyFilters() {
    const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    options.forEach(option => {
      option.hidden = (activeFilter !== 'all' && option.dataset.group !== activeFilter)
        || !terms.every(term => index.get(option.dataset.select).includes(term));
    });
    const matches = visible();
    empty.hidden = matches.length !== 0;
    workbench.hidden = matches.length === 0;
    if (!matches.length) {
      active = '';
      options.forEach(option => { option.setAttribute('aria-selected', 'false'); option.tabIndex = -1; });
      panels.forEach(panel => panel.hidden = true);
      if (location.hash.startsWith('#project-')) history.replaceState(null, '', location.pathname + '#work');
      updateLanguageLinks();
    } else if (!matches.some(option => option.dataset.select === active)) select(matches[0].dataset.select);
    else revealSelected();
    count();
  }
  function resetFilters() {
    search.value = '';
    activeFilter = 'all';
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
    options.forEach(option => option.hidden = false);
    empty.hidden = true;
    workbench.hidden = false;
    count();
  }
  function readProjectHash(event) {
    // A queued anchor event must not reset search after a later filter update.
    if (event?.newURL && new URL(event.newURL).hash !== location.hash) return;
    const id = location.hash.startsWith('#project-') ? location.hash.slice(9) : '';
    if (options.some(option => option.dataset.select === id)) {
      resetFilters();
      select(id, false, false);
    }
    updateLanguageLinks();
  }

  list.setAttribute('role', 'tablist');
  const orientation = () => {
    list.setAttribute('aria-orientation', horizontalTabs() ? 'horizontal' : 'vertical');
    revealSelected();
  };
  options.forEach(option => {
    const id = option.dataset.select, panel = document.getElementById('project-' + id);
    option.id = 'tab-' + id;
    option.setAttribute('role', 'tab');
    option.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', option.id);
    option.addEventListener('click', event => { event.preventDefault(); select(id); });
    option.addEventListener('keydown', event => {
      const matches = visible();
      if (!matches.length) return;
      let i = matches.indexOf(option);
      if (['ArrowDown', 'ArrowRight'].includes(event.key)) i = (i + 1) % matches.length;
      else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) i = (i - 1 + matches.length) % matches.length;
      else if (event.key === 'Home') i = 0;
      else if (event.key === 'End') i = matches.length - 1;
      else return;
      event.preventDefault();
      select(matches[i].dataset.select, true);
    });
  });
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    applyFilters();
  }));
  search.addEventListener('input', applyFilters);
  document.querySelector('.reset-search').addEventListener('click', () => {
    resetFilters();
    select('decision');
    search.focus();
    // Respect the page's scroll padding so the sticky header does not cover the field.
    search.scrollIntoView({block: 'nearest', inline: 'nearest'});
  });
  document.documentElement.classList.add('is-enhanced');
  select(active, false, false);
  readProjectHash();
  count();
  orientation();
  window.addEventListener('resize', orientation, {passive: true});
  window.addEventListener('hashchange', readProjectHash);

  const dialog = document.getElementById('preview-dialog');
  const image = document.getElementById('preview-dialog-image');
  let lastPreview;
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-preview]').forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      lastPreview = link;
      document.getElementById('preview-dialog-title').textContent = link.dataset.preview;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      document.getElementById('preview-dialog-original').href = link.href;
      dialog.showModal();
    }));
    dialog.addEventListener('close', () => { if (lastPreview) lastPreview.focus(); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  }
})();

// Motion layer. Kept apart from the project index above so a fault here cannot break navigation.
// The head script sets .motion only when reduced motion is not requested; without it nothing below hides content.
(() => {
  const root = document.documentElement;
  const motion = root.classList.contains('motion');
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-art img');
  const communityArt = document.querySelector('.community-art');
  const communityImage = communityArt && communityArt.querySelector('img');
  const principles = document.querySelector('.principles');
  const steps = principles ? Array.from(principles.children) : [];

  // Headings resolve from a loose sketch as they enter; anything already on screen is left alone.
  if (motion && 'IntersectionObserver' in window) {
    const entered = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-shaped');
      entered.unobserve(entry.target);
    }), {rootMargin: '0px 0px -10% 0px', threshold: 0.12});
    const arm = (selector, name, stagger) => document.querySelectorAll(selector).forEach((element, i) => {
      if (element.getBoundingClientRect().top < innerHeight * 0.92) return;
      element.classList.add(name);
      if (stagger) element.style.setProperty('--i', i % stagger);
      entered.observe(element);
    });
    arm('.section-heading h2, .community-head h2, .approach-head h2, .contact h2', 'will-shape');
    arm('.work-intro, .community-head p, .approach-head p, .contact-copy', 'will-rise');
    arm('.github-feature-card', 'will-rise', 3);
    arm('.process-image', 'will-wipe');
  }

  // Scroll-linked depth and the approach timeline.
  let queued = false;
  function onScroll() {
    queued = false;
    const y = scrollY, height = innerHeight;
    if (motion && hero && heroImage && y < hero.offsetHeight) {
      heroImage.style.transform = 'translate3d(0,' + (y * 0.14).toFixed(1) + 'px,0) scale(' + (1 + y * 0.00011).toFixed(4) + ')';
    }
    if (motion && communityImage) {
      const box = communityArt.getBoundingClientRect();
      if (box.bottom > 0 && box.top < height) {
        const progress = clamp((height - box.top) / (height + box.height), 0, 1);
        communityImage.style.transform = 'translate3d(0,' + (-progress * 0.19 * box.height).toFixed(1) + 'px,0)';
      }
    }
    if (principles) {
      const box = principles.getBoundingClientRect();
      const progress = motion ? clamp((height * 0.86 - box.top) / (height * 0.5), 0, 1) : 1;
      principles.style.setProperty('--p', progress.toFixed(3));
      steps.forEach((step, i) => step.classList.toggle('is-on', progress >= [0.03, 0.4, 0.76][i]));
    }
  }
  const requestScroll = () => { if (!queued) { queued = true; requestAnimationFrame(onScroll); } };
  addEventListener('scroll', requestScroll, {passive: true});
  addEventListener('resize', requestScroll, {passive: true});
  onScroll();

  // Hero threads: live filaments that enter from the page edge and settle into the sculpture,
  // continuing the fine lines painted in the artwork. Pointer movement nudges them aside.
  const canvas = document.querySelector('.hero-threads');
  if (!canvas || !canvas.getContext || !hero || !heroImage) return;
  const context = canvas.getContext('2d');
  const frame = heroImage.parentElement;
  let state = 7;
  const random = () => (state = (state * 16807) % 2147483647) / 2147483647;
  const threads = Array.from({length: 30}, (_, i) => ({
    entry: random(), amplitude: 0.3 + random() * 0.7, frequency: 0.7 + random() * 1.5,
    phase: random() * Math.PI * 2, speed: (0.1 + random() * 0.2) * (random() < 0.5 ? -1 : 1),
    width: 0.5 + random() * 0.8, alpha: 0.2 + random() * 0.36, accent: i % 6 === 2
  }));
  const pointer = {x: 0, y: 0, targetX: 0, targetY: 0, force: 0, targetForce: 0};
  let width = 0, height = 0, art = null, focalX = 0, focalY = 0, onScreen = true, running = false, began = 0;

  function measure() {
    const bounds = canvas.getBoundingClientRect(), box = frame.getBoundingClientRect();
    if (!bounds.width || !box.width) return false;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = bounds.width; height = bounds.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    // Where the painted filaments meet the ribbon, in each source's own coordinates.
    const portrait = (heroImage.currentSrc || '').indexOf('portrait') !== -1;
    const sourceWidth = portrait ? 1132 : 1600, sourceHeight = portrait ? 941 : 900;
    const scale = Math.max(box.width / sourceWidth, box.height / sourceHeight);
    const position = getComputedStyle(heroImage).objectPosition.split(' ').map(value => parseFloat(value) / 100);
    const left = box.left - bounds.left + (box.width - sourceWidth * scale) * (isFinite(position[0]) ? position[0] : 0.5);
    const top = box.top - bounds.top + (box.height - sourceHeight * scale) * (isFinite(position[1]) ? position[1] : 0.5);
    art = {left, top, width: sourceWidth * scale, height: sourceHeight * scale};
    focalX = left + (portrait ? 0.306 : 0.53) * art.width;
    focalY = top + 0.785 * art.height;
    return true;
  }

  function draw(time) {
    const seconds = time / 1000;
    const reveal = motion ? clamp((time - began - 250) / 2600, 0, 1) : 1;
    const drawn = 1 - Math.pow(1 - reveal, 3);
    pointer.x += (pointer.targetX - pointer.x) * 0.1;
    pointer.y += (pointer.targetY - pointer.y) * 0.1;
    pointer.force += (pointer.targetForce - pointer.force) * 0.06;
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';
    const startX = Math.min(-20, art.left - 20), span = focalX - startX, sway = art.height * 0.085, reach = art.height * 0.2;
    for (const thread of threads) {
      const startY = art.top + art.height * (0.44 + thread.entry * 0.4);
      const endY = focalY + (thread.entry - 0.5) * art.height * 0.05;
      const colour = thread.accent ? '214,238,121' : '236,221,199';
      const gradient = context.createLinearGradient(startX, 0, focalX, 0);
      gradient.addColorStop(0, 'rgba(' + colour + ',0)');
      gradient.addColorStop(0.22, 'rgba(' + colour + ',' + (thread.alpha * 0.5).toFixed(3) + ')');
      gradient.addColorStop(0.72, 'rgba(' + colour + ',' + thread.alpha.toFixed(3) + ')');
      gradient.addColorStop(0.93, 'rgba(' + colour + ',' + (thread.alpha * 0.45).toFixed(3) + ')');
      gradient.addColorStop(1, 'rgba(' + colour + ',0)');
      context.strokeStyle = gradient;
      context.lineWidth = thread.width;
      context.beginPath();
      const last = Math.max(2, Math.round(64 * drawn));
      for (let i = 0; i <= last; i++) {
        const t = i / 64;
        const eased = t * t * (3 - 2 * t);
        const envelope = Math.sin(Math.PI * Math.pow(t, 0.8)) * (1 - t * 0.3);
        const wave = Math.sin(t * thread.frequency * 6.283 + thread.phase + seconds * thread.speed) * thread.amplitude
          + 0.4 * Math.sin(t * thread.frequency * 13.7 - thread.phase * 1.7 + seconds * thread.speed * 1.7);
        const x = startX + span * t;
        let y = startY + (endY - startY) * eased + wave * envelope * sway;
        if (pointer.force > 0.01) {
          const dx = x - pointer.x, dy = y - pointer.y, distance = dx * dx + dy * dy;
          y += (dy / (Math.sqrt(distance) + 48)) * pointer.force * 54 * Math.exp(-distance / (2 * reach * reach)) * envelope;
        }
        if (i) context.lineTo(x, y); else context.moveTo(x, y);
      }
      context.stroke();
    }
  }

  function loop(time) {
    if (!running) return;
    draw(time);
    requestAnimationFrame(loop);
  }
  function refresh() {
    if (!measure()) return;
    const shouldRun = motion && onScreen && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      if (!began) began = performance.now();
      requestAnimationFrame(loop);
    } else if (!shouldRun) {
      running = false;
      if (!motion) draw(0);
    }
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { onScreen = entries[0].isIntersecting; refresh(); }).observe(hero);
  }
  if ('ResizeObserver' in window) new ResizeObserver(refresh).observe(hero);
  else addEventListener('resize', refresh, {passive: true});
  heroImage.addEventListener('load', refresh);
  document.addEventListener('visibilitychange', refresh);
  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const bounds = canvas.getBoundingClientRect();
    pointer.targetX = event.clientX - bounds.left;
    pointer.targetY = event.clientY - bounds.top;
    pointer.targetForce = 1;
  }, {passive: true});
  hero.addEventListener('pointerleave', () => { pointer.targetForce = 0; }, {passive: true});
  refresh();
})();
