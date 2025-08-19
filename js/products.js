const contenedor = document.getElementById("productos");

// URL con la colección de productos (categoría 101: Autos)
const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(url)
  .then(res => res.json())
  .then(data => {
    data.products.forEach(producto => {
      // Crear una tarjeta para cada producto
      const card = document.createElement("div");
      card.classList.add("producto");

      card.innerHTML = `
        <img src="${producto.image}" alt="${producto.name}" class="producto-img">
        <h3>${producto.name}</h3>
        <p>${producto.description}</p>
        <p><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
        <p><strong>Vendidos:</strong> ${producto.soldCount}</p>
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(err => console.error("Error al cargar productos:", err));
