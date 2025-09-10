const categoriaId = localStorage.getItem("catID");
const contenedor = document.getElementById("productos");
const url = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("existo");
    data.products.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("producto");

      card.innerHTML = `
      <img src="${producto.image}" alt="${producto.name}" class="producto-img">
        <h3 class="producto-nombre">${producto.name}</h3>
        <p class="producto-descripcion">${producto.description}</p>
        <p class="producto-precio"><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
        <p class="producto-vendido"><strong>Vendidos:</strong> ${producto.soldCount}</p>
    `;

      contenedor.appendChild(card);
    });
    filtradorpromax();
  })
  .catch(err => console.error("Error al cargar productos:", err));

  
