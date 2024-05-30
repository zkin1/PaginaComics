// Obtener referencias a los elementos del DOM
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');

// Funcion para renderizar los elementos del carro
function renderCartItems(cartItems) {
  cartItemsContainer.innerHTML = '';

  cartItems.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="http://localhost:3000${item.foto}" alt="${item.nombre}" width="50">
        ${item.nombre}
      </td>
      <td>$${item.precio}</td>
      <td>
        <input type="number" class="form-control quantity" value="${item.quantity}" min="1" data-index="${index}">
      </td>
      <td>$${item.subtotal.toFixed(2)}</td>
      <td>
        <button type="button" class="btn btn-danger btn-sm remove-item" data-index="${index}">X</button>
      </td>
    `;
    cartItemsContainer.appendChild(row);
  });
}

// Funcion para calcular el total del carro
function calculateCartTotal(cartItems) {
  const total = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Funcion para actualizar la cantidad de un elemento del carro
function updateCartItemQuantity(index, quantity) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems[index].quantity = quantity;
  cartItems[index].subtotal = cartItems[index].precio * quantity;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCartItems(cartItems);
  calculateCartTotal(cartItems);
}

// Funcion para eliminar un elemento del carro
function removeCartItem(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  renderCartItems(cartItems);
  calculateCartTotal(cartItems);
}

// Evento para actualizar la cantidad de un elemento del carro
cartItemsContainer.addEventListener('change', (event) => {
  if (event.target.classList.contains('quantity')) {
    const index = parseInt(event.target.dataset.index);
    const quantity = parseInt(event.target.value);
    updateCartItemQuantity(index, quantity);
  }
});

// Evento para eliminar un elemento del carro
cartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    const index = parseInt(event.target.dataset.index);
    removeCartItem(index);
  }
});

// Obtener los elementos del carro del almacenamiento local al cargar la pagina
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
renderCartItems(cartItems);
calculateCartTotal(cartItems);