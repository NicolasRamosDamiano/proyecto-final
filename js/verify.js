if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const usuarioDiv = document.getElementById("usuario");
  const username = localStorage.getItem("currentUser");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true" && username) {
    usuarioDiv.innerHTML = `
      Hola, <strong>${username}</strong> 
      <button id="logout" style="margin-left: 10px;" class="btn btn-sm btn-outline-danger">Cerrar sesión</button>
    `;

    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  } else {
    
    window.location.href = "login.html";
  }
});
