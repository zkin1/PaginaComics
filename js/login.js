const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3001/api/registros')
    .then(response => response.json())
    .then(data => {
      const user = data.find(user => user.usuario === username && user.contraseña === password);
      if (user) {
        alert('Inicio de sesión exitoso');
        // Redirigir al usuario a la página de inicio
        window.location.href = 'index.html';
      } else {
        alert('Credenciales incorrectas');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al obtener los datos de usuario');
    });
}); // Cerrar el bloque de la función addEventListener del formulario de login