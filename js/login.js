document.addEventListener("DOMContentLoaded", () => {
    const boton = document.querySelector('.boton'); 
    boton.addEventListener("click", async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if(email === "" || password === "") {
            alert("Por favor complete todos los campos");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) throw new Error("Credenciales inválidas");

            const data = await res.json();
            // Guardar token en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userEmail", email);

            window.location.href = 'index.html';
        } catch (err) {
            alert(err.message);
        }
    });
});
