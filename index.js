let root = document.querySelector(':root')
let body = document.querySelector('body')

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Requisição para o backend
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (data.success) {
                // Armazena os dados do usuário no localStorage
                localStorage.setItem("userType", data.userType);
                localStorage.setItem("userData", JSON.stringify(data.userData));

                // Redireciona para a página correspondente
                if (data.userType === "cliente") {
                    window.location.href = "cliente.html";
                } else if (data.userType === "restaurante") {
                    window.location.href = "restaurante.html";
                }
            } else {
                document.getElementById("error-message").textContent = "E-mail ou senha inválidos.";
            }
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            document.getElementById("error-message").textContent = "Erro ao conectar ao servidor.";
        }
    });
});


document.getElementById('themeSwitcher').addEventListener('click', function(){
    if(body.dataset.theme === 'light') {
    root.style.setProperty('--color-primary', '#66b3ff')
    root.style.setProperty('--color-primary-hover', '#3385cc')
    root.style.setProperty('--color-background', 'rgba(18, 18, 18, 1)')
    root.style.setProperty('--color-background-light', 'rgba(31, 31, 31, 0.9)')
    root.style.setProperty('--color-text', '#e0e0e0')
    root.style.setProperty('--color-error', '#ff4d4d')
    root.style.setProperty('--color-shadow', 'rgba(0, 0, 0, 0.6)')
    root.style.setProperty('--color-link', '#66b3ff')
    body.dataset.theme = 'dark'
    }

})