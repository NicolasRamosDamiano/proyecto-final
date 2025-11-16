document.addEventListener("DOMContentLoaded", () => {
  const emailDiv = document.getElementById("email");
  const userEmail = localStorage.getItem("userEmail");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Si NO está logueado -> siempre redirigir a login
  if (isLoggedIn !== "true" || !userEmail) {
    window.location.href = "login.html";
    return;
  }

  // Si está logueado y hay contenedor #email -> mostrar saludo
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
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        window.location.href = "login.html";
      });
    }
  }
});



// CÓDIGO ANTERIOR 
// document.addEventListener("DOMContentLoaded", () => {
//  const emailDiv = document.getElementById("email");
// const userEmail = localStorage.getItem("userEmail");
//  const isLoggedIn = localStorage.getItem("isLoggedIn");

//  if (isLoggedIn === "true" && userEmail) {
//    const nombreUsuario = userEmail.split("@")[0];

//    emailDiv.innerHTML = `
//      Hola, <strong>${nombreUsuario}</strong> 
//      <button id="logout" class="btn btn-sm btn-outline-danger ms-2">Cerrar sesión</button>
//    `;

//    document.getElementById("logout").addEventListener("click", () => {
//      localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userEmail");
//      window.location.href = "login.html";
//    });
//  } else {
//    window.location.href = "login.html";
 // }
//});
