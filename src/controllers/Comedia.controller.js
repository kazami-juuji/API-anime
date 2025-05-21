import Comedia from "../models/Comedia.js";

const consultaComedia = async (recibido, respuesta) => {
    try {
        const animes = await Comedia.find();
        if (animes.length === 0) {
            return respuesta.status(404).json({ estatus: "error", msj: "No se encontraron animes de comedia" });
        }
        respuesta.json(animes);
    } catch (error) {
        respuesta.status(500).json({ error: error.message });
    }
};

const consulta_individual_Comedia = async (recibido, respuesta) => {
    try {
        const nombreAnime = recibido.params.nombreAnime;
        const anime = await Comedia.findOne({ nombre: nombreAnime });

        if (!anime) {
            return respuesta.status(404).json({ mensaje: `Anime '${nombreAnime}' no existente` });
        }
        respuesta.json(anime);
    } catch (error) {
        respuesta.status(500).json({ error });
    }
};

const insercion_Comedia = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const { nombre, descripcion, año_emision, img } = recibido.body;

        if (!nombre || !descripcion || !año_emision || !img) {
            return respuesta.status(400).json({ error: "Todos los campos (nombre, descripcion, año_emision) son obligatorios." });
        }
        
        const nuevoAnime = new Comedia({
            nombre,
            descripcion,
            año_emision: new Date(año_emision),
            img: img || ""
        });
        await nuevoAnime.save();
        respuesta.status(201).json({ mensaje: "Anime de comedia agregado", anime: nuevoAnime });
    } catch (error) {
        console.error("Error en actualizar_Comedia:", error);
        respuesta.status(500).json({ error: error.message });
    }
};

const actualizar_Comedia = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const nombreActual = recibido.params.nombreAnime;
        const { nombre, descripcion, año_emision, img } = recibido.body;

        if (!nombre || !descripcion || !año_emision || !img) {
            return respuesta.status(400).json({ error: "Todos los campos (nombre, descripcion, año_emision, img) son obligatorios." });
        }

        const animeExistente = await Comedia.findOne({ nombre: nombreActual });

        if (animeExistente) {
            await Comedia.updateOne(
                { nombre: nombreActual },
                {
                    $set: {
                        nombre,
                        descripcion,
                        año_emision: new Date(año_emision),
                        img
                    }
                }
            );

            return respuesta.status(200).json({ mensaje: "Anime actualizado correctamente" });
        } else {
            const nuevoAnime = new Comedia({
                nombre,
                descripcion,
                año_emision: new Date(año_emision),
                img
            });
            await nuevoAnime.save();
            return respuesta.status(201).json({ mensaje: "Anime no encontrado. Se creó nuevo", animeNuevo: nuevoAnime });
        }
    } catch (error) {
        console.error("Error en actualizar_Comedia:", error);
        respuesta.status(500).json({ error: error.message });
    }
};


const eliminar_Comedia = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const nombreAnime = recibido.params.nombreAnime;
        const resultado = await Comedia.deleteOne({ nombre: nombreAnime });

        if (resultado.deletedCount === 0) {
            return respuesta.status(404).json({ mensaje: `Anime '${nombreAnime}' no encontrado.` });
        }

        respuesta.status(200).json({ mensaje: "Anime eliminado correctamente" });
    } catch (error) {
        console.error("Error en actualizar_Comedia:", error);
        respuesta.status(500).json({ error: error.message });
    }
};

export { consultaComedia, consulta_individual_Comedia, insercion_Comedia, actualizar_Comedia, eliminar_Comedia };
