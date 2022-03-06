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
//Get all
app.get("/games", (request, response) => {
  response.statusCode = 200; // Uso do status code para o client
  response.json(DB.games); // Retorna todos os games em um formato JSON
});

//Get one
app.get("/game/:id", (request, response) => {
  // Esta rota recebe como parâmetro o id de um game no banco de dados

  if (isNaN(request.params.id)) {
    //Validação para verificar se o id é um número.
    response.sendStatus(400);
  } else {
    var id = parseInt(request.params.id); // Conversão de string para int
    var game = DB.games.find(g => g.id == id);

    if (game != undefined) { //Se game for diferente de indefinido...
      response.statusCode = 200;
      response.json(game);
    } else {
      response.sendStatus(404);
    }
  }
})

app.listen(3002)