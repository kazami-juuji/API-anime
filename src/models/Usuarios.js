import mongoose from "mongoose";

const CatalogoModelo = new mongoose.Schema({
    usuario:{type:"String",require:true},
    password:{type:"String",require:true},
    rol:{type:"String",require:true},
    estado:{type:"String",require:true},
    cuenta:{type:"number",require:true}
},{
    collection : 'usuarios'
});

//identificador fuera del archivo, instancia de clase apartir de schema
export default mongoose.model('Usuarios',CatalogoModelo);