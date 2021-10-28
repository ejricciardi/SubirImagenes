// Requerir express
const express = require('express');

// Requerir path para el manejo de rutas
const path = require('path');

// Requerir UUID para generar un id unico
// const uuid = require('uuid/v4'); NO FUNCIONA

// Requerir EJS para el manejo de templates
const ejs = require('ejs');

// Requerir multer para el manejo de archivos
const multer = require('multer');

// Inicializar express
const app = express();

// Configuraciones
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuracion de multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename:  (req, file, cb) =>{
        cb(null, file.originalname);
    },
});

// Middlewares
app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 5000000}, // límite de 5 MB
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }
        cb('Error: Debe seleccionar un archivo de imagen');
    }
}).single('image'));

// Rutas
app.use(require('./routes/index.routes'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Inicia el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

