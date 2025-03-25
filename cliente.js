window.onload = () => {
    // Buscar os restaurantes no backend
    fetch("http://localhost:3000/restaurantes")
        .then(response => response.json())
        .then(restaurantes => {
            const listaRestaurantes = document.getElementById("restaurantes-lista");
            listaRestaurantes.innerHTML = ''; // Limpar a lista anterior, caso exista

            restaurantes.forEach(restaurante => {
                const divRestaurante = document.createElement("div");
                divRestaurante.classList.add("restaurante");
                
                divRestaurante.innerHTML = `
                    <div class="restaurante-card">
                        <img src="${restaurante.imagem}" alt="${restaurante.nome}" class="restaurante-imagem">
                        <h3>${restaurante.nome}</h3>
                        <p>${restaurante.endereco}</p>
                        <button class="ver-produtos" data-id="${restaurante.id_restaurante}">Ver Produtos</button>
                    </div>
                `;
                listaRestaurantes.appendChild(divRestaurante);
            });

            // Adicionar evento para abrir os produtos do restaurante
            const botaoVerProdutos = document.querySelectorAll(".ver-produtos");
            botaoVerProdutos.forEach(botao => {
                botao.addEventListener("click", (e) => {
                    const idRestaurante = e.target.dataset.id;
                    window.location.href = `produtos.html?idRestaurante=${idRestaurante}`;
                });
            });
        })
        .catch(error => console.error("Erro ao carregar os restaurantes", error));
};
