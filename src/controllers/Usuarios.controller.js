import Usuario from "../models/Usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import Usuarios from "../models/Usuarios.js";

const registro_usuario = async (recibido, respuesta) => {
    try {
        const {usuario, password, rol} = recibido.body;
        const cifrado = await bcrypt.hash(password,10)
        const registro = new Usuarios({"usuario":usuario, "password": cifrado, "rol": rol, "estado": 0});
        await registro.save();
        respuesta.status(201).json({"msj":"Usuario registrado", "registro":registro})
    } catch(error) {
        respuesta.status(500).json({"msj": error.msj})
    }
}

const iniciar_sesion = async (recibido, respuesta) => {
    try{
        const {usuario, password} = recibido.body;
        const consultaUsuario = await Usuario.findOne({"usuario":usuario});
        if (!consultaUsuario) return respuesta.status(500).json({"msj":`El usuario ${usuario} no esta registrado!`});
        let comparacion = await bcrypt.compare(password, consultaUsuario.password)
        if (!comparacion) return respuesta.status(500).json({"msj":"Credenciales de acceso no validas!"});

        const token = jwt.sign(
            {
            "id":consultaUsuario._id,
            "rol":consultaUsuario.rol
            },
            process.env.JWT_SECRET,
            {
                "expiresIn":"1h"
            }
        );
        respuesta.status(200).json({"msj":"Inicio de Sesion exitoso", "token":token});
    } catch(error){
        respuesta.status(500).json({"msj": error.msj});
    }
}



export {registro_usuario, iniciar_sesion};