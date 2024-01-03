import express from 'express';
import { UsuarioController } from "#usuario/controller/usuarioController.js";
import { permissoes } from "#_middleware/verificarToken.js";

const router = express.Router();

router.get('/usuarios', UsuarioController.buscarTodosUsuarios);
router.get('/usuario/:id',permissoes(['ROLE_USER']), UsuarioController.buscarUsuarioPorId);
router.post('/usuario', UsuarioController.cadastrarUsuario);
router.post('/usuario/comum', UsuarioController.cadastrarUsuarioComum);
router.put('/usuario/:id', UsuarioController.editarUsuario);
router.delete('/usuario/:id', UsuarioController.removerUsuario);
export default router;