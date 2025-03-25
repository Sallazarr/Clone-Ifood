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


let root = document.querySelector(':root')
let body = document.querySelector('body')


document.getElementById('themeSwitcher').addEventListener('click', function(){
    if(body.dataset.theme === 'light') {
        // Definindo as variáveis para o tema escuro
        root.style.setProperty('--color-gradient', 'linear-gradient(90deg, rgb(33, 33, 33) 30%, rgb(13, 110, 207) 100%)');
        root.style.setProperty('--color-primary', '#007bff');
        root.style.setProperty('--color-primary-hover', '#0068d6');
        root.style.setProperty('--color-background', 'rgba(18, 18, 18, 1)');
        root.style.setProperty('--color-background-light', 'rgba(31, 31, 31, 0.9)');
        root.style.setProperty('--color-text', '#e0e0e0');
        root.style.setProperty('--color-error', '#ff4d4d');
        root.style.setProperty('--color-shadow', 'rgba(0, 0, 0, 0.6)');
        root.style.setProperty('--color-link', '#66b3ff');
        // Aplica o gradiente para o fundo do body
        body.style.background = 'var(--color-gradient)';
        root.style.setProperty('--opacity-background', '0.7'); // 70% opacidade

        document.querySelector('.imgLeft').src = 'CSS/img/restaurantWhite.png';
        document.querySelector('.imgRight').src = 'CSS/img/snackWhite.png';

        // Altera o tema para dark
        body.dataset.theme = 'dark';
        document.getElementById('themeSwitcher').textContent = 'Tema Claro'; // Troca o texto do botão
    } else {
        // Restabelece o tema claro
        root.style.setProperty('--color-gradient', 'linear-gradient(90deg, rgb(239, 239, 239) 40%, rgb(85, 176, 255) 100%)');
        root.style.setProperty('--color-primary', '#007bff');
        root.style.setProperty('--color-primary-hover', '#0068d6');
        root.style.setProperty('--color-background', 'rgba(255, 255, 255, 0.9)');
        root.style.setProperty('--color-background-light', 'rgba(255, 255, 255, 0.4)');
        root.style.setProperty('--color-text', '#000000');
        root.style.setProperty('--color-error', '#ff0000');
        root.style.setProperty('--color-shadow', 'rgba(0, 0, 0, 0.25)');
        root.style.setProperty('--color-link', '#007bff');
        // Aplica o gradiente para o fundo do body
        body.style.background = 'var(--color-gradient)';
        
        
        document.querySelector('.imgLeft').src = 'CSS/img/restaurant.png';
        document.querySelector('.imgRight').src = 'CSS/img/snack.png';

        // Altera o tema para light
        body.dataset.theme = 'light';
        document.getElementById('themeSwitcher').textContent = 'Tema Escuro'; // Troca o texto do botão
    }
});
