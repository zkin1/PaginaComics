const comicsSection = document.getElementById('comics-list');

// Función para renderizar los cómics
function renderComics(comics) {
  const comicsContainer = $('#comics-list');
  comicsContainer.empty();

  comics.forEach((comic, index) => {
    const comicCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="http://localhost:3000${comic.foto}" class="card-img-top" alt="${comic.nombre}">
          <div class="card-body">
            <h5 class="card-title">${comic.nombre}</h5>
            <p class="card-text">Precio: $${comic.precio}</p>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#comicModal${index}">Ver más</button>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="comicModal${index}" tabindex="-1" role="dialog" aria-labelledby="comicModalLabel${index}" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="comicModalLabel${index}">${comic.nombre}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <img src="http://localhost:3000${comic.foto}" class="img-fluid" alt="${comic.nombre}">
                </div>
                <div class="col-md-8">
                  <p><strong>Descripción:</strong> ${comic.descripcion}</p>
                  <p><strong>Precio:</strong> $${comic.precio}</p>
                  <p><strong>Stock:</strong> ${comic.stock}</p>
                  <button type="button" class="btn btn-success">Agregar al carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    comicsContainer.append(comicCard);
  });
}

// Obtener el índice del producto de la URL (si existe)
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');

// Obtener los cómics de la API
fetch('http://localhost:3000/api/comics')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los cómics');
    }
    return response.json();
  })
  .then(comics => {
    renderComics(comics);

    // Mostrar la ventana emergente del producto correspondiente al índice (si existe)
    if (index !== null) {
      $(`#comicModal${index}`).modal('show');
    }
  })
  .catch(error => {
    console.error('Error al obtener los cómics:', error);
  });