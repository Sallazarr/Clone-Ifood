// document.getElementById("loginForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Impede o envio do formulário

//     let email = document.getElementById("email").value;
//     let senha = document.getElementById("senha").value;
//     let errorMessage = document.getElementById("error-message");

//     // Usuário e senha fixos para teste (simulação)
//     const usuarioTeste = {
//         email: "admin@ifoodclone.com",
//         senha: "123456"
//     };

//     if (email === usuarioTeste.email && senha === usuarioTeste.senha) {
//         localStorage.setItem("usuarioLogado", email);
//         window.location.href = "dashboard.html"; // Redireciona para a área administrativa
//     } else {
//         errorMessage.innerText = "E-mail ou senha inválidos.";
//     }
// });


// index.js (Backend)
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // sua senha do MySQL
  database: 'clone_ifood',  // substitua com o nome da sua base de dados
});

connection.connect();

// Defina uma rota para renderizar a página de clientes
app.get('/clientes', (req, res) => {
  // Consulta no banco de dados para pegar todos os clientes
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao consultar o banco de dados.');
      return;
    }

    // Renderiza a página HTML e passa os dados dos clientes
    let clientesHtml = `
      <html>
      <head>
        <title>Lista de Clientes</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid black; }
          th, td { padding: 10px; text-align: left; }
        </style>
      </head>
      <body>
        <h1>Lista de Clientes</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Email</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
    `;

    // Adiciona cada cliente como uma linha na tabela
    results.forEach(client => {
      clientesHtml += `
        <tr>
          <td>${client.id_cliente}</td>
          <td>${client.nome}</td>
          <td>${client.sobrenome}</td>
          <td>${client.email}</td>
          <td>${client.telefone}</td>
        </tr>
      `;
    });

    clientesHtml += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Envia o HTML gerado para o cliente
    res.send(clientesHtml);
  });
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
