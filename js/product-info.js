// === PRODUCT INFO ===

// Obtener el ID del producto desde el localStorage
const productId = localStorage.getItem("productID");

// Contenedores principales
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productOldPrice = document.getElementById("product-oldprice");
const productDescription = document.getElementById("product-description");
const productImg = document.getElementById("product-img");
const productThumbs = document.getElementById("product-thumbs");
const containerRecomendados = document.getElementById("containerRecomendados");

// URLs de la API
const URL_PRODUCT = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

// === Renderizar estrellas ===
function renderStars(score) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="fa fa-star ${i <= score ? "checked" : ""}"></span>`;
  }
  return stars;
}

// === Cargar información del producto ===
fetch(URL_PRODUCT)
  .then(res => res.json())
  .then(product => {
    productName.textContent = product.name;
    productPrice.textContent = `${product.currency} ${product.cost}`;
    productOldPrice.textContent = product.oldCost ? `${product.currency} ${product.oldCost}` : "";
    productDescription.textContent = product.description;
    productImg.src = product.images[0];

    // Mostrar estrellas promedio del producto (inicialmente vacío, luego lo completa el fetch de comentarios)
    const promedioTexto = document.getElementById("promedio-texto");
    promedioTexto.innerHTML = `<p class="text-muted">Cargando puntuación...</p>`;

    // Miniaturas
 
    productThumbs.innerHTML = product.images
      .map(img => `<img src="${img}" class="thumb" alt="Miniatura" onclick="updateMainImage('${img}')">`)
      .join("");

    // Productos recomendados
    containerRecomendados.innerHTML = product.relatedProducts
      .slice(0, 2)
      .map(p => `
        <div class="col mb-5">
          <div class="card h-100 shadow-sm" onclick="setProductID(${p.id})" style="cursor:pointer;">
            <img class="card-img-top" src="${p.image}" alt="${p.name}">
            <div class="card-body p-3 text-center">
              <h6 class="fw-bolder fs-6">${p.name}</h6>
            </div>
          </div>
        </div>
      `)
      .join("");
  });

// Cambiar imagen principal
function updateMainImage(src) {
  productImg.src = src;
}

// === Cargar comentarios ===
let comentarios = [];

fetch(URL_COMMENTS)
  .then(res => res.json())
  .then(data => {
    comentarios = data;
    mostrarComentarios();
  });

// === Mostrar comentarios y promedio ===
function mostrarComentarios() {
  const ratingContainer = document.getElementById("rating");
  const promedioTexto = document.getElementById("promedio-texto");

  if (!comentarios.length) {
    ratingContainer.innerHTML = "<p>No hay comentarios todavía.</p>";
    promedioTexto.textContent = "";
    return;
  }

  // Mostrar comentarios con estrellas
  ratingContainer.innerHTML = comentarios
    .map(c => `
      <div class="comment mb-3 p-3 border rounded bg-light">
        <p><strong id="p-comentario">${c.user}</strong> - <span class="text-muted">${c.dateTime}</span></p>
        <div>${renderStars(c.score)}</div>
        <p class="mt-2">${c.description}</p>
      </div>
    `)
    .join("");

  // Calcular promedio
  const promedio = comentarios.reduce((sum, c) => sum + c.score, 0) / comentarios.length;
  promedioTexto.innerHTML = `
    <div class="mt-3">
      <strong>Puntaje promedio:</strong> ${promedio.toFixed(1)} / 5
      <div>${renderStars(Math.round(promedio))}</div>
    </div>
  `;
}

// === Agregar nuevo comentario ===
document.getElementById("btnComentar").addEventListener("click", () => {
  const texto = document.getElementById("nuevoComentario").value.trim();
  const puntuacion = parseInt(document.getElementById("puntuacion").value);
  const usuario = localStorage.getItem("currentUser") || "Usuario anónimo";

  if (!texto) {
    alert("Por favor escribe un comentario antes de enviarlo.");
    return;
  }

  const nuevo = {
    user: usuario,
    description: texto,
    score: puntuacion,
    dateTime: new Date().toLocaleString()
  };

  comentarios.unshift(nuevo); // se agrega arriba
  mostrarComentarios();

  document.getElementById("nuevoComentario").value = "";
  document.getElementById("puntuacion").value = "5";
});

// === Redirigir a producto relacionado ===
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}


//BTN COMPRAR
// DOM
document.addEventListener("DOMContentLoaded", () => {

  const btnComprar = document.querySelector(".btn.btn-outline-dark.flex-shrink-0");
  const nombre = document.getElementById("product-name");
  const precio = document.getElementById("product-price");
  const imagen = document.getElementById("product-img");
  const cantidad = document.getElementById("inputQuantity");
const productId = localStorage.getItem("productID");
  // Se añade el evento al botón comprar y se crea el objeto "producto"
  btnComprar.addEventListener("click", () => {
    const producto = {
      id: productId,
      name: nombre.textContent.trim(),
      price: precio.textContent.trim(),
      image: imagen.src,
      quantity: parseInt(cantidad.value) || 1,
    };

    // Usamos getItem para obtener los productos y su información del localStorage 
    let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(p => p.name === producto.name);
    if (existingProduct) {
      existingProduct.quantity += producto.quantity;
    } else {
      cart.push(producto);
    }

    // Guardar el carrito actualizado
    localStorage.setItem("cartProducts", JSON.stringify(cart));

    // Redirigir al carrito
    window.location.href = "cart.html";
  });
});



