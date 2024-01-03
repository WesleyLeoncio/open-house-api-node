import express from "express";
import { RoleController } from "#role/controller/roleController.js";
import { permissoes } from "#_middleware/verificarToken.js";

const router = express.Router();

router.get('/roles',permissoes(['ROLE_MASTER']), RoleController.buscarTodasRoles);
router.get('/roles/:id',permissoes(['ROLE_MASTER']), RoleController.buscarRolePorId);
router.post('/roles',permissoes(['ROLE_MASTER']), RoleController.cadastrarRole);
router.put('/roles/:id',permissoes(['ROLE_MASTER']), RoleController.editarRole);
router.delete('/roles/:id',permissoes(['ROLE_MASTER']), RoleController.removerRole);

export default router;