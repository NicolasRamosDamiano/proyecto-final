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
    thumbsContainer.innerHTML = ""; // El contenedor de miniaturas se vacía, por si había algo antes.

    producto.images.forEach((img, index) => {
      const thumb = document.createElement("img");  // crear imagen
      thumb.src = img; // asignar URL
      thumb.alt = `${producto.name} vista ${index + 1}`; //texto alternativo que aparece si la imagen no carga. Mejora el SEO
      thumb.classList.add("thumb-img"); // estilo CSS

      thumb.addEventListener("click", () => { // se agrega animación de salida
        // Agregamos clase fade-out
        mainImage.classList.add("fade-out"); 

        setTimeout(() => {
          mainImage.src = img; // Cambia la foto principal
          mainImage.classList.remove("fade-out"); // La foto grande se desvanece
          mainImage.classList.add("fade-in");  // La nueva aparece suavemente

          // Quitamos la clase después de que termine la animación
          setTimeout(() => mainImage.classList.remove("fade-in"), 500);
        }, 300);
      });

      thumbsContainer.appendChild(thumb);
    });
  })
  .catch(err => console.error("Error al cargar el producto:", err));


