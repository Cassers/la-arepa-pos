"use strict";

const catalog = {
  laptop: {
    name: "Dell Latitude 5420",
    details: "Portátil 14″ · i5 de 11.ª gen. · 16 GB RAM · SSD 256 GB. Confirmar batería.",
    seller: "Computadores de Segunda",
    price: 1099000,
    url: "https://computadoresusados.co/computador-de-segunda-corporativo/dell-latitude-5420-i5-1145g7/919",
    icon: "laptop",
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
    details: "2 m por unidad · un cable para el portátil y uno por impresora.",
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

function calculate(hasUps, selectedIds) {
  const equipment = [
    [catalog.laptop, 1], [catalog.digital, 1], [catalog.drawer, 1],
    [catalog.cable, 2], [catalog.paper, 1],
  ];
  if (hasUps) equipment.push([catalog.ups, 1]);
  const hardware = equipment.reduce((total, [item, quantity]) => total + item.price * quantity, 0);
  const selected = laborOptions.filter(({id}) => selectedIds.includes(id));
  const regularLabor = selected.reduce((total, {price}) => total + price, 0);
  const installation = discounted(regularLabor);
  return {equipment, hardware, selected, regularLabor, discount: regularLabor - installation, installation, total: hardware + installation};
}

function renderItems(equipment) {
  byId("items").innerHTML = equipment.map(([item, quantity]) => `
    <li class="item">
      <div class="item-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${iconPaths[item.icon]}</svg></div>
      <div><h3>${item.name}${quantity > 1 ? " × " + quantity : ""}</h3><p>${item.details}${quantity > 1 ? " " + pesos(item.price) + " c/u." : ""}</p></div>
      <div class="item-buy"><strong>${pesos(item.price * quantity)}</strong><a class="shop" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${item.name} en ${item.seller}, abre en una pestaña nueva">${item.seller} ↗</a></div>
    </li>`).join("");
}

function render() {
  const hasUps = byId("ups").checked;
  const selectedIds = laborOptions.filter(({id}) => byId(id).checked).map(({id}) => id);
  const {equipment, hardware, selected, regularLabor, discount, installation, total} = calculate(hasUps, selectedIds);
  const hasLabor = selected.length > 0;
  byId("labor-subtotal").textContent = pesos(installation);
  byId("summary-config").textContent = catalog.digital.name + " × 1" + (hasUps ? " · con UPS" : "");
  byId("total-label").textContent = hasLabor ? "Equipos + mano de obra" : "Total de equipos";
  byId("total").textContent = pesos(total);
  const lines = [
    ["Equipos", pesos(hardware)],
    ["UPS", hasUps ? "Incluida" : "Por agregar"],
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
  byId("ups").addEventListener("change", render);
  byId("print").addEventListener("click", () => window.print());
  render();
}

if (typeof document !== "undefined") mount();
if (typeof module !== "undefined") module.exports = {catalog, laborOptions, calculate};
