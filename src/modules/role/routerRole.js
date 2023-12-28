import express from "express";
import { RoleController } from "#role/controller/roleController.js";


const router = express.Router();

router.get('/roles', RoleController.buscarTodasRoles);
router.get('/role/:id', RoleController.buscarRolePorId);
router.post('/role', RoleController.cadastrarRole);
router.put('/role/:id', RoleController.editarRole);
router.delete('/role/:id', RoleController.removerRole);

export default router;