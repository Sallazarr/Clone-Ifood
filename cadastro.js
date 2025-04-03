document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value; // Correspondendo ao banco
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;
    const errorMessage = document.getElementById("error-message");

    // Validação básica: senhas devem ser iguais
    if (senha !== confirmaSenha) {
        errorMessage.innerText = "As senhas não coincidem!";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, sobrenome, email, telefone, senha }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html"; // Redireciona para login
        } else {
            errorMessage.innerText = data.mensagem || "Erro ao cadastrar.";
        }
    } catch (error) {
        console.error("Erro:", error);
        errorMessage.innerText = "Erro ao conectar com o servidor.";
    }
});
