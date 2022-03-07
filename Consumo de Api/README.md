## Segunda Parte

# 🔮 Axios!

Nesta segunda parte iremos usar o Axios para consumir nossa API feita na primeira parte deste projeto.

Abaixo está o link que foi usado para implementar o Axios como biblioteca: 

```js
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
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

Adicionando o cors no sistema:

```js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

```

