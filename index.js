const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clone_ifood"
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log("Conectado ao banco de dados!");
});

// Rota para cadastrar um novo usuário
app.post("/register", (req, res) => {
    const { nome, sobrenome, email, celular, senha } = req.body;

    // Verificar se o e-mail já existe
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Erro no servidor!" });

        if (result.length > 0) {
            return res.json({ success: false, message: "E-mail já cadastrado!" });
        }

        // Criptografar a senha
        bcrypt.hash(senha, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ success: false, message: "Erro ao processar senha!" });

            // Inserir o usuário no banco de dados
            const query = "INSERT INTO usuarios (nome, sobrenome, email, celular, senha) VALUES (?, ?, ?, ?, ?)";
            db.query(query, [nome, sobrenome, email, celular, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ success: false, message: "Erro ao cadastrar usuário!" });

                res.json({ success: true, message: "Cadastro realizado com sucesso!" });
            });
        });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
