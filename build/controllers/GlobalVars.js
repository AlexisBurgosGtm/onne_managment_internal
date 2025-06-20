let versionapp = 'mod 09.06.2025:0';
let GlobalServerUrl = '';
let GlobalUrlServicePedidos = '';
let GlobalTipoProd = 'F'

let GlobalUrlCalls = '';

let root = document.getElementById('root');
let rootMenu = document.getElementById('rootMenu');
let rootMenuFooter = document.getElementById('rootMenuFooter');

let lbMenuTitulo = document.getElementById('lbMenuTitulo');
let rootMenuLateral = document.getElementById('rootMenuLateral');

const showMenuLateral =(titulo)=>{ $("#modalMenu").modal('show'); lbMenuTitulo.innerText = titulo;};
const hideMenuLateral =()=>{ $("#modalMenu").modal('hide'); lbMenuTitulo.innerText = '';};




let GlobalSelectedClientesDia ='SN';
let GlobalSelectedDiaUpdated  = 0;
let SelectedCodUpdate = '';
let SelectedLocalCodUpdate = '';
let GlobalObjetivoVenta = 0;
let GlobalCodUsuario = 99999;
let GlobalUsuario = '';
let GlobalPassUsuario = '';
let GlobalNivelUser = 0;
let GlobalTipoUsuario ='';
let GlobalSelectedDia ='';
let GlobalBool = false;
let GlobalConfigIva = 1.12;

let GlobalSelectedForm = '';

let map; //mapa de leaflet
let GlobalGpsLat = 0;
let GlobalGpsLong = 0;
let GlobalSelectedLat = ''; let GlobalSelectedLong='';
let GlobalMarkerId = 0;
let GlobalSelectedId;
let GlobalSelectedCodigo;
let GlobalSelectedFecha;
let GlobalCoddoc = 'PED01';
let GlobalTotalDocumento = 0;
let GlobalTotalCostoDocumento = 0;
let GlobalCodBodega = '01';
let GlobalTipoCobro = 'TERMINAR';

let GlobalSelectedCodven = 0;



let GlobalSelectedCodCliente;
let GlobalSelectedNomCliente;
let GlobalSelectedDirCliente;

// global vars para cantidad producto
let GlobalSelectedCodprod = '';
let GlobalSelectedDesprod = '';
let GlobalSelectedCodmedida = '';
let GlobalSelectedEquivale = 0;
let GlobalSelectedCantidad = 0;
let GlobalSelectedExento = 0;
let GlobalSelectedCosto = 0;
let GlobalSelectedPrecio = 0;
let GlobalSelectedExistencia = 0;
let GlobalSelectedBono = 0;
// global vars para cantidad producto

let GlobalSelectedCodEmbarque ='';
let GlobalSelectedStatus=0;
let GlobalSelectedSt = 'O';
let GlobalSelectedCoddoc = '';
let GlobalSelectedCorrelativo = '';

let GlobalSelectedApp = '';

let GlobalSistema = 'ISC';


let GlobalLoaderMini = `<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>`;

let GlobalLoader = `
                
                <div>
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                </div>
                `


let GlobalLoaderOld = `
                
                <div>
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <img class="spinner-grow text-white" width="75px" height="75px" src="./favicon.png">
                    <div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>
                    <div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>
                </div>
                `

//'<div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>'


//'<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';

let GlobalUrl = document.location.origin.toString();

let nowhatsapp = '50257255092';


function showWaitForm(){
    $('#modalWait').modal('show');
};


function hideWaitForm(){
    //esta linea ayuda a que las modales cierren
    if ($('.modal-backdrop').is(':visible')) {
        $('body').removeClass('modal-open'); 
        $('.modal-backdrop').remove(); 
    };

    //$('#modalWait').modal('hide');
    document.getElementById('btnCerrarModalWait').click();

};


//elimina los mensajes de console (  logger.disableLogger()  )
var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            window['console']['log'] = function() {};
                        };

    return pub;
}();



function get_print_factura(coddoc,correlativo){


    let rootPrint = document.getElementById('rootPrint');

    rootPrint.innerHTML = GlobalLoader;
    
    $("#modal_imprimir").modal('show');

    apigen.promise_detalle_pedido(coddoc,correlativo)
    .then((data)=>{

        let strProductos = '';
        data.recordset.map((r)=>{

            strProductos += `
                    <tr>
                        <td>${r.DESPROD}
                            <br>
                            <small class="negrita">${r.CODMEDIDA}</small>
                        </td>
                        <td>${r.CANTIDAD}</td>
                        <td>${funciones.setMoneda(r.IMPORTE,"Q")}</td>
                    </tr>
                    `

        })

        let formato = `
            <h5 class="negrita">${GlobalEmpNombre}</h5>
            <br>
            <h5>Tel: ${GlobalEmpTelefono}</h5>
            <br>
            <small>Recordatorio de Pedido</small>
            <br>
            <table>
                <thead>
                    <tr>
                        <td>PRODUCTO - </td> <td>CANT - </td> <td>IMPORTE</td>
                    </tr>
                </thead>
                <tbody>${strProductos}</tbody>
            </table>
            <br><br>
            <small>Este no es un documento fiscal</small>
        `
        rootPrint.innerHTML = formato;

        //funciones.imprimirSelec('rootPrint');

    })
    .catch(()=>{
        rootPrint.innerHTML = 'Ups... el formato no funciona';

    })

    
    

}