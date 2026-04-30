const FLAG_MAP = {
    "BRA": "br", "USA": "us", "ARG": "ar", "FRA": "fr", "GER": "de", "ENG": "gb-eng", "ESP": "es", "ITA": "it", "POR": "pt", "JPN": "jp", "MEX": "mx", "CAN": "ca", "NED": "nl", "BEL": "be", "URU": "uy", "COL": "co", "CRO": "hr", "MAR": "ma", "SEN": "sn", "KOR": "kr", "AUS": "au", "SAU": "sa", "EGY": "eg", "NGR": "ng", "CMR": "cm", "GHA": "gh", "RSA": "za", "ALG": "dz", "TUN": "tn", "CHI": "cl", "PAR": "py", "ECU": "ec", "PER": "pe", "AUT": "at", "SWE": "se", "NOR": "no", "SUI": "ch", "DEN": "dk", "SRB": "rs", "POL": "pl", "CZE": "cz", "TUR": "tr", "UKR": "ua", "GRE": "gr", "IRA": "ir", "UAE": "ae", "CHN": "cn", "NZL": "nz"
};

const CATEGORIES = {
    selecoes: Object.keys(FLAG_MAP),
    especiais: [
        { id: "FWC", nome: "FIFA Especiais", qtd: 30 },
        { id: "EST", nome: "Estádios 2026", qtd: 16 },
        { id: "COKE", nome: "Coca-Cola Team", qtd: 12 }
    ]
};

let storage = JSON.parse(localStorage.getItem('copa26_final_v1')) || {};

function init() {
    renderItems('selecoes', CATEGORIES.selecoes, 'container-selecoes');
    renderItems('especiais', CATEGORIES.especiais, 'container-especiais');
    updateUI();
}

function renderItems(type, data, targetId) {
    const target = document.getElementById(targetId);
    data.forEach(item => {
        const id = (type === 'selecoes') ? item : item.id;
        const label = (type === 'selecoes') ? item : item.nome;
        const total = (type === 'selecoes') ? 19 : item.qtd;
        const flag = (type === 'selecoes') ? FLAG_MAP[item] : null;

        const wrapper = document.createElement('div');
        wrapper.className = 'acc-item';
        wrapper.innerHTML = `
            <div class="acc-header" onclick="toggleAcc(this)">
                <span>
                    ${flag ? `<img src="https://flagcdn.com/w40/${flag}.png">` : '<i class="fas fa-star" style="color:var(--gold); margin-right:10px"></i>'}
                    ${label}
                </span>
                <span class="badge" id="badge-${id}">${getUnicos(id)} / ${total}</span>
            </div>
            <div class="acc-body">
                ${generateStickerGrid(id, total, type === 'especiais')}
            </div>
        `;
        target.appendChild(wrapper);
    });
}

function generateStickerGrid(prefix, total, isSpec) {
    let html = '';
    for(let i=1; i<=total; i++) {
        const sid = `${prefix}-${i}`;
        const count = storage[sid] || 0;
        const isGolden = isSpec || i === 1;
        html += `
            <div class="stk-wrapper">
                <div class="stk-box ${count > 0 ? 'owned' : ''} ${count > 1 ? 'repeated' : ''} ${isGolden ? 'special' : ''}" id="stk-${sid}">
                    ${i}
                    <div class="q-badge" id="q-${sid}" style="display: ${count > 1 ? 'block' : 'none'}">${count}</div>
                </div>
                <div class="stk-btns">
                    <button onclick="changeQty('${sid}', -1, '${prefix}', ${total})">-</button>
                    <button class="btn-plus" onclick="changeQty('${sid}', 1, '${prefix}', ${total})">+</button>
                </div>
            </div>
        `;
    }
    return html;
}

function changeQty(sid, delta, prefix, total) {
    let val = storage[sid] || 0;
    val += delta;
    if (val <= 0) delete storage[sid];
    else storage[sid] = val;

    localStorage.setItem('copa26_final_v1', JSON.stringify(storage));
    refreshSticker(sid, val);
    document.getElementById(`badge-${prefix}`).innerText = `${getUnicos(prefix)} / ${total}`;
    updateUI();
}

function refreshSticker(sid, count) {
    const box = document.getElementById(`stk-${sid}`);
    const badge = document.getElementById(`q-${sid}`);
    box.classList.toggle('owned', count > 0);
    box.classList.toggle('repeated', count > 1);
    badge.style.display = count > 1 ? 'block' : 'none';
    badge.innerText = count;
}

function getUnicos(prefix) {
    return Object.keys(storage).filter(k => k.startsWith(prefix)).length;
}

function updateUI() {
    const keys = Object.keys(storage);
    const unicos = keys.length;
    const total = Object.values(storage).reduce((a, b) => a + b, 0);
    const porc = ((unicos / 980) * 100).toFixed(1);

    document.getElementById('total-unicos').innerText = unicos;
    document.getElementById('total-repetidas').innerText = total - unicos;
    document.getElementById('total-geral').innerText = total;
    document.getElementById('progress-bar').style.width = porc + '%';
    document.getElementById('progress-text').innerText = porc + '%';
}

function toggleAcc(el) {
    el.nextElementSibling.classList.toggle('open');
}

function switchTab(tab) {
    document.querySelectorAll('.tab-view, .tab-btn').forEach(e => e.classList.remove('active'));
    document.getElementById(`view-${tab}`).classList.add('active');
    document.getElementById(`tab-${tab}`).classList.add('active');
}

function toggleContrast() { document.body.classList.toggle('high-contrast'); }

init();