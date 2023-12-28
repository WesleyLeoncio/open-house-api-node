import express from 'express';
import errorHandler from '#_middleware/error-handler.js';

import routesCategoria from '#categoria/routerCategoria.js';
import routesFilme from '#filme/routerFilmes.js';
import routesRole from '#role/routerRole.js';
import routesUsuario from '#usuario/routerUsuario.js';

const app = express();

app.use(express.json());

//Routes
app.use(routesCategoria);
app.use(routesFilme);
app.use(routesRole);
app.use(routesUsuario)


app.use(errorHandler); // Manipulador de erro global (error handler)

app.listen(3333, ()=> {
    console.log("======== Servidor rodando na porta 3333 ========");
});

//TODO REFATORAR