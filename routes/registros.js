var express = require('express');
var router = express.Router();
var request = require('request');

var mensaje = '';

//Listado de Registros
router.get('/', function(req, res, next) {
    //Consume mediante RESTApi
    //request.get("http://localhost:4000/registros", (error, response, body) => {
    request.get("https://sitionov.herokuapp.com/registros", (error, response, body) => {

        mensaje = '';
        if(error) { //En caso de que surga un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log(JSON.parse(body));
        //Enviamos la informacion a la vista en formato JSON
        res.render('registros/index', {
            mensaje: mensaje,
            title: 'Listado de los registros',
            data: JSON.parse(body)
        });
    });
    
});

//Despliega pantalla para agregar un nuevo registro de un jugador con un equipo
router.get('/add', (req, res) => {
    mensaje = 'Agregando Registro';
    //Despliega pantalla para captura del registro
    res.render('registros/add', {
        mensaje: mensaje,
        title: 'Agregar un registro',    //Titulo de la pagina
        IdJugador: '',   //Datos del Registro
        IdEquipo: '',
        NumeroCamisa: '',
        Goles: '',
        Partidos: ''
    });
});

// Agregando un nuevo registro a través del Microservicio
router.post('/add', function(req, res, next) {

    //Extrae los datos enviados por la forma
    let IdJugador = req.body.IdJugador;
    let IdEquipo = req.body.IdEquipo;
    let NumeroCamisa = req.body.NumeroCamisa;
    let Goles = req.body.Goles;
    let Partidos = req.body.Partidos;

    let errors = false;

    // Si no hay errores
    if (!errors) {

        //Encapsula datos de la forma
        var datosForma = {
            IdJugador: IdJugador,
            IdEquipo: IdEquipo,
            NumeroCamisa: NumeroCamisa,
            Goles: Goles,
            Partidos: Partidos
        }
    
        //Invoca al Microservicio
        //request.post({ url: "http://localhost:4000/registros", json: datosForma }, (error, response, body) => {
        request.post({ url: "https://sitionov.herokuapp.com/registros", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha agregado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/registros'); //Redirige a Listado de Registros
        });
    }
});

//Despliega pantalla para Modificar un registro
router.get('/update/:NumeroCamisa', (req, res) => {
    NumeroCamisa = req.params.NumeroCamisa;
    mensaje = 'Modificando Registro con su numero de camisata  ' + NumeroCamisa;
    console.log(mensaje);
    
    var RegistroFind;
    //Busca si existe el registro de acuerdo al numero de camiseta
    //URI = "http://localhost:4000/registros/" + NumeroCamisa;
    URI = "https://sitionov.herokuapp.com/registros" + NumeroCamisa;
    console.log('URI: ' + URI);

    request.get(URI, (error, response, body) => {

        mensaje = '';
        if (error) { //En caso de que surja un error
            console.log(error);
            mensaje = 'Error: ' + error;
        }
        console.log("Registro Encontrado ===>");
        console.log(body);
        
        //Despliega pantalla para modificar de Registro
        res.render('registros/update', {
            mensaje: mensaje,
            title: 'Modificando Registro', //Título de la página
            IdJugador: JSON.parse(body).IdJugador, //Datos del registro
            IdEquipo: JSON.parse(body).IdEquipo,
            NumeroCamisa: JSON.parse(body).NumeroCamisa,
            Goles: JSON.parse(body).Goles,
            Partidos: JSON.parse(body).Partidos
        });
    });
});

// Modificando un registro a través del Microservicio
router.post('/update', function(req, res, next) {
    
    console.log('Modificando un Registro');
    //Extrae los datos enviados por la forma
    let NumeroCamisa = req.body.NumeroCamisa;
    let Goles = req.body.Goles;
    let Partidos = req.body.Partidos;
    
    let errors = false;
    
    // Si no hay errores
    if (!errors) {
    
        //Encapsula datos provenientes de la forma
        var datosForma = {
            NumeroCamisa: NumeroCamisa,
            Goles: Goles,
            Partidos: Partidos
        }
        //Invoca al Microservicio de modificar
        //request.put({ url: "http://localhost:4000/registros", json: datosForma }, (error, response, body) => {
        request.put({ url: "https://sitionov.herokuapp.com/registros/", json: datosForma }, (error, response, body) => {
            mensaje = 'El dato se ha modificado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/registros'); //Redirige a Listado de los registros
        });
    }
});

//Eliminando un jugador atraves del Microservicio
router.get('/delete/:NumeroCamisa', (req, res) => {
    NumeroCamisa = req.params.NumeroCamisa;
    mensaje = 'Eliminando el Registro con el numero de la camiseta  ' + NumeroCamisa;
    console.log(mensaje);
    
    if (NumeroCamisa) {
        //Invoca al Microservicio
        //URI = "http://localhost:4000/registros/" + NumeroCamisa;
        URI = "https://sitionov.herokuapp.com/registros/" + NumeroCamisa;
        request.delete(URI, (error, response, body) => {
            mensaje = 'El dato se ha eliminado con éxito';
            if (error) {
                console.log(error);
                mensaje = 'Error: ' + error;
            }
            console.log(response);
            res.redirect('/registros'); //Redirige a Listado de Registros
        });
    }
});

module.exports = router;