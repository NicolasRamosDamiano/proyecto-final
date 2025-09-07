function filtradorpromax() {
    console.log("existo-2");
    // 1. Obtiene las referencias a los elementos del DOM
    const searchInput = document.getElementById('busca'); // Asume que el input tiene el ID 'searchInput'
    const articles = document.querySelectorAll('.producto'); // Asume que los elementos a filtrar tienen la clase 'article'
    const noResultsMessage = document.getElementById('noResultsMessage'); // Mensaje de "no resultados"

    // 2. Define la función que filtrará los artículos
    const filterArticles = () => {
        // Convierte el texto de búsqueda a minúsculas y elimina espacios en blanco
        const searchText = searchInput.value.toLowerCase().trim();
        let anyResultFound = false;

        articles.forEach(article => {
            // Asume que el título tiene la clase 'title' y la descripción tiene la clase 'description'
            const title = article.querySelector('.producto-nombre').textContent.toLowerCase();
            const description = article.querySelector('.producto-descripcion').textContent.toLowerCase();

            // Combina el texto de ambas partes para la búsqueda
            const fullText = title + ' ' + description;

            // Verifica si el texto de búsqueda está incluido en el contenido del artículo
            if (fullText.includes(searchText)) {
                article.style.display = ''; // Muestra el artículo si hay coincidencia
                anyResultFound = true;
            } else {
                article.style.display = 'none'; // Oculta el artículo si no coincide
            }
        });

        // 3. Muestra u oculta el mensaje de "no resultados"
        if (anyResultFound) {
            noResultsMessage.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'block';
        }
    };

    // 4. Asigna el evento 'input' para llamar a la función de filtro en tiempo real
    searchInput.addEventListener('input', filterArticles);
};