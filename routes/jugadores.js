var express = require('express');
var router = express.Router();
var request = require('request');

var mensaje = '';

//Listado de Jugadores
router.get('/', function(req, res, next) {
    //Consume mediante RESTApi
    request.get("http://localhost:4000/jugadores", (error, response, body) => {

        mensaje = '';
        if(error) { //En caso de que surga un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));
        //Enviamos la informacion a la vista en formato JSON
        res.render('jugadores/index', {
            mensaje: mensaje,
            title: 'Listado de jugadores',
            data: JSON.parse(body)
        });
    });
    
});

//Despliega pantalla para agregar un Jugador
router.get('/add', (req, res) => {
    mensaje = 'Agregando Jugador';
    //Despliega pantalla para captura de Estudiante
    res.render('jugadores/add', {
        mensaje: mensaje,
        title: 'Agregar un jugador',    //Titulo de la pagina
        ClaveJugador: '',   //Datos del Jugador
        Nombre: '',
        Apellidos: '',
        Nacionalidad: '',
        FechaNac: ''
    });
});

// Agregando un nuevo jugador a través del Microservicio
router.post('/add', function(req, res, next) {

    //Extrae los datos enviados por la forma
    let ClaveJugador = req.body.ClaveJugador;
    let Nombre = req.body.Nombre;
    let Apellidos = req.body.Apellidos;
    let Nacionalidad = req.body.Nacionalidad;
    let FechaNac = req.body.FechaNac;


    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            ClaveJugador: ClaveJugador,
            Nombre: Nombre,
            Apellidos: Apellidos,
            Nacionalidad: Nacionalidad,
            FechaNac: FechaNac
        }
    
        //Invoca al Microservicio
        request.post({ url: "http://localhost:4000/jugadores", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/jugadores'); //Redirige a Listado de Jugadores
        });
    }
});

//Despliega pantalla para Modificar Estudiante
router.get('/update/:ClaveJugador', (req, res) => {
    ClaveJugador = req.params.ClaveJugador;
    mensaje = 'Modificando Jugador con su clave ' + ClaveJugador;
    console.log(mensaje);
    
    var JugadorFind;
    //Busca si existe el jugador de acuerdo a la clave
    URI = "http://localhost:4000/jugadores/" + ClaveJugador;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Jugador Encontrado ===>");
        console.log(body);
        
        //Despliega pantalla para modificar de Jugador
        res.render('jugadores/update', {
            mensaje: mensaje,
            title: 'Modificando Jugador', //Título de la página
            ClaveJugador: JSON.parse(body).ClaveJugador, //Datos de jugador
            Nombre: JSON.parse(body).Nombre,
            Apellidos: JSON.parse(body).Apellidos,
            Nacionalidad: JSON.parse(body).Nacionalidad,
            FechaNac: JSON.parse(body).FechaNac
        });
    });
});

// Modificando un nuevo estudiante a través del Microservicio
router.post('/update', function(req, res, next) {
    
    console.log('Modificando un Jugador');
    //Extrae los datos enviados por la forma
    let ClaveJugador = req.body.ClaveJugador;
    let Nombre = req.body.Nombre;
    let Apellidos = req.body.Apellidos;
    
    let errors = false;
    
    // Si no hay errores
    if (!errors) {
    
        //Encapsula datos provenientes de la forma
        var datosForma = {
            ClaveJugador: ClaveJugador,
            Nombre: Nombre,
            Apellidos: Apellidos
        }
        //Invoca al Microservicio de modificar
        request.put({ url: "http://localhost:4000/jugadores", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha modificado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/jugadores'); //Redirige a Listado de Jugadores
        });
    }
});

//Eliminando un jugador atraves del Microservicio
router.get('/delete/:ClaveJugador', (req, res) => {
    ClaveJugador = req.params.ClaveJugador;
    mensaje = 'Eliminando Jugador con la clave ' + ClaveJugador;
    console.log(mensaje);
    
    if (ClaveJugador) {
        //Invoca al Microservicio
        URI = "http://localhost:4000/jugadores/" + ClaveJugador;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/jugadores'); //Redirige a Listado de Jugadores
        });
    }
});

module.exports = router;