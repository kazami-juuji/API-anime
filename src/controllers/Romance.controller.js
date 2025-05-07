import Romance from "../models/Romance.js";

const consultaRomance = async (recibido, respuesta) => {
    try {
        const animes = await Romance.find();
        if (animes.length === 0) {
            return respuesta.status(404).json({ estatus: "error", msj: "No se encontraron animes de romance" });
        }
        respuesta.json(animes);
    } catch (error) {
        respuesta.status(500).json({ error: error.message });
    }
};

const consulta_individual_Romance = async (recibido, respuesta) => {
    try {
        const nombreAnime = recibido.params.nombreAnime;
        const anime = await Romance.findOne({ nombre: nombreAnime });

        if (!anime) {
            return respuesta.status(404).json({ mensaje: `Anime '${nombreAnime}' no existente` });
        }
        respuesta.json(anime);
    } catch (error) {
        respuesta.status(500).json({ error });
    }
};

const insercion_Romance = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const { nombre, descripcion, año_emision, img } = recibido.body;

        if (!nombre || !descripcion || !año_emision || !img) {
            return respuesta.status(400).json({ error: "Todos los campos (nombre, descripcion, año_emision) son obligatorios." });
        }
        
        const nuevoAnime = new Romance({
            nombre,
            descripcion,
            año_emision: new Date(año_emision),
            img: img || ""
        });

        await nuevoAnime.save();
        respuesta.status(201).json({ mensaje: "Anime de romance agregado", anime: nuevoAnime });
    } catch (error) {
        respuesta.status(500).json({ error: error.message });
    }
};

const actualizar_Romance = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const nombreActual = recibido.params.nombreAnime;
        const { nombre, descripcion, año_emision, img } = recibido.body;

        if (!nombre || !descripcion || !año_emision || !img) {
            return respuesta.status(400).json({ error: "Todos los campos (nombre, descripcion, año_emision, img) son obligatorios." });
        }

        const animeExistente = await Romance.findOne({ nombre: nombreActual });

        if (animeExistente) {
            await Romance.updateOne(
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
            const nuevoAnime = new Romance({
                nombre,
                descripcion,
                año_emision: new Date(año_emision),
                img
            });
            await nuevoAnime.save();
            return respuesta.status(201).json({ mensaje: "Anime no encontrado. Se creó nuevo", animeNuevo: nuevoAnime });
        }
    } catch (error) {
        respuesta.status(500).json({ error: error.message });
    }
};


const eliminar_Romance = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const nombreAnime = recibido.params.nombreAnime;
        const resultado = await Romance.deleteOne({ nombre: nombreAnime });

        if (resultado.deletedCount === 0) {
            return respuesta.status(404).json({ mensaje: `Anime '${nombreAnime}' no encontrado.` });
        }

        respuesta.status(200).json({ mensaje: "Anime eliminado correctamente" });
    } catch (error) {
        respuesta.status(500).json({ error: error.message });
    }
};

export { consultaRomance, consulta_individual_Romance, insercion_Romance, actualizar_Romance, eliminar_Romance };