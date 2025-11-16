const categoriaId = localStorage.getItem("catID");
const contenedor = document.getElementById("productos");
const url = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;


// Guardamos los productos para poder filtrar/buscar
let productosOriginales =[];

// Input de búsqueda del navbar
const buscador = document.getElementById("searchInput");

// Función que dibuja las cards
function renderProducts(lista) {
  if(!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
    <img src="${producto.image}" alt="${producto.name}" class="producto-img">
        <h3 class="producto-nombre">${producto.name}</h3>
        <p class="producto-descripcion">${producto.description}</p>
        <p class="producto-precio"><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
        <p class="producto-vendido"><strong>Vendidos:</strong> ${producto.soldCount}</p>
    `;
  

  // Vamos a product-info del producto que se hizo "click"
  card.addEventListener("click", () => {
    localStorage.setItem("productID", producto.id);
    window.location.href = "product-info.html";
    });
  
  contenedor.appendChild(card);
  });
}


// Traemos productos
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    productosOriginales = data.products || [];
    renderProducts(productosOriginales);


// Si se usa la función de filtros, la seguimos usando 
    if(typeof filtradorpromax === "function"){
      filtradorpromax();
    }
  });


  // Buscador
  if(buscador) {
    buscador.addEventListener("input", (e) => {
      const termino = e.target.value.toLowerCase().trim();
  
  if (termino ===""){
    renderProducts(productosOriginales);
    return;
  }

  const filtrados = productosOriginales.filter((p) =>
    p.name.toLowerCase().includes(termino) || p.description.toLowerCase().includes(termino)
  );

  renderProducts(filtrados);

  });
}
