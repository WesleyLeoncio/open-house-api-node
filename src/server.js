import express from 'express';
import errorHandler from '#_middleware/error-handler.js';

import routesCategoria from '#categoria/routerCategoria.js';
import routesFilme from '#filme/routerFilmes.js';
import routesRole from '#role/routerRole.js';
import routesUsuario from '#usuario/routerUsuario.js';
import routesAvaliacao from '#avaliacao/routerAvaliacao.js';
import routesAutenticacao from '#autenticacao/routerAutenticacao.js';
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());


//Routes
app.use(routesAutenticacao);
app.use(routesCategoria);
app.use(routesFilme);
app.use(routesRole);
app.use(routesUsuario);
app.use(routesAvaliacao);


app.use(errorHandler); // Manipulador de erro global (error handler)

app.listen(3333, ()=> {
    console.log("======== Servidor rodando na porta 3333 ========");
});

