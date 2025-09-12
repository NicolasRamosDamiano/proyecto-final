const categoriaId = localStorage.getItem("catID");
const contenedor = document.getElementById("productos");
const searchInput = document.getElementById("searchInput");
const sortAscBtn = document.getElementById("sortAscBtn");
const sortDescBtn = document.getElementById("sortDescBtn");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const filterPriceBtn = document.getElementById("filterPriceBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");

const url = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;


let productos = [];        
let productosFiltrados = []; 
fetch(url)
  .then(res => res.json())
  .then(data => {
    productos = data.products;
    productosFiltrados = [...productos];
    mostrarProductos(productosFiltrados);
  })
  .catch(err => console.error("Error al cargar productos:", err));

function mostrarProductos(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = `<p>No se encontraron productos.</p>`;
    return;
  }

  lista.forEach(producto => {
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
}

sortAscBtn.addEventListener("click", () => {
  productosFiltrados.sort((a, b) => a.cost - b.cost);
  mostrarProductos(productosFiltrados);
});

sortDescBtn.addEventListener("click", () => {
  productosFiltrados.sort((a, b) => b.cost - a.cost);
  mostrarProductos(productosFiltrados);
});

filterPriceBtn.addEventListener("click", () => {
  aplicarFiltros();
});

clearFilterBtn.addEventListener("click", () => {
  minPriceInput.value = "";
  maxPriceInput.value = "";
  searchInput.value = "";
  productosFiltrados = [...productos];
  mostrarProductos(productosFiltrados);
});

function aplicarFiltros() {
  const texto = searchInput.value.toLowerCase();
  const precioMin = parseFloat(minPriceInput.value) || 0;
  const precioMax = parseFloat(maxPriceInput.value) || Infinity;

  productosFiltrados = productos.filter(p => {
    const cumpleTexto = p.name.toLowerCase().includes(texto);
    const cumplePrecio = p.cost >= precioMin && p.cost <= precioMax;
    return cumpleTexto && cumplePrecio;
  });

  mostrarProductos(productosFiltrados);
}