const cartContainer = document.getElementById('productos-comprados');
const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];
const finalizarBtn = document.getElementById("boton-compra-finalizar");
const mensajeCompra = document.getElementById("mensaje-compra");

function totalProducto(price, quantity) {
  const precio = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
  const cantidad = parseInt(quantity) || 0;
  return (precio * cantidad).toFixed(2);
}

function mostrarCarrito() {

  if (!cartItems || cartItems.length === 0) {
  cartContainer.innerHTML = `
    <div class="carrito-vacio" style="padding:20px;text-align:center;">
      <p><strong>Tu carrito está vacío</strong></p>
      <p>carente de productos en su interior que lo llenen, impidiendole cumplir su propósito.</p>
    </div>
  `;
}
    cartItems.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto1");

        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}" class="producto-img">
            <h3 class="producto-nombre">${producto.name}</h3>
            <p class="producto-precio">
            <strong>Cantidad:</strong>${producto.quantity}  <strong>Precio $${totalProducto(producto.price, producto.quantity)}</strong>
            </p>
            <button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button>
        `;

        cartContainer.appendChild(card);
    });
}

mostrarCarrito();

function calcularTotalCarrito() {
  const total = cartItems.reduce((acc, producto) => {
    const precio = parseFloat(producto.price.replace(/[^0-9.]/g, "")) || 0;
    const cantidad = parseInt(producto.quantity) || 0;
    return acc + (precio * cantidad);
  }, 0);

  const totalElemento = document.getElementById("cart-total");
  totalElemento.innerHTML = `<strong>Total a pagar:</strong> $${total.toFixed(2)}`;
}
calcularTotalCarrito();



// === Validaciones y botón "Finalizar compra" ===

finalizarBtn.addEventListener("click", () => {
  const direccion = document.getElementById("direccion").value.trim();
  const envioSeleccionado = document.querySelector('input[name="envio"]:checked');
  const formaPago = document.getElementById("formaPago").value;

  // Validar dirección
  if (direccion === "") {
    mostrarMensaje("Debes ingresar una dirección.", "danger");
    return;
  }

  // Validar envío
  if (!envioSeleccionado) {
    mostrarMensaje("Debes seleccionar una forma de envío.", "danger");
    return;
  }

  // Validar carrito
  if (cartItems.length === 0) {
    mostrarMensaje("Tu carrito está vacío.", "danger");
    return;
  }

  if (cartItems.some(p => !p.quantity || p.quantity <= 0)) {
    mostrarMensaje("La cantidad de cada producto debe ser mayor a 0.", "danger");
    return;
  }

  // Validar forma de pago
  if (formaPago === "") {
    mostrarMensaje("Debes seleccionar una forma de pago.", "danger");
    return;
  }

  //  Si todo está correcto
  mostrarMensaje("✅ ¡Compra finalizada con éxito! Gracias por tu compra.", "success");

  // Vaciar carrito simulado
  localStorage.removeItem("cartProducts");
  cartContainer.innerHTML = "";
  document.getElementById("cart-total").innerHTML = "$0.00";
});

// Mostrar mensaje temporal
function mostrarMensaje(texto, tipo) {
  mensajeCompra.textContent = texto;
  mensajeCompra.className = `alert alert-${tipo}`;
  mensajeCompra.style.display = "block";
  setTimeout(() => mensajeCompra.style.display = "none", 4000);
}