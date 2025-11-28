document.addEventListener("DOMContentLoaded", () => {
  const emailDiv = document.getElementById("email");

  // TOKEN NUEVO DEL LOGIN REAL
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  // Si NO hay token → no está logueado → redirigir siempre
  if (!token || !userEmail) {
    window.location.href = "login.html";
    return;
  } 

  // Si está logueado → mostrar saludo si existe el div
  if (emailDiv) {
    const nombreUsuario = userEmail.split("@")[0];

    emailDiv.innerHTML = `
      Hola, <strong>${nombreUsuario}</strong> 
      <button id="logout" class="btn btn-sm btn-outline-danger ms-2">
        Cerrar sesión
      </button>
    `;

    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      window.location.href = "login.html";
    });
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
