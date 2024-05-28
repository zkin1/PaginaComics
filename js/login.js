const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Obtener los datos del usuario registrado desde el registro
  const registeredUsername = localStorage.getItem('username');
  const registeredPassword = localStorage.getItem('password');

  if (username === registeredUsername && password === registeredPassword) {
    alert('Inicio de sesión exitoso');
    // Redirigir al usuario a la página de inicio
    window.location.href = 'index.html';
  } else {
    alert('Credenciales incorrectas');
  }
});