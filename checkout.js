document.addEventListener("DOMContentLoaded", function() {
    // Carrega os itens do carrinho
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaItens = document.getElementById('lista-itens');
    const totalPedido = document.getElementById('total-pedido');
    
    // Exibe os itens
    listaItens.innerHTML = '';
    carrinho.forEach(item => {
        const divItem = document.createElement('div');
        divItem.className = 'item-pedido';
        divItem.innerHTML = `
            <span>${item.nome} x ${item.quantidade}</span>
            <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        `;
        listaItens.appendChild(divItem);
    });
    
    // Calcula o total
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    totalPedido.textContent = `Total: R$ ${total.toFixed(2)}`;
    
    // Botão de confirmar
    document.getElementById('confirmar-pedido').addEventListener('click', function() {
        alert('Pedido confirmado com sucesso! Obrigado pela compra.');
        localStorage.removeItem('carrinho');
        window.location.href = 'cliente.html';
    });
});