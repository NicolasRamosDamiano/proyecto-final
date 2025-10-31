(function () {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    if (key === 'cartProducts') actualizarBadge();
  };
})();

function actualizarBadge() {
  const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];
  const totalCantidad = cartItems.reduce((acc, p) => acc + (parseInt(p.quantity) || 1), 0);
  document.getElementById('cart-count').textContent = totalCantidad;
}

document.addEventListener('DOMContentLoaded', actualizarBadge);
window.addEventListener('storage', actualizarBadge);
