window.onload = () => {
    // Pegar o idRestaurante da URL
    const params = new URLSearchParams(window.location.search);
    const idRestaurante = params.get('idRestaurante');

    if (!idRestaurante) {
        alert("Restaurante não encontrado.");
        return;
    }

    // Buscar as informações do restaurante
    fetch(`http://localhost:3000/restaurantes/${idRestaurante}`)
        .then(response => response.json())
        .then(restaurante => {
            // Exibir o nome e a imagem do restaurante
            const imagemRestaurante = document.getElementById("restaurante-imagem");
            const nomeRestaurante = document.getElementById("restaurante-nome");

            imagemRestaurante.src = restaurante.imagem;
            imagemRestaurante.alt = restaurante.nome;
            nomeRestaurante.textContent = restaurante.nome;
        })
        .catch(error => console.error("Erro ao carregar informações do restaurante", error));

    // Buscar os produtos do restaurante
    fetch(`http://localhost:3000/produtos/${idRestaurante}`)
        .then(response => response.json())
        .then(produtos => {
            const listaProdutos = document.getElementById("produtos-lista");
            listaProdutos.innerHTML = '';

            produtos.forEach(produto => {
                const divProduto = document.createElement("div");
                divProduto.classList.add("produto");
                divProduto.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <p>Preço: R$ ${produto.preco}</p>
                    <button class="adicionar-carrinho" data-id="${produto.id_produto}" data-nome="${produto.nome}" data-preco="${produto.preco}">Adicionar ao Carrinho</button>
                `;
                listaProdutos.appendChild(divProduto);
            });

            // Adicionar evento para o botão "Adicionar ao Carrinho"
            const botoesAdicionar = document.querySelectorAll(".adicionar-carrinho");
            botoesAdicionar.forEach(botao => {
                botao.addEventListener("click", (e) => {
                    const produtoId = e.target.dataset.id;
                    const produtoNome = e.target.dataset.nome;
                    const produtoPreco = parseFloat(e.target.dataset.preco);

                    adicionarAoCarrinho(produtoId, produtoNome, produtoPreco);
                });
            });
        })
        .catch(error => console.error("Erro ao carregar os produtos", error));

    // Carregar carrinho no início
    carregarCarrinho();
};

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({
            id,
            nome,
            preco,
            quantidade: 1
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarIconeCarrinho();
    carregarCarrinho();
}

// Função para carregar o carrinho e exibir na tela lateral
function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoList = document.getElementById("carrinho-lista");
    const totalCarrinho = document.getElementById("total-carrinho");

    carrinhoList.innerHTML = ''; // Limpar a lista de itens

    if (carrinho.length === 0) {
        carrinhoList.innerHTML = "<p>Carrinho vazio</p>";
        totalCarrinho.textContent = "Total: R$ 0.00";
        return;
    }

    carrinho.forEach(produto => {
        const itemCarrinho = document.createElement("div");
        itemCarrinho.classList.add("item-carrinho");
        itemCarrinho.innerHTML = `
            <p>${produto.nome} - R$ ${produto.preco.toFixed(2)} x ${produto.quantidade}</p>
            <button class="remover-carrinho" data-id="${produto.id}">Remover</button>
        `;
        carrinhoList.appendChild(itemCarrinho);
    });

    // Calcular e exibir o total
    const total = carrinho.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;

    // Adicionar eventos de remoção
    document.querySelectorAll(".remover-carrinho").forEach(botao => {
        botao.addEventListener("click", (e) => {
            removerDoCarrinho(e.target.dataset.id);
        });
    });
}

// Função para remover UMA UNIDADE de um item do carrinho
function removerDoCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Encontrar o produto no carrinho
    const produtoIndex = carrinho.findIndex(produto => produto.id === id);
    
    if (produtoIndex !== -1) {
        // Diminuir a quantidade em 1
        carrinho[produtoIndex].quantidade -= 1;
        
        // Se a quantidade chegou a zero, remover o produto do array
        if (carrinho[produtoIndex].quantidade <= 0) {
            carrinho.splice(produtoIndex, 1);
        }
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarIconeCarrinho();
    carregarCarrinho();
}


// Função para atualizar o ícone do carrinho
function atualizarIconeCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItems = carrinho.reduce((acc, produto) => acc + produto.quantidade, 0);
    document.getElementById("carrinho-count").textContent = totalItems > 0 ? totalItems : '';
}

// Função para exibir ou ocultar a tela lateral do carrinho
function toggleCarrinho() {
    document.getElementById("carrinho-sidebar").classList.toggle("exibir");
}