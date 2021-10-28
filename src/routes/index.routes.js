// Requerir express
const { Router } = require('express');

// Ejecuta el método Router de express y almacena en una constante
const router = Router();

// Ruta de visualización del formulario
router.get('/', (req, res) => {
    res.render('index');
});

// Ruta que recibe la imagen y envía un mensaje
router.post('/upload', (req, res) => {
    console.log(req.file);
    res.send('subido');
});

module.exports = router;