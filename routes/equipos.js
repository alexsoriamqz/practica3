var express = require('express');
var router = express.Router();
var request = require('request');

var mensaje = '';

//Listado de Equipos
router.get('/', function(req, res, next) {
    //Consume mediante RESTApi
    request.get("http://localhost:4000/equipos", (error, response, body) => {

        mensaje = '';
        if(error) { //En caso de que surga un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));
        //Enviamos la informacion a la vista en formato JSON
        res.render('equipos/index', {
            mensaje: mensaje,
            title: 'Listado de los equipos',
            data: JSON.parse(body)
        });
    });
    
});

//Despliega pantalla para agregar un nuevo equipo
router.get('/add', (req, res) => {
    mensaje = 'Agregando Equipo';
    //Despliega pantalla para captura del nuevo equipo
    res.render('equipos/add', {
        mensaje: mensaje,
        title: 'Agregar un equipo',    //Titulo de la pagina
        ClaveEquipo: '',   //Datos del Equipo
        Nombre: '',
        Entrenador: '',
        Ciudad: '',
        Pais: ''
    });
});

// Agregando un nuevo equipo a través del Microservicio
router.post('/add', function(req, res, next) {

    //Extrae los datos enviados por la forma
    let ClaveEquipo = req.body.ClaveEquipo;
    let Nombre = req.body.Nombre;
    let Entrenador = req.body.Entrenador;
    let Ciudad = req.body.Ciudad;
    let Pais = req.body.Pais;

    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            ClaveEquipo: ClaveEquipo,
            Nombre: Nombre,
            Entrenador: Entrenador,
            Ciudad: Ciudad,
            Pais: Pais
        }
    
        //Invoca al Microservicio
        request.post({ url: "http://localhost:4000/equipos", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/equipos'); //Redirige a Listado de los Equipos
        });
    }
});

//Despliega pantalla para Modificar Equipo
router.get('/update/:ClaveEquipo', (req, res) => {
    ClaveEquipo = req.params.ClaveEquipo;
    mensaje = 'Modificando Equipo con su clave ' + ClaveEquipo;
    console.log(mensaje);
    
    var EquipoFind;
    //Busca si existe el equipo de acuerdo a la clave
    URI = "http://localhost:4000/equipos/" + ClaveEquipo;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Equipo Encontrado ===>");
        console.log(body);
        
        //Despliega pantalla para modificar de el Equipo
        res.render('equipos/update', {
            mensaje: mensaje,
            title: 'Modificando Equipo', //Título de la página
            ClaveEquipo: JSON.parse(body).ClaveEquipo, //Datos del Equipo
            Nombre: JSON.parse(body).Nombre,
            Entrenador: JSON.parse(body).Entrenador,
            Ciudad: JSON.parse(body).Ciudad,
            Pais: JSON.parse(body).Pais
        });
    });
});

// Modificando un nuevo equipo a través del Microservicio
router.post('/update', function(req, res, next) {
    
    console.log('Modificando un Equipo');
    //Extrae los datos enviados por la forma
    let ClaveEquipo = req.body.ClaveEquipo;
    let Nombre = req.body.Nombre;
    let Entrenador = req.body.Entrenador;
    
    let errors = false;
    
    // Si no hay errores
    if (!errors) {
    
        //Encapsula datos provenientes de la forma
        var datosForma = {
            ClaveEquipo: ClaveEquipo,
            Nombre: Nombre,
            Entrenador: Entrenador
        }
        //Invoca al Microservicio de modificar
        request.put({ url: "http://localhost:4000/equipos", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha modificado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/equipos'); //Redirige a Listado de Equipos
        });
    }
});

//Eliminando un Equipo atraves del Microservicio
router.get('/delete/:ClaveEquipo', (req, res) => {
    ClaveEquipo = req.params.ClaveEquipo;
    mensaje = 'Eliminando Equipo con la clave ' + ClaveEquipo;
    console.log(mensaje);
    
    if (ClaveEquipo) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/equipos/" + ClaveEquipo;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/equipos'); //Redirige a Listado de Equipos
        });
    }
});

module.exports = router;