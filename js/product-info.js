const productId = localStorage.getItem("productID"); // Obtener el ID del producto desde localStorage
const contenedor = document.getElementById("product-info"); // Contenedor principal
// ... (otras variables)
const urlProducto = `https://japceibal.github.io/emercado-api/products/${productId}.json`; // URL de la API del producto
// Nueva URL para los comentarios
const urlComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`; 

// Contenedor donde se mostrarán los comentarios (¡Asegúrate de que exista en el HTML!)
const contenedorComentarios = document.getElementById("product-comments-list");


// 1. Cargar Datos del Producto
fetch(urlProducto)
    .then(res => res.json())
    .then(producto => {
        // ... (Tu código existente para mostrar nombre, precio, descripción e imágenes)
        
        document.getElementById("product-name").textContent = producto.name;
        document.getElementById("product-price").textContent = `${producto.currency} ${producto.cost}`;
        document.getElementById("product-oldprice").textContent = producto.oldCost ? `${producto.currency} ${producto.oldCost}` : "";
        document.getElementById("product-description").textContent = producto.description;

        const mainImage = document.getElementById("product-img");
        mainImage.src = producto.images[0];

        const thumbsContainer = document.getElementById("product-thumbs");
        thumbsContainer.innerHTML = "";
        
        producto.images.forEach((img, index) => {
            const thumb = document.createElement("img");
            thumb.src = img;
            thumb.alt = `${producto.name} vista ${index + 1}`;
            thumb.classList.add("thumb-img");

            thumb.addEventListener("click", () => {
                mainImage.classList.add("fade-out");

                setTimeout(() => {
                    mainImage.src = img;
                    mainImage.classList.remove("fade-out");
                    mainImage.classList.add("fade-in");

                    setTimeout(() => mainImage.classList.remove("fade-in"), 500);
                }, 300);
            });

            thumbsContainer.appendChild(thumb);
        });

        // 2. Después de cargar el producto, cargamos los comentarios.
        cargarYMostrarComentarios();
    })
    .catch(err => console.error("Error al cargar el producto:", err));


// --- NUEVA FUNCIÓN PARA CARGAR Y MOSTRAR COMENTARIOS ---

function cargarYMostrarComentarios() {
    fetch(urlComentarios)
        .then(res => res.json())
        .then(comentarios => {
            // Aseguramos que el contenedor esté vacío
            contenedorComentarios.innerHTML = ""; 

            if (comentarios.length === 0) {
                contenedorComentarios.innerHTML = '<p class="text-muted">Aún no hay comentarios para este producto.</p>';
                return;
            }

            // Ordenar los comentarios por fecha descendente (más recientes primero)
            comentarios.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

            comentarios.forEach(comentario => {
                // Generar el HTML para cada comentario
                const htmlComentario = crearHTMLComentario(comentario);
                contenedorComentarios.innerHTML += htmlComentario;
            });
        })
        .catch(err => console.error("Error al cargar los comentarios:", err));
}


// --- FUNCIÓN PARA CONSTRUIR EL HTML DE UN COMENTARIO ---

function crearHTMLComentario(comentario) {
    // 1. Formato de la Fecha
    const fecha = new Date(comentario.dateTime).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // 3. Estructura del Comentario
    return `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">
                    <strong class="text-primary">${comentario.user}</strong> 
                    <small class="text-muted">(${fecha})</small>
                </h5>
                
            </div>
            <p class="mb-1">${comentario.description}</p>
        </div>
    `;
    // Nota: La API de JAP utiliza 'description' para el comentario y 'score' para la calificación.
    // user = Usuario
    // dateTime = Fecha
}



const boton = document.getElementById('publicar1');
const input = document.getElementById('comentar');


boton.addEventListener('click', () => {
  const texto = input.value.trim();
const usuario = localStorage.getItem('currentUser');

  if (texto !== '') {
    const comentario = {
        user: usuario,
      description: texto,
      dateTime: new Date()
    };

    const html = crearHTMLComentario(comentario);
    contenedorComentarios.insertAdjacentHTML('beforeend', html);

    input.value = '';
  }
});
