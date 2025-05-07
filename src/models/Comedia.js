import mongoose from "mongoose";

const CatalogoModelo = new mongoose.Schema({
    nombre:{type:String,required:true},
    descripcion:{type:String,required:true},
    año_emision:{type:Date,required:true},
    img:{type:String,required:true}
},{
    collection : 'comedia'
});

//identificador fuera del archivo, instancia de clase apartir de schema
export default mongoose.model('Comedia',CatalogoModelo);