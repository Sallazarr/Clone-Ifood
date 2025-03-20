document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;
    const errorMessage = document.getElementById("error-message");

    // Verificar se as senhas coincidem
    if (senha !== confirmaSenha) {
        errorMessage.textContent = "As senhas não coincidem!";
        return;
    }

    // Criando um objeto com os dados do usuário
    const userData = { nome, sobrenome, email, celular, senha };

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (data.success) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "/Clone Ifood/index.html"; // Redireciona para a página de login
        } else {
            errorMessage.textContent = data.message;
        }
    } catch (error) {
        errorMessage.textContent = "Erro ao cadastrar. Tente novamente!";
        console.error("Erro ao cadastrar:", error);
    }
});
