const cargar_imagen = ((recibido, respuesta) => {
    if (!recibido.file) return respuesta.status(500).json({"estatus":"Error", "msj":"No se a cargado ningun archivo"});
    respuesta.status(201).json({estatus:"correcto", msj: " Archivo subido correctamente"});
});
export default cargar_imagen;