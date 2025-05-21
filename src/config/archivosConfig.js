import multer from "multer";
import path from "path";

//  formatos de  imagen valido
const extencionesImagen =  ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// usamos la libreria multer para definir los datos archivo
const storage = multer.diskStorage({
    // carpeta destino
    destination: (recibido, file, cb) => {
        // carpeta uploads (debe estar en la raiz del proyecto)
        cb(null, '/uploads')
    },
    // nombre del archo
    filename: (recibido, file, cb) => {
        // se genera  un nombre unico a partir de la fecha en que se subio y la extension del archivo
        cb(null, Date.now + path.extname(file.originalname));
    }
});
// validacion de archivos
const fileFilter = (recibido, file, cb) => {
    // validamos  el tipo de  extension de archivo
    const extencion = path.extname(file.originalname).toLowerCase();
    // hace efectiva la validacion
    if (extencionesImagen.includes(extencion)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo imagenes (.jpg, .jpeg, .png, .gif .webp'), false);
    }
};
// definimos el tamaño maximo  del archivo
const limits = {fileSize: 3 * 1024 * 1024};
// creamos una constante uploads, esta contendra las caracteristicas definidas  de multer
const uploads = multer({storage});
// exportacion
export default uploads