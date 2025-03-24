let root = document.querySelector(':root')
let body = document.querySelector('body')


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    // Função para verificar o login do usuário
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Pegando os valores dos campos de email e senha
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Validação simples no cliente
        if (!email || !senha) {
            errorMessage.textContent = "Por favor, preencha todos os campos.";
            return;
        }

        try {
            // Enviar a requisição para o servidor (fazer login)
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const result = await response.json();

            if (response.ok) {
                // Se o login for bem-sucedido, redireciona para a página principal
                // Salva o tipo de usuário no localStorage para uso posterior
                localStorage.setItem("userType", result.tipo); // "client" ou "restaurant"
                localStorage.setItem("userName", result.nome); // Nome do usuário
                // Redirecionar dependendo do tipo de usuário
                if (result.tipo === "client") {
                    window.location.href = "/Clone Ifood/client-dashboard.html"; // Página de cliente
                } else {
                    window.location.href = "/Clone Ifood/restaurant-dashboard.html"; // Página de restaurante
                }
            } else {
                // Caso haja erro, exibe a mensagem de erro
                errorMessage.textContent = result.mensagem || "Erro ao fazer login.";
            }
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            errorMessage.textContent = "Erro ao efetuar login";
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