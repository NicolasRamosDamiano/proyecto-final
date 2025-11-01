document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector('.boton'); 
    boton.addEventListener("click", () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(email === "" || password === "") {
            alert("Por favor complete todos los campos");
            return;
        }
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        
        window.location.href = 'index.html';
    });
});


 