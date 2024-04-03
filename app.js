const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const dbConfig = require('./Database/MySQL')

app.use(express.json());
app.use(express.static('FotinhosDeGatinhos'));

app.use('/createcarro', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.use(function (req, res, next) {
  const data = new Date().toDateString();
  console.log('Time:', data);
 next();
});

app.get('/', (req, res) => {
  //console.log("Logzaao", req)
  res.send('Hello World!')
})
app.get('/carro', (req, res) => {
    res.send('Outro texto')
  })

  app.post('/createcarro', function (req, res) {
    const nameCar = req.body.name
    const yearCar = req.body.year
    
    //console.log("Logzaao", req)
    res.status(404)
    res.send(`Nome do Carro: ${nameCar} \n Ano do Carro: ${yearCar}`);
  });

  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })
  app.get('/usuario', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        res.status(500).send('Erro ao conectar ao banco de dados');
        return;
      }
      const query = 'SELECT * FROM clientes';
      connection.query(query, (error, results) => {
        //connection.end();
  
        if (error) {
          res.status(500).send('Erro ao buscar carros');
          return;
        }
  
        res.status(200).send(results);
      });
  })

})
