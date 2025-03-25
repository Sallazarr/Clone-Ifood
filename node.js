const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clone_ifood"
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados.");
    }
});
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 📌 Rota de Login para Clientes e Restaurantes
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    // Verifica se o usuário é um Cliente
    const sqlCliente = "SELECT * FROM clientes WHERE email = ? AND senha = ?";
    db.query(sqlCliente, [email, senha], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Erro no servidor" });
        if (result.length > 0) return res.json({ success: true, userType: "cliente", userData: result[0] });

        // Se não for cliente, verifica se é um Restaurante
        const sqlRestaurante = "SELECT * FROM restaurantes WHERE email = ? AND senha = ?";
        db.query(sqlRestaurante, [email, senha], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: "Erro no servidor" });
            if (result.length > 0) return res.json({ success: true, userType: "restaurante", userData: result[0] });

            return res.status(401).json({ success: false, message: "E-mail ou senha inválidos" });
        });
    });
});

// 📌 Rota para cadastro de Cliente ou Restaurante
app.post("/cadastro", (req, res) => {
    const { nome, sobrenome, email, telefone, senha } = req.body;

    // Verificando se os dados necessários estão presentes
    if (!nome || !sobrenome || !email || !telefone || !senha) {
        return res.status(400).json({ success: false, mensagem: "Todos os campos são obrigatórios" });
    }

    // Verificar se o e-mail já está cadastrado (cliente)
    const sqlCliente = "SELECT * FROM clientes WHERE email = ?";
    db.query(sqlCliente, [email], (err, result) => {
        if (err) return res.status(500).json({ success: false, mensagem: "Erro no servidor" });

        if (result.length > 0) {
            return res.status(400).json({ success: false, mensagem: "E-mail já cadastrado como cliente" });
        }

        // Verificar se o e-mail já está cadastrado (restaurante)
        const sqlRestaurante = "SELECT * FROM restaurantes WHERE email = ?";
        db.query(sqlRestaurante, [email], (err, result) => {
            if (err) return res.status(500).json({ success: false, mensagem: "Erro no servidor" });

            if (result.length > 0) {
                return res.status(400).json({ success: false, mensagem: "E-mail já cadastrado como restaurante" });
            }

            // Cadastro do cliente
            const sql = "INSERT INTO clientes (nome, sobrenome, email, telefone, senha) VALUES (?, ?, ?, ?, ?)";
            db.query(sql, [nome, sobrenome, email, telefone, senha], (err, result) => {
                if (err) return res.status(500).json({ success: false, mensagem: "Erro ao cadastrar cliente" });
                res.json({ success: true, mensagem: "Cadastro realizado com sucesso!" });
            });
        });
    });
});

// 📌 Rota para listar todos os Restaurantes
app.get("/restaurantes", (req, res) => {
    db.query("SELECT * FROM restaurantes", (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao buscar restaurantes" });
        res.json(result);
    });
});

app.get("/restaurantes/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM restaurantes WHERE id_restaurante = ?", [id], (err, result) => {
        if (err) {
            console.error("Erro no banco de dados:", err);
            return res.status(500).json({ message: "Erro ao buscar restaurante" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }
        console.log("Resultado da query:", result); // Adicione este log
        res.json(result[0]);
    });
});


// 📌 Rota para listar os Produtos de um Restaurante
app.get("/produtos/:idRestaurante", (req, res) => {
    const { idRestaurante } = req.params;
    db.query("SELECT * FROM produtos WHERE id_restaurante = ?", [idRestaurante], (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao buscar produtos" });
        res.json(result);
    });
});

// 📌 Rota para adicionar um Produto (somente restaurantes podem adicionar)
app.post("/produtos", (req, res) => {
    const { nome, descricao, preco, id_restaurante } = req.body;

    if (!nome || !descricao || !preco || !id_restaurante) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const sql = "INSERT INTO produtos (nome, descricao, preco, id_restaurante) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, descricao, preco, id_restaurante], (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao adicionar produto" });
        res.json({ success: true, message: "Produto cadastrado com sucesso!" });
    });
});

// Iniciando o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

