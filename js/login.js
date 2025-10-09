
document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector('.boton');

    boton.addEventListener("click", () => {
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        if(usuario === "" || password === "") {
            alert("Por favor complete todos los campos");
            return;
        }
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", usuario);
        
        window.location.href = 'index.html';
    });
});
