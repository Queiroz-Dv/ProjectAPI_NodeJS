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
});

//Post data
app.post("/game", (request, response) => {
  // Acima temos a definição de um método post que cria/salva
  // um game no banco de dados
  var { title, price, year } = request.body;
  // O método push tem a função de adicionar dados dentro de um array
  DB.games.push({
    id: 33,
    title,
    price,
    year
  });
  response.sendStatus(200);
});

app.delete("/game/:id", (request, response) => {
  // Esta rota deleta um game com base no seu id
  if (isNaN(request.params.id)) {
    response.sendStatus(400);
  } else {
    var id = parseInt(request.params.id);
    var index = DB.games.findIndex(g => g.id == id); //Procura com base no index

    if (index == - 1) {
      // Validação para caso tente deletar um elemento que não existe
      response.sendStatus(404);
    } else {
      // Se for maior que um então de fato pode deletar o elemento

      DB.games.splice(index, 1);
      //Aqui passamos o elemento que queremos deletar de acordo com o index 
      // e que queremos deletar um elemento a partir do index.
      response.sendStatus(200);
    }
  }
});

app.put("/game/:id", (request, response) => {

  if (isNaN(request.params.id)) {
    response.sendStatus(400);
  } else {
    var id = parseInt(request.params.id);
    var game = DB.games.find(g => g.id == id);
    if (game != undefined) {
      var { title, price, year } = request.body;
      //Verificação para saber se o usuário quer atualizar apenas um atributo
      if (title != undefined) {
        game.title = title;
      }
      if (price != undefined) {
        game.price = price;
      }
      if (year != undefined) {
        game.year = year;
      }
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  }
});

app.listen(3002);