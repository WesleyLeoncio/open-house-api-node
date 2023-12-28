import express from 'express';
import { UsuarioController } from "#usuario/controller/usuarioController.js";

const router = express.Router();
// TODO FALTA IMPLEMENTAR USUARIO COMUN
router.get('/usuarios', UsuarioController.buscarTodosUsuarios);
router.get('/usuario/:id', UsuarioController.buscarUsuarioPorId);
router.post('/usuario', UsuarioController.cadastrarUsuario);
// router.post('/usuario/comum', UsuarioController.cadastrarUsuarioComum);
router.put('/usuario/:id', UsuarioController.editarUsuario);
 router.delete('/usuario/:id', UsuarioController.removerUsuario);
export default router;