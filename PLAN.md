# Plan de implementación · La Arepa

## Alcance

Una caja para un local de Bogotá. El equipo registra pedidos de mesa y domicilio, controla existencias iniciales y cierra el turno con arqueo de billetes y monedas. Cada pedido confirmado puede producir dos comandas físicas iguales, una para cocina y otra para reparto, además de una notificación digital para caja y cocina. Los domicilios listos tienen un aviso aparte para el grupo de reparto.

La propuesta usa **Odoo Community 19** con PostgreSQL en una instalación administrada por el negocio. El POS de restaurante ya ofrece gestión de mesas y el cierre de caja permite contar efectivo por denominación. Los cambios de impresión, Telegram y apariencia se mantienen en módulos propios, con el código fuente separado de Odoo. ERPNext queda como alternativa de código abierto para un POS de venta e inventario si la prueba de Odoo en el local no resulta viable. [POS de Odoo](https://www.odoo.com/documentation/19.0/applications/sales/point_of_sale.html) · [Arqueo y cierre](https://www.odoo.com/documentation/19.0/applications/sales/point_of_sale/use.html#close-the-pos-register) · [POS de ERPNext](https://docs.frappe.io/erpnext/user/manual/en/point-of-sale)

## Flujo de un pedido

1. Caja selecciona mesa o domicilio, registra productos y notas de preparación y confirma el pedido.
2. Si se incluye impresión, el puente local recibe una orden de impresión y genera dos tickets de 80 mm consecutivos con el mismo contenido y autocorte. La apertura del cajón se activa al cobrar en efectivo.
3. Si se incluye Telegram para caja y cocina, un bot envía al grupo privado el número de pedido, productos, cantidades y notas de preparación.
4. Si se incluye el aviso de despacho, al marcar un domicilio como listo el bot manda el número de pedido, la dirección y las indicaciones al grupo privado de reparto.
5. Al cierre, caja cuenta billetes y monedas por denominación y revisa las diferencias frente a los pagos registrados.

## Trabajo y presupuesto

| Función | Tarifa normal | Con descuento del 50 % |
| --- | ---: | ---: |
| Instalación base de Odoo Community | $800.000 | $400.000 |
| Menú, mesas y caja | $550.000 | $275.000 |
| Inventario inicial | $350.000 | $175.000 |
| Dos comandas impresas y cajón | $650.000 | $325.000 |
| Comanda por Telegram para caja y cocina | $350.000 | $175.000 |
| Aviso de despacho por Telegram | $250.000 | $125.000 |
| Respaldo y capacitación | $250.000 | $125.000 |
| **Montaje inicial** | **$3.200.000** | **$1.600.000** |
| Apariencia de caja, extra estimado | $500.000 | $250.000 |

El reparto de honorarios entre funciones es una propuesta que conserva el precio del montaje inicial. La instalación base se incluye cuando se elige otra función. La apariencia cubre colores, logo y tamaños de botones en una pantalla de caja. La licencia de Community se presupuesta en $0. La integración fiscal y el envío de equipos se cotizan aparte. Los equipos y sus enlaces de compra están en la [cotización interactiva](https://cassers.github.io/la-arepa-pos/).

La cotización permite elegir el Dell Latitude 5420 usado o el HP nuevo de 14″. La guaya XUE Noble Wedge corresponde al Dell. Para equipar el HP con una guaya, primero hay que confirmar su ranura de seguridad con el proveedor.

## Montaje y entrega

1. **Preparar el local.** Confirmar la batería y el sistema operativo del portátil, conexiones de la Digital POS DIG-E200I, puerto del cajón y disponibilidad de los equipos. Definir dónde correrán Odoo y PostgreSQL. Montar los equipos y conectar impresora y red local a la UPS si se incluye.
2. **Configurar Odoo.** Crear la instancia, accesos y POS. Cargar la carta, variantes, mesas, existencias iniciales, medios de pago y denominaciones según las funciones seleccionadas. Usar pedidos de prueba antes de registrar ventas reales.
3. **Validar la impresión.** Probar el modelo físico por USB o Ethernet y verificar texto, tildes, autocorte y pulso del cajón. La documentación de Odoo distingue ePOS de ESC/POS. El montaje prevé un puente propio para la Digital POS y su compatibilidad queda pendiente de una prueba física. Registrar cada solicitud por pedido y permitir reimpresión manual ante un fallo. [Impresoras y protocolos en Odoo](https://www.odoo.com/documentation/19.0/applications/sales/point_of_sale/configuration/epos_printers.html)
4. **Configurar Telegram.** Crear el bot, añadirlo a los grupos privados seleccionados y guardar su token en la configuración del servidor. Registrar los envíos por pedido y tipo de aviso. Si se cae Internet, dejar los avisos pendientes y reintentar los fallos recuperables. La impresión local y el cobro siguen su propio flujo. [Telegram Bot API](https://core.telegram.org/bots/api#sendmessage)
5. **Probar y entregar.** Revisar pedido de mesa, domicilio, pago, arqueo y cada integración elegida. Configurar y probar una restauración de respaldo si se eligió ese trabajo. Entregar accesos, código de módulos y guía breve de uso.

## Pruebas de aceptación

| Función | Resultado esperado |
| --- | --- |
| Menú, mesas y caja | Se registra una mesa y un domicilio. El arqueo por denominación refleja los pagos del turno. |
| Inventario inicial | El equipo consulta las existencias de un producto de prueba y comprueba el ajuste o movimiento previsto. |
| Impresión y cajón | Una confirmación saca exactamente dos copias iguales con autocorte antes de cobrar. El cobro en efectivo abre el cajón. |
| Telegram para caja y cocina | Una confirmación genera una comanda digital en el grupo previsto. |
| Telegram para reparto | Marcar un domicilio como listo envía el aviso al grupo de reparto. Se puede identificar un aviso pendiente si falla la conexión. |
| Energía y red | El portátil sigue con batería. Con la UPS seleccionada, impresora y red local funcionan durante un corte de prueba. Se mide la autonomía. |
| Respaldo y capacitación | Se restaura una copia de prueba y el equipo completa un pedido y un cierre con la guía. |
| Apariencia de caja | La pantalla acordada aplica colores, logo y tamaños de botones, y permite completar un pedido. |
