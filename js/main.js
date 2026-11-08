/* RIVIERA DISTRICT — main.js (vanilla JS, no dependencies) */
(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const D = window.DATA;
const eur = n => '€ ' + n.toLocaleString('ru-RU');

/* ---------- Fallback illustrations (used only when an item has no `photo`) ---------- */
const SKY = ['#f3e3c8', '#dfe9ec', '#f7e9dc', '#e3ece6'], SEA = ['#cfe0e3', '#a9c3cb', '#d8c7a6', '#b7cfd3'];
function art(seed) {
  let s = seed * 997 + 13;
  const r = n => (s = (s * 9301 + 49297) % 233280) / 233280 * n;
  let g = '';
  for (let x = 14; x < 380;) {
    const w = 34 + r(36), h = 50 + r(100);
    g += `<rect x="${x}" y="${190 - h}" width="${w}" height="${h}" fill="${r(1) > .5 ? '#fbf8f2' : '#e6d8bc'}"/>` +
         `<path d="M${x + 5} ${196 - h}H${x + w - 5}" stroke="#23262b" stroke-opacity=".18" stroke-width="3" stroke-dasharray="7 5"/>`;
    x += w + 4 + r(10);
  }
  for (let i = 0; i < 6; i++) g += `<circle cx="${r(400)}" cy="186" r="${8 + r(8)}" fill="#8fa77f" opacity=".85"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKY[seed % 4]}"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>` +
    `<rect width="400" height="260" fill="url(#g)"/><circle cx="${60 + r(280)}" cy="${40 + r(30)}" r="22" fill="#fff" opacity=".8"/>${g}` +
    `<rect y="190" width="400" height="70" fill="${SEA[seed % 4]}"/><path d="M0 205H400M0 222H400M0 242H400" stroke="#fff" stroke-opacity=".55" stroke-dasharray="40 24"/></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}
const img = o => `<img src="${o.photo || art(o.seed)}" alt="${o.title || o.name}" loading="lazy">`;

/* ---------- Header, burger, hero (title animation + parallax) ---------- */
const nav = $('#nav'), heroBg = $('#heroBg'), h1 = $('#h1');
$('#yr').textContent = new Date().getFullYear();
h1.innerHTML = h1.textContent.split(' ').map((w, i) => `<span><i style="--i:${i}">${w}</i></span>`).join(' ');

let ticking = false;
const onScroll = () => {
  nav.classList.toggle('compact', scrollY > 60);
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    if (scrollY < innerHeight * 1.2) heroBg.style.transform = `translate3d(0,${scrollY * .25}px,0)`;
    ticking = false;
  });
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const burger = $('.burger');
const setMenu = open => { nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
$$('nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));

/* ---------- Scroll reveal + animated counters ---------- */
function count(el) {
  const n = +el.dataset.n, d = +el.dataset.d || 0, t0 = performance.now();
  const step = t => {
    const p = Math.min((t - t0) / 1600, 1);
    el.textContent = (n * (1 - Math.pow(1 - p, 3))).toFixed(d).replace('.', ',') + (p === 1 ? (el.dataset.u || '') : '');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
  const c = $('[data-n]', e.target); if (c) count(c);
}), { threshold: .2 });
$$('.rv').forEach(el => io.observe(el));

/* ---------- Modal shell, also used as lightbox (photos, floor plans) ---------- */
const modal = $('#modal'); let lastFocus, lb = { items: [], i: 0 };
function openModal(html) {
  lastFocus = document.activeElement;
  $('#mBody').innerHTML = html; modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('show'));
  document.body.style.overflow = 'hidden'; $('.m-x').focus();
}
function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => { modal.hidden = true; modal.classList.remove('lb'); lastFocus && lastFocus.focus(); }, 300);
  if ($('#page').hidden) document.body.style.overflow = '';
}
function lbDraw() {
  const it = lb.items[lb.i], n = lb.items.length;
  $('#mBody').innerHTML = `<figure class="lbf">${it.svg ? `<div class="planbox">${it.svg}</div>` : `<img src="${it.src}" alt="${it.cap}">`}<figcaption><span>${it.cap}</span>${n > 1 ? `<span>${lb.i + 1} / ${n}</span>` : ''}</figcaption></figure>` +
    (n > 1 ? '<button class="lb-n prev" data-d="-1" aria-label="Назад">‹</button><button class="lb-n next" data-d="1" aria-label="Вперёд">›</button>' : '');
}
const lbStep = d => { lb.i = (lb.i + d + lb.items.length) % lb.items.length; lbDraw(); };
function openLB(items, i = 0) { lb = { items, i }; openModal(''); modal.classList.add('lb'); lbDraw(); }
modal.addEventListener('click', e => {
  const n = e.target.closest('.lb-n'); if (n) return lbStep(+n.dataset.d);
  if (e.target === modal || e.target.closest('.m-x')) closeModal();
});
addEventListener('keydown', e => {
  if (!modal.hidden && modal.classList.contains('show')) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  } else if (e.key === 'Escape' && !$('#page').hidden) $('#back').click();
});

/* Make a list of cards keyboard-activatable */
const activate = (root, fn) => {
  root.addEventListener('click', e => { const c = e.target.closest('[data-id]'); c && fn(c); });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const c = e.target.closest('[data-id]'); if (c) { e.preventDefault(); fn(c); } } });
};

/* ---------- Interactive map ---------- */
function initMap() {
  const markers = $('#markers'), card = $('#mapCard'), chips = $('#mapChips');
  markers.innerHTML = D.map.map((p, i) => `<g class="poi" data-id="${p.id}" transform="translate(${p.x} ${p.y})" tabindex="0" role="button" aria-label="${p.title}"><circle class="pulse" r="16"/><circle class="dot" r="12"/><text>${i + 1}</text><text class="lbl" y="30">${p.title}</text></g>`).join('');
  chips.innerHTML = D.map.map(p => `<button class="chip" data-id="${p.id}">${p.title}</button>`).join('');
  const show = id => {
    const p = D.map.find(x => x.id === id);
    $$('.poi').forEach(g => g.classList.toggle('on', g.dataset.id === id));
    $$('.chip', chips).forEach(c => c.classList.toggle('on', c.dataset.id === id));
    card.innerHTML = `<div class="ph">${img(p)}</div><div class="cb"><h3>${p.title}</h3><p>${p.text}</p></div>`;
  };
  activate(markers, g => show(g.dataset.id));
  activate(chips, b => show(b.dataset.id));
  show(D.map[0].id);
}

/* ---------- Routing helpers: detail pages live at #/res/ID and #/arch/ID (GitHub Pages friendly) ---------- */
let inApp = false;
const go = (kind, id) => { inApp = true; location.hash = `#/${kind}/${id}`; };
const nm = o => o.photo.slice(7, -4);                     // "images/x.jpg" -> "x"

/* ---------- Architecture gallery with filters ---------- */
function initArch() {
  const grid = $('#archGrid'), bar = $('#archFilters');
  bar.innerHTML = D.archTypes.map(t => `<button class="chip" data-id="${t.id}">${t.label}</button>`).join('');
  const render = f => {
    $$('.chip', bar).forEach(c => c.classList.toggle('on', c.dataset.id === f));
    grid.innerHTML = D.arch.filter(o => f === 'all' || o.type === f).map((o, i) =>
      `<article class="card" style="--i:${i}" data-id="${o.id}" tabindex="0" role="button" aria-label="${o.name}"><div class="ph">${img(o)}</div><div class="cb"><h3>${o.name}</h3><p>${o.text}</p><dl><dt>Этажность</dt><dd>${o.floors}</dd><dt>Стиль</dt><dd>${o.style}</dd></dl></div></article>`).join('');
  };
  activate(bar, b => render(b.dataset.id));
  activate(grid, c => go('arch', c.dataset.id));
  render('all');
}

/* ---------- Residences catalog: type / rooms / area / price filters + sorting ---------- */
function initEstate() {
  const grid = $('#estGrid'), typeSel = $('#fType'), formType = $('#ft');
  const opts = Object.entries(D.types).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
  typeSel.insertAdjacentHTML('beforeend', opts);
  formType.insertAdjacentHTML('beforeend', opts + '<option value="consult">Нужна консультация</option>');
  const render = () => {
    const t = typeSel.value, r = +$('#fRooms').value;
    const [a0, a1] = $('#fArea').value.split('-').map(Number), [p0, p1] = $('#fPrice').value.split('-').map(Number);
    const [key, dir] = $('#fSort').value.split(':');
    const list = D.estate
      .filter(o => (!t || o.type === t) && (!r || (r === 4 ? o.rooms >= 4 : o.rooms === r)) && o.area >= a0 && o.area < a1 && o.price >= p0 && o.price < p1)
      .sort((x, y) => (x[key] - y[key]) * (dir === 'desc' ? -1 : 1));
    $('#estCount').textContent = list.length ? `Найдено объектов: ${list.length}` : '';
    grid.innerHTML = list.length ? list.map((o, i) =>
      `<article class="card" style="--i:${i}" data-id="${o.id}" tabindex="0" role="button" aria-label="${o.title}"><div class="ph">${img(o)}</div><div class="cb"><span class="tag">${D.types[o.type]}</span><h3>${o.title}</h3><dl><dt>Площадь</dt><dd>${o.area} м²</dd><dt>Комнаты</dt><dd>${o.rooms}</dd><dt>Этаж</dt><dd>${o.floor}</dd></dl><div class="price">${eur(o.price)}</div></div></article>`).join('')
      : '<p class="lead">По этим условиям ничего не найдено. Ослабьте фильтры или нажмите «Сбросить».</p>';
  };
  $$('.bar select').forEach(s => s.addEventListener('change', render));
  $('#fReset').addEventListener('click', () => { $$('.bar select').forEach(s => s.selectedIndex = 0); render(); });
  activate(grid, c => go('res', c.dataset.id));
  render();
}

/* ---------- Interiors: filterable mosaic + lightbox ---------- */
function initInteriors() {
  const bar = $('#intFilters'), grid = $('#intGrid'); let list = [];
  bar.innerHTML = D.intTypes.map(t => `<button class="chip" data-id="${t.id}">${t.label}</button>`).join('');
  const render = f => {
    $$('.chip', bar).forEach(c => c.classList.toggle('on', c.dataset.id === f));
    list = D.interiors.filter(o => f === 'all' || o.type === f);
    grid.innerHTML = list.map((o, i) => `<figure class="tile" style="--i:${i}" data-id="${i}" tabindex="0" role="button" aria-label="${o.title}"><img src="${o.photo}" alt="${o.title}" loading="lazy"><figcaption><b>${o.title}</b><span>${o.text}</span></figcaption></figure>`).join('');
  };
  activate(bar, b => render(b.dataset.id));
  activate(grid, t => openLB(list.map(o => ({ src: o.photo, cap: `${o.title} — ${o.text}` })), +t.dataset.id));
  render('all');
}

/* ---------- Lifestyle: photo cards that expand ---------- */
function initLifestyle() {
  const grid = $('#lifeGrid');
  grid.innerHTML = D.lifestyle.map((o, i) =>
    `<article class="card lf" style="--i:${i}" tabindex="0" role="button" aria-expanded="false"><div class="ph"><img src="${o.photo}" alt="${o.title}" loading="lazy"></div><div class="cb"><span class="plus">+</span><h3>${o.title}</h3><p>${o.text}</p><ul>${o.items.map(x => `<li>${x}</li>`).join('')}</ul></div></article>`).join('');
  const tog = c => c.setAttribute('aria-expanded', c.classList.toggle('open'));
  grid.addEventListener('click', e => { const c = e.target.closest('.lf'); c && tog(c); });
  grid.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const c = e.target.closest('.lf'); if (c) { e.preventDefault(); tog(c); } } });
}

/* ---------- Floor plan: schematic SVG generated from rooms + area (demo, not to scale) ---------- */
function plan(o) {
  const W = 440, H = 290, m = 14, T = o.feat.some(f => /еррас|Балкон|Патио|сад/.test(f)), th = T ? 46 : 0;
  const iw = W - 2 * m, ih = H - 2 * m - th, lw = iw * .5, bd = Math.max(o.rooms - 1, 1), rh = ih / (bd + 1), k = o.area / (iw * ih);
  const R = [['Гостиная', m, m, lw, ih * .6], ['Кухня', m, m + ih * .6, lw, ih * .4]];
  for (let i = 0; i < bd; i++) R.push([bd > 1 ? 'Спальня ' + (i + 1) : 'Спальня', m + lw, m + i * rh, iw - lw, rh]);
  R.push(['Санузел', m + lw, m + bd * rh, iw - lw, rh]);
  if (T) R.push(['Терраса', m, H - m - th, iw, th]);
  return `<svg class="plan" viewBox="0 0 ${W} ${H}" role="img" aria-label="Схема планировки">` + R.map(([n, x, y, w, h], i) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${n === 'Терраса' ? '#e4e8d6' : i % 2 ? '#f6f2ea' : '#fff'}" stroke="#23262b" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 - (n === 'Терраса' ? 0 : 7)}">${n}</text>${n === 'Терраса' ? '' : `<text x="${x + w / 2}" y="${y + h / 2 + 8}" fill-opacity=".6">${Math.round(w * h * k)} м²</text>`}`).join('') + '</svg>';
}

/* ---------- Detail pages ---------- */
const page = $('#page'); let pg = { gal: [], i: 0 };
const galleryHTML = () => `<div class="g-main"><img id="gImg" src="" alt=""><button class="g-n prev" data-g="-1" aria-label="Предыдущее фото">‹</button><button class="g-n next" data-g="1" aria-label="Следующее фото">›</button><span class="g-c" id="gCap"></span></div><div class="g-th">${pg.gal.map((x, i) => `<button data-t="${i}" aria-label="Фото ${i + 1}"><img src="${x.src}" alt="" loading="lazy"></button>`).join('')}</div>`;
function gSet(i) {
  pg.i = (i + pg.gal.length) % pg.gal.length; const x = pg.gal[pg.i];
  $('#gImg').src = x.src; $('#gImg').alt = x.cap; $('#gCap').textContent = `${x.cap} — ${pg.i + 1} / ${pg.gal.length}`;
  $$('.g-th button').forEach((b, k) => b.classList.toggle('on', k === pg.i));
}
const resInfo = o => `<div class="wrap pg-in"><div><span class="tag">${D.types[o.type]}</span><h1>${o.title}</h1><p class="lead">${o.desc}</p><p style="margin-top:16px">${o.feat.map(f => `<span class="tag">${f}</span>`).join('')}</p><div class="cta"><button class="btn dark" data-plan>Смотреть планировку</button><button class="btn" data-apply>Отправить заявку</button></div></div><div><dl><dt>Площадь</dt><dd>${o.area} м²</dd><dt>Комнат</dt><dd>${o.rooms}</dd><dt>Этаж</dt><dd>${o.floor}</dd><dt>Здание</dt><dd>${o.block}</dd><dt>Вид</dt><dd>${o.view}</dd></dl><div class="price">${eur(o.price)}</div><p class="note" style="margin-top:4px">Демонстрационные данные</p></div></div><div class="wrap plan-sec"><h2>Планировка</h2><div class="planbox">${plan(o)}</div><p class="note">Схема не в масштабе. Демонстрационные данные.</p></div>`;
const archInfo = o => `<div class="wrap pg-in"><div><span class="tag">${D.archTypes.find(t => t.id === o.type).label}</span><h1>${o.name}</h1><p class="lead">${o.text}</p></div><div><dl><dt>Этажность</dt><dd>${o.floors}</dd><dt>Стиль</dt><dd>${o.style}</dd><dt>Материалы</dt><dd>${o.mat}</dd></dl></div></div>` +
  (o.res ? `<div class="wrap"><h2>Резиденции в здании</h2><div class="grid">${o.res.map(id => { const r = D.estate.find(x => x.id === id); return `<a class="card" href="#/res/${r.id}" style="text-decoration:none;color:inherit"><div class="ph">${img(r)}</div><div class="cb"><h3>${r.title}</h3><p>${r.area} м² · ${r.rooms} комн. · ${eur(r.price)}</p></div></a>`; }).join('')}</div></div>` : '');
function pageRender(kind, o) {
  pg = { kind, o, i: 0, gal: [nm(o), ...o.gal].map(n => ({ src: `images/${n}.jpg`, cap: D.cap[n] })) };
  $('#pgTitle').textContent = o.title || o.name;
  $('#pgBody').innerHTML = galleryHTML() + (kind === 'res' ? resInfo(o) : archInfo(o));
  gSet(0);
}
page.addEventListener('click', e => {
  const t = e.target, q = s => t.closest(s);
  if (q('[data-g]')) return gSet(pg.i + +q('[data-g]').dataset.g);
  if (q('[data-t]')) return gSet(+q('[data-t]').dataset.t);
  if (q('.g-main img')) return openLB(pg.gal, pg.i);
  if (q('[data-plan]')) return openLB([{ svg: plan(pg.o), cap: `Планировка — ${pg.o.title}, ${pg.o.area} м²` }]);
  if (q('[data-apply]')) { $('#ft').value = pg.o.type; location.hash = '#contact'; }
});
$('#back').addEventListener('click', () => {
  if (inApp) { inApp = false; history.back(); } else location.hash = pg.kind === 'res' ? '#residences' : '#architecture';
});
function route() {
  const m = location.hash.match(/^#\/(res|arch)\/(\d+)$/);
  if (!m) {
    if (!page.hidden) { page.classList.remove('show'); page.hidden = true; if (modal.hidden) document.body.style.overflow = ''; }
    return;
  }
  const o = (m[1] === 'res' ? D.estate : D.arch).find(x => x.id === +m[2]);
  if (!o) { location.hash = '#architecture'; return; }
  pageRender(m[1], o); page.hidden = false; page.scrollTop = 0;
  requestAnimationFrame(() => page.classList.add('show'));
  document.body.style.overflow = 'hidden'; $('#back').focus();
}

/* ---------- Contact form (demo only: nothing is sent anywhere) ---------- */
function initForm() {
  const form = $('#form'), ok = $('#ok');
  const check = (el, msg) => { const f = el.closest('.f'); f.classList.toggle('bad', !!msg); $('.err', f).textContent = msg; return !msg; };
  const val = c => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c) || (/^\+?[\d\s()-]+$/.test(c) && c.replace(/\D/g, '').length >= 10);
  $$('input,select', form).forEach(el => el.addEventListener('input', () => el.closest('.f').classList.remove('bad')));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = $('#fn').value.trim(), c = $('#fc').value.trim();
    const res = [
      check($('#fn'), n.length < 2 ? 'Введите имя — минимум 2 символа.' : ''),
      check($('#fc'), val(c) ? '' : 'Укажите телефон (от 10 цифр) или email вида name@mail.com.'),
      check($('#ft'), $('#ft').value ? '' : 'Выберите тип недвижимости.')
    ];
    if (res.includes(false)) { $('.bad input,.bad select', form).focus(); return; }
    $('#okName').textContent = n.split(/\s+/)[0];
    form.hidden = true; ok.hidden = false;
  });
  $('#again').addEventListener('click', () => { form.reset(); form.hidden = false; ok.hidden = true; });
}

initMap(); initArch(); initEstate(); initInteriors(); initLifestyle(); initForm();
addEventListener('hashchange', route); route();
})();
