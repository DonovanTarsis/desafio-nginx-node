const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const names = [
        "Ana", "Beatriz", "Carlos", "Daniel", "Eduardo", "Fernanda", "Gabriel", "Helena", "Isabela", "João", 
        "Larissa", "Mariana", "Nathalia", "Otávio", "Pedro", "Rafael", "Sofia", "Tiago", "Valentina", "Yasmin"
    ]

    connection.query(`INSERT INTO people (name) VALUES ('${names[gerarNumeroAleatorio(names.length)]}')`, (err, result) => {
      if (err) throw err;

      connection.query('SELECT * FROM people', (err, results) => {
        if (err) throw err;
        let namesList = '<h1>Full Cycle Rocks!</h1>\n<ul>\n';

        results.forEach(person => {
          namesList += `<li>${person.name}</li>\n`;
        });

        namesList += '</ul>';
  
        res.send(namesList);
      });
    });
  });

app.listen(port, () => {
    console.log('Rodando dentro do container na porta ', port)
})


function gerarNumeroAleatorio(length) {
    return Math.floor(Math.random() * length);
  }