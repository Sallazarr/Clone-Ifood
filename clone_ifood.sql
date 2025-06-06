-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/03/2025 às 22:06
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `clone_ifood`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `sobrenome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nome`, `sobrenome`, `email`, `senha`, `telefone`) VALUES
(1, 'Henrique', 'Salazar da Silva', 'henriquesalazards16@hotmail.com', '123123', '51982327837');

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens_pedido`
--

CREATE TABLE `itens_pedido` (
  `id_item_pedido` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_produto` int(11) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `preco_unitario` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_restaurante` int(11) DEFAULT NULL,
  `data_pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT NULL,
  `id_item_pedido` int(11) DEFAULT NULL,
  `endereco` varchar(325) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id_produto` int(11) NOT NULL,
  `id_restaurante` int(11) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `imagem` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id_produto`, `id_restaurante`, `nome`, `descricao`, `preco`, `categoria`, `imagem`) VALUES
(1, 1, 'Pizza Margherita', 'Pizza clássica com molho de tomate, mozzarella de búfala, manjericão e azeite de oliva.', 35.00, NULL, 'https://rossopizza.com.br/salao/wp-content/uploads/2019/09/istock-181175167.jpg'),
(2, 1, 'Pizza Calabresa', 'Pizza com molho de tomate, queijo mozzarella, calabresa fatiada e cebola.', 38.00, NULL, 'https://blog.novasafra.com.br/wp-content/uploads/2016/01/accb7d_37d37d9f1001e88384dafc6e5cc60c4f.jpg_1024-780x450.jpg'),
(3, 1, 'Pizza Frango com Catupiry', 'Combinação cremosa de frango desfiado temperado com ervas finas, catupiry original e pitada de pimenta do reino.', 34.00, NULL, 'https://bonissima.com.br/web/image/product.template/34332/image_1024?unique=531376c'),
(4, 2, 'Cheese Burger Especial', 'Pão brioche, blend 180g, queijo cheddar derretido, bacon crocante e cebola caramelizada.', 29.90, NULL, 'https://www.kikkoman.com.br/kikkomanbrasil/dist/img/destaque/receitas/X-Burger.jpg'),
(5, 2, 'Veggie Burguer', 'Hambúrguer de grão-de-bico com pão integral, queijo coalho, abacate e maionese de ervas.', 32.00, NULL, 'https://img.freepik.com/fotos-premium/hamburguer-vegano-sem-carne-com-abacate-tomate-e-espinafre-na-mesa-e-vinho-tinto-na-taca_230432-1293.jpg'),
(6, 2, 'Monster Bacon', 'Dois hambúrgueres 150g, quatro queijos, cebola crispy e duplo bacon com molho barbecue.', 38.50, NULL, 'https://www.minhareceita.com.br/app/uploads/2021/03/shutterstock_1751836019-scaled.jpg'),
(7, 3, 'Niguiri Salmão Skin', 'Com arroz temperado, pele de salmão crocante e envolto por alga.', 18.00, NULL, 'https://nakayoshisushibar.meucatalogofacil.com/_core/_uploads//2021/03/2348240321jcdjae6i8c.jpeg'),
(8, 3, 'Sashimi Atum Premium', 'Fatias generosas de atum fresco, servidas com raiz-forte e molho shoyu artesanal.', 28.00, NULL, 'https://live.staticflickr.com/3655/3654094091_dd4b8e3675_b.jpg'),
(9, 3, 'Sushi Hossomaki Salmão', 'Peça clássica de sushi com fatia fresca de salmão sobre arroz.', 16.50, NULL, 'https://static.itdg.com.br/images/1200-630/a4880db5302563b309e2cd9664c8981c/303370-original.jpg'),
(10, 3, 'Temaki Filadélfia', 'Cone de nori crocante recheado com arroz, salmão fresco, cream cheese e finalizado com cebolinha.', 24.90, NULL, 'https://media-cdn.tripadvisor.com/media/photo-s/18/24/7d/62/temaki-filadelfia-salmao.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `restaurantes`
--

CREATE TABLE `restaurantes` (
  `id_restaurante` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `endereco` text DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `imagem` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `restaurantes`
--

INSERT INTO `restaurantes` (`id_restaurante`, `nome`, `endereco`, `telefone`, `email`, `imagem`) VALUES
(1, 'Pizzaria Bella Italia', 'Avenida Itália, 123 - Centro', '987654321', 'pizzaria@bellaitalia.com', 'https://img.freepik.com/vetores-premium/logotipo-da-pizza-italiana-com-uma-pizza-e-um-chef-segurando-uma-pizza_850580-18.jpg?semt=ais_hybrid'),
(2, 'Burguer House', 'Avenida dos Sabores, 257 - Centro', '51123456789', 'hamburgui@gmail.com', 'https://img.freepik.com/vetores-premium/modelo-de-logotipo-de-hamburguer_476121-29.jpg'),
(3, 'Sushi Yama', 'Avenida Japão, 456 - Liberdade, São Paulo', '(11) 91234-5678', 'reservas@sushiyama.com', 'https://static.vecteezy.com/ti/vetor-gratis/p1/16752182-de-logotipo-de-sushi-com-modelo-de-slogan-gratis-vetor.jpg');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `itens_pedido`
--
ALTER TABLE `itens_pedido`
  ADD PRIMARY KEY (`id_item_pedido`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_produto` (`id_produto`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_restaurante` (`id_restaurante`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `id_restaurante` (`id_restaurante`);

--
-- Índices de tabela `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD PRIMARY KEY (`id_restaurante`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `itens_pedido`
--
ALTER TABLE `itens_pedido`
  MODIFY `id_item_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `restaurantes`
--
ALTER TABLE `restaurantes`
  MODIFY `id_restaurante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `itens_pedido`
--
ALTER TABLE `itens_pedido`
  ADD CONSTRAINT `itens_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  ADD CONSTRAINT `itens_pedido_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`);

--
-- Restrições para tabelas `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_restaurante`) REFERENCES `restaurantes` (`id_restaurante`);

--
-- Restrições para tabelas `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`id_restaurante`) REFERENCES `restaurantes` (`id_restaurante`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
