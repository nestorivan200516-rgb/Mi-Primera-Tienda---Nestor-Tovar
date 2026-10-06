const productos = [
  {
    id: 1,
    nombre: "Lego Moto Kawasaki Ninja H2R",
    descripcion: "Siente la potencia de la Kawasaki Ninja H2R, ahora pieza a pieza. ¡Construye tu propia leyenda sobre dos ruedas!",
    precio: 120000,
    imagen: "https://www.lego.com/cdn/cs/set/assets/blta83a881921fd4b76/42170.png?fit=bounds&format=jpg&quality=80&width=1500&height=1500&dpr=1"
  },
  {
    id: 2,
    nombre: "Lego Moto BMW S1000RR",
    descripcion: "La BMW S 1000 RR, pura potencia y precisión sobre dos ruedas. ¡Construye tu propia leyenda pieza a pieza!",
    precio: 125000,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_797103-MLU72748489555_112023-O.webp"
  },
  {
    id: 3,
    nombre: "Lego Moto Ducati Panigale V4",
    descripcion: "Velocidad, diseño y carácter italiano en cada pieza: arma la Ducati Panigale V4 y lleva la pasión por las superbikes a tu colección",
    precio: 130000,
    imagen: "https://pepeganga.vtexassets.com/arquivos/ids/1208303-800-auto?v=638772068877700000&width=800&height=auto&aspect=true"
  },
  {
    id: 4,
    nombre: "Lego Moto Suziki Hayabusa",
    descripcion: "Una leyenda de la velocidad que ahora puedes construir: descubre la Suzuki Hayabusa y acelera tu colección pieza a pieza.",
    precio: 128000,
    imagen: "https://www.brickmo.com/media/image/2b/9a/38/CaDA_C64051W_Suzuki_Hayabusa_C64051W_BRICKMO_online_Motrrader_kaufen_BRICKMO_Online-Shop_BRICKMO_1_600x600@2x.jpg"
  },
  {
    id: 5,
    nombre: "Lego Moto Honda CBR 1000RR",
    descripcion: "Diseño agresivo, espíritu de competición y pura actitud: la Honda CBR1000RR llega para conquistar tu colección.",
    precio: 110000,
    imagen: "https://ideascdn.lego.com/media/generate/lego_ci/d0f0e471-6959-40a0-9027-44918a68fb99/original:0:0/webp"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
