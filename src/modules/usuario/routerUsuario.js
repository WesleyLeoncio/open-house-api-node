import express from 'express';
import { UsuarioController } from "#usuario/controller/usuarioController.js";
import { permissoes } from "#_middleware/verificarToken.js";

const router = express.Router();

router.get('/usuarios',permissoes(['ROLE_MASTER', 'ROLE_ADMIN']), UsuarioController.buscarTodosUsuarios);
router.get('/usuarios/:id',permissoes(['ROLE_MASTER', 'ROLE_ADMIN']), UsuarioController.buscarUsuarioPorId);
router.post('/usuarios',permissoes(['ROLE_MASTER']), UsuarioController.cadastrarUsuario);
router.post('/usuarios/comum', UsuarioController.cadastrarUsuarioComum);
router.put('/usuarios/:id',permissoes(['ROLE_MASTER']), UsuarioController.editarUsuario);
router.delete('/usuarios/:id',permissoes(['ROLE_MASTER']), UsuarioController.removerUsuario);
export default router;