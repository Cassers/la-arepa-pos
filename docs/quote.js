"use strict";

const catalog = {
  dell: {
    name: "Dell Latitude 5420",
    details: "Usado corporativo · 14″ · Core i5-1145G7 · 16 GB RAM · SSD de 256 GB. Confirmar estado de la batería.",
    seller: "Computadores de Segunda",
    price: 1099000,
    url: "https://computadoresusados.co/computador-de-segunda-corporativo/dell-latitude-5420-i5-1145g7/919",
    icon: "laptop",
  },
  hp: {
    name: "HP 14″ nuevo",
    details: "Intel Celeron N4500 · 8 GB DDR4 · SSD de 512 GB · pantalla HD · batería de 41 Wh. Precio informado por el proveedor.",
    price: 1290000,
    icon: "laptop",
  },
  lock: {
    name: "Guaya XUE Noble Wedge",
    details: "Cable de 2 m con clave de 4 dígitos para la ranura de seguridad del Dell Latitude 5420.",
    seller: "Mercado Libre",
    price: 65900,
    url: "https://www.mercadolibre.com.co/guaya-de-seguridad-4digitos-noble-wedge-para-laptops-dell/up/MCOU3412771099?picker=true",
    icon: "lock",
  },
  battery: {
    name: "Batería nueva RJ40G de 63 Wh",
    details: "Compatible con el Dell Latitude 5420 · 12 meses de garantía anunciada · precio en efectivo o por transferencia. Instalación por confirmar.",
    seller: "TeCo Market",
    price: 289000,
    url: "https://www.computadoresenbogota.com/market/producto/bateria-para-portatil-dell-premium-latitude-5420-5520-precision-3560-type-rj40g-63wh/",
    icon: "battery",
  },
  digital: {
    name: "Digital POS DIG-E200I",
    details: "Térmica 80 mm con autocorte · USB y Ethernet · impresión desde Odoo pendiente de validar.",
    seller: "Digital Store",
    price: 207462,
    url: "https://digitalstore.com.co/product/impresora-termica-digital-pos-dig-e200i-usb-ethernet-80mm/",
    icon: "printer",
  },
  drawer: {
    name: "Cajón monedero SAT 119X",
    details: "Cajón metálico · 5 puestos para billetes · se conecta a la impresora.",
    seller: "Digital Store",
    price: 145626,
    url: "https://digitalstore.com.co/product/cajon-monedero-sat-119x-metalico-medellin-colombia/",
    icon: "drawer",
  },
  cable: {
    name: "Cable de red CAT6",
    details: "2 m por unidad · para la impresora y la caja si se conecta por cable.",
    seller: "IP Suministros",
    price: 7319,
    url: "https://www.tienda.ipsuministros.com/index.php/producto/cable-de-parcheo-utp-cat6-2-m-blanco",
    icon: "cable",
  },
  paper: {
    name: "Rollos de papel térmico",
    details: "Paquete de 10 · medida 80 × 70 mm.",
    seller: "Mercado Libre",
    price: 35807,
    url: "https://www.mercadolibre.com.co/10-rollos-papel-termico-80x70-blanco-impresora-80mm-ticket-con-iva/p/MCO21987960",
    icon: "paper",
  },
  ups: {
    name: "UPS Forza NT-751",
    details: "750 VA / 375 W · respaldo para impresora y red local.",
    seller: "IP Suministros",
    price: 187607,
    url: "https://www.tienda.ipsuministros.com/producto/forza-ups-line-interactive-375-watt-750-va-120-v-6-nema-outlets",
    icon: "ups",
  },
};

const iconPaths = {
  laptop: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="m4 16-2 4h20l-2-4m-11 2h6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  battery: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4m-13-2h4m-2-2v4"/>',
  printer: '<path d="M6 8V3h12v5m0 8h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"/><path d="M6 14h12v7H6zm11-3h2"/>',
  drawer: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20m-13 4h6m-3 2h.01"/>',
  cable: '<path d="M7 3v3m3-3v3M6 6h5v4H6zm2.5 4v6a4 4 0 0 0 8 0v-2m-2-4h5v4h-5zm1-3v3m3-3v3"/>',
  paper: '<path d="M6 3h12v17l-3-2-3 2-3-2-3 2zm3 5h6m-6 4h6"/>',
  ups: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="m13 6-3 5h4l-3 5m1 3h.01"/>',
};

const money = new Intl.NumberFormat("es-CO", {maximumFractionDigits: 0});
const pesos = (value) => "$" + money.format(value);
const byId = (id) => document.getElementById(id);
const discountPercent = 50;
const laborOptions = [
  {id: "base", name: "Instalación base de Odoo Community", details: "Instancia, base de datos, usuarios y punto de venta para un local.", price: 800000},
  {id: "cash", name: "Menú, mesas y caja", details: "Carta y categorías, pedidos de salón y domicilios, medios de pago y arqueo por billetes y monedas.", price: 550000},
  {id: "stock", name: "Inventario inicial", details: "Carga de existencias y ajustes básicos de inventario.", price: 350000},
  {id: "printing", name: "Dos comandas impresas y cajón", details: "Puente local para la Digital POS: una copia para cocina y otra para reparto. Apertura del cajón al cobrar en efectivo.", price: 650000},
  {id: "kitchen", name: "Comanda por Telegram", details: "Envío al grupo privado de caja y cocina al confirmar el pedido.", price: 350000},
  {id: "dispatch", name: "Aviso de despacho por Telegram", details: "Acción de pedido listo y aviso al grupo privado de reparto.", price: 250000},
  {id: "training", name: "Respaldo y capacitación", details: "Copias de seguridad, pruebas de entrega y guía de operación para el equipo.", price: 250000},
  {id: "appearance", name: "Apariencia de caja · opcional", details: "Estimado para aplicar la marca a una pantalla de caja con colores, logo y tamaños de botones.", price: 500000, optional: true},
];

const discounted = (price) => price * (100 - discountPercent) / 100;

function calculate({hasUps, selectedIds, laptopId, wantsLock, wantsBattery = false}) {
  const laptop = catalog[laptopId];
  const hasLock = laptopId === "dell" && wantsLock;
  const hasBattery = laptopId === "dell" && wantsBattery;
  const equipment = [[laptop, 1]];
  if (hasLock) equipment.push([catalog.lock, 1]);
  if (hasBattery) equipment.push([catalog.battery, 1]);
  equipment.push([catalog.digital, 1], [catalog.drawer, 1], [catalog.cable, 2], [catalog.paper, 1]);
  if (hasUps) equipment.push([catalog.ups, 1]);
  const hardware = equipment.reduce((total, [item, quantity]) => total + item.price * quantity, 0);
  const selected = laborOptions.filter(({id}) => selectedIds.includes(id));
  const regularLabor = selected.reduce((total, {price}) => total + price, 0);
  const installation = discounted(regularLabor);
  return {laptop, hasLock, hasBattery, equipment, hardware, selected, regularLabor, discount: regularLabor - installation, installation, total: hardware + installation};
}

function renderItems(equipment) {
  byId("items").innerHTML = equipment.map(([item, quantity]) => {
    const purchase = item.url
      ? `<a class="shop" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${item.name} en ${item.seller}, abre en una pestaña nueva">${item.seller} ↗</a>`
      : '<span class="supplier-note">Enlace pendiente</span>';
    return `
    <li class="item">
      <div class="item-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${iconPaths[item.icon]}</svg></div>
      <div><h3>${item.name}${quantity > 1 ? " × " + quantity : ""}</h3><p>${item.details}${quantity > 1 ? " " + pesos(item.price) + " c/u." : ""}</p></div>
      <div class="item-buy"><strong>${pesos(item.price * quantity)}</strong>${purchase}</div>
    </li>`;
  }).join("");
}

function render() {
  const hasUps = byId("ups").checked;
  const selectedIds = laborOptions.filter(({id}) => byId(id).checked).map(({id}) => id);
  const laptopId = byId("laptop-hp").checked ? "hp" : "dell";
  const isDell = laptopId === "dell";
  const wantsLock = byId("lock").checked;
  const wantsBattery = byId("battery").checked;
  const {laptop, hasLock, hasBattery, equipment, hardware, selected, regularLabor, discount, installation, total} =
    calculate({hasUps, selectedIds, laptopId, wantsLock, wantsBattery});
  const hasLabor = selected.length > 0;
  byId("lock-option").hidden = !isDell;
  byId("battery-option").hidden = !isDell;
  byId("hp-lock-note").hidden = isDell;
  byId("labor-subtotal").textContent = pesos(installation);
  byId("summary-config").textContent = laptop.name + " · " + catalog.digital.name;
  byId("total-label").textContent = hasLabor ? "Equipos + mano de obra" : "Total de equipos";
  byId("total").textContent = pesos(total);
  const lines = [
    ["Equipos", pesos(hardware)],
    ["UPS", hasUps ? "Incluida" : "Por agregar"],
    ...(isDell ? [
      ["Guaya Wedge", hasLock ? "Incluida" : "Por agregar"],
      ["Batería nueva", hasBattery ? "Incluida" : "Opcional"],
    ] : []),
    ["Mano de obra · tarifa normal", pesos(regularLabor)],
    ["Descuento del " + discountPercent + " %", discount ? "−" + pesos(discount) : pesos(0)],
    ["Mano de obra con descuento", pesos(installation)],
    ["Licencia Odoo Community", pesos(0)],
  ];
  byId("summary-lines").innerHTML = lines.map(([label, amount]) => `<div><dt>${label}</dt><dd>${amount}</dd></div>`).join("");
  byId("print-labor").hidden = !hasLabor;
  byId("print-labor-lines").innerHTML = selected.map(({name, price}) =>
    `<div><dt>${name}</dt><dd>${pesos(discounted(price))}</dd></div>`).join("");
  const hasKitchen = selectedIds.includes("kitchen");
  const hasDispatch = selectedIds.includes("dispatch");
  byId("telegram-details").hidden = !hasKitchen && !hasDispatch;
  byId("kitchen-details").hidden = !hasKitchen;
  byId("dispatch-details").hidden = !hasDispatch;
  byId("print-details").hidden = !selectedIds.includes("printing");
  byId("ups-details").hidden = !hasUps;
  renderItems(equipment);
}

function mount() {
  byId("dell-price").textContent = pesos(catalog.dell.price);
  byId("hp-price").textContent = pesos(catalog.hp.price);
  byId("lock-price").textContent = "+" + pesos(catalog.lock.price);
  byId("battery-price").textContent = "+" + pesos(catalog.battery.price);
  byId("ups-price").textContent = "+" + pesos(catalog.ups.price);
  byId("labor-options").innerHTML = laborOptions.map(({id, name, details, price, optional}) => `
    <label>
      <input id="${id}" type="checkbox"${optional ? "" : " checked"} aria-labelledby="${id}-label" aria-describedby="${id}-details ${id}-price">
      <span><strong id="${id}-label">${name}</strong><small id="${id}-details">${details}</small></span>
      <b id="${id}-price">${pesos(discounted(price))}<small>Normal ${pesos(price)}</small></b>
    </label>`).join("");
  byId("labor-options").addEventListener("change", ({target}) => {
    if (target.id === "base" && !target.checked) {
      laborOptions.forEach(({id}) => { byId(id).checked = false; });
    } else if (target.checked) {
      byId("base").checked = true;
    }
    render();
  });
  byId("equipment-options").addEventListener("change", render);
  byId("ups").addEventListener("change", render);
  byId("print").addEventListener("click", () => window.print());
  render();
}

if (typeof document !== "undefined") mount();
if (typeof module !== "undefined") module.exports = {catalog, laborOptions, calculate};
