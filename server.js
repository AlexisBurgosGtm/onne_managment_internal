var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('./router/connection');

var routerVentas = require('./router/routerVentas');
var routerSucursales = require('./router/routerSucursales');
let routerRepartidor = require('./router/routerRepartidor');
var routerTipoDocs = require('./router/routerTipoDocs');
var routerEmpleados = require('./router/routerEmpleados');
var routerClientes = require('./router/routerClientes');
var routerProductos = require('./router/routerProductos');
let routerDigitacion = require('./router/routerDigitacion');
let routerUsuarios = require('./router/routerUsuarios');
let routerCenso = require('./router/routerCenso');
var routerConfig = require('./router/router_config');
var router_fel = require('./router/routerFEL');
var router_reportes = require('./router/router_reportes');
var router_cxc = require('./router/router_cxc');

var http = require('http').Server(app);
//var io = require('socket.io')(http);
var io = require('socket.io')(http, { cors: { origin: '*' } });


const PORT = process.env.PORT || 5100;



const cors = require('cors');
app.use(cors({
    origin: '' //orign: ["www.app1.com","www.app2.com"]
}));



const FEL_URL_LOGIN = "https://felcloud-instance-three.feel.com.gt/api/v2/servicios/externos/login";
const FEL_URL_CONSULTARECEPTORES = 'https://consultareceptores.feel.com.gt/rest/action';
const FEL_URL_CUI = "https://felcloud-instance-three.feel.com.gt/api/v2/servicios/externos/cui";



app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  /*
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
  */
  //console.log("/" + req.toString());
  next();
});


// FEL *******************************






// FEL *******************************



app.get("/",function(req,res){
  execute.start();
	res.sendFile(path + 'index.html');
}); 

app.get("/login",function(req,res){
  res.redirect('/');
}); 

app.get("/test_service",function(req,res){
  res.send('ONLINE')
}); 


//Router para SUCURSALES
app.use('/sucursales', routerSucursales);

//Router para app CONFIG
app.use('/config', routerConfig);

//Router para app CENSO
app.use('/censo', routerCenso);

//Router para app VENTAS
app.use('/ventas', routerVentas);

//Router para app REPARTIDOR
app.use('/repartidor', routerRepartidor);

// Router para Tipodocumentos
app.use('/tipodocumentos', routerTipoDocs);

// Router para empleados o vendedores
app.use('/empleados', routerEmpleados);

// Router para clientes
app.use('/clientes', routerClientes);

// Router para productos
app.use('/productos', routerProductos);

// Router para digitacion
app.use('/digitacion', routerDigitacion);

// Router para usuarios
app.use('/usuarios', routerUsuarios);

app.use('/reportes', router_reportes);
app.use('/fel', router_fel);

app.use('/cxc', router_cxc);


app.use("/",router);

app.use("*",function(req,res){
  res.redirect('/');
  //res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});




// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('avisos', (tipo,mensaje)=>{
    io.emit('avisos', tipo, mensaje);
  });

  socket.on('noticias nueva', (msg,usuario)=>{
    io.emit('noticias nueva', msg,usuario);
  });

  socket.on('productos precio', function(msg,usuario){
	  io.emit('productos precio', msg, usuario);
  });

  socket.on('productos bloqueado', function(msg,usuario){
	  io.emit('productos bloqueado', msg, usuario);
  });

  socket.on('ventas nueva', (msg,usuario)=>{
    io.emit('ventas nueva', msg,usuario);
  })

  // sucede cuando el repartidor marca un pedido y notifica a su respectivo vendedor
  socket.on('reparto pedidomarcado', (msg,status,vendedor)=>{
    io.emit('reparto pedidomarcado', msg,status,vendedor);
  })

  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

