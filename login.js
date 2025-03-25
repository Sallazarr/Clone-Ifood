document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita o recarregamento da página

            // Obtendo os valores dos inputs
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Simulação de login (substituir por autenticação real depois)
            const validEmail = "admin@email.com";
            const validPassword = "123456";

            if (email === validEmail && password === validPassword) {
                // Redireciona para a dashboard
                window.location.href = "dashboard.html";
            } else {
                // Exibe uma mensagem de erro
                const errorMessage = document.getElementById("error-message");
                if (errorMessage) {
                    errorMessage.textContent = "Email ou senha incorretos!";
                    errorMessage.style.display = "block"; // Exibir mensagem de erro
                }
            }
        });
    }
});
