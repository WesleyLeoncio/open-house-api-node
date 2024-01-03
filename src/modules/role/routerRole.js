import express from "express";
import { RoleController } from "#role/controller/roleController.js";


const router = express.Router();

router.get('/roles', RoleController.buscarTodasRoles);
router.get('/roles/:id', RoleController.buscarRolePorId);
router.post('/roles', RoleController.cadastrarRole);
router.put('/roles/:id', RoleController.editarRole);
router.delete('/roles/:id', RoleController.removerRole);

export default router;