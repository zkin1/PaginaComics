// Obtener el formulario de registro
const registerForm = document.getElementById('register-form');

// Manejar el envío del formulario
registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores de los campos
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Aquí puedes realizar la lógica de registro
  // Por ejemplo, enviar los datos a una API o guardarlos en una base de datos
  console.log('Registro exitoso:', { username, email, password });
  alert('Registro exitoso');

  // Almacenar los datos del usuario registrado en localStorage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = 'login.html';
});