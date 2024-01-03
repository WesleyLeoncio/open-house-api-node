import express from 'express';
import { UsuarioController } from "#usuario/controller/usuarioController.js";
import { permissoes } from "#_middleware/verificarToken.js";

const router = express.Router();

router.get('/usuarios', UsuarioController.buscarTodosUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);
router.post('/usuarios', UsuarioController.cadastrarUsuario);
router.post('/usuarios/comum', UsuarioController.cadastrarUsuarioComum);
router.put('/usuarios/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/:id', UsuarioController.removerUsuario);
export default router;