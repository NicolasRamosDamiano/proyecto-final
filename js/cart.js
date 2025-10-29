document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('productos-comprados');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length === 0) {
        // Si no hay productos en el carrito, muestra un mensaje de vacío
        cartContainer.innerHTML = `
            <div class="empty-cart-message">
                <p>Tu carrito está vacío</p>
                <p>No hay productos agregados al carrito</p>
            </div>
        `;
    } else {
        // Si existen productos, los muestra en pantalla
        displayCartItems(cartItems);
    }
});

function displayCartItems(items) {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = items.map(item => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Precio: $${item.price}</p>
            <p>Cantidad: ${item.quantity}</p>
        </div>
    `).join('');
}




const total = document.getElementById('cart-total');


