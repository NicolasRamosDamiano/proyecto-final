const profileImage = document.getElementById("profileImage");
const imageUpload = document.getElementById("imageUpload");
const form = document.getElementById("profileForm");
const clearDataBtn = document.getElementById("clearData");

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("userProfile"));
  if (savedData) {
    document.getElementById("nombre").value = savedData.nombre || "";
    document.getElementById("apellido").value = savedData.apellido || "";
    document.getElementById("email").value = savedData.email || "";
    document.getElementById("telefono").value = savedData.telefono || "";
    if (savedData.foto) profileImage.src = savedData.foto;
  }
});

// Guardar datos
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userProfile = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    foto: profileImage.src
  };

  localStorage.setItem("userProfile", JSON.stringify(userProfile));

  alert("Datos guardados correctamente");
});

// Borrar datos guardados
clearDataBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que deseas borrar todos los datos del perfil?")) {
    localStorage.removeItem("userProfile");
    form.reset();
    profileImage.src = "https://via.placeholder.com/150";
    alert(" Datos borrados correctamente");
  }
});



// Manejar carga de imagen
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;

      // Guardar la imagen en localStorage junto con los demás datos
      const savedData = JSON.parse(localStorage.getItem("userProfile")) || {};
      savedData.foto = e.target.result;
      localStorage.setItem("userProfile", JSON.stringify(savedData));
    };
    reader.readAsDataURL(file); // Convierte la imagen a Base64
  }
});

