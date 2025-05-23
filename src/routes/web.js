import { Router } from 'express';

// Controladores de cada genero
import { consultaTerror, consulta_individual_Terror, insercion_Terror, actualizar_Terror, eliminar_Terror } from '../controllers/Terror.controller.js';
import { consultaComedia, consulta_individual_Comedia, insercion_Comedia, actualizar_Comedia, eliminar_Comedia } from '../controllers/Comedia.controller.js';
import { consultaRomance, consulta_individual_Romance, insercion_Romance, actualizar_Romance, eliminar_Romance } from '../controllers/Romance.controller.js';
import authMiddleware from '../config/authMiddleware.js';
import  uploads from  "../config/archivosConfig.js"
import { registro_usuario, iniciar_sesion, consultaUsuario, editar_usuario, eliminar_usuario, manejar_estado } from '../controllers/Usuarios.controller.js';
import {cargar_imagen, eliminar_imagen} from '../controllers/Archivos.controller.js';
const router = Router();
import fs from 'fs';
import path from 'path';

router.post("/subir", uploads.single('imagen'),cargar_imagen);
router.delete("/eliminar/:nombre",eliminar_imagen);
// Ruta para listar imágenes existentes en la carpeta uploads
router.get("/imagenes", (req, res) => {
  const directorio = path.join(process.cwd(), 'uploads');

  fs.readdir(directorio, (err, archivos) => {
    if (err) {
      return res.status(500).json({ estatus: "error", msj: "Error al leer la carpeta" });
    }

    const imagenes = archivos.filter(nombre =>
      ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(nombre).toLowerCase())
    );

    res.json(imagenes);
  });
});


// Usuario
router.get("/usuario", consultaUsuario);
router.post("/registro", registro_usuario)
router.post("/login", iniciar_sesion)
router.put("/usuario/actualizar/:nombreUsuario", authMiddleware, editar_usuario)
router.delete("/usuario/eliminar/:nombreUsuario", authMiddleware, eliminar_usuario)
router.put("/manejar_estado/:nombre", manejar_estado)

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


export default router;
