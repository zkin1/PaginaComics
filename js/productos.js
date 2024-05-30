let comics = []; // Declarar la variable 'comics' fuera de la función de renderizado

const comicsContainer = $('#comics-list');

// Función para renderizar los cómics
function renderComics(comicData) {
  comicsContainer.empty();

  comicData.forEach((comic, index) => {
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
                  <button type="button" class="btn btn-success add-to-cart" data-id="${comic.id}">Agregar al carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    comicsContainer.append(comicCard);
  });

  comics = comicData; // Asignar los datos de los cómics a la variable 'comics'
}

// Función para agregar un producto al carro
function addToCart(comic) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItem = cartItems.find(item => item.id === comic.id);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.subtotal = existingItem.precio * existingItem.quantity;
  } else {
    const newItem = {
      id: comic.id,
      nombre: comic.nombre,
      precio: comic.precio,
      foto: comic.foto,
      quantity: 1,
      subtotal: comic.precio
    };
    cartItems.push(newItem);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Obtener los cómics de la API
fetch('http://localhost:3000/api/comics')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los cómics');
    }
    return response.json();
  })
  .then(data => {
    renderComics(data);
  })
  .catch(error => {
    console.error('Error al obtener los cómics:', error);
  });

// Evento para agregar un producto al carro
comicsContainer.on('click', '.add-to-cart', function() {
  const comicId = $(this).data('id');
  const comic = comics.find(comic => comic.id === comicId);
  addToCart(comic);
});