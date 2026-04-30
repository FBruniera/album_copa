const TEAMS = {
    "MEX": { pt: "México", en: "Mexico" },
    "RSA": { pt: "África do Sul", en: "South Africa" },
    "KOR": { pt: "Coreia do Sul", en: "South Korea" },
    "CZE": { pt: "República Tcheca", en: "Czech Republic" },
    "CAN": { pt: "Canadá", en: "Canada" },
    "BIH": { pt: "Bósnia", en: "Bosnia" },
    "QAT": { pt: "Catar", en: "Qatar" },
    "SUI": { pt: "Suíça", en: "Switzerland" },
    "BRA": { pt: "Brasil", en: "Brazil" },
    "MAR": { pt: "Marrocos", en: "Morocco" },
    "HAI": { pt: "Haiti", en: "Haiti" },
    "SCO": { pt: "Escócia", en: "Scotland" },
    "USA": { pt: "Estados Unidos", en: "USA" },
    "PAR": { pt: "Paraguai", en: "Paraguay" },
    "AUS": { pt: "Austrália", en: "Australia" },
    "TUR": { pt: "Turquia", en: "Turkey" },
    "GER": { pt: "Alemanha", en: "Germany" },
    "CUW": { pt: "Curaçao", en: "Curacao" },
    "CIV": { pt: "Costa do Marfim", en: "Ivory Coast" },
    "ECU": { pt: "Equador", en: "Ecuador" },
    "NED": { pt: "Holanda", en: "Netherlands" },
    "JPN": { pt: "Japão", en: "Japan" },
    "SWE": { pt: "Suécia", en: "Sweden" },
    "TUN": { pt: "Tunísia", en: "Tunisia" },
    "BEL": { pt: "Bélgica", en: "Belgium" },
    "EGY": { pt: "Egito", en: "Egypt" },
    "IRN": { pt: "Irã", en: "Iran" },
    "NZL": { pt: "Nova Zelândia", en: "New Zealand" },
    "ESP": { pt: "Espanha", en: "Spain" },
    "CPV": { pt: "Cabo Verde", en: "Cape Verde" },
    "KSA": { pt: "Arábia Saudita", en: "Saudi Arabia" },
    "URU": { pt: "Uruguai", en: "Uruguay" },
    "FRA": { pt: "França", en: "France" },
    "SEN": { pt: "Senegal", en: "Senegal" },
    "IRQ": { pt: "Iraque", en: "Iraq" },
    "NOR": { pt: "Noruega", en: "Norway" },
    "ARG": { pt: "Argentina", en: "Argentina" },
    "ALG": { pt: "Argélia", en: "Algeria" },
    "AUT": { pt: "Áustria", en: "Austria" },
    "JOR": { pt: "Jordânia", en: "Jordan" },
    "POR": { pt: "Portugal", en: "Portugal" },
    "COD": { pt: "Congo", en: "Congo" },
    "UZB": { pt: "Uzbequistão", en: "Uzbekistan" },
    "COL": { pt: "Colômbia", en: "Colombia" },
    "ENG": { pt: "Inglaterra", en: "England" },
    "CRO": { pt: "Croácia", en: "Croatia" },
    "GHA": { pt: "Gana", en: "Ghana" },
    "PAN": { pt: "Panamá", en: "Panama" }
};

const GROUPS_ORDER = [
    { n: "GRUPO A", s: ["MEX", "RSA", "KOR", "CZE"] },
    { n: "GRUPO B", s: ["CAN", "BIH", "QAT", "SUI"] },
    { n: "GRUPO C", s: ["BRA", "MAR", "HAI", "SCO"] },
    { n: "GRUPO D", s: ["USA", "PAR", "AUS", "TUR"] },
    { n: "GRUPO E", s: ["GER", "CUW", "CIV", "ECU"] },
    { n: "GRUPO F", s: ["NED", "JPN", "SWE", "TUN"] },
    { n: "GRUPO G", s: ["BEL", "EGY", "IRN", "NZL"] },
    { n: "GRUPO H", s: ["ESP", "CPV", "KSA", "URU"] },
    { n: "GRUPO I", s: ["FRA", "SEN", "IRQ", "NOR"] },
    { n: "GRUPO J", s: ["ARG", "ALG", "AUT", "JOR"] },
    { n: "GRUPO K", s: ["POR", "COD", "UZB", "COL"] },
    { n: "GRUPO L", s: ["ENG", "CRO", "GHA", "PAN"] }
];

let storage = JSON.parse(localStorage.getItem('coleciona_v2026')) || {};

function init() {
    const sort = document.getElementById('sort-select').value;
    const container = document.getElementById('main-accordion');
    container.innerHTML = '';

    container.appendChild(createSection("FWC - INÍCIO", "fwc-init", generateGrid("FWC", 0, 8)));

    if (sort === 'grupos') {
        GROUPS_ORDER.forEach(g => {
            let html = "";
            g.s.forEach(key => html += `<h5>${TEAMS[key].pt} / ${TEAMS[key].en}</h5>` + generateGrid(key, 1, 20));
            container.appendChild(createSection(g.n, `group-${g.n}`, html));
        });
    } else {
        const lang = sort === 'alfa_pt' ? 'pt' : 'en';
        const sortedKeys = Object.keys(TEAMS).sort((a,b) => TEAMS[a][lang].localeCompare(TEAMS[b][lang]));
        let html = "";
        sortedKeys.forEach(key => {
            const title = lang === 'pt' ? `${TEAMS[key].pt} / ${TEAMS[key].en}` : `${TEAMS[key].en} / ${TEAMS[key].pt}`;
            html += `<h5>${title}</h5>` + generateGrid(key, 1, 20);
        });
        container.appendChild(createSection("SELEÇÕES", "selecoes-alfa", html));
    }

    container.appendChild(createSection("FWC - HISTÓRIA", "fwc-end", generateGrid("FWC", 9, 19)));
    container.appendChild(createSection("COCA-COLA", "coca-cola", generateGrid("CC", 1, 14)));
    container.appendChild(createSection("EXTRA STICKERS", "extras", generateExtraGrid()));

    updateUI();
}

function createSection(title, id, content) {
    const div = document.createElement('div');
    div.className = 'acc-item';
    div.innerHTML = `
        <div class="acc-header" onclick="toggleAcc(this)">
            <h4>${title}</h4>
            <i class="fas fa-chevron-down"></i>
        </div>
        <div class="acc-content">${content}</div>
    `;
    return div;
}

function generateGrid(prefix, start, end) {
    let h = '<div class="stk-grid">';
    for(let i=start; i<=end; i++) {
        const sid = `${prefix}-${i}`;
        const count = storage[sid] || 0;
        h += `
        <div class="stk-unit">
            <div class="stk-box ${count > 0 ? 'owned' : ''} ${count > 1 ? 'repeated' : ''}" id="box-${sid}">
                ${i}${count > 1 ? `<div class="q-badge">${count}</div>` : ''}
            </div>
            <div class="stk-btns">
                <button onclick="upd('${sid}',-1, '${i}')">-</button>
                <button class="btn-plus" onclick="upd('${sid}',1, '${i}')">+</button>
            </div>
        </div>`;
    }
    return h + '</div>';
}

function generateExtraGrid() {
    let h = '';
    for(let i=1; i<=20; i++) {
        h += `<div class="extra-section"><strong>Jogador ${i}</strong><div class="stk-grid">`;
        ['Bordeaux', 'Bronze', 'Silver', 'Gold'].forEach(rarity => {
            const sid = `EX-${i}-${rarity}`;
            const count = storage[sid] || 0;
            h += `
            <div class="stk-unit">
                <div class="stk-box box-${rarity.toLowerCase()} ${count > 0 ? 'owned' : ''} ${count > 1 ? 'repeated' : ''}" id="box-${sid}">
                    ${rarity[0]}${count > 1 ? `<div class="q-badge">${count}</div>` : ''}
                </div>
                <div class="stk-btns">
                    <button onclick="upd('${sid}',-1, '${rarity[0]}')">-</button>
                    <button class="btn-plus" onclick="upd('${sid}',1, '${rarity[0]}')">+</button>
                </div>
                <small style="font-size:0.45rem; color:#888">${rarity}</small>
            </div>`;
        });
        h += '</div></div>';
    }
    return h;
}

function upd(sid, delta, label) {
    let v = (storage[sid] || 0) + delta;
    if (v <= 0) delete storage[sid]; else storage[sid] = v;
    localStorage.setItem('coleciona_v2026', JSON.stringify(storage));
    
    const box = document.getElementById(`box-${sid}`);
    if (box) {
        const count = storage[sid] || 0;
        box.className = `stk-box ${count > 0 ? 'owned' : ''} ${count > 1 ? 'repeated' : ''}`;
        if(sid.startsWith('EX-')) {
            const rarity = sid.split('-')[2].toLowerCase();
            box.classList.add(`box-${rarity}`);
        }
        box.innerHTML = `${label}${count > 1 ? `<div class="q-badge">${count}</div>` : ''}`;
    }
    
    updateUI(); 
}

function updateUI() {
    const unicosOficiais = Object.keys(storage).filter(k => !k.startsWith('EX')).length;
    const totalItens = Object.values(storage).reduce((a,b) => a+b, 0);
    const repetidasTotal = totalItens - Object.keys(storage).length;
    const porc = ((unicosOficiais / 993) * 100).toFixed(1);

    document.getElementById('total-unicos').innerText = unicosOficiais;
    document.getElementById('total-repetidas').innerText = repetidasTotal;
    document.getElementById('total-geral').innerText = totalItens;
    document.getElementById('progress-bar').style.width = porc + '%';
    document.getElementById('progress-text').innerText = porc + '%';
    document.getElementById('num-progresso').innerText = `${unicosOficiais} / 993`;
}

function toggleAcc(header) {
    const content = header.nextElementSibling;
    content.classList.toggle('open');
    const icon = header.querySelector('i');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
}

function preencherTudo() {
    if(!confirm("Deseja marcar todas as 993 figurinhas oficiais?")) return;
    for(let i=0; i<=19; i++) storage[`FWC-${i}`] = 1;
    for(let i=1; i<=14; i++) storage[`CC-${i}`] = 1;
    Object.keys(TEAMS).forEach(k => {
        for(let i=1; i<=20; i++) storage[`${k}-${i}`] = 1;
    });
    localStorage.setItem('coleciona_v2026', JSON.stringify(storage));
    init();
}

function resetarTudo() {
    if(confirm("Deseja zerar todo o álbum?")) {
        storage = {};
        localStorage.clear();
        init();
    }
}

function toggleContrast() { document.body.classList.toggle('high-contrast'); }
function toggleDonation() { const a = document.getElementById('donation-area'); a.style.display = a.style.display === 'none' ? 'block' : 'none'; }

init();