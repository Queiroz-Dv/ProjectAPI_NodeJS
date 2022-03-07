# 🔮 Um resumo sobre o que é HTTP?

## O que move a Web

A web trabalha com requisições _HTTP_ que é um dos protocolos mais usados na atualidade. A comunicação só é possível através das requisições e respostas entre cliente e servidor.

## 🎯 Introdução aos verbos HTTP

Também são chamados de métodos e ações HTTP. Os verbos HTTP são formas de dizer como você deseja que a requisição seja realizada. Abaixo temos uma tabela sobre os principais verbos:

| Verbo  | Objetivo                        | Usos         | Requisição Múltipla | Cache |
| ------ | ------------------------------- | ------------ | ------------------- | ----- |
| Get    | Retornar dados do servidor      | Links        | Sim                 | Sim   |
| Post   | Cria um novo elemento           | Forms        | Não                 | Não   |
| Put    | Editar elementos que já existem | Forms        | Sim                 | Não   |
| Patch  | Atualiza elementos parcialmente | Forms        | Não/Sim             | Não   |
| Delete | Deleta um elemento existente    | Forms/ Links | Sim                 | Não   |



##  🧐 O que é *Status Code*?

É importante que tenha um "response" com um código de status. O status code é uma forma de dizer, para quem fez uma  requisição para  nossa API, o que aconteceu quando o usuário fez a "request"  .

**Lista de Códigos**

1. 1xx - Informativos
2. 2xx - Sucesso
3. 3xx - Redirecionamento
4. 4xx - Erro de Cliente
5. 5xx - Outros erros 



## 🌏 O mundo dos Webservices

Uma API (*Application Programming Interface*)é um software ou uma biblioteca que serve para permitir que algum elemento se comunique com outro elemento. As APIs são uma interface de comunicação. As APIs que funcionam na web são conhecidas como **Webservices**. 



## 🥱 O que resta de Rest?

Conhecido como padrão de desenvolvimento de webservices.  Neste caso, trata-se de um padrão arquitetural. Antes de tudo é importante que você saiba as regras do rest: 

##### As cinco regras do Rest:

###### 👥Cliente-servidor

> O Rest *não pode ser cliente e servidor* ao mesmo tempo. Para esse padrão ele precisa ser apenas **servidor**.



###### 🔄Stateless

> Não devemos guardar o estado do cliente. Nenhuma informação deve ser salva na requisição, apenas responder e retornar ao cliente.



###### 🔣Cache

> Para uma API ser REST ela tem que ter a possibilidade de permitir cache. 



###### 🎨 Trabalho com camadas

>  Não importa o que há entre o cliente e a API, ela irá funcionar singularmente independente se houver um middleware, proxy ou firewall. 



###### 🔲Interface uniforme e direta 

> Interface dentro da web pode ser comparado analogamente a nossas rotas, que são chamadas de *end-points*. Elas precisam ser concisas e uniformes.



❌ **Interface não uniforme**

```http
http://meusite.com/getClientes/todos
http://meusite.com/deletarClientes/peloId/1
http://meusite.com/editar/clientes/peloId/2
```



✅ **Interface uniforme**

```http
GET = http://meusite.com/clientes
DELETE = http://meusite.com/cliente/1
GET = http://meusite.com/cliente/1
PUT = http://meusite.com/editar/clientes/2
```



# 😍 ProjectAPI_NodeJS

Este é um projeto para exemplificar os conceitos que foram abordados, siga o percurso ou tente você mesmo! 

Iniciamos com o a criação de um novo projeto node com :

```
npm init
```

Depois instalamos o *express* para usar duas bibliotecas:

```
npm install express --save
```

Também foi instalado o body-parser: 

```
npm install body-parser --save
```



##### Configuração no index.js:

```js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```



##### ✍ Configuração das rotas:

- Listagem de todos os dados:

```js
//Rotas da API
app.get("/games", (request, response) => {
  response.statusCode = 200; // Uso do status code para o client
  response.json(DB.games); // Retorna todos os games em um formato JSON
});
```

- Listagem única com validação:

  Recebemos como **parâmetro o ID** do game que está sendo requisitado, em seguida, verifica-se **o id é um número ou não** com o recurso *isNaN*, que de forma simplificada irá avaliar se o id é numérico ou não.

  ```js
  app.get("/game/:id", (request, response) => {
    // Esta rota recebe como parâmetro o id de um game no banco de dados
  
    if (isNaN(request.params.id)) {
      //Validação para verificar se o id é um número.
      response.sendStatus(400);
  ```

  Se o id  não for numérico a resposta a ser enviada é o código 400.

  Logo abaixo seguimos com a conversão de string para int, e em seguida faz se à busca pelo game no banco de dados. Já no bloco de verificação do if avaliamos se o game é diferente de indefinido, se for  verdadeiro prosseguimos com o status de sucesso com o retorno dos dados em json, senão o retorno seguirá com o código 404.

  ```js
  else {
      var id = parseInt(request.params.id); // Conversão de string para int
      var game = DB.games.find(g => g.id == id);
  
      if (game != undefined) { //Se game for diferente de indefinido...
        response.statusCode = 200;
        response.json(game);
      }  else {
        response.sendStatus(404);
      }
    }
  ```

- Cadastro de dados na API:
  Foi usado o verbo post para inserção de dados no banco, logo em seguida definimos os dados que seriam adicionados através da requisição pelo body.

  Sobre o método *push*, deixamos um comentário acerca dele, já que o nosso banco de dados é apenas para exemplificação no projeto. 

  > Obs: Não implementamos as validações nessa etapa para uma melhor exemplificação, mas deixamos aqui um desafio! Por que não tente implementar a validação dos dados? Aposto que você consegue! 😄

  ```js
  app.post("/game", (request, response)=>{
    // Acima temos a definição de um método post que cria/salva
    // um game no banco de dados
      
    var {title, price, year} = request.body;
      
    // O método push tem a função de adicionar dados dentro de um array
    DB.games.push({
      id: 33,
      title,
      price,
      year
    });
    response.sendStatus(200);
  });
  ```

- Deletando dados na API:
  Aqui está a primeira parte desse código de deleção onde executamos a validação dos dados do mesmo modo que o verbo get.
  Em seguida ele faz a busca de acordo com o index do elemento.

  ```js
  app.delete("/game/:id", (request, response) => {
    // Esta rota deleta um game com base no seu id
    if (isNaN(request.params.id)) {
      response.sendStatus(400);
    } else {
      var id = parseInt(request.params.id);
      var index = DB.games.findIndex(g => g.id == id); //Procura com base no index
      
  ```

  Abaixo temos a continuação desse código:

  Verificamos  se existe algum elemento de acordo com o index, caso seja menos um então o dado não existe e retorna o status code 404.

  Senão, prosseguimos com a deleção do dado. 

```js
if (index == - 1) { 
    // Validação para caso tente deletar um elemento que não existe
    response.sendStatus(404);
    } else {
      // Se for maior que 1 então de fato pode deletar o elemento

      DB.games.splice(index,1);
      //Aqui passamos o elemento que queremos deletar de acordo com o index 
      // e que queremos deletar um elemento a partir do index.
      response.sendStatus(200);
    }
```

- Editando um dado:
  Colocamos apenas essa parte para exemplificar o que foi feito no código de edição, já que ele usa a mesma base do "app.get(/game/:id". Todos os if's de validação são para saber se o usuário editou ou quer editar apenas um atributo do elemento, depois disso enviamos a resposta com o código 200. 

  > Obs: Outras validações não foram implementadas por questões didáticas e de fácil assimilação.

  ```js
      var id = parseInt(request.params.id);
      var game = DB.games.find(g => g.id == id);
      if (game != undefined) {
        var { title, price, year } = request.body;
        //Verificação para saber se o usuário quer atualizar apenas um atributo//
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
  ```

  

### 🎉Dê um Up!

Com isso finalizamos a primeira parte desse resumo! 😍
Segunda parte do resumo dispoível na pasta "Consumo de API"!

Deixe sua star para mais conteúdos!

