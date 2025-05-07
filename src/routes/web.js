import { Router } from 'express';

// Controladores de cada genero
import { consultaTerror, consulta_individual_Terror, insercion_Terror, actualizar_Terror, eliminar_Terror } from '../controllers/Terror.controller.js';
import { consultaComedia, consulta_individual_Comedia, insercion_Comedia, actualizar_Comedia, eliminar_Comedia } from '../controllers/Comedia.controller.js';
import { consultaRomance, consulta_individual_Romance, insercion_Romance, actualizar_Romance, eliminar_Romance } from '../controllers/Romance.controller.js';
import authMiddleware from '../config/authMiddleware.js';
// import { consultaUsuarios, consulta_individual_Usuario, insercion_Usuario, actualizar_Usuario, eliminar_Usuario, iniciar_sesion } from "../controllers/Usuarios.controller.js";
import { registro_usuario, iniciar_sesion } from '../controllers/Usuarios.controller.js';
const router = Router();

// Usuario
router.post("/registro", registro_usuario)
router.post("/login", iniciar_sesion)

// 👻  Terror
router.get("/terror", consultaTerror);
router.get("/terror/:nombreAnime", consulta_individual_Terror);
router.post("/terror/insercion", authMiddleware, insercion_Terror);
router.put("/terror/actualizar/:nombreAnime", authMiddleware, actualizar_Terror);
router.delete("/terror/eliminar/:nombreAnime", authMiddleware, eliminar_Terror);

// 😂 Comedia
router.get("/comedia", consultaComedia);
router.get("/comedia/:nombreAnime", consulta_individual_Comedia);
router.post("/comedia/insercion", authMiddleware, insercion_Comedia);
router.put("/comedia/actualizar/:nombreAnime", authMiddleware, actualizar_Comedia);
router.delete("/comedia/eliminar/:nombreAnime", authMiddleware, eliminar_Comedia);

// 💖 Romance
router.get("/romance", consultaRomance);
router.get("/romance/:nombreAnime", consulta_individual_Romance);
router.post("/romance/insercion", authMiddleware, insercion_Romance);
router.put("/romance/actualizar/:nombreAnime", authMiddleware, actualizar_Romance);
router.delete("/romance/eliminar/:nombreAnime", authMiddleware, eliminar_Romance);

// 👨‍💻 Usuarios
// router.get("/usuarios", consultaUsuarios);
// router.get("/usuarios/:usuario", consulta_individual_Usuario);
// router.post("/usuarios/insercion", insercion_Usuario);
// router.put("/usuarios/actualizar/:usuario", actualizar_Usuario);
// router.delete("/usuarios/eliminar/:usuario", eliminar_Usuario);

export default router;
