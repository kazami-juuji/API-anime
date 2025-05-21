import Terror from "../models/Terror.js";

const consultaTerror = async (recibido ,respuesta) => {
    try {
        const animes = await Terror.find();
        if (animes.length === 0) {
            return respuesta.status(404).json({
                estatus: "error 1",
                msj: "No se encontraron animes en la BD"
            });
        }
        respuesta.json(animes)
    } catch (error) {
        respuesta.status(500).json({"error wee":error.message})
    }
    
}

const consulta_individual_Terror = async (recibido ,respuesta) => {
    try {
        const nombreAnime = recibido.params.nombreAnime;
        const animes = await Terror.findOne({ nombreAnime });

        if (!animes) {
            return respuesta.status(404).json({ mensaje: `Usuario '${nombreAnime}' no existente` });
        }
        respuesta.json(animes)
    } catch (error) {
        respuesta.status(500).json({"error":error})
    }
}


const insercion_Terror = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const { nombre, descripcion, año_emision, img } = recibido.body;

        if (!nombre || !descripcion || !año_emision || !img) {
            return respuesta.status(400).json({ error: "Todos los campos (nombre, descripcion, año_emision) son obligatorios." });
        }
        
        const nuevoAnime = new Terror({
            nombre,
            descripcion,
            año_emision: new Date(año_emision),
            img: img || ""
        });

        await nuevoAnime.save();

        respuesta.status(201).json({
            mensaje: "Anime de terror agregado correctamente",
            anime: nuevoAnime
        });
    } catch (error) {
        respuesta.status(500).json({ error: error.message });
    }
};

const actualizar_Terror = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const nombreActual = recibido.params.nombreAnime;
        const { nombre, descripcion, año_emision, img } = recibido.body;
        if (!nombre || !descripcion || !año_emision || !img) return respuesta.status(400).json({error:"todos los campos son obligatorios"}); 
        const animeExistente = await Terror.findOne({ nombre: nombreActual });

        if (animeExistente) {
            await Terror.updateOne(
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
            const nuevoAnime = new Terror({
                nombre,
                descripcion,
                año_emision: new Date(año_emision),
                img
            });

            await nuevoAnime.save();

            return respuesta.status(201).json({
                mensaje: "Anime no encontrado. Se creó un nuevo registro.",
                animeNuevo: nuevoAnime
            });
        }
    } catch (error) {
        respuesta.status(500).json({
            error: "Error al actualizar o insertar anime.",
            detalle: error.message
        });
    }
};


const eliminar_Terror = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== "2") return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"});
        const nombreAnime = recibido.params.nombreAnime;

        const resultado = await Terror.deleteOne({ nombre: nombreAnime });

        if (resultado.deletedCount === 0) {
            return respuesta.status(404).json({ mensaje: `Anime '${nombreAnime}' no encontrado.` });
        }

        respuesta.status(200).json({ mensaje: "Anime eliminado correctamente" });
    } catch (error) {
        respuesta.status(500).json({ error: error.message });
    }
};


export {consultaTerror, consulta_individual_Terror, insercion_Terror, actualizar_Terror, eliminar_Terror}