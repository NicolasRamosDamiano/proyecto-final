document.addEventListener("DOMContentLoaded", () => {
  const emailDiv = document.getElementById("email");
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token"); // usar token

  // Si NO hay token o email -> redirigir a login
  if (!token || !userEmail) {
    window.location.href = "login.html";
    return;
  }

  // Si hay token y contenedor -> mostrar saludo
  if (emailDiv) {
    const nombreUsuario = userEmail.split("@")[0];

    emailDiv.innerHTML = `
      Hola, <strong>${nombreUsuario}</strong> 
      <button id="logout" class="btn btn-sm btn-outline-danger ms-2">
        Cerrar sesión
      </button>
    `;

    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        window.location.href = "login.html";
      });
    }
  }
});