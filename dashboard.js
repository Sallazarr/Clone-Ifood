document.addEventListener("DOMContentLoaded", async function () {
    const userType = localStorage.getItem("userType");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userType) {
        window.location.href = "/index.html"; // Redireciona para login se não houver usuário logado
        return;
    }

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.clear();
        window.location.href = "/index.html";
    });

    if (userType === "cliente") {
        document.getElementById("cliente-section").classList.remove("hidden");
        carregarRestaurantes();
    } else if (userType === "restaurante") {
        document.getElementById("restaurante-section").classList.remove("hidden");
        carregarProdutos(userData.id_restaurante);
    }
});

async function carregarRestaurantes() {
    const response = await fetch("http://localhost:3000/restaurantes");
    const restaurantes = await response.json();

    const lista = document.getElementById("lista-restaurantes");
    lista.innerHTML = restaurantes.map(r => `
        <div>
            <h3>${r.nome}</h3>
            <p>${r.endereco}</p>
            <button onclick="verProdutos(${r.id_restaurante})">Ver Produtos</button>
        </div>
    `).join("");
}

async function carregarProdutos(idRestaurante) {
    const response = await fetch(`http://localhost:3000/produtos/${idRestaurante}`);
    const produtos = await response.json();

    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = produtos.map(p => `
        <div>
            <h3>${p.nome}</h3>
            <p>${p.descricao} - R$ ${p.preco.toFixed(2)}</p>
        </div>
    `).join("");
}
