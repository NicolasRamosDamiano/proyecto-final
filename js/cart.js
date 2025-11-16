// SECCIÓN 1: Contenedor principal donde se insertan los productos 
const cartContainer = document.getElementById('productos-comprados');
const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];
const finalizarBtn = document.getElementById("boton-compra-finalizar");
const mensajeCompra = document.getElementById("mensaje-compra");

// SECCIÓN 2: Calcula el precio total del producto 
function totalProducto(price, quantity) {
  const precio = parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
  const cantidad = parseInt(quantity) || 0;
  return (precio * cantidad).toFixed(2);
}

// SECCIÓN 3: Muestra productos en el carrito
function mostrarCarrito() {
  if (!cartContainer) return;

  // ¿Y si no hay productos? > mostrar mensaje
  if (!cartItems || cartItems.length === 0) {
    cartContainer.innerHTML = `
      <div class="carrito-vacio">
        <p><strong>Tu carrito está vacío</strong></p>
        <p>Tu carrito está vacío. Agregá productos y acercate a lo que querés :)</p>
      </div>
    `;
    actualizarTotal(0);
    actualizarResumenCarrito(0); // KIM
    return;
  }

  // Si hay productos, limpiamos el contenedor
  cartContainer.innerHTML = "";

  // Mostramos cada producto
  cartItems.forEach((producto, index) => { 
  const card = document.createElement("div");
  card.classList.add("cart-item");

  card.innerHTML = `
    <!-- COLUMNA 1: IMAGEN -->
    <div class="cart-item__image">
      <img src="${producto.image}" alt="${producto.name}">
    </div>

    <!-- COLUMNA 2: TÍTULO -->
    <div class="cart-item__main">
      <h3 class="cart-item__title">${producto.name}</h3>
    </div>
    
    <!-- COLUMNA 3: CANTIDAD + SUBTOTAL + ELIMINAR -->
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


  // SECCIÓN 4: Calculamos y actualizamos total
  const total = cartItems.reduce((acc, producto) => {
    const precio = parseFloat(String(producto.price).replace(/[^0-9.]/g, "")) || 0;
    const cantidad = parseInt(producto.quantity) || 0;
    return acc + (precio * cantidad);
  }, 0);

  actualizarTotal(total);
  actualizarResumenCarrito(total); // SUBTOTAL: FALTA LOGICA KIM 
}

// SECCIÓN CÓDIGO MARCOS: Eliminar de a 1 unidad
function agregarEventosEliminar() {
  const botonesEliminar = document.querySelectorAll('.eliminar-btn');

  botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const index = parseInt(boton.dataset.index, 10);
      if (isNaN(index)) return;

      const producto = cartItems[index];
      if (!producto) return;

      // 🔹 Si hay más de 1 unidad, resto una
      let cantidad = parseInt(producto.quantity) || 0;
      if (cantidad > 1) {
        producto.quantity = cantidad - 1;
      } else {
        // 🔹 Si queda 1, saco el producto del carrito
        cartItems.splice(index, 1);
      }

      // Guardamos el nuevo estado en localStorage
      localStorage.setItem('cartProducts', JSON.stringify(cartItems));

      // Redibujamos carrito y resumen con los datos actualizados
      mostrarCarrito();
    });
  });
}

// SECCIÓN: Cambiar cantidad desde el input
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


// SECCIÓN 5: Actualizar el total en el resumen (span grande del costado)
function actualizarTotal(total) {
  const totalElemento = document.getElementById("cart-total");
  if (totalElemento) {
    totalElemento.textContent = `$${Number(total).toFixed(2)}`;
  }
}

// SECCIÓN 6 : Resumen de costos FALTA LOGICA KIM
// Falta modifica subtotal y ademas sumar envio y mostrar el total al final de la tarjeta 

function actualizarResumenCarrito(subtotal) {
  const subtotalSpan = document.getElementById('resumen-subtotal');
  const envioSpan = document.getElementById('resumen-envio');
  const totalSpan = document.getElementById('resumen-total');

  if (subtotalSpan) {
    subtotalSpan.textContent = `$${Number(subtotal).toFixed(2)}`;
  }

  // Envío en 0.00.
  if (envioSpan && !envioSpan.dataset.controladoPorKim) {
    envioSpan.textContent = '$0.00';
  }

  // Total = FALTA LOGICA DE (subtotal + envío).
  if (totalSpan) {
    totalSpan.textContent = `$${Number(subtotal).toFixed(2)}`;
  }
}

mostrarCarrito();


// cart-item tiene ahora 3 hijos principales:
// cart-item__image: imagen
// cart-item__main: título
// cart-item__meta: cantidad, subtotal y botón (sin lógica)


