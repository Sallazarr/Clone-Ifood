const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

// Configuração do servidor
const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());

// Middleware para analisar JSON no corpo da requisição
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // seu usuário MySQL
    password: "", // sua senha MySQL (deixe vazio se não tiver senha)
    database: "clone_ifood" // nome do seu banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error("Erro de conexão: " + err.stack);
        return;
    }
    console.log("Conectado ao banco de dados.");
});

// Rota de login (POST)
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    // Verificar se o usuário existe no banco de dados
    const sql = "SELECT * FROM clientes WHERE email = ? LIMIT 1";
    db.query(sql, [email], (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: "Erro no servidor." });
            return;
        }

        if (result.length === 0) {
            return res.status(401).json({ mensagem: "Usuário não encontrado." });
        }

        const user = result[0];

        // Verifique se a senha está correta (aqui você faria a comparação de senha)
        if (user.senha !== senha) {
            return res.status(401).json({ mensagem: "Senha incorreta." });
        }

        // Determinar o tipo de usuário (cliente ou restaurante)
        // Se o id_restaurante estiver preenchido, é um restaurante, caso contrário é um cliente
        const userType = user.id_restaurante ? "restaurant" : "client";

        // Resposta com o tipo de usuário
        res.status(200).json({
            nome: `${user.nome} ${user.sobrenome}`,
            tipo: userType
        });
    });
});

// Rota para cadastrar cliente (apenas para teste, ajuste conforme necessário)
app.post("/register", (req, res) => {
    const { nome, sobrenome, email, senha, telefone } = req.body;

    const sql = "INSERT INTO clientes (nome, sobrenome, email, senha, telefone) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nome, sobrenome, email, senha, telefone], (err, result) => {
        if (err) {
            res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
            return;
        }

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
