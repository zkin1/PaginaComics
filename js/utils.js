// Verificar si el usuario ha iniciado sesión
function checkLoginStatus() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const userInfo = document.getElementById('user-info');
  const logoutLink = document.getElementById('logout-link');
  const loginLink = document.getElementById('login-link');
  const registroLink = document.getElementById('registro-link');
  const usernameDisplay = document.getElementById('username-display');

  if (loggedInUser) {
    userInfo.style.display = 'block';
    logoutLink.style.display = 'block';
    loginLink.style.display = 'none';
    registroLink.style.display = 'none';
    usernameDisplay.textContent = loggedInUser;
  } else {
    userInfo.style.display = 'none';
    logoutLink.style.display = 'none';
    loginLink.style.display = 'block';
    registroLink.style.display = 'block';
  }
}

// Cerrar sesión
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}

// Llamar a la función checkLoginStatus al cargar la página
window.onload = checkLoginStatus;