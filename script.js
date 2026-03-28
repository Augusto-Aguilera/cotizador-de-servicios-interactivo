// Scroll Reveal
window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight - 100) r.classList.add("active");
    });
});

// Menu Mobile
document.getElementById('mobile-toggle').onclick = () => document.getElementById('nav-list').classList.toggle('active');

// Cripto API
async function fetchCrypto() {
    const container = document.getElementById('crypto-container');
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd');
        const data = await res.json();
        container.innerHTML = `
            <div class="crypto-item" style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #334155;">
                <span>Bitcoin</span><span style="color:var(--accent)">$${data.bitcoin.usd.toLocaleString()}</span>
            </div>
            <div class="crypto-item" style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #334155;">
                <span>Ethereum</span><span style="color:var(--accent)">$${data.ethereum.usd.toLocaleString()}</span>
            </div>
            <div class="crypto-item" style="display:flex; justify-content:space-between; padding:5px 0;">
                <span>USDT</span><span style="color:var(--accent)">$${data.tether.usd.toFixed(2)}</span>
            </div>
        `;
    } catch (e) { container.innerHTML = "<p>Error de conexión</p>"; }
}
fetchCrypto();

// Juego Skull Tap
let targetNum = Math.floor(Math.random() * 10) + 1;
function checkGame() {
    let val = document.getElementById('game-input').value;
    let msg = document.getElementById('game-msg');
    if(!val) return;
    msg.innerText = val == targetNum ? "¡Ganaste! 🎉" : (val < targetNum ? "Más alto ⬆️" : "Más bajo ⬇️");
    if(val == targetNum) {
        setTimeout(() => { 
            targetNum = Math.floor(Math.random() * 10) + 1; 
            msg.innerText = "¡Adivina de nuevo!"; 
            document.getElementById('game-input').value = "";
        }, 2000);
    }
}

// Cotizador (CORREGIDO: Sin recursión infinita)
const quoteInputs = ['type', 'pages', 'extra', 'deadline'].map(id => document.getElementById(id));

function calculate() {
    const [type, pages, extra, deadline] = quoteInputs.map(el => parseFloat(el.value || 0));
    let total = Math.round((type + (pages * 15) + extra) * deadline);
    document.getElementById('total-price').innerText = `$${total}`;
    // Aquí NO llamamos a calculate() de nuevo.
}

// Inicializar y escuchar cambios
calculate(); 
quoteInputs.forEach(el => el.addEventListener('input', calculate));

document.getElementById('btn-quote-wa').onclick = () => {
    const total = document.getElementById('total-price').innerText;
    const typeText = document.getElementById('type').options[document.getElementById('type').selectedIndex].text;
    window.open(`https://wa.me/542657521775?text=Hola Patrick! Me interesa un presupuesto para: ${typeText}. El total estimado es de ${total}.`, '_blank');
};

// To-Do List
function addTodo() {
    let input = document.getElementById('todo-input');
    if(!input.value) return;
    let li = document.createElement('li');
    // Estilos aplicados vía CSS para mejor mantenimiento
    li.innerHTML = `<span>${input.value}</span> <button onclick="this.parentElement.remove()" style="background:#ef4444; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer; font-weight:bold;">X</button>`;
    document.getElementById('todo-list').appendChild(li);
    input.value = "";
}

// Formulario Contacto
document.getElementById('contact-form').onsubmit = (e) => {
    e.preventDefault();
    alert("¡Gracias por tu mensaje! Patrick te contactará pronto.");
    e.target.reset();
};