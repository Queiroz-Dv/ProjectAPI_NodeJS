const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Banco de dados fake em formato JSON
var DB = {
  games: [
    {
      id: 23,
      title: "God Of War",
      year: 2019,
      price: 60
    },
    {
      id: 89,
      title: "Titan Quest",
      year: 2018,
      price: 48
    },
    {
      id: 9,
      title: "Rocket League",
      year: 2019,
      price: 15
    }
  ]
}

//Rotas da API
app.get("/games", (request, response) => {
  response.statusCode = 200; // Uso do status code para o client
  response.json(DB.games); // Retorna todos os games em um formato JSON
});

app.listen(3002)