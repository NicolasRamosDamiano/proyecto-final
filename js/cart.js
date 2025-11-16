// SECCIÓN 1: Contenedor principal donde se insertan los productos 
const cartContainer = document.getElementById('productos-comprados');
const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];

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
    actualizarResumenCarrito(0); // stub para KIM
    return;
  }

  // Si hay productos, limpiamos el contenedor
  cartContainer.innerHTML = "";

  // Mostramos cada producto
  cartItems.forEach((producto) => {
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
      
      <!-- COLUMNA 3: CANTIDAD + SUBTOTAL + (BOTÓN ELIMINAR VISUAL) -->
      <div class="cart-item__meta">
        <span class="cart-item__qty"><strong>Cantidad:</strong> ${producto.quantity}</span>
        <span class="cart-item__subtotal">
          <strong>Subtotal:</strong> $${totalProducto(producto.price, producto.quantity)}
        </span>
        <!-- Botón sólo visual, la lógica la implementa el compañero -->
        <button class="btn btn-danger btn-sm">
          Eliminar
        </button>
      </div>
    `;

    cartContainer.appendChild(card);
  });

  // SECCIÓN 4: Calculamos y actualizamos total
  const total = cartItems.reduce((acc, producto) => {
    const precio = parseFloat(String(producto.price).replace(/[^0-9.]/g, "")) || 0;
    const cantidad = parseInt(producto.quantity) || 0;
    return acc + (precio * cantidad);
  }, 0);

  actualizarTotal(total);
  actualizarResumenCarrito(total); // KIM puede usar este subtotal
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


