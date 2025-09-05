const productId = localStorage.getItem("productID");
const contenedor = document.getElementById("product-info");
const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

fetch(url)
  .then(res => res.json())
  .then(producto => {
    contenedor.innerHTML = `
      <h2>${producto.name}</h2>
      <p><strong>Categoría:</strong> ${producto.category}</p>
      <p><strong>Cantidad de vendidos:</strong> ${producto.soldCount}</p>
      <p><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
      <h3>Imágenes del producto:</h3>
      <div class="imagenes">
        ${producto.images.map(img => `<img src="${img}" alt="${producto.name}" class="product-img">`).join("")}
      </div>
      <p><strong>Descripción:</strong> ${producto.description}</p>
    `;
  })
  .catch(err => console.error("Error al cargar el producto:", err));
