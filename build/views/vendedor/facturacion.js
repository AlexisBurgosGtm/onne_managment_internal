function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.encabezadoClienteDocumento() 
                                + view.gridTempVenta() 
                                + view.modalBusquedaCliente() 
                                + view.modalNuevoCliente() 
                                }
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           ${view.modalTerminar()}
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            
                        </div>    
                    </div>

                    <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active negrita text-success" id="tab-uno" data-toggle="tab" href="#uno" role="tab" aria-controls="profile" aria-selected="false">
                                <i class="fal fa-list"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-dos" data-toggle="tab" href="#dos" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>  
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-tres" data-toggle="tab" href="#tres" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>         
                    </ul>
                </div>
               
            `
        },
        encabezadoClienteDocumento :()=>{
            return `
        <div class="row">
            
            <div class="hidden-md-down col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div id="panel-2" class="panel col-12">
                    <div class="panel-hdr">
                        <h2>Datos del Cliente</h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>
                            <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>
                        </div>
                    </div>
                    <div class="panel-container collapse">
                        <div class="panel-content">
                            <div class="">
                                <div class="input-group">
                                    <input id="txtNit" type="text" ref="txtNit" class="form-control" placeholder="Código del cliente.." aria-label="" aria-describedby="button-addon4" />
                                    <div class="input-group-prepend">
                                        <button class="btn btn-info waves-effect waves-themed" type="button" id="btnBusquedaClientes">
                                            <i class="fal fa-search"></i>
                                        </button>
                                        <div class="card"></div>
                                        <button class="btn btn-success waves-effect waves-themed" id="btnNuevoCliente">
                                            +
                                        </button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hidden-md-down col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div id="panel-3" class="panel col-12">
                    <div class="panel-hdr">
                        <h2>Datos del Documento</h2>
                        <div class="panel-toolbar">
                            <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>
                            <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>
                            
                        </div>
                    </div>
                    <div class="panel-container collapse"> <!--show-->
                        <div class="panel-content">
                            <div class="row">
                                <div class="col-6">
                                    <input type="text" class="form-control input-sm" id="cmbCoddoc">
                                    
                                </div>
                                <div class="col-6">
                                    <input type="text" class="form-control" value="0" id="txtCorrelativo" readonly="true">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    Fecha: <input type="date" class="form-control bg-subtlelight pl-4 text-sm" id="txtFecha">
                                </div>
                                <div class="col-6">
                                    Vendedor:
                                    <input type="text" class="form-control" id="cmbVendedor">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
            `
            //<select class="form-control input-sm" id="cmbCoddoc"></select>
            //<select class="form-control" id="cmbVendedor"></select>
        },
        gridTempVenta :()=>{
            return `
        <div class="row">
            <label class="text-info" id="lbNomClien">Consumidor Final</label>
            <div id="panel-2" class="panel col-12">

                <div class="panel-hdr">
                   
                    <h2 id="txtTotalItems" class="negrita">0 items</h2>
                    <div class="panel-toolbar">

                                                                   
                        <button class="btn btn-sm btn-outline-secondary hand hidden">
                        </button>

                        <h1 id="txtTotalVenta" class="text-danger negrita"></h1>
                        
                        <button class="btn btn-outline-warning btn-md shadow hidden" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen" id="btnMaxVenta">
                            <i class="fal fa-angle-double-up"></i>
                        </button>
                    </div>
                </div>
                <div class="panel-container show">
                    <div class="panel-content">
                        
                        <div class="table-responsive border-top-rounded border-bottom-rounded shadow">
                            <table class="table table-hover table-striped"><!--mt-5-->
                                <thead class="bg-onne text-white">
                                    <tr>
                                        <th class="">Producto</th>
                                        <th class="">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody id="tblGridTempVentas"></tbody>
                            </table>
                        </div>
                    </div>
                    <div>

                       
                    
                        <button class="btn btn-circle btn-xl btn-success shadow btn-bottom-mr hand" id="btnAgregarProd">
                            <i class="fal fa-plus"></i>
                        </button>

                        <button class="btn btn-danger btn-xl btn-circle btn-bottom-r shadow hand" id="btnCobrar">
                            <i class="fal fa-save"></i>
                        </button>

                    </div>
                </div>
                
                <div id="containerModalesVentas"></div>

            </div>
        </div>  
            `
        },
        modalBusquedaProductos :()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="ModalBusqueda" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-onne text-white">
                            <label class="h5" id="">Búsqueda de Productos</label>
                        </div>

                        <div class="modal-body">
                            
                                <div class="input-group">
                                    <select class="form-control negrita col-3 border-primary" id="cmbTipoPrecio">
                                        <option value="P">PUBLICO</option>
                                        <option value="C">PRECIO C</option>
                                        <option value="B">PRECIO B</option>
                                        <option value="A">PRECIO A</option>
                                    </select>
                                    <input id="txtBusqueda" type="text" class="form-control col-8 shadow border-primary text-primary" placeholder="Buscar código o descripción..." aria-label="" aria-describedby="button-addon4" />
                                    <div class="input-group-prepend">
                                        <button class="btn btn-primary btn-rounded waves-effect waves-themed shadow co-2" type="button" id="btnBuscarProducto">
                                            <i class="fal fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            <hr class="solid">
                        <table class="table table-responsive table-bordered border-onne">
                            <thead class="bg-onne text-white">
                                <tr>
                                    <td>Producto</td>
                                    <td>Precio</td>                         
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblResultadoBusqueda">
                            

                            </tbody>
                        </table>
                        </div>
                        
                    
                    </div>
                </div>
                <div class="shortcut-menu align-left">
                    <button class="btn btn-secondary btn-circle btn-xl hand shadow" data-dismiss="modal">
                        <i class="fal fa-angle-double-left"></i>
                    </button>
                </div>
            </div>
            
            `
        },
        modalBusquedaCliente :()=>{
            return `
            <div class="modal fade  modal-with-scroll" id="ModalBusquedaCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-left" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Búsqueda de Clientes</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="input-group">
                                    <input id="txtBusquedaCliente" type="text" ref="txtBusquedaCliente" class="form-control" placeholder="Buscar por nombre de cliente..." aria-label="" aria-describedby="button-addon4" />
                                    <div class="input-group-prepend">
                                        <button class="btn btn-info waves-effect waves-themed" type="button" id="btnBuscarCliente">
                                            <i class="fal fa-search"></i>
                                        </button>
                                    </div>
                            </div>
                        <table class="table table-responsive table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <td>Nombre</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblResultadoBusquedaCliente">
                            

                            </tbody>
                        </table>
                        </div>

                    
                    </div>
                </div>
            </div>
            `
        },
        modalNuevoCliente :()=>{
            return `
            <div class="modal fade" id="ModalNuevoCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Datos del Cliente</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>
            
                        <div class="modal-body">
                            <form class="col-12" id="formNuevoCliente">
                                <div class="form-group col-6">
                                    <label>Código/NIT:</label>
                                    <input type="text" class="form-control" id='txtClienteNit' required='true' readonly="true">
                                </div>

                                <div class="row">
                                    <div class="form-group col-6">
                                        <label>Nombre Cliente:</label>
                                        <input type="text" class="form-control" id='txtClienteNombre' required='true'>
                                    </div>                               
                                    <div class="form-group col-6">
                                        <label>Nombre para Factura:</label>
                                        <input type="text" class="form-control" id='txtClienteNombreFac' required='true'>
                                    </div>                               
                                </div>
                                
                                <div class="form-group">
                                    <label>Dirección:</label>
                                    <input type="text" class="form-control" id='txtClienteDireccion' required='true'>
                                </div>

                                <div class="row">
                                    <div class="form-group col-6">
                                        <label>Teléfono:</label>
                                        <div class="row">
                                            <select class="form-control col-3">
                                                <option value="502">+502</option>
                                            </select>
                                            <input type="number" class="form-control col-9" id='txtClienteTelefono'>    
                                        </div>
                                    </div>
                                    <div class="form-group col-6">
                                        <label>Email:</label>
                                        <input type="email" class="form-control" id='txtClienteEmail'>
                                    </div>                               
                                </div>

                                <div class="row">
                                    <div class="form-group col-7">
                                        <label>Municipio:</label>
                                        <select class="form-control" id="cmbClienteMunicipio">
                                            <option value="01">GUATEMALA</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-5">
                                        <label>Departamento:</label>
                                        <select class="form-control" id="cmbClienteDepartamento">
                                            <option value="01">GUATEMALA</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group col-6">
                                    <label>Tipo de Precio:</label>
                                    <select class="form-control" id="cmbClienteTipoPrecio">
                                        
                                    </select>
                                </div>

                                <div class="form-group table-scale-border-top border-left-0 border-right-0 border-bottom-0 text-right">
                                    <br>
                                    <button class="btn btn-warning btn-round btn-lg" data-dismiss="modal" id="btnCancelarCliente">
                                        CANCELAR
                                    </button>
                                    <button class="btn btn-transparent"></button>
                                    <input type="submit" class="btn btn-primary btn-round btn-lg" value="GUARDAR">
                                        
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
            `
        },
        modalTerminar :()=>{
            return `
                 <div class="card card-rounded col-12 shadow">
                            <div class="card-header bg-primary text-white">
                                <label class="modal-title h5" id="">Finalizar Factura</label>
                            </div>
                
                            <div class="card-body p-4">

                                    <div class="">      
                                    
                                        <div class="form-group">
                                            <label>Cliente:</label>
                                            <input class="form-control" style="font-size:80%" id="txtNombre" disabled="true">
                                            <label>Dirección:</label>
                                            <input class="form-control" style="font-size:80%" id="txtDireccion" disabled="true">
                                        </div>

                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label>Forma de Pago / Vence:</label>
                                                    
                                                        <select id="cmbEntregaConcre" class="form-control" disabled>
                                                            <option value="CRE">CREDITO</option>
                                                            <option value="CON">CONTADO</option>
                                                        </select>
                                                        <input type="date" class="form-control negrita text-danger hidden" id="txtFechaVence">
                                                    

                                                    
                                                </div>
                                            </div>
                                            <div class="col-6 text-right">
                                                <div class="form-group">
                                                    <label>Total Venta</label>
                                                    <h2 class="negrita text-danger" id="lbTotalPedido2"></h2>
                                                </div>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="form-group">
                                            <label>Notas:</label>
                                            <textarea rows="3" cols="80" class="form-control" id="txtEntregaObs" placeholder="Escriba aqui sus observaciones..."></textarea>
                                        </div>                                                              
                                    </div>

                                    <div class="row">
                                        <label class="text-white" id="lbDocLat">0</label>
                                        <label class="text-white" id="lbDocLong">0</label class="text-white">
                                    </div>
                                    
                                    <br>
            
                                    <div class="row">
            
                                        <div class="col-12 text-center">
                                            <button class="btn btn-primary btn-lg btn-pills btn-block waves-effect waves-themed" id="btnFinalizarPedido">
                                                <i class="fal fa-save"></i>Crear Factura
                                            </button>
                                        </div>
                                        
                                        
                                    </div>
                            
                            </div>
                        
                        </div>

                        <button class="btn btn-secondary btn-bottom-l btn-xl btn-circle hand shadow" id="btnEntregaCancelar" onclick="document.getElementById('tab-uno').click()">
                            <i class="fal fa-arrow-left"></i>
                        </button> 
                   `
        },
        modalCantidadProducto:()=>{
            return `
            <div class="modal fade" id="ModalCantidadProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-right" role="document">
                    <div class="modal-content">
                        <br><br><br><br><br>
                        <div class="modal-header">
                            <h3 class="modal-title text-center negrita" id="txtDesProducto">Azucar don Justo Cabal Kilo</h3>
                        </div>
                        <div class="modal-body" align="right">
                            <div class="col-8">
                                <div class="row">
                                    <b id="txtCodMedida">UNIDAD</b>
                                </div>
                                <br>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="input-group">
                                
                                            <div class="input-group-prepend">
                                                <button class="btn btn-md btn-icon btn-round btn-info" id="btnCantidadDown">
                                                    -
                                                </button>
                                            </div>
                                
                                            <input type="number" style="font-size:140%" class="text-center form-control" id="txtCantidad" value="1">    
                                
                                            <div class="input-group-append">
                                                <button class="btn btn-md btn-icon btn-round btn-info" id="btnCantidadUp">
                                                    +
                                                </button>    
                                            </div>
                                        </div>                            
                                    </div>                              
                                </div>

                                <div class="col-12">
                                    <label>Precio: </label>
                                    <label class="text-success" id="txtPrecioProducto">Q500</label>
                                    <br>
                                    <label>Subtotal:</label>
                                    <label class="text-danger" id="txtSubTotal">Q500</label>
                                </div>
                                <br>
                                <br>
                                    <div class="form-group">
                                        <label class="negrita text-danger">¿Incluye el bono?</label>
                                        <select class="negrita text-danger" id="cmbIncluyeBono">
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                <br>
                                <br>
                                <div class="row">
                                    <div class="col-6">
                                        <button type="button" class="btn btn-outline-secondary btn-round" data-dismiss="modal" id="btnCancelarModalProducto">
                                            <i class="fal fa-ban"></i>Cancelar
                                        </button>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-primary btn-round" id="btnAgregarProducto">
                                            <i class="fal fa-check"></i>Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            `
        },
        modalCambiarCantidadProducto :()=>{
            return `
                <div class="modal fade" id="modalCambiarCantidadProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <label class="modal-title text-info h3" id="">Cambiar cantidad de producto</label>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="fal fa-times"></i></span>
                                </button>
                            </div>
                
                            <div class="modal-body shadow">
                                    <div class="">            
                                        
                                        <div class="form-group">
                                            <label>Nueva cantidad:</label>
                                            <input type="number"  style="font-size:140%"  class="form-control border-info shadow col-10" id="txtCantNuevaCant">
                                        </div>                                                             
                                            
                                    </div>
                                    
                                    <br>
            
                                    <div class="row">
                                        <div class="col-5">
                                            <button class="btn btn-secondary btn-lg  btn-pills btn-block waves-effect waves-themed" data-dismiss="modal" id="">
                                                <i class="fal fa-times mr-1"></i>
                                                Cancelar
                                            </button>                                
                                        </div>
            
                                        <div class="col-1"></div>
            
                                        <div class="col-5">
                                            <button class="btn btn-success btn-lg btn-pills btn-block waves-effect waves-themed" id="btnCantGuardar">
                                                <i class="fal fa-check mr-1"></i>Aceptar
                                            </button>
                                        </div>
                                        
                                        
                                    </div>
                            
                            </div>
                        
                        </div>
                    </div>
                </div>`
        }
    }


    root.innerHTML = view.body(); 
                //+ view.modalCantidadCalculadora();

    let containerModalesVentas = document.getElementById('containerModalesVentas');
    containerModalesVentas.innerHTML = view.modalBusquedaProductos() 
                                        + view.modalCantidadProducto()
                                        + view.modalCambiarCantidadProducto();

};

async function iniciarVistaVentas(codcliente,nombre,direccion,nit){

  


    //inicializa la vista
    getView();

    funciones.slideAnimationTabs();



    let lbNomClien = document.getElementById('lbNomClien');
    lbNomClien.innerText = `${nombre} - ${direccion}`;
    
  

    let txtFecha = document.getElementById('txtFecha');txtFecha.value = funciones.getFecha();
    document.getElementById('txtFechaVence').value  = funciones.getFecha();
    
    document.getElementById('cmbEntregaConcre').addEventListener('change',()=>{
        
        if(document.getElementById('cmbEntregaConcre').value=='CRE'){
            document.getElementById('txtFechaVence').style = "visibility:visible";
        }else{
            document.getElementById('txtFechaVence').style = "visibility:hidden";
        }

    })

    

    let txtEntregaFecha = funciones.getFecha();// document.getElementById('txtEntregaFecha');txtEntregaFecha.value = funciones.getFecha();

    // listener para el nit
    let txtNit = document.getElementById('txtNit');
    txtNit.addEventListener('keydown',(e)=>{
        if(e.code=='Enter'){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
        }
        if(e.code=='NumpadEnter'){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
        }
    });

    document.getElementById('btnBuscarCliente').addEventListener('click',()=>{
        //fcnBuscarCliente('txtNit','txtNombre','txtDireccion');    
    });

    document.getElementById('txtBusqueda').addEventListener('keyup',(e)=>{
        if(e.code=='Enter'){
            fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
            //$('#ModalBusqueda').modal('show');
        }
        if(e.code=='NumpadEnter'){
            fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
            //$('#ModalBusqueda').modal('show');
        }
    });
    document.getElementById('btnBuscarProducto').addEventListener('click',()=>{
        fcnBusquedaProducto('txtBusqueda','tblResultadoBusqueda','cmbTipoPrecio');
        //$('#ModalBusqueda').modal('show');
    });

    let btnCobrar = document.getElementById('btnCobrar');
    btnCobrar.addEventListener('click',()=>{
       
        fcnCargarGridTempVentas('tblGridTempVentas');
        
        //ALEXIS REVISAR LOGICA
        if(btnCobrar.innerText=='Terminar'){
            funciones.AvisoError('No puede finalizar un pedido sin productos')
        }else{
           if(txtNit.value==''){
               funciones.AvisoError('Especifique el cliente a quien se carga la venta');
           }else{

               funciones.ObtenerUbicacion('lbDocLat','lbDocLong')
               document.getElementById('lbTotalPedido2').innerText = funciones.setMoneda(GlobalTotalDocumento,'Q');

               //$('#ModalFinalizarPedido').modal('show');
               document.getElementById('tab-dos').click()   
                               
           }
       }
       
    });

    let cmbCoddoc = document.getElementById('cmbCoddoc');
    //classTipoDocumentos.comboboxTipodoc('PED','cmbCoddoc');
    cmbCoddoc.value = GlobalCoddoc;

    cmbCoddoc.addEventListener('change',async ()=>{
       await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
    });

    let cmbVendedor = document.getElementById('cmbVendedor');

    let btnFinalizarPedido = document.getElementById('btnFinalizarPedido');
    btnFinalizarPedido.addEventListener('click',async ()=>{
        fcnFinalizarPedido();
    });

    //BUSQUEDA CLIENTES
    let frmNuevoCliente = document.getElementById('formNuevoCliente');
    frmNuevoCliente.addEventListener('submit',(e)=>{
        e.preventDefault();
        funciones.Confirmacion('¿Está seguro que desea guardar este cliente?')
        .then((value)=>{
            if(value==true){
                fcnGuardarNuevoCliente(frmNuevoCliente);
            }
        })

    });

    let btnBusquedaClientes = document.getElementById('btnBusquedaClientes');
    btnBusquedaClientes.addEventListener('click',()=>{
        $('#ModalBusquedaCliente').modal('show');
    });
    
    let txtBusquedaCliente = document.getElementById('txtBusquedaCliente');
    txtBusquedaCliente.addEventListener('keyup',(e)=>{
        if(e.code=='Enter'){
            fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
        }
        if(e.code=='NumpadEnter'){
            fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
        }
    });

    document.getElementById('btnBuscarCliente').addEventListener('click',()=>{
        fcnBusquedaCliente('txtBusquedaCliente','tblResultadoBusquedaCliente');
    });
    document.getElementById('btnNuevoCliente').addEventListener('click',()=>{
        //$('#ModalNuevoCliente').modal('show');
        if(txtNit.value!==''){
            fcnBuscarCliente('txtNit','txtNombre','txtDireccion');
        }else{
            funciones.AvisoError('Escriba el NIT o código de cliente para comprobar');
        };
        
    })

     
    
   
    
    await classTipoDocumentos.fcnCorrelativoDocumento('PED',cmbCoddoc.value,'txtCorrelativo');
    await fcnCargarGridTempVentas('tblGridTempVentas');
    //await fcnCargarTotal('txtTotalVenta','txtTotalVentaCobro');

    cmbVendedor.value = GlobalCodUsuario;

    fcnCargarComboTipoPrecio();
  
    // inicializa la calculadora de cantidad
    //iniciarModalCantidad();
    addEventsModalCambioCantidad();

    //carga los datos del cliente
    document.getElementById('txtNit').value = nit;
    document.getElementById('txtNombre').value = nombre;
    document.getElementById('txtDireccion').value = direccion;
    
    //inicia los eventos de la ventana Cantidad al agregar productos
    fcnIniciarModalCantidadProductos();

    document.getElementById('btnAgregarProd').addEventListener('click',()=>{
        $('#ModalBusqueda').modal('show');
    });
};

function addEventsModalCambioCantidad(){

    document.getElementById('btnCantGuardar').addEventListener('click',()=>{
        let nuevacantidad = Number(document.getElementById('txtCantNuevaCant').value);
        if(nuevacantidad>0){
            fcnUpdateTempRow(GlobalSelectedId,nuevacantidad)
            .then(()=>{
                $('#modalCambiarCantidadProducto').modal('hide');
            })
        }else{
            funciones.AvisoError('Escriba una cantidad válida')
        }  
    }) 

};

function fcnIniciarModalCantidadProductos(){

        
    let btnAgregarProducto = document.getElementById('btnAgregarProducto'); //boton agregar 
    let txtCantidad = document.getElementById('txtCantidad'); //input
    let btnCantidadUp = document.getElementById('btnCantidadUp');
    let btnCantidadDown = document.getElementById('btnCantidadDown');
    let txtSubTotal = document.getElementById('txtSubTotal'); //label

  
  

    btnAgregarProducto.addEventListener('click',()=>{

        GlobalSelectedCantidad = Number(txtCantidad.value);
        let totalunidades = (Number(GlobalSelectedEquivale) * Number(GlobalSelectedCantidad));
        let totalexento = GlobalSelectedCantidad * GlobalSelectedExento;


        
        
        fcnAgregarProductoVenta(GlobalSelectedCodprod,GlobalSelectedDesprod,GlobalSelectedCodmedida,GlobalSelectedCantidad,GlobalSelectedEquivale,totalunidades,GlobalSelectedCosto,GlobalSelectedPrecio,totalexento,GlobalSelectedBono);
        
        
    });

    txtCantidad.addEventListener('click',()=>{txtCantidad.value =''});

    btnCantidadUp.addEventListener('click',()=>{
        let cant = parseInt(txtCantidad.value);
        txtCantidad.value = cant + 1;

        let _SubTotal = parseFloat(GlobalSelectedPrecio) * parseFloat(txtCantidad.value);
        //_SubTotalCosto = parseFloat(_Costo) * parseFloat(txtCantidad.value);
        txtSubTotal.innerHTML = funciones.setMoneda(_SubTotal,'Q');
        
    })

    btnCantidadDown.addEventListener('click',()=>{
        if (parseInt(txtCantidad.value)==1){

        }else{
        let cant = parseInt(txtCantidad.value);
        txtCantidad.value = cant - 1;

        let _SubTotal = parseFloat(GlobalSelectedPrecio) * parseFloat(txtCantidad.value);
        //s_SubTotalCosto = parseFloat(_Costo) * parseFloat(txtCantidad.value);
        txtSubTotal.innerHTML = funciones.setMoneda(_SubTotal,'Q');
        }
        
    })

};

function fcnBusquedaProducto(idFiltro,idTablaResultado,idTipoPrecio){
    
    let cmbTipoPrecio = document.getElementById(idTipoPrecio);

    let filtro = document.getElementById(idFiltro).value;
    
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;


    let str = ""; 

    apigen.buscar_producto(filtro)
    .then((response) => {
        const data = response;
        //con esta variable determino el tipo de precio a usar            
        let pre = 0;

      
            data.recordset.map((rows)=>{

           
                let exist = Number(rows.EXISTENCIA)/Number(rows.EQUIVALE); let strC = '';
                if(Number(rows.EXISTENCIA<=0)){strC='bg-danger text-white'}else{strC='bg-success text-white'};
                let totalexento = 0;
                if (rows.EXENTO==1){totalexento=Number(rows.PRECIO)}
                
                switch (cmbTipoPrecio.value) {
                    case 'P':
                        pre = Number(rows.PRECIO)
                        break;
                    case 'C':
                        pre = Number(rows.PRECIOC)
                        break;
                    case 'B':
                        pre = Number(rows.PRECIOB)
                        break;
                    case 'A':
                        pre = Number(rows.PRECIOA)
                        break;
                    case 'K':
                        pre = Number(0.01)
                        break;
     
                }

                str += `
            <tr class="border-primary" id="${rows.CODPROD}" onclick="getDataMedidaProducto('${rows.CODPROD}','${funciones.quitarCaracteres(rows.DESPROD,'"'," plg",true)}','${rows.CODMEDIDA}',1,${rows.EQUIVALE},${rows.EQUIVALE},${rows.COSTO},${pre},${totalexento},${Number(rows.EXISTENCIA)},${Number(rows.BONO)});" class="border-bottom">
                <td >
                    ${funciones.quitarCaracteres(rows.DESPROD,'"'," pulg",true)}
                    <br>
                    <small class="text-danger negrita">Cod: ${rows.CODPROD}</small>
                    <br>
                    <small class="text-info">BONO: &nbsp ${funciones.setMoneda(rows.BONO,'Q')}</small>
                    <br>
                    <b class"bg-danger text-white">${rows.CODMEDIDA}</b><small>(${rows.EQUIVALE})</small>
                    <br>
                    <small class="negrita">Marca: &nbsp ${rows.DESMARCA}</small>

                </td>
                <td>${funciones.setMoneda(pre || 0,'Q ')}
                    <br>
                    <small class="${strC}">E:${funciones.setMoneda(exist,'')}</small>
                </td>
                <td>
                    <button class="btn btn-sm btn-secondary hand shadow btn-circle text-white" 
                    onclick="getDataMedidaProducto('${rows.CODPROD}','${funciones.quitarCaracteres(rows.DESPROD,'"'," plg",true)}','${rows.CODMEDIDA}',1,${rows.EQUIVALE},${rows.EQUIVALE},${rows.COSTO},${pre},${totalexento},${Number(rows.EXISTENCIA)},${Number(rows.BONO)});">
                        +
                    </button>
                </td>
            </tr>`
            })
            tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
        tabla.innerHTML ='<label>No hay datos para mostrar...</label>';
    })
    .catch((error)=>{
        //funciones.AvisoError(error);
        tabla.innerHTML ='<label>No hay datos para mostrar...</label>';
    })




};


//gestiona la apertura de la cantidad
function getDataMedidaProducto(codprod,desprod,codmedida,cantidad,equivale,totalunidades,costo,precio,exento,existencia,bono){
    console.log('existencia: ' + existencia);

    if(parseInt(existencia)>0){
        GlobalSelectedCodprod = codprod;
        GlobalSelectedDesprod = desprod;
        GlobalSelectedCodmedida = codmedida;
        GlobalSelectedEquivale = parseInt(equivale);
        GlobalSelectedCosto = parseFloat(costo);
        GlobalSelectedPrecio = parseFloat(precio);
        

        GlobalSelectedExento = parseInt(exento);
        GlobalSelectedExistencia = parseInt(existencia);
        GlobalSelectedBono = bono;

        //modal para la cantidad del producto
        document.getElementById('txtDesProducto').innerText = desprod; //label
        document.getElementById('txtCodMedida').innerText = codmedida; //label
        document.getElementById('txtPrecioProducto').innerText = funciones.setMoneda(precio,'Q'); //label
        document.getElementById('txtSubTotal').innerText = funciones.setMoneda(precio,'Q'); //label
            
        document.getElementById('txtCantidad').value = 1;

        if(Number(GlobalSelectedBono)==0){document.getElementById('cmbIncluyeBono').value='NO';document.getElementById('cmbIncluyeBono').disabled=true}
        else{
            document.getElementById('cmbIncluyeBono').value='SI';document.getElementById('cmbIncluyeBono').disabled=false;
        }
    
        $("#ModalCantidadProducto").modal('show');    
    }else{
        funciones.AvisoError('Producto SIN EXISTENCIA')
    }


};

//GRID TEMP VENTAS

// agrega el producto a temp_ventas
async function fcnAgregarProductoVenta(codprod,desprod,codmedida,cantidad,equivale,totalunidades,costo,precio,exento,bono){
   
    db_totalunidades_producto(codprod)
    .then((totaluns)=>{
        //---------------------------------------------------------

        if(Number(GlobalSelectedExistencia)<(Number(totalunidades)+Number(totaluns))){
            funciones.AvisoError('No pude agregar una cantidad mayor a la existencia');
            return;
        };
    
        document.getElementById('btnAgregarProducto').innerHTML = GlobalLoader;
        document.getElementById('btnAgregarProducto').disabled = true;
    
        //document.getElementById('tblResultadoBusqueda').innerHTML = '';
        let cmbTipoPrecio = document.getElementById('cmbTipoPrecio');
            let totalcosto = Number(costo) * Number(cantidad);
            let totalprecio = Number(precio) * Number(cantidad);
            console.log('intenta agregar la fila')
            let coddoc = document.getElementById('cmbCoddoc').value;

            let cmbIncluyeBono = document.getElementById('cmbIncluyeBono').value;
            if(cmbIncluyeBono=='NO'){bono=0};
            console.log(cmbIncluyeBono)
            console.log(bono)

            try {        
                    var data = {
                        EMPNIT:GlobalEmpnit,  
                        CODSUCURSAL:GlobalCodSucursal,
                        CODDOC:coddoc,     
                        CODPROD:codprod,
                        DESPROD:desprod,
                        CODMEDIDA:codmedida,
                        CANTIDAD:cantidad,
                        EQUIVALE:equivale,
                        TOTALUNIDADES:totalunidades,
                        COSTO:costo,
                        PRECIO:precio,
                        TOTALCOSTO:totalcosto,
                        TOTALPRECIO:totalprecio,
                        EXENTO:exento,
                        USUARIO:GlobalUsuario,
                        TIPOPRECIO:cmbTipoPrecio.value,
                        EXISTENCIA:GlobalSelectedExistencia,
                        BONO:Number(bono)
                    };
    
                    insertTempVentas(data)
                    .then(()=>{                    
          
                            $('#ModalCantidadProducto').modal('hide') //MARCADOR
                            funciones.showToast('Agregado: ' + desprod);
                            
                            fcnCargarGridTempVentas('tblGridTempVentas');
                            
                            document.getElementById('btnAgregarProducto').innerHTML  = `<i class="fal fa-check"></i>Agregar`;
                            document.getElementById('btnAgregarProducto').disabled = false;
                            let txbusqueda = document.getElementById('txtBusqueda');
                            txbusqueda.value = '';
                            
                      })
                      .catch(
                          ()=>{
                            document.getElementById('btnAgregarProducto').innerHTML  = `<i class="fal fa-check"></i>Agregar`;
                            document.getElementById('btnAgregarProducto').disabled = false;
                            funciones.AvisoError('No se pudo agregar este producto a la venta actual');
                          }
                      )
            
            } catch (error) {
                document.getElementById('btnAgregarProducto').innerHTML  = `<i class="fal fa-check"></i>Agregar`;
                document.getElementById('btnAgregarProducto').disabled = false;
            }
       

        //---------------------------------------------------------
    })
 

};

function fcnEliminarItem(id){
    funciones.Confirmacion('¿Está seguro que desea quitar este item?')
    .then((value)=>{
        if(value==true){
                deleteItemVenta(id)
                  .then(()=>{                       
                        //document.getElementById(id.toString()).remove();
                        funciones.showToast('item eliminado');
                        fcnCargarGridTempVentas('tblGridTempVentas');
                  })
                  .catch(
                      ()=>{
                        funciones.AvisoError('No se pudo remover este producto a la venta actual');
                      }
                  )
        }        
    })
    
};

async function fcnCargarGridTempVentas(idContenedor){
    
    let tabla = document.getElementById(idContenedor);
    tabla.innerHTML = GlobalLoader;

    let varTotalVenta = 0; let varTotalCosto = 0;
    let varTotalItems =0;

    let btnCobrarTotal = document.getElementById('btnCobrar')
    btnCobrarTotal.disabled = true; //.innerText =  'Terminar';
   
    let coddoc = document.getElementById('cmbCoddoc').value;
    
    let containerTotalVenta = document.getElementById('txtTotalVenta');
    containerTotalVenta.innerHTML = '--';

    let containerTotalItems = document.getElementById('txtTotalItems');
    containerTotalItems.innerHTML = '--'

    try {
        selectTempventas(GlobalUsuario)
        .then((response)=>{
            let idcant = 0;
            let data = response.map((rows)=>{
                idcant = idcant + 1;
                varTotalItems += 1;
                varTotalVenta = varTotalVenta + Number(rows.TOTALPRECIO);
                varTotalCosto = varTotalCosto + Number(rows.TOTALCOSTO);
                return `<tr id="${rows.ID.toString()}" class="border-bottom" ondblclick="funciones.hablar('${rows.DESPROD}')">
                            <td class="text-left">
                                <b class="text-primary">${rows.DESPROD}</b>
                                <br>
                                <small class="text-danger"><b>${rows.CODPROD} (${rows.EQUIVALE} item)</b></small>
                                <br>
                                    <small>
                                        Cant:<b class="text-danger h4" id=${idcant}>${rows.CANTIDAD}</b>  ${rows.CODMEDIDA}  ||  Precio:<b>${funciones.setMoneda(rows.PRECIO,'Q')}</b>
                                    </small>
                                <br>
                                    <small>Bono: ${funciones.setMoneda((Number(rows.BONO) * Number(rows.CANTIDAD)),'Q')}</small>
                                <br>
                                <div class="row">
                                    <div class="col-4"></div>
                                    <div class="col-4 " align="right">
                                        <button class="btn btn-secondary btn-sm btn-circle" onClick="fcnCambiarCantidad(${rows.ID},${rows.CANTIDAD},'${rows.CODPROD}',${rows.EXISTENCIA});">
                                            <i class="fal fa-edit"></i>
                                        </button>    
                                    </div>
                                    <div class="col-4 text-right" align="right">
                                        <button class="btn btn-sm btn-danger btn-circle" onclick="fcnEliminarItem(${rows.ID});">
                                            <i class="fal fa-trash"></i>
                                        </button>    
                                    </div>
                                </div>
                            </td>
                                                        
                            <td class="text-right negrita text-danger" id=${'S'+idcant}>${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</td>
                            
                        </tr>`
           }).join('\n');
           tabla.innerHTML = data;
           GlobalTotalDocumento = varTotalVenta;
           GlobalTotalCostoDocumento = varTotalCosto;
           containerTotalVenta.innerHTML = `${funciones.setMoneda(GlobalTotalDocumento,'Q ')}`;
           if(GlobalTotalDocumento==0){
                btnCobrarTotal.disabled = true;
           }else{
                btnCobrarTotal.disabled = false;
           }
             //innerHTML = '<h1>Terminar : ' + funciones.setMoneda(GlobalTotalDocumento,'Q ') + '</h1>';
           containerTotalItems.innerHTML = `${varTotalItems} items`;
        })
    } catch (error) {
        console.log('NO SE LOGRO CARGAR LA LISTA ' + error);
        tabla.innerHTML = 'No se logró cargar la lista...';
        containerTotalVenta.innerHTML = '0';
        btnCobrarTotal.disabled = true; //innerText =  'Terminar';
        containerTotalItems.innerHTML = `0 items`;
    }
};

async function fcnUpdateTempRow(id,cantidad){

    //--------------------------
    if(Number(GlobalSelectedExistencia)<Number(cantidad)){
        funciones.AvisoError('No pude agregar una cantidad mayor a la existencia');
        return;
    };
    //--------------------------

    return new Promise((resolve, reject) => {
            //OBTIENE LOS DATOS DE LA ROW    
            selectDataRowVenta(id,cantidad)
            .then(()=>{
                fcnCargarGridTempVentas('tblGridTempVentas');
                resolve();
            })
            .catch(()=>{
                funciones.AvisoError('No se logró Eliminar la lista de productos agregados');
                reject();
            })

        });
};

async function fcnCambiarCantidad(id,cantidad,codprod, existencia){
    
    GlobalSelectedId = id;
    GlobalSelectedExistencia = Number(existencia);
    //$('#ModalCantidad').modal('show');
    document.getElementById('txtCantNuevaCant').value = cantidad;
    $('#modalCambiarCantidadProducto').modal('show');
    
};


//CLIENTE
async function fcnBuscarCliente(idNit,idNombre,idDireccion){
    return;

    let nit = document.getElementById(idNit);
    let nombre = document.getElementById(idNombre);
    let direccion = document.getElementById(idDireccion);

    axios.get('/ventas/buscarcliente?empnit=' + GlobalEmpnit + '&nit=' + nit.value  + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No existe un cliente con este código')
            nit.value = '';
            nombre.value = '';
            direccion.value = '';
        }else{
            data.recordset.map((rows)=>{
                GlobalSelectedCodCliente= nit.value;
                nombre.value = rows.NOMCLIENTE;
                direccion.value = rows.DIRCLIENTE;
            });
        }
        
                
    }, (error) => {
        console.log(error);
    });
};

async function fcnBusquedaCliente(idFiltro,idTablaResultado){
    
    let filtro = document.getElementById(idFiltro).value;
    let tabla = document.getElementById(idTablaResultado);
    tabla.innerHTML = GlobalLoader;


    let str = ""; 
    axios.get('/clientes/buscarcliente?empnit=' + GlobalEmpnit + '&filtro=' + filtro + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<tr id="${rows.CODCLIE}">
                        <td>
                            ${rows.NOMCLIE}
                            <br>
                            <small class="bg-warning">Código: ${rows.CODCLIE} / Nit: ${rows.NIT}</small>
                            <br>
                            <small>${rows.DIRCLIE},${rows.DESMUNICIPIO}</small>
                        </td>
                        
                        <td>
                            <button class="btn btn-sm btn-success btn-circle text-white" 
                            onclick="fcnAgregarClienteVenta('${rows.CODCLIE}','${rows.NIT}','${rows.NOMCLIE}','${rows.DIRCLIE}')">
                                +
                            </button>
                        <td>
                    </tr>`
        })
        tabla.innerHTML= str;
        
    }, (error) => {
        console.log(error);
    });

};

async function fcnAgregarClienteVenta(codigo,nit,nombre,direccion){
    GlobalSelectedCodCliente = codigo;
    document.getElementById('tblResultadoBusquedaCliente').innerHTML = '';
    document.getElementById('txtNit').value = codigo; //nit;
    document.getElementById('txtNombre').value = nombre;
    document.getElementById('txtDireccion').value = direccion;
    $('#ModalBusquedaCliente').modal('hide');  
};

async function fcnGuardarNuevoCliente(form){
    
    let nit = form[0].value;
    let nomclie = form[1].value;
    let nomfac = form[2].value;
    let dirclie = form[3].value;
    let codpais = form[4].value;
    let telclie = form[5].value;
    let emailclie = form[6].value;
    let codmunicipio = form[7].value;
    let coddepto = form[8].value;
    let tipoprecio = form[9].value;

    let codven = document.getElementById('cmbVendedor').value;

    // OBTIENE LA LATITUD Y LONGITUD DEL CLIENTE
    let lat = ''; let long = '';
    try {navigator.geolocation.getCurrentPosition(function (location) {lat = location.coords.latitude.toString();long = location.coords.longitude.toString(); })
    } catch (error) {lat = '0'; long = '0'; };
    
    // FECHA DE CREACION DEL CLIENTE
    let f = funciones.getFecha();

    axios.post('/clientes/clientenuevo', {
        app:GlobalSistema,
        empnit: GlobalEmpnit,
        codclie:nit,
        nitclie:nit,
        nomclie:nomclie,
        nomfac:nomfac,
        dirclie:dirclie,
        coddepto:coddepto,
        codmunicipio:codmunicipio,
        codpais:codpais,
        telclie:telclie,
        emailclie:emailclie,
        codbodega:GlobalCodBodega,
        tipoprecio:tipoprecio,
        lat:lat,
        long:long,
        codven:codven,
        fecha:f        
    })
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No se logró Guardar el nuevo cliente');
        }else{
            funciones.Aviso('Nuevo Cliente Agregado Exitosamente !!')
            document.getElementById('txtNit').value = nit;
            document.getElementById('txtNombre').value = nomclie;
            document.getElementById('txtDireccion').value = dirclie;
            document.getElementById('btnCancelarCliente').click();
        }
    }, (error) => {
        funciones.AvisoError('No se logró Guardar el nuevo cliente');
        console.log(error);
    });


};




async function fcnEliminarTempVentas(usuario){
    let coddoc = document.getElementById('cmbCoddoc').value;
    axios.post('/ventas/tempVentastodos', {
        empnit: GlobalEmpnit,
        usuario:usuario,
        coddoc:coddoc,
        app:GlobalSistema
    })
    .then((response) => {
        const data = response.data;
        if (data.rowsAffected[0]==0){
            funciones.AvisoError('No se logró Eliminar la lista de productos agregados');
        }else{
            
        }
    }, (error) => {
        console.log(error);
    });
};

async function fcnNuevoPedido(){
    
    classNavegar.inicio(3);
    
};



async function fcnGetMunicipios(idContainer){
    let container = document.getElementById(idContainer);
    container.innerHTML = GlobalLoader;

    let str = ""; 
    axios.get('/clientes/municipios?empnit=' + GlobalEmpnit + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value='${rows.CODMUNICIPIO}'>${rows.DESMUNICIPIO}</option>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
        container.innerHTML = '';
    });
};

async function fcnGetDepartamentos(idContainer){
    let container = document.getElementById(idContainer);
    container.innerHTML = GlobalLoader;

    let str = ""; 
    axios.get('/clientes/departamentos?empnit=' + GlobalEmpnit + '&app=' + GlobalSistema)
    .then((response) => {
        const data = response.data;        
        data.recordset.map((rows)=>{
            str += `<option value='${rows.CODDEPTO}'>${rows.DESDEPTO}</option>`
        })
        container.innerHTML= str;
        
    }, (error) => {
        console.log(error);
        container.innerHTML = '';
    });
};

async function fcnCargarComboTipoPrecio(){
   let cmbp = document.getElementById('cmbClienteTipoPrecio');
  
    cmbp.innerHTML =`<option value="P">PÚBLICO</option>
                     <option value="C">MAYORISTA C</option>
                     <option value="B">MAYORISTA B</option>
                     <option value="A">MAYORISTA A</option>`;
   
   
};



//FINALIZAR PEDIDO
function fcnFinalizarPedido(){
    
   
   

    if(GlobalTotalDocumento==0){
        funciones.AvisoError('Esta factura no tiene productos, revise por favor');
        return;
    };

    if(GlobalSelectedCodCliente.toString()=='SI'){funciones.AvisoError('Datos del cliente incorrectos, por favor, seleccione cliente nuevamente');return;}

    let codcliente = GlobalSelectedCodCliente;
    let ClienteNombre = funciones.limpiarTexto(document.getElementById('txtNombre').value);
    let dirclie = funciones.limpiarTexto(document.getElementById('txtDireccion').value); 
    let obs = funciones.limpiarTexto(document.getElementById('txtEntregaObs').value); 
    let direntrega = "";
    let codbodega = '';
    let cmbTipoEntrega = document.getElementById('cmbEntregaConcre').value; 
    
    let txtFecha = new Date(document.getElementById('txtFecha').value);
    let anio = txtFecha.getFullYear();
    let mes = txtFecha.getUTCMonth()+1;
    let d = txtFecha.getUTCDate() 
    let dia = d;

    let fecha = funciones.devuelveFecha('txtFecha');
    
    let hora = txtFecha.getHours(); 
    let minuto = txtFecha.getMinutes();

    
    let fechaentrega = funciones.devuelveFecha('txtFechaVence');  
    let fechavence = funciones.devuelveFecha('txtFechaVence');  
    
    let coddoc = document.getElementById('cmbCoddoc').value;
    let correlativoDoc = document.getElementById('txtCorrelativo').value;
    let cmbVendedor = document.getElementById('cmbVendedor');
    let nit = document.getElementById('txtNit').value;
    let latdoc = document.getElementById('lbDocLat').innerText;
    let longdoc = document.getElementById('lbDocLong').innerText;


    document.getElementById('btnFinalizarPedido').innerHTML = '<i class="fal fa-save fa-spin"></i>';
    document.getElementById('btnFinalizarPedido').disabled = true;

    gettempDocproductos(GlobalUsuario)
    .then((response)=>{

        let docproductos_ped = response;  

        //guarda el pedido localmente
        var datospedido = {
                CODSUCURSAL:GlobalCodSucursal,
                EMPNIT: GlobalEmpnit,
                CODDOC:coddoc,
                ANIO:anio,
                MES:mes,
                DIA:dia,
                FECHA:fecha,
                FECHAENTREGA:fechaentrega,
                FORMAENTREGA:cmbTipoEntrega,
                VENCE:fechaentrega,
                CONCRE:cmbTipoEntrega,
                CODCLIE: codcliente,
                NOMCLIE:ClienteNombre,
                TOTALCOSTO:GlobalTotalCostoDocumento,
                TOTALPRECIO:GlobalTotalDocumento,
                NITCLIE:nit,
                DIRCLIE:dirclie,
                OBS:obs,
                DIRENTREGA:direntrega,
                USUARIO:GlobalUsuario,
                CODVEN:Number(cmbVendedor.value),
                LAT:latdoc,
                LONG:longdoc,
                JSONPRODUCTOS:JSON.stringify(docproductos_ped)
        };

        //UNA VEZ OBTENIDO EL DETALLE, PROCEDE A GUARDARSE O ENVIARSE

        //OBTIENE EL CORRELATIVO DEL DOCUMENTO
        classTipoDocumentos.getCorrelativoDocumento('PED',GlobalCoddoc)
        .then((correlativo)=>{

            correlativoDoc = correlativo;             
          
            funciones.Confirmacion('¿Está seguro que desea Finalizar esta Venta')
            .then((value)=>{
                if(value==true){

                    //setLog(`<label class="text-danger">Creando factura a enviar...</label>`,'rootWait');
                    //$('#modalWait').modal('show');
                                                
                    //ENVIANDOLO ONLINE
                        
                        //setLog(`<label class="text-info">Factura creada, enviando factura...</label>`,'rootWait');

                        axios.post('/ventas/insertventa', {
                            jsondocproductos:JSON.stringify(response),
                            codsucursal:GlobalCodSucursal,
                            empnit: GlobalEmpnit,
                            coddoc:coddoc,
                            correl: correlativoDoc,
                            anio:anio,
                            mes:mes,
                            dia:dia,
                            fecha:fecha,
                            fechaentrega:fechaentrega,
                            vence:fechavence,
                            formaentrega:cmbTipoEntrega,
                            concre:cmbTipoEntrega,
                            codbodega:codbodega,
                            nomclie:ClienteNombre,
                            totalcosto:GlobalTotalCostoDocumento,
                            totalprecio:GlobalTotalDocumento,
                            codcliente: codcliente,
                            nitclie:nit,
                            dirclie:dirclie,
                            obs:obs,
                            direntrega:direntrega,
                            usuario:GlobalUsuario,
                            codven:cmbVendedor.value,
                            lat:latdoc,
                            long:longdoc,
                            hora:hora,
                            minuto:minuto,
                            poriva:GlobalConfigIva
                        })
                        .then(async(response) => {

                            const data = response.data;

                            //si lanza error
                            if(data.toString()=='error'){

                                    //hideWaitForm();
                                                
                                    funciones.AvisoError('Error al guardar la factura');
        
                                    document.getElementById('btnFinalizarPedido').innerHTML = '<i class="fal fa-save"></i>Guardar Factura';
                                    document.getElementById('btnFinalizarPedido').disabled = false;                                    
                                     
                            }else{
                                //si no se inserto valores y compara si inserto o no
                                if (Number(data.rowsAffected[0])==0){
                                    
                                    //hideWaitForm();
                                                
                                    funciones.AvisoError('Error al guardar la factura');
        
                                    document.getElementById('btnFinalizarPedido').innerHTML = '<i class="fal fa-save"></i>Guardar Factura';
                                    document.getElementById('btnFinalizarPedido').disabled = false;                                    
                                     
                                }else{

                                        //hideWaitForm();

                                        funciones.Aviso('Factura Generada Exitosamente !!!')
                                        document.getElementById('btnEntregaCancelar').click();                                                           
                                        //actualiza la ubicación del empleado
                                        await classEmpleados.updateMyLocation();            
                                        //actualiza la última venta del cliente
                                        apigen.updateClientesLastSale(nit,'VENTA');
                                        //elimina el temp ventas asociado al empleado
                                        deleteTempVenta(GlobalUsuario)     
                                        //prepara todo para un nuevo pedido
                                        fcnNuevoPedido();
                                }
                            }

                           
                        
                        }, (error) => {
                            console.log(error);
                            //setLog(`<label class="text-info">Ha ocurrido un error y no se pudo enviar, se intentará guardar en el teléfono</label>`,'rootWait');
                            //hideWaitForm();
                                        
                            funciones.AvisoError('Error al guardar la factura');

                            document.getElementById('btnFinalizarPedido').innerHTML = '<i class="fal fa-save"></i>Guardar Factura';
                            document.getElementById('btnFinalizarPedido').disabled = false;                                    
                             
                        });        
    
                }
            })

        })
        .catch(()=>{
            
            funciones.AvisoError('No se pudo obtener el correlativo de factura');

            document.getElementById('btnFinalizarPedido').innerHTML = '<i class="fal fa-save"></i>Guardar Factura';
            document.getElementById('btnFinalizarPedido').disabled = false;                                    
                                                             
        })

    })
    .catch((error)=>{
        //hideWaitForm();
        document.getElementById('btnFinalizarPedido').innerHTML = '<i class="fal fa-save"></i>Guardar Factura';
        document.getElementById('btnFinalizarPedido').disabled = false;
        funciones.AvisoError('No pude crear la tabla de productos del pedido ' + error);
    })
  
};






