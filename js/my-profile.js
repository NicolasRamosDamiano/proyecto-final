const profileImage = document.getElementById("profileImage");
const imageUpload = document.getElementById("imageUpload");
const form = document.getElementById("profileForm");
const clearDataBtn = document.getElementById("clearData");
const emailInput = document.getElementById("email");

document.addEventListener("DOMContentLoaded", () => {
  //  Tomar el email directamente desde el login
  const emailFromLogin = localStorage.getItem("userEmail");
  emailInput.value = emailFromLogin;
  emailInput.readOnly = true; 

  //  Cargar otros datos guardados del perfil
  const savedData = JSON.parse(localStorage.getItem("userProfile")) || {};
  document.getElementById("nombre").value = savedData.nombre || "";
  document.getElementById("apellido").value = savedData.apellido || "";
  document.getElementById("telefono").value = savedData.telefono || "";
  if (savedData.foto) profileImage.src = savedData.foto;
});

// Guardar datos del perfil
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userProfile = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: emailInput.value, // siempre el del login
    telefono: document.getElementById("telefono").value,
    foto: profileImage.src
  };

  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  alert("Datos guardados correctamente");
});

//  Borrar datos guardados
clearDataBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que deseas borrar todos los datos del perfil?")) {
    localStorage.removeItem("userProfile");
    form.reset();
    profileImage.src = "https://via.placeholder.com/150";
    alert("Datos borrados correctamente");
  }
});

//  Manejar carga de imagen
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;

      const savedData = JSON.parse(localStorage.getItem("userProfile")) || {};
      savedData.foto = e.target.result;
      localStorage.setItem("userProfile", JSON.stringify(savedData));
    };
    reader.readAsDataURL(file);
  }
});