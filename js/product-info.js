const productId = localStorage.getItem("productID"); // Obtener el ID del producto desde localStorage
const contenedor = document.getElementById("product-info"); // Contenedor principal
const imagesContainer = document.getElementById("product-images"); // Contenedor para las imágenes
const url = `https://japceibal.github.io/emercado-api/products/${productId}.json`; // URL de la API

fetch(url)
  .then(res => res.json()) // Convertir a JSON
  .then(producto => { // Datos del producto
    document.getElementById("product-name").textContent = producto.name; // Nombre del producto
    document.getElementById("product-price").textContent = `${producto.currency} ${producto.cost}`; // Precio del producto
    document.getElementById("product-oldprice").textContent = producto.oldCost ? `${producto.currency} ${producto.oldCost}` : ""; // Precio anterior si existe
    document.getElementById("product-description").textContent = producto.description; // Descripción del producto

    // Imagen principal
    const mainImage = document.getElementById("product-img");
    mainImage.src = producto.images[0];

    // Miniaturas
    const thumbsContainer = document.getElementById("product-thumbs"); //thumbs= thumbnails
    thumbsContainer.innerHTML = ""; // Limpio por si hay algo

    producto.images.forEach((img, index) => {
      const thumb = document.createElement("img");
      thumb.src = img;
      thumb.alt = `${producto.name} vista ${index + 1}`;
      thumb.classList.add("thumb-img");

      thumb.addEventListener("click", () => {
        // Agregamos clase fade-out
        mainImage.classList.add("fade-out");

        setTimeout(() => {
          mainImage.src = img; // Cambiamos la imagen
          mainImage.classList.remove("fade-out");
          mainImage.classList.add("fade-in");

          // Quitamos la clase después de que termine la animación
          setTimeout(() => mainImage.classList.remove("fade-in"), 500);
        }, 300);
      });

      thumbsContainer.appendChild(thumb);
    });
  })
  .catch(err => console.error("Error al cargar el producto:", err));


