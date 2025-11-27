document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector('.boton'); 
    
    boton.addEventListener("click", async () => {
        const usuario = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(usuario === "" || password === "") {
            alert("Por favor complete todos los campos");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token en localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("userEmail", usuario);

                alert("Login correcto");
                window.location.href = "index.html";
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Error conectando con el servidor");
        }
    });
});
