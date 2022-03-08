## Segunda Parte

# 🔮 Axios!

Nesta segunda parte iremos usar o Axios para consumir nossa API feita na primeira parte deste projeto.

Abaixo está o link que foi usado para implementar o Axios como biblioteca: 

```js
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"> </script>
```

Abaixo está o exemplo do HTML que foi usado no projeto:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loja de Games</title>
</head>
<body>
  
</body>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</html>
```

##  ⚡ O que é Cors?

É um mecanismo de segurança que existe em aplicações web que bloqueia requisições feitas de maneiras externas.

A seguir mostramos o código de instalação do Cors:

```
npm install cors --save
```

Em seguida adicionamos o cors no sistema:

```js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

```

## ✨Elementos Dinâmicos

Para adicionar elementos dinâmicos no nosso front foi usado o JS puro para implementação dessa funcionalidade, abaixo mostramos a primeira parte do código realizado:

```html
 <title>Loja de Games</title>
  <hr>
  <h4>Lista de Games</h4>
  <ul id="games"></ul>
```

Primeiro criamos uma linha com "hr" para separar o Título do subtítulo, em seguida criamos uma "ul"(*para uma lista desordenada*) e adicionamos o id com o valor "games".

A continuação do código é descrita abaixo.

```js
 var games = response.data; // Variável que recebe o array de games
 var list = document.getElementById("games"); // Variável que pega o elemento pelo Id
    games.forEach(game => {
      var item = document.createElement("li"); // Cria um li
      item.innerHTML =
        game.id + " - " +
        game.title + " - $ " +
        game.price; // Para exibir o que tem dentro da lista criada
      list.appendChild(item); //Adiciona um "filho" na lista exibindo-os
```

Acima decidimos colocar comentários para exemplificar melhor cada passo do código.



## 📝 Vamos cadastrar!

O modelo do front podemos ver logo abaixo. 

> Obs: A partir daqui optamos por omitir mais descrições pois o conteúdo já foi explicado anteriormente.

```html
  <hr>
  <h4>Novo Game</h4>
  <input type="text" name="title" id="title" placeholder="Título">
  <input type="number" name="year" id="year" placeholder="Ano">
  <input type="number" name="price" id="price" placeholder="Preço">
  <button type="button">Cadastrar</button>
```

Já no nosso JS implementamos uma função que será responsável por criar os games. Em seguida adicionamos os elementos dentro de um JSON, que foram pegos através do recurso "getElementById".

 Repare também que a implementação está no mesmo formato do index.js feito na primeira parte desse artigo, pois é de extrema importância que os dados estejam na mesma ordem que a API pede!

```js
 function createGame() {
    var titleInput = document.getElementById("title");
    var yearInput = document.getElementById("year");
    var priceInput = document.getElementById("price");

    var game = { // JSON para coletar os dados
      title: titleInput.value,
      year: yearInput.value,
      price: priceInput.value
    }
  }
```

A função foi adicionada ao botão do nosso front e o código você pode ver a seguir:

```html
 <button type="button" onclick="createGame()">Cadastrar</button>
```

Para enviar dados através do axios é bem simples: basta adicionar o verbo post, a URL utilizada na construção da API e separado por vírgula adiciona-se a variável que irá gravar esses dados.

Após isso definimos uma condição através do if onde, caso o status code seja 200 será disparado um alert na tela exibindo uma mensagem de sucesso. O catch de erro foi feito de forma genérica para exemplificação.

```js
axios.post("http://localhost:3002/games", game).then(response => {
      if (response.status == 200) {
        alert("Game cadastrado com sucesso")
      }
    }).catch(error => {
      console.log("erro");
    });
```

## 🧩 Atributos Customizados

Para adicionar uma informação em específico ou trabalhar com algum dado podemos fazer o uso de *"data attributes"*  que permite armazenar informações extras sem a necessidade classList por exemplo.

Abaixo mostramos a implementação do uso de data attributes no script do axios.get.

```js

      item.setAttribute("data-id", game.id);
      item.setAttribute("data-title", game.title);
      item.setAttribute("data-year", game.year);
      item.setAttribute("data-price", game.price);

```

Após isso implementamos um botão de deletar que será usado em conjunto com o data attributes. O código abaixo exemplifica melhor o que será realizado em cada etapa:

```js

   var deleteBtn = document.createElement("button"); //Criando um botão
   deleteBtn.innerHTML= "Deletar"; // Definindo conteúdo do botão como deletar
   item.appendChild(deleteBtn); // Adicionando o botão dentro do elemento da lista
        
```

## 🔢 Funções  entre  funções

No projeto criado adicionamos também o botão de deletar, contudo, entre funções que operam entre si. O código abaixo é a primeira parte da  implementação desse recurso no axios.get:

```js
deleteBtn.innerHTML= "Deletar"; // Definindo conteúdo do botão como deletar
deleteBtn.addEventListener("click", function(){
deleteGame(item); // Toda vez que clicar no botão será chamado essa função
```

Em seguida implementamos a função de deleção do item da nossa lista por seu id.

```js
function deleteGame(listItem) {
  var id = listItem.getAttribute("data-id");
    axios.delete("http://localhost:3002/games/" + id).then(response => {
      alert("Game deletado com sucesso");
    }).catch(erro => {
      console.log(erro);
    });
}
```

## 🎬 Um, dois, três... Edição!

Para finalizar o nosso sistema apresentamos a implementação de edição, a primeira parte do HTML é apresentada(repare que foi usado o mesmo modelo da listagem de games):

```html
<h4>Editar Game</h4>
<input type="text" name="idEdit" id="idEdit" placeholder="ID" readonly><br>
<input type="text" name="titleEdit" id="titleEdit" placeholder="Título"><br>
  <input type="number" name="yearEdit" id="yearEdit" placeholder="Ano"><br>
  <input type="number" name="priceEdit" id="priceEdit" placeholder="Preço"><br>
  <button type="button" onclick="updateGame()">Editar</button>
```

Vale dizer que criamos uma função que usa o data attribute para carregar e pegar os elementos, e depois disso modificá-los através do updateGame. Abaixo está o código implementado.

```js
 function loadForm(listItem) {
    var id = listItem.getAttribute("data-id");
    var title = listItem.getAttribute("data-title");
    var year = listItem.getAttribute("data-year");
    var price = listItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;
  }
```

Aqui está a função *updateGame* que tem o papel de atualizar os campos do nosso objeto.

```js
  function updateGame() {
    var idInput = document.getElementById("idEdit")
    var titleInput = document.getElementById("titleEdit");
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit");

    var game = { // JSON para coletar os dados
      title: titleInput.value,
      year: yearInput.value,
      price: priceInput.value
    }

```

E com isso chegamos ao final do nosso projeto! Com um CRUD implementado do início ao fim e também consumindo nossa API através do Axios. 

