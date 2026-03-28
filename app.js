/* ===================================================
   桃園 (TPE) → 釜山 (PUS) 航班比價  app.js
   =================================================== */

// ---------- 航空公司資料 ----------
const airlines = {
  CI: { name: '中華航空', color: '#c00', bg: '#fff0f0', emoji: '🇹🇼' },
  BR: { name: '長榮航空', color: '#006a4e', bg: '#e6f4ef', emoji: '🍀' },
  IT: { name: '台灣虎航', color: '#ff6a00', bg: '#fff3e6', emoji: '🐯' },
  KE: { name: '大韓航空', color: '#003087', bg: '#e6ecf7', emoji: '🇰🇷' },
  '7C': { name: '濟州航空', color: '#ff8c00', bg: '#fff5e6', emoji: '✈' },
  BX: { name: '釜山航空', color: '#0077cc', bg: '#e6f2fa', emoji: '🌊' },
  TW: { name: "T'way 航空", color: '#e30613', bg: '#fde8e8', emoji: '🛫' },
};

// ---------- 航班資料 ----------
const allFlights = [
  // -- 中華航空 --
  {
    id: 1, airline: 'CI', flightNo: 'CI 161',
    depart: '07:40', arrive: '11:20', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 4200, originalPrice: 5800,
    tags: ['含託運行李', '準點率 92%'],
    tiers: [
      { name: '基本經濟', price: 4200, features: '7kg 手提\n不可改期' },
      { name: '標準經濟', price: 5600, features: '23kg 託運\n可改期' },
      { name: '彈性經濟', price: 7200, features: '30kg 託運\n免費退票' },
      { name: '商務艙', price: 18500, features: '40kg 託運\n優先登機\n休息室' },
    ]
  },
  {
    id: 2, airline: 'CI', flightNo: 'CI 163',
    depart: '14:25', arrive: '18:05', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 4800, originalPrice: 5800,
    tags: ['含託運行李'],
    tiers: [
      { name: '基本經濟', price: 4800, features: '7kg 手提\n不可改期' },
      { name: '標準經濟', price: 5900, features: '23kg 託運\n可改期' },
      { name: '商務艙', price: 19200, features: '40kg 託運\n優先登機' },
    ]
  },
  // -- 長榮航空 --
  {
    id: 3, airline: 'BR', flightNo: 'BR 155',
    depart: '09:15', arrive: '12:55', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 4500, originalPrice: 6200,
    tags: ['含託運行李', 'Wi-Fi'],
    tiers: [
      { name: '基本經濟', price: 4500, features: '7kg 手提\n不可改期' },
      { name: '標準經濟', price: 5800, features: '23kg 託運' },
      { name: '精緻商務', price: 21000, features: '40kg 託運\n平躺座椅\n休息室' },
    ]
  },
  {
    id: 4, airline: 'BR', flightNo: 'BR 157',
    depart: '18:50', arrive: '22:30', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 5100, originalPrice: 6200,
    tags: ['含託運行李'],
    tiers: [
      { name: '基本經濟', price: 5100, features: '7kg 手提\n不可改期' },
      { name: '標準經濟', price: 6300, features: '23kg 託運' },
      { name: '精緻商務', price: 22000, features: '40kg 託運\n平躺座椅' },
    ]
  },
  // -- 台灣虎航 --
  {
    id: 5, airline: 'IT', flightNo: 'IT 241',
    depart: '06:30', arrive: '10:10', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3200, originalPrice: 4800,
    tags: ['特惠票', '限時優惠'],
    tiers: [
      { name: '基本', price: 3200, features: '7kg 手提\n不含餐食' },
      { name: '加值', price: 4100, features: '20kg 託運\n含餐食' },
      { name: '尊榮', price: 5500, features: '30kg 託運\n含餐食\n選位' },
    ]
  },
  {
    id: 6, airline: 'IT', flightNo: 'IT 243',
    depart: '16:10', arrive: '19:50', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3600, originalPrice: 4800,
    tags: ['低成本航空'],
    tiers: [
      { name: '基本', price: 3600, features: '7kg 手提\n不含餐食' },
      { name: '加值', price: 4500, features: '20kg 託運\n含餐食' },
    ]
  },
  // -- 大韓航空 --
  {
    id: 7, airline: 'KE', flightNo: 'KE 692',
    depart: '10:45', arrive: '14:30', duration: '2h 45m',
    stops: 0, cabin: 'economy',
    price: 5200, originalPrice: 7000,
    tags: ['含託運行李', '里程累積'],
    tiers: [
      { name: '經濟艙', price: 5200, features: '23kg 託運\n里程累積' },
      { name: '超值商務', price: 16800, features: '32kg 託運\n平躺座椅' },
      { name: '頭等艙', price: 38000, features: '40kg 託運\n私人套間' },
    ]
  },
  {
    id: 8, airline: 'KE', flightNo: 'KE 694',
    depart: '20:15', arrive: '00:00+1', duration: '2h 45m',
    stops: 0, cabin: 'economy',
    price: 5500, originalPrice: 7000,
    tags: ['含託運行李', '夜班機'],
    tiers: [
      { name: '經濟艙', price: 5500, features: '23kg 託運' },
      { name: '商務艙', price: 17500, features: '32kg 託運\n平躺座椅' },
    ]
  },
  // -- 濟州航空 --
  {
    id: 9, airline: '7C', flightNo: '7C 2601',
    depart: '08:20', arrive: '12:00', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3400, originalPrice: 5000,
    tags: ['特惠票'],
    tiers: [
      { name: '基本', price: 3400, features: '10kg 手提\n不含餐食' },
      { name: '標準', price: 4400, features: '23kg 託運' },
    ]
  },
  {
    id: 10, airline: '7C', flightNo: '7C 2603',
    depart: '13:50', arrive: '17:30', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3800, originalPrice: 5000,
    tags: [],
    tiers: [
      { name: '基本', price: 3800, features: '10kg 手提\n不含餐食' },
      { name: '標準', price: 4700, features: '23kg 託運' },
    ]
  },
  // -- 釜山航空 --
  {
    id: 11, airline: 'BX', flightNo: 'BX 391',
    depart: '09:40', arrive: '13:20', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3500, originalPrice: 4900,
    tags: ['特惠票'],
    tiers: [
      { name: '基本', price: 3500, features: '10kg 手提\n不含餐食' },
      { name: '標準', price: 4600, features: '23kg 託運\n含餐食' },
    ]
  },
  {
    id: 12, airline: 'BX', flightNo: 'BX 393',
    depart: '15:30', arrive: '19:10', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3750, originalPrice: 4900,
    tags: [],
    tiers: [
      { name: '基本', price: 3750, features: '10kg 手提\n不含餐食' },
      { name: '標準', price: 4800, features: '23kg 託運' },
    ]
  },
  // -- T'way 航空 --
  {
    id: 13, airline: 'TW', flightNo: 'TW 291',
    depart: '11:10', arrive: '14:50', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3300, originalPrice: 5100,
    tags: ['特惠票', '限時優惠'],
    tiers: [
      { name: '基本', price: 3300, features: '10kg 手提' },
      { name: '標準', price: 4500, features: '23kg 託運' },
    ]
  },
  {
    id: 14, airline: 'TW', flightNo: 'TW 293',
    depart: '19:00', arrive: '22:40', duration: '2h 40m',
    stops: 0, cabin: 'economy',
    price: 3550, originalPrice: 5100,
    tags: [],
    tiers: [
      { name: '基本', price: 3550, features: '10kg 手提' },
      { name: '標準', price: 4700, features: '23kg 託運' },
    ]
  },
];

// ---------- State ----------
let currentSort = 'price';
let currentCabin = 'all';
let hiddenAirlines = new Set();
let flights = [...allFlights];

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  // Set default date to today + 7 days
  const d = new Date();
  d.setDate(d.getDate() + 7);
  document.getElementById('depart-date').value = d.toISOString().split('T')[0];
  d.setDate(d.getDate() + 4);
  document.getElementById('return-date').value = d.toISOString().split('T')[0];

  // Update time
  document.getElementById('update-time').textContent = new Date().toLocaleString('zh-TW');

  buildCalendar();
  renderFlights();
});

// ---------- Calendar Strip ----------
function buildCalendar() {
  const container = document.getElementById('cal-scroll');
  const prices = [4100, 3900, 3200, 3800, 4200, 4400, 3600, 3300, 4700, 5100, 3800, 3400, 3900, 4100];
  const minPrice = Math.min(...prices);
  const today = new Date();
  today.setDate(today.getDate() + 3);

  prices.forEach((p, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const el = document.createElement('div');
    el.className = 'cal-day' + (p === minPrice ? ' lowest' : '') + (i === 0 ? ' today' : '');
    el.innerHTML = `
      <span class="day-label">週${days[d.getDay()]}</span>
      <span class="day-date">${d.getMonth()+1}/${d.getDate()}</span>
      <span class="day-price">NT$${p.toLocaleString()}</span>
    `;
    el.onclick = () => { alert(`已選擇 ${d.getMonth()+1}/${d.getDate()} 出發，最低票價 NT$${p.toLocaleString()}`); };
    container.appendChild(el);
  });
}

// ---------- Search ----------
function searchFlights() {
  const btn = document.querySelector('.search-btn');
  btn.textContent = '搜尋中…';
  btn.disabled = true;

  // Show skeleton
  const list = document.getElementById('flight-list');
  list.innerHTML = Array(4).fill(0).map(() =>
    `<div class="skeleton skeleton-card"></div>`
  ).join('');

  setTimeout(() => {
    btn.textContent = '搜尋航班';
    btn.disabled = false;
    renderFlights();
  }, 900);
}

// ---------- Sort ----------
function sortBy(key) {
  currentSort = key;
  document.querySelectorAll('.filter-btn').forEach(b => {
    if (['price', 'duration', 'depart', 'arrive'].includes(b.getAttribute('onclick')?.match(/'(\w+)'/)?.[1])) {
      b.classList.remove('active');
    }
  });
  event.target.classList.add('active');
  renderFlights();
}

// ---------- Filter cabin ----------
function filterCabin(cabin, el) {
  currentCabin = cabin;
  document.querySelectorAll('.filter-group:last-child .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderFlights();
}

// ---------- Filter airline ----------
function filterAirline(checkbox, code) {
  if (checkbox.checked) hiddenAirlines.delete(code);
  else hiddenAirlines.add(code);
  renderFlights();
}

// ---------- Render ----------
function renderFlights() {
  let list = flights.filter(f => {
    if (hiddenAirlines.has(f.airline)) return false;
    if (currentCabin !== 'all' && f.cabin !== currentCabin) return false;
    return true;
  });

  // Sort
  list.sort((a, b) => {
    if (currentSort === 'price') return a.price - b.price;
    if (currentSort === 'duration') return a.duration.localeCompare(b.duration);
    if (currentSort === 'depart') return a.depart.localeCompare(b.depart);
    if (currentSort === 'arrive') return a.arrive.localeCompare(b.arrive);
    return 0;
  });

  const container = document.getElementById('flight-list');

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">✈️</div>
        <h3>找不到符合條件的航班</h3>
        <p>請調整篩選條件後再試</p>
      </div>`;
    updateStats(list);
    return;
  }

  const minPrice = Math.min(...list.map(f => f.price));
  const avgPrice = Math.round(list.reduce((s, f) => s + f.price, 0) / list.length);
  updateStats(list, minPrice, avgPrice);

  container.innerHTML = list.map((f, idx) => buildCard(f, idx === 0 && f.price === minPrice)).join('');
}

function updateStats(list, minPrice, avgPrice) {
  document.getElementById('result-count').innerHTML = `共找到 <strong>${list.length}</strong> 個航班`;
  if (minPrice) {
    document.getElementById('min-price').textContent = `NT$ ${minPrice.toLocaleString()}`;
    document.getElementById('avg-price').textContent = `NT$ ${avgPrice.toLocaleString()}`;
  }
}

function buildCard(f, isBest) {
  const al = airlines[f.airline];
  const discount = Math.round((1 - f.price / f.originalPrice) * 100);
  const tagsHtml = f.tags.map(t => `<span class="tag tag-green">${t}</span>`).join('');
  const discountTag = discount > 0 ? `<span class="tag tag-orange">-${discount}%</span>` : '';

  const tiersHtml = f.tiers.map((t, i) => `
    <div class="tier-card ${i === 0 ? 'selected' : ''}">
      <div class="tier-name">${t.name}</div>
      <div class="tier-price">NT$ ${t.price.toLocaleString()}</div>
      <div class="tier-features">${t.features.replace(/\n/g, '<br>')}</div>
    </div>`).join('');

  return `
  <div class="flight-card ${isBest ? 'best-deal' : ''}" id="card-${f.id}">
    <div class="airline-info">
      <div class="airline-logo" style="background:${al.bg}; color:${al.color}">${al.emoji}</div>
      <div class="airline-name">${al.name}</div>
      <div class="flight-number">${f.flightNo}</div>
    </div>

    <div class="route-info">
      <div class="time-block">
        <div class="time">${f.depart}</div>
        <div class="airport">TPE · 桃園</div>
      </div>

      <div class="route-middle">
        <div class="duration">⏱ ${f.duration}</div>
        <div class="route-line">
          <div class="line"></div>
          <span class="plane">✈</span>
          <div class="line"></div>
        </div>
        <div class="stops direct">${f.stops === 0 ? '直飛' : f.stops + ' 中停'}</div>
        <div class="tags">${tagsHtml}${discountTag}</div>
      </div>

      <div class="time-block">
        <div class="time">${f.arrive}</div>
        <div class="airport">PUS · 釜山</div>
      </div>
    </div>

    <div class="price-section">
      <div class="cabin-class">經濟艙 · 每人</div>
      <div class="price-main"><span class="currency">NT$</span>${f.price.toLocaleString()}</div>
      ${f.originalPrice > f.price
        ? `<div class="price-note">原價 NT$ ${f.originalPrice.toLocaleString()}</div>`
        : ''}
      <button class="book-btn" onclick="bookFlight(${f.id})">立即訂票</button>
    </div>

    <div class="expand-row" style="display:flex; width:100%; flex-basis:100%">
      <button class="expand-link" onclick="toggleTiers(${f.id})">▾ 查看艙等與票價方案</button>
      <div class="baggage-info">
        <span>🧳 行李</span>
        <span>🍱 餐食</span>
        <span>🔄 改期</span>
      </div>
    </div>

    <div class="price-tiers" id="tiers-${f.id}">
      ${tiersHtml}
    </div>
  </div>`;
}

// ---------- Toggle tiers ----------
function toggleTiers(id) {
  const el = document.getElementById(`tiers-${id}`);
  const btn = el.previousElementSibling.querySelector('.expand-link');
  const open = el.classList.toggle('open');
  btn.textContent = open ? '▴ 收起票價方案' : '▾ 查看艙等與票價方案';
}

// ---------- Book ----------
function bookFlight(id) {
  const f = allFlights.find(x => x.id === id);
  const al = airlines[f.airline];
  alert(`即將前往 ${al.name} 官網訂購 ${f.flightNo}\n${f.depart} TPE → ${f.arrive} PUS\n最低票價 NT$ ${f.price.toLocaleString()}`);
}
