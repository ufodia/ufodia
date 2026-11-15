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
