const cartContainer = document.getElementById('productos-comprados');
const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];

function totalProducto(price, quantity) {
  const precio = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
  const cantidad = parseInt(quantity) || 0;
  return (precio * cantidad).toFixed(2);
}

function eliminarUnidad(productoId) {
    const index = cartItems.findIndex(item => item.id === productoId);
    
    if (index !== -1) {
        if (cartItems[index].quantity > 1) {
            // Reduce la cantidad en 1
            cartItems[index].quantity--;
        } else {
            // Si solo queda 1 unidad, elimina el producto completamente
            cartItems.splice(index, 1);
        }
        
        // Actualiza el localStorage
        localStorage.setItem('cartProducts', JSON.stringify(cartItems));
        
        // Actualiza la visualización
        cartContainer.innerHTML = '';
        mostrarCarrito();
        calcularTotalCarrito();
    }
}

function mostrarCarrito() {

  if (!cartItems || cartItems.length === 0) {
  cartContainer.innerHTML = `
    <div class="carrito-vacio" style="padding:20px;text-align:center;">
      <p><strong>Tu carrito está vacío</strong></p>
      <p>carente de productos en su interior que lo llenen, impidiendole cumplir su propósito.</p>
    </div>
  `;
  return;
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
            <button class="btn btn-danger btn-sm eliminar-unidad" data-id="${producto.id}">Eliminar</button>
            
        `;

        cartContainer.appendChild(card);
        
        // Agregar event listener para el botón de eliminar unidad
        const btnEliminarUnidad = card.querySelector('.eliminar-unidad');
        btnEliminarUnidad.addEventListener('click', () => {
            eliminarUnidad(producto.id);
        });
    });
}

mostrarCarrito();


//calcular el total del carrito*//
function calcularTotalCarrito() {
  const total = cartItems.reduce((acc, producto) => {
    const precio = parseFloat(producto.price.replace(/[^0-9.]/g, "")) || 0;
    const cantidad = parseInt(producto.quantity) || 0;
    return acc + (precio * cantidad);
  }, 0);

  const totalElemento = document.getElementById("cart-total").textContent = total.toFixed(2);
  totalElemento.innerHTML = `<strong>Total a pagar:</strong> $${total.toFixed(2)}`;
  cartContainer.appendChild(totalElemento);
}
calcularTotalCarrito();


