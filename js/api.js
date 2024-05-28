$(document).ready(function() {
    function renderComics(comics) {
        const comicsContainer = $('#comics-list');
        comicsContainer.empty();
  
        comics.forEach(comic => {
            const comicCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="http://localhost:3000${comic.foto}" class="card-img-top" alt="${comic.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${comic.nombre}</h5>
                            <p class="card-text">${comic.descripcion}</p>
                            <p class="card-text">Precio: $${comic.precio}</p>
                            <p class="card-text">Stock: ${comic.stock}</p>
                        </div>
                    </div>
                </div>
            `;
            comicsContainer.append(comicCard);
        });
    }
    fetch('http://localhost:3000/api/comics')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los cómics');
            }
            return response.json();
        })
        .then(comics => {
            renderComics(comics);
        })
        .catch(error => {
            console.error('Error al obtener los cómics:', error);
        });
  });
  