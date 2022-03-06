# O que é HTTP?

## O que move a Web

A web trabalha com requisições _HTTP_ que é um dos protocolos mais usados na atualidade. A comunicação só é possível através das requisições e respostas entre cliente e servidor.

## Verbos HTTP

Também são chamados de métodos e ações HTTP. Os verbos HTTP são formas de dizer como você deseja que a requisição seja realizada.

| Verbo  | Objetivo                        | Usos         | Requisição Múltipla | Cache |
| ------ | ------------------------------- | ------------ | ------------------- | ----- |
| Get    | Retornar dados do servidor      | Links        | Sim                 | Sim   |
| Post   | Cria um novo elemento           | Forms        | Não                 | Não   |
| Put    | Editar elementos que já existem | Forms        | Sim                 | Não   |
| Patch  | Atualiza elementos parcialmente | Forms        | Não/Sim             | Não   |
| Delete | Deleta um elemento existente    | Forms/ Links | Sim                 | Não   |



## Status Code

É importante que tenha um "response" com um código de status. O status code é uma forma de dizer, para quem fez uma  requisição para  nossa API, o que aconteceu quando o usuário fez a "request"  .

**Lista de Códigos**

1. 1xx - Informativos
2. 2xx - Sucesso
3. 3xx - Redirecionamento
4. 4xx - Erro de Cliente
5. 5xx - Outros erros 



## Webservices

Uma API (*Application Programming Interface*)é um software ou uma biblioteca que serve para permitir que algum elemento se comunique com outro elemento. As APIs são uma interface de comunicação. As APIs que funcionam na web são conhecidas como **Webservices**. 



## Rest

Conhecido como padrão de desenvolvimento de webservices.  Neste caso, trata-se de um padrão arquitetural. 

##### As cinco regras do Rest:

- Cliente-servidor: O Rest *não pode ser cliente e servidor* ao mesmo tempo. Para esse padrão ele precisa ser apenas **servidor**.
- Stateless: Não devemos guardar o estado do cliente. Nenhuma informação deve ser salva na requisição, apenas responder e retornar ao cliente.
- Cache: Para uma API ser REST ela tem que ter a possibilidade de permitir cache. 
- Trabalho com camadas: Não importa o que há entre o cliente e API, ela irá funcionar singularmente independente se houver um middleware, proxy ou firewall. 
- Interface uniforme e direta: Interface dentro da web pode ser comparado analogamente a nossas rotas, que são chamadas de *end-points*.

**Interface não uniforme**

```http
http://meusite.com/getClientes/todos
http://meusite.com/deletarClientes/peloId/1
http://meusite.com/editar/clientes/peloId/2
```



**Interface uniforme**

```http
GET = http://meusite.com/clientes
DELETE = http://meusite.com/cliente/1
GET = http://meusite.com/cliente/1
PUT = http://meusite.com/editar/clientes/2
```



# ProjectAPI_NodeJS

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
  
Configuração no index.js:

<<<<<<< HEAD
```js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

Configuração das rotas:

```js
//Rotas da API
app.get("/games", (request, response) => {
  response.statusCode = 200; // Uso do status code para o client
  response.json(DB.games); // Retorna todos os games em um formato JSON
});
```
=======
<img src="https://user-images.githubusercontent.com/28829983/156929853-e65a7d7a-52ee-432f-8425-f6b3ee4e99ba.png" width="350px" />


Configuração das rotas:

<img src="https://user-images.githubusercontent.com/28829983/156930130-d2370af3-ac1d-4cd4-96af-b6e4be217b5c.png" width="350px" />
>>>>>>> 76368f0a81cc0134fa4307c5cc7708b6d6f899ec

