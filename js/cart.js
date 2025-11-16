// ===============================================
// SECCIÓN 1: VARIABLES PRINCIPALES
// ===============================================

const cartContainer = document.getElementById("productos-comprados");
let cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

const finalizarBtn = document.getElementById("boton-compra-finalizar");

// Radios de envío
const envioRadios = document.querySelectorAll('input[name="tipoEnvio"]');


// ===============================================
// SECCIÓN 2: CALCULA TOTAL POR PRODUCTO
// ===============================================

function totalProducto(price, quantity) {
  const precio = parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
  const cantidad = parseInt(quantity) || 0;
  return (precio * cantidad).toFixed(2);
}


// ===============================================
// SECCIÓN 3: MOSTRAR PRODUCTOS EN EL CARRITO
// ===============================================

function mostrarCarrito() {
  if (!cartContainer) return;

  if (!cartItems || cartItems.length === 0) {
    cartContainer.innerHTML = `
      <div class="carrito-vacio">
        <p><strong>Tu carrito está vacío</strong></p>
        <p>Agregá productos :)</p>
      </div>
    `;
    actualizarTotales();
    return;
  }

  cartContainer.innerHTML = "";

  cartItems.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("cart-item");

    card.innerHTML = `
      <div class="cart-item__image">
        <img src="${producto.image}" alt="${producto.name}">
      </div>

      <div class="cart-item__main">
        <h3 class="cart-item__title">${producto.name}</h3>
      </div>
      
      <div class="cart-item__meta">
        <div class="cart-item__qty d-flex align-items-center gap-2">
          <strong>Cantidad:</strong>
          <input
            type="number"
            min="1"
            class="form-control form-control-sm cart-item__cantidad-input"
            value="${producto.quantity}"
            data-index="${index}"
            style="width: 70px;"
          >
        </div>

        <span class="cart-item__subtotal">
          <strong>Subtotal:</strong> $${totalProducto(producto.price, producto.quantity)}
        </span>

        <button class="btn btn-danger btn-sm eliminar-btn" data-index="${index}">
          Eliminar
        </button>
      </div>
    `;

    cartContainer.appendChild(card);
  });

  agregarEventosEliminar();
  agregarEventosCantidad();
  actualizarTotales();
}


// ===============================================
// SECCIÓN 4: CALCULAR TOTALES
// ===============================================

function actualizarTotales() {
  // Subtotal productos
  const subtotal = cartItems.reduce((acc, p) => {
    const price = parseFloat(String(p.price).replace(/[^0-9.]/g, "")) || 0;
    const qty = parseInt(p.quantity) || 0;
    return acc + price * qty;
  }, 0);

  // Envío
  const envioSeleccionado = document.querySelector('input[name="tipoEnvio"]:checked');
  const porcentajeEnvio = envioSeleccionado ? parseFloat(envioSeleccionado.dataset.porcentaje) : 0;
  const costoEnvio = (subtotal * porcentajeEnvio) / 100;

  // Total final
  const totalFinal = subtotal + costoEnvio;

  // Actualizar HTML
  const subtotalSpan = document.getElementById("resumen-subtotal");
  const envioSpan = document.getElementById("resumen-envio");
  const totalSpan = document.getElementById("cart-total");

  if (subtotalSpan) subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
  if (envioSpan) envioSpan.textContent = `$${costoEnvio.toFixed(2)}`;
  if (totalSpan) totalSpan.textContent = `$${totalFinal.toFixed(2)}`;
}


// ===============================================
// SECCIÓN 5: ELIMINAR PRODUCTO
// ===============================================

function agregarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll('.eliminar-btn');

  botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const index = parseInt(boton.dataset.index, 10);
      if (isNaN(index)) return;

      const producto = cartItems[index];
      if (!producto) return;

      // Si hay más de 1 unidad, resta una
      let cantidad = parseInt(producto.quantity) || 0;
      if (cantidad > 1) {
        producto.quantity = cantidad - 1;
      } else {
        cartItems.splice(index, 1);
      }

      localStorage.setItem('cartProducts', JSON.stringify(cartItems));
      mostrarCarrito();
    });
  });
}


// ===============================================
// SECCIÓN 6: CAMBIAR CANTIDAD DESDE INPUT
// ===============================================

function agregarEventosCantidad() {
  const inputs = document.querySelectorAll('.cart-item__cantidad-input');

  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      const index = parseInt(input.dataset.index, 10);
      if (isNaN(index)) return;

      let nuevaCantidad = parseInt(input.value, 10);
      if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        nuevaCantidad = 1;
      }

      if (!cartItems[index]) return;
      cartItems[index].quantity = nuevaCantidad;

      localStorage.setItem('cartProducts', JSON.stringify(cartItems));
      mostrarCarrito();
    });
  });
}


// ===============================================
// SECCIÓN 7: CAMBIO DE ENVÍO
// ===============================================

envioRadios.forEach(radio => {
  radio.addEventListener("change", actualizarTotales);
});


// ===============================================
// SECCIÓN 8: FINALIZAR COMPRA
// ===============================================

finalizarBtn.addEventListener("click", () => {
  const nombre = document.getElementById("dir-nombre").value.trim();
  const apellido = document.getElementById("dir-apellido").value.trim();
  const calle = document.getElementById("dir-calle").value.trim();
  const ciudad = document.getElementById("dir-ciudad").value.trim();
  const pais = document.getElementById("dir-pais").value.trim();

  const envioSeleccionado = document.querySelector('input[name="tipoEnvio"]:checked');

  if (!nombre || !apellido || !calle || !ciudad || !pais) {
    mostrarMensaje("Debes completar todos los campos de dirección.");
    return;
  }

  if (!envioSeleccionado) {
    mostrarMensaje("Debes seleccionar un método de envío.");
    return;
  }

  if (cartItems.length === 0) {
    mostrarMensaje("Tu carrito está vacío.");
    return;
  }

  mostrarMensaje("¡Compra finalizada con éxito! 🎉 Gracias por tu compra.");

  // Vaciar carrito
  localStorage.removeItem("cartProducts");
  cartItems = [];
  mostrarCarrito();
});


// ===============================================
// SECCIÓN 9: MODAL DE VALIDACIÓN
// ===============================================

function mostrarMensaje(texto) {
  const modal = document.getElementById("modal-validacion");
  const modalTexto = document.getElementById("modal-texto");
  const btnCerrar = document.getElementById("modal-cerrar");

  modalTexto.textContent = texto;
  modal.style.display = "flex";

  btnCerrar.onclick = () => {
    modal.style.display = "none";
  };

  modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };
}


// ===============================================
// INICIO
// ===============================================

mostrarCarrito();


// cart-item tiene ahora 3 hijos principales:
// cart-item__image: imagen
// cart-item__main: título
// cart-item__meta: cantidad, subtotal y botón 
