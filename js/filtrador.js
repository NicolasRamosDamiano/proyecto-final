document.addEventListener('DOMContentLoaded', () => {
  const categoriaId = localStorage.getItem("catID");
  const contenedor = document.getElementById("productos");
  const searchInput = document.getElementById("searchInput");
  const sortAscBtn = document.getElementById("sortAscBtn"); // Menor a mayor relevancia
  const sortDescBtn = document.getElementById("sortDescBtn"); // Mayor a menor relevancia
  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");
  const filterPriceBtn = document.getElementById("filterPriceBtn");
  const clearFilterBtn = document.getElementById("clearFilterBtn");

  if (!contenedor) {
    console.error("No se encontró #productos en el DOM.");
    return;
  }

  if (!categoriaId) {
    contenedor.innerHTML = '<p>No hay categoría seleccionada (localStorage: catID vacío).</p>';
    console.error("catID vacío en localStorage. Prueba: localStorage.setItem('catID','ID_DE_CATEGORIA')");
    return;
  }

  const url = `https://japceibal.github.io/emercado-api/cats_products/${categoriaId}.json`;

  let productos = [];
  let productosFiltrados = [];

  // Fetch y carga inicial
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      return res.json();
    })
    .then(data => {
      productos = data.products || [];
      productosFiltrados = productos.slice();
      mostrarProductos(productosFiltrados);
    })
    .catch(err => {
      console.error("Error al cargar productos:", err);
      contenedor.innerHTML = `<p>Error al cargar productos: ${err.message}</p>`;
    });

  // Función para mostrar productos
  function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    if (!Array.isArray(lista) || lista.length === 0) {
      contenedor.innerHTML = `<p>No se encontraron productos.</p>`;
      return;
    }

    lista.forEach(producto => {
      const card = document.createElement("div");
      card.className = "producto";
      card.innerHTML = `
        <img src="${producto.image}" alt="${producto.name}" class="producto-img">
        <h3 class="producto-nombre">${producto.name}</h3>
        <p class="producto-descripcion">${producto.description}</p>
        <p class="producto-precio"><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
        <p class="producto-vendido"><strong>Vendidos:</strong> ${producto.soldCount}</p>
      `;

      // Almacena id y redirige a product-info
      card.addEventListener("click", () => {
        localStorage.setItem("productID", producto.id);
        window.location.href = "product-info.html";
      });

      contenedor.appendChild(card);
    });
  }

  // Filtrar productos por texto y rango de precios
  function aplicarFiltros() {
    const texto = (searchInput && searchInput.value) ? searchInput.value.toLowerCase() : "";
    const precioMin = parseFloat(minPriceInput && minPriceInput.value) || 0;
    const precioMax = parseFloat(maxPriceInput && maxPriceInput.value) || Infinity;

    productosFiltrados = productos.filter(p => {
      const cumpleTexto = !texto || 
        (p.name && p.name.toLowerCase().includes(texto)) || 
        (p.description && p.description.toLowerCase().includes(texto));
      const cost = Number(p.cost) || 0;
      const cumplePrecio = cost >= precioMin && cost <= precioMax;
      return cumpleTexto && cumplePrecio;
    });

    mostrarProductos(productosFiltrados);
  }

  // Ordenar por relevancia (cantidad vendida)
  if (sortAscBtn) {
    sortAscBtn.addEventListener("click", () => {
      // Menor a mayor relevancia (menos vendidos primero)
      productosFiltrados.sort((a, b) => (Number(a.soldCount) || 0) - (Number(b.soldCount) || 0));
      mostrarProductos(productosFiltrados);
    });
  } else {
    console.warn("sortAscBtn no encontrado en DOM.");
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener("click", () => {
      // Mayor a menor relevancia (más vendidos primero)
      productosFiltrados.sort((a, b) => (Number(b.soldCount) || 0) - (Number(a.soldCount) || 0));
      mostrarProductos(productosFiltrados);
    });
  } else {
    console.warn("sortDescBtn no encontrado en DOM.");
  }

  // Aplicar filtros cuando se presiona el botón
  if (filterPriceBtn) {
    filterPriceBtn.addEventListener("click", aplicarFiltros);
  }

  // Limpiar filtros
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", () => {
      if (minPriceInput) minPriceInput.value = "";
      if (maxPriceInput) maxPriceInput.value = "";
      if (searchInput) searchInput.value = "";
      productosFiltrados = productos.slice();
      mostrarProductos(productosFiltrados);
    });
  }
});
