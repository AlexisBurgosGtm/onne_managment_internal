function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.vista_listado()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           ${view.vista_cobro()}
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_abonos()}
                        </div>   
                        <div class="tab-pane fade" id="cuatro" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_clientes()}
                        </div> 
                        <div class="tab-pane fade" id="cinco" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_cliente_facturas()}
                        </div> 
                        <div class="tab-pane fade" id="seis" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_cobro_multiple()}
                        </div>
                        <div class="tab-pane fade" id="siete" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_lista_recibos()}
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
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-cuatro" data-toggle="tab" href="#cuatro" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li> 
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-cinco" data-toggle="tab" href="#cinco" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>   
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-seis" data-toggle="tab" href="#seis" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>       
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-siete" data-toggle="tab" href="#siete" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>     
                    </ul>
                </div>
               
            `
        },
        vista_listado:()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body p-2">
                    
                    <h4 class="negrita text-danger">Facturas por Cobrar</h4>
                    
                    <div class="table-responsive col-12" id="containerCxc">
                        
                       
                    </div>
                </div>
            </div>

            <button class="btn btn-warning btn-bottom-l btn-circle btn-xl hand shadow"
            id="btnListadoRecibos">
                <i class="fal fa-list"></i>
            </button>

            
            <button class="btn btn-success btn-bottom-r btn-circle btn-xl hand shadow hidden"
            id="btnNuevoCobroMultiple">
                <i class="fal fa-plus"></i>
            </button>
            `
        },
        vista_cobro:()=>{
            return `
            <div class="card card-rounded col-12">
                <div class="card-body p-4">

                    <h3 class="negrita text-secondary">NUEVO COBRO A FACTURA</h3>
                   
                    <label class="negrita text-danger" id="lbCobroFacturaCoddoc">FACA1</label>
                    <label class="negrita text-danger" id="lbCobroFacturaCorrelativo">1</label>
                    <br>
                    <label class="negrita text-danger" id="lbCobroFacturaFel">FELSERIE-FELNUMERO</label>
                    <br>
                    <label class="negrita text-secondary" id="lbCobroFacturaCliente">CONSUMIDOR FINAL</label>
                    <br>
                    <div class="row">
                        <div class="col-4 text-center">
                            <label class="negrita text-info" id="lb_factura_importe">Importe: 0.00</label>
                        </div>
                        <div class="col-4 text-center">
                            <label class="negrita text-success" id="lb_factura_abonos">Abonos: 0.00</label>
                        </div>
                        <div class="col-4 text-center">
                            <label class="negrita text-danger" id="lb_factura_saldo">Saldo: 0.00</label>
                        </div>
                    </div>

                </div>
            </div>
            <br>

            <div class="card card-rounded col-12">
                <div class="card-body p-4">


                            <div class="row">
                                <div class="col-7">
                                    <h3 class="negrita text-primary">FORMA DEL PAGO</h3>
                                </div>
                                <div class="col-5">
                                    <h3 class="negrita text-danger text-right" id="lb_factura_total_recibo">Q 10,000.00</h3>
                                </div>
                            </div>

                            
                            
                             <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Fecha</label>
                                        <input type="date" class="form-control negrita border-secondary text-danger"  id="txt_factura_fecha">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="negrita text-secondary">No. Recibo</label>
                                        <input type="text" class="form-control negrita border-secondary text-danger"  id="txt_factura_no_recibo">
                                    </div>
                                  
                                
                                </div>
                            </div>
                            <br>

                            <div class="form-group">
                                    <label class="negrita text-secondary">Documento Interno</label>
                                    <div class="input-group">
                                        <select classs="form-control negrita" id="cmb_factura_coddoc">
                                        </select>
                                        <input type="number" class="form-control negrita" disabled id="txt_factura_correlativo">
                                    </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-6">
                                
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Efectivo</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger" id="txt_factura_fp_efectivo">
                                    </div>
                                
                                </div>
                                <div class="col-6">
                            
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Depósito</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger"  id="txt_factura_fp_deposito">
                                    </div>
                                
                                </div>
                            </div>
                            <br>
                               

                            <div class="row">
                                <div class="col-6">
                                    
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Tarjeta</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger"  id="txt_factura_fp_tarjeta">
                                    </div>
                                    
                                </div>
                                <div class="col-6">
                            
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Cheque</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger"  id="txt_factura_fp_cheque">
                                    </div>
                                
                                </div>
                            </div>
                            <br>

                            <div class="form-group">
                                <label class="negrita text-secondary">Descripción de la forma de pago</label>
                                <input type="text" class="form-control negrita border-secondary" id="txt_factura_fp_descripcion">
                            </div>
                            

                            <div class="form-group">
                                <label>Observaciones:</label>
                                <textarea rows="2" class="form-control negrita border-secondary text-secondary" id="txt_factura_obs"></textarea>
                            </div>

                            <div class="form-group">

                                <label class="negrita text-secondary">Foto del Comprobante</label>
                                
                                <img id="img_factura_foto" width="100px" height="100px">

                                 <input type="file" id="txt_factura_foto" >
                                
                            </div>
                  
                </div>
            </div>


            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
            </button>


            <button class="btn btn-primary btn-bottom-middle btn-circle btn-xl hand shadow hidden"
            id="btn_factura_camera">                
                <i class="fal fa-camera"></i>
            </button>


            <button class="btn btn-info btn-bottom-r btn-circle btn-xl hand shadow"
            id="btnGuardarCobro">
                <i class="fal fa-save"></i>
            </button>
            `
        },
        vista_clientes:()=>{
            return `
              <div class="card card-rounded col-12">
                <div class="card-body p-4">

                    <h3 class="negrita text-secondary">SELECCIONE UN CLIENTE</h3>


                    <div class="table-responsive">

                        <div class="form-group">
                            <label>Escriba para buscar...</label>
                            <input type="text" class="form-control border-onne" placeholder="Escriba para buscar..."
                            oninput="funciones.FiltrarTabla('tbl_multi_clientes','txtBuscarMultiClientes')"
                            id="txtBuscarMultiClientes">
                        </div>

                        <table class="table table-bordered table-striped col-12 h-full" id="tbl_multi_clientes">
                            <thead class="bg-onne text-white">
                                <tr>
                                    <td>CLIENTE</td>
                                    <td>DIRECCION</td>
                                    <td>SALDO</td>
                                </tr>
                            </thead>
                            <tbody id="tbl_multi_data_clientes"></tbody>
                        </table>
                    </div>


                </div>
            </div>


            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
            </button>

            `
        },
        vista_cliente_facturas:()=>{
          
            return `
             <div class="card card-rounded col-12">
                <div class="card-body p-4">

                    <h3 class="negrita text-primary">FACTURAS PENDIENTES DEL CLIENTE</h3>
                    <br>
                    <label class="text-secondary negrita">INDIQUE EL MONTO A ABONAR EN CADA FACTURA</label>
                    <br>

                    <div class="table-reponsive">
                        
                        <div class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <label>Escriba para buscar...</label>
                                    <input type="text" class="form-control border-danger" 
                                        placeholder="Escriba para buscar..."
                                        id="txtBuscarFacturaCliente"
                                        oninput="funciones.FiltrarTabla('tbl_facturas_cliente','txtBuscarFacturaCliente')"    
                                    >
                                </div>
                            </div>
                            <div class="col-4">
                                <h3 class="negrita text-danger">Q 0.00</h3>
                            </div>
                        </div>

                        

                        <table class="table table-bordered col-12 h-full" id="tbl_facturas_cliente">
                            <thead class="bg-primary text-white">
                                <tr>
                                    <td>FACTURA</td>
                                    <td>VENCE</td>
                                    <td>IMPORTE</td>
                                    <td>SALDO</td>
                                    <td>ABONO</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tbl_data_facturas_cliente">
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-cuatro').click()">
                <i class="fal fa-arrow-left"></i>
            </button>

        
            <button class="btn btn-success btn-bottom-r btn-circle btn-xl hand shadow"
            id="btnSiguienteCobroMultiple">
                <i class="fal fa-arrow-right"></i>
            </button>
            `
            
        },
        vista_cobro_multiple:()=>{
            return `
            <div class="card card-rounded col-12">
                <div class="card-body p-4">

                    <h3 class="negrita text-secondary">NUEVO COBRO A MULTIPLES FACTURAS</h3>

                </div>
            </div>
            <br>

            <div class="card card-rounded col-12">
                <div class="card-body p-4">

                            <div class="row">
                                <div class="col-7">
                                    <h3 class="negrita text-primary">FORMA DEL PAGO</h3>
                                </div>
                                <div class="col-5">
                                    <h3 class="negrita text-danger text-right" id="lb_multi_total_recibo">Q 0.00</h3>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Fecha</label>
                                        <input type="date" class="form-control negrita border-secondary text-danger"  id="txt_multi_fecha">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label class="negrita text-secondary">No. Recibo</label>
                                        <input type="text" class="form-control negrita border-secondary text-danger"  id="txt_multi_no_recibo">
                                    </div>
                                </div>
                            </div>
                            <br>

                            <div class="form-group">
                                    <label class="negrita text-secondary">Documento Interno</label>
                                    <div class="input-group">
                                        <select classs="form-control negrita" id="cmb_multi_coddoc">
                                        </select>
                                        <input type="number" class="form-control negrita" disabled="true" id="txt_multi_correlativo">
                                    </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-6">
                                
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Efectivo</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger" id="txt_multi_fp_efectivo">
                                    </div>
                                
                                </div>
                                <div class="col-6">
                            
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Depósito</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger"  id="txt_multi_fp_deposito">
                                    </div>
                                
                                </div>
                            </div>
                            <br>
                               

                            <div class="row">
                                <div class="col-6">
                                    
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Tarjeta</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger"  id="txt_multi_fp_tarjeta">
                                    </div>
                                    
                                </div>
                                <div class="col-6">
                            
                                    <div class="form-group">
                                        <label class="negrita text-secondary">Cheque</label>
                                        <input type="number" class="form-control negrita border-secondary text-danger"  id="txt_multi_fp_cheque">
                                    </div>
                                
                                </div>
                            </div>
                            <br>

                            <div class="form-group">
                                <label class="negrita text-secondary">Descripción de la forma de pago</label>
                                <input type="text" class="form-control negrita border-secondary" id="txt_multi_fp_descripcion">
                            </div>
                            

                            <div class="form-group">
                                <label>Observaciones:</label>
                                <textarea rows="2" class="form-control negrita border-secondary text-secondary" id="txt_multi_obs"></textarea>
                            </div>

                            <div class="form-group">

                                <label class="negrita text-secondary">Foto del Comprobante</label>
                                
                                <img id="img_multi_foto" width="100px" height="100px">

                                <input type="file" id="txt_multi_foto" >
                                
                            </div>
                  
                </div>
            </div>
           


            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-cinco').click()">
                <i class="fal fa-arrow-left"></i>
            </button>

        
            <button class="btn btn-info btn-bottom-r btn-circle btn-xl hand shadow"
            id="btnGuardarCobroMultiple">
                <i class="fal fa-save"></i>
            </button>
            `
        },
        vista_abonos:()=>{
            return `
            <div class="card card-rounded col-12 shadow">
                <div class="card-body p-4">

                    <h3 class="text-onne negrita">Abonos de la Factura</h3>
                    <h5 class="negrita text-danger" id="lbFactura"></h5>
                    <h5 class="negrita text-secondary" id="lbFacturaCliente"></h5>
                    <h3 class="negrita text-danger" id="lbFacturaImporte"></h5>


                    <div class="table-responsive">
                        <table class="table table-bordered h-full col-12">
                            <thead class="bg-secondary text-white">
                                <tr>
                                    <td>DOCUMENTO</td>
                                    <td>NO.RECIBO</td>
                                    <td>FECHA</td>
                                    <td>ABONO</td>
                                    <td>OBS</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblDataAbonos">
                            </tbody>
                        
                        </table>
                    </div>

                
                </div>
            </div>



            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
            </button>
            `
        },
        vista_lista_recibos:()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body p-2">
                    
                    <h4 class="negrita text-danger">Documentos de Pago Emitidos</h4>
                    
                    <div class="table-responsive col-12">
                        
                        <div class="form-group">
                            <label>Escriba para buscar...</label>
                            <input type="text" class="form-control" placeholder="Escriba para buscar..."
                            id="txtBuscarRecibo"
                            oninput="funciones.FiltrarTabla('tbl_recibos','txtBuscarRecibo')">
                        </div>

                        <table class="table table-bordered h-full col-12" id="tbl_recibos">
                            <thead class="bg-onne text-white">
                                <tr>
                                    <td>DOCUMENTO</td>
                                    <td>FECHA</td>
                                    <td>CLIENTE</td>
                                    <td>IMPORTE</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tbl_data_recibos">
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>

            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
            </button>

            `
        },
        modal_camara:()=>{
            return `
            <div class="modal fade js-modal-settings modal-backdrop-transparent modal-with-scroll" tabindex="-1" 
                role="dialog" aria-hidden="true" id="modal_barcode">
                <div class="modal-dialog modal-dialog-right modal-xl">
                    <div class="modal-content">
                        <div class="dropdown-header bg-danger d-flex justify-content-center align-items-center w-100">
                            <h4 class="m-0 text-center color-white" id="">
                                Lectura de Codigo QR
                            </h4>
                        </div>
                        <div class="modal-body p-4">
                            
                            <div class="card card-rounded" id="">
                                <div class="card-body p-4">

                                   <div class="" id="root_barcode">
                                    </div>

                                </div>

                                <br>
                                
                                <button class="btn btn-xl btn-secondary btn-circle hand shadow" data-dismiss="modal">
                                    <i class="fal fa-arrow-left"></i>
                                </button>
                            </div>                              

                        </div>
                    </div>
                </div>
            </div>

            
            `
        },
    }

    root.innerHTML = view.body();

};

function addListeners(){


        funciones.slideAnimationTabs();


        get_tbl_cxc();


    

        
        listeners_cobro_individual();
        
        listeners_cobro_multiple();

};

function listeners_cobro_individual(){


    document.getElementById('cmb_factura_coddoc').innerHTML = `<option value='${GlobalCoddocRec}'>${GlobalCoddocRec}</option>`;
            classTipoDocumentos.correlativo(document.getElementById('cmb_factura_coddoc').value)
            .then((correlativo)=>{
                document.getElementById('txt_factura_correlativo').value = correlativo;
            })
            .catch(()=>{
                document.getElementById('txt_factura_correlativo').value = '0';
            })
    


       


        document.getElementById('txt_factura_fp_efectivo').addEventListener('input',()=>{
            get_total_fpago()
        });

        document.getElementById('txt_factura_fp_deposito').addEventListener('input',()=>{
            get_total_fpago()
        });

        document.getElementById('txt_factura_fp_tarjeta').addEventListener('input',()=>{
            get_total_fpago()
        });
        
        document.getElementById('txt_factura_fp_cheque').addEventListener('input',()=>{
            get_total_fpago()
        });


        let btnGuardarCobro = document.getElementById('btnGuardarCobro');
        btnGuardarCobro.addEventListener('click',()=>{


          

                funciones.Confirmacion('¿Está seguro que desea CREAR este nuevo Recibo de Pago?')
                .then((value)=>{
                    if(value==true){

                                get_total_fpago()
                                .then((total)=>{
                                        if(Number(total)==0){
                                            funciones.AvisoError('Escriba el monto pagado');
                                        }else{

                                            btnGuardarCobro.disabled = true;
                                            btnGuardarCobro.innerHTML = `<i class="fal fa-spin fa-save"></i>`;

                                            funciones.showToast('Cargando correlativo');

                                            get_correlativo_recibos()
                                            .then(()=>{

                                                if(document.getElementById('cmb_factura_coddoc').value.toString()==''){
                                                         funciones.AvisoError('Revise el correlativo de su recibo');
                                                        btnGuardarCobro.disabled = false;
                                                        btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                                        return;
                                                };
                                                if(document.getElementById('txt_factura_correlativo').value.toString()=='0'){
                                                         funciones.AvisoError('Revise el correlativo de su recibo');
                                                        btnGuardarCobro.disabled = false;
                                                        btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                                        return;
                                                };

                                                btnGuardarCobro.disabled = true;
                                                btnGuardarCobro.innerHTML = `<i class="fal fa-spin fa-save"></i>`;

                                                insert_data_cxc()
                                                .then(()=>{
                                                    btnGuardarCobro.disabled = false;
                                                    btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                                    funciones.Aviso('Documento creado exitosamente!!');

                                                    let coddoc = document.getElementById('cmb_factura_coddoc').value;
                                                    let correlativo = document.getElementById('txt_factura_correlativo').value;

                                                  

                                                    fcn_abrir_ticket_pago(GlobalEmpnit,coddoc,correlativo);

                                                    document.getElementById('tab-uno').click();
                                                    get_tbl_cxc();
                                                })
                                                .catch(()=>{
                                                    funciones.AvisoError('No se pudo crear el recibo de pago');
                                                    btnGuardarCobro.disabled = false;
                                                    btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                                    
                                                })
                                                
                                            })
                                            .catch(()=>{
                                                funciones.AvisoError('No se pudo obtener el correlativo de recibos, revise su conexion a internet');
                                                btnGuardarCobro.disabled = false;
                                                btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                            })

                                            



                                        };


                                })



                        


                    }
                })

          

        });


      
        
        document.getElementById('txt_factura_foto').addEventListener('change',()=>{

            const image = document.getElementById('txt_factura_foto').files[0];
    
            if (image !== undefined) {
                const fileReader = new FileReader();
                
                fileReader.addEventListener('load', function () {
                    const imgEl = document.getElementById('img_factura_foto');
                    imgEl.src = this.result;
                    imgEl.alt = 'La imagen no cargado correctamente.';
                    
                });    
                
                fileReader.readAsDataURL(image);
            }else{
                document.getElementById('img_factura_foto').src = '';
            }
        });



};

function BACKUP_listeners_cobro_individual(){


    
      classTipoDocumentos.comboboxTipodoc('PRC','cmb_factura_coddoc')
        .then(()=>{
            classTipoDocumentos.correlativo(document.getElementById('cmb_factura_coddoc').value)
            .then((correlativo)=>{
                document.getElementById('txt_factura_correlativo').value = correlativo;
            })
            .catch(()=>{
                document.getElementById('txt_factura_correlativo').value = '0';
            })
        })
        .catch(()=>{
            document.getElementById('txt_factura_correlativo').value = '0';
        });


        document.getElementById('cmb_factura_coddoc').addEventListener('change',()=>{
            
                classTipoDocumentos.correlativo(document.getElementById('cmb_factura_coddoc').value)
                .then((correlativo)=>{
                    document.getElementById('txt_factura_correlativo').value = correlativo;
                })
                .catch(()=>{
                    document.getElementById('txt_factura_correlativo').value = '0';
                })

        });


        document.getElementById('txt_factura_fp_efectivo').addEventListener('input',()=>{
            get_total_fpago()
        });

        document.getElementById('txt_factura_fp_deposito').addEventListener('input',()=>{
            get_total_fpago()
        });

        document.getElementById('txt_factura_fp_tarjeta').addEventListener('input',()=>{
            get_total_fpago()
        });
        
        document.getElementById('txt_factura_fp_cheque').addEventListener('input',()=>{
            get_total_fpago()
        });


        let btnGuardarCobro = document.getElementById('btnGuardarCobro');
        btnGuardarCobro.addEventListener('click',()=>{


          

                funciones.Confirmacion('¿Está seguro que desea CREAR este nuevo Recibo de Pago?')
                .then((value)=>{
                    if(value==true){

                                get_total_fpago()
                                .then((total)=>{
                                        if(Number(total)==0){
                                            funciones.AvisoError('Escriba el monto pagado');
                                        }else{

                                            btnGuardarCobro.disabled = true;
                                            btnGuardarCobro.innerHTML = `<i class="fal fa-spin fa-save"></i>`;

                                            funciones.showToast('Cargando correlativo');

                                            get_correlativo_recibos()
                                            .then(()=>{

                                                btnGuardarCobro.disabled = true;
                                                btnGuardarCobro.innerHTML = `<i class="fal fa-spin fa-save"></i>`;

                                                insert_data_cxc()
                                                .then(()=>{
                                                    btnGuardarCobro.disabled = false;
                                                    btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                                    funciones.Aviso('Documento creado exitosamente!!');

                                                    let coddoc = document.getElementById('cmb_factura_coddoc').value;
                                                    let correlativo = document.getElementById('txt_factura_correlativo').value;

                                                    fcn_abrir_ticket_pago(GlobalEmpnit,coddoc,correlativo);

                                                    document.getElementById('tab-uno').click();
                                                    get_tbl_cxc();
                                                })
                                                .catch(()=>{
                                                    funciones.AvisoError('No se pudo crear el recibo de pago');
                                                    btnGuardarCobro.disabled = false;
                                                    btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                                    
                                                })
                                                
                                            })
                                            .catch(()=>{
                                                funciones.AvisoError('No se pudo obtener el correlativo de recibos, revise su conexion a internet');
                                                btnGuardarCobro.disabled = false;
                                                btnGuardarCobro.innerHTML = `<i class="fal fa-save"></i>`;
                                            })

                                            



                                        };


                                })



                        


                    }
                })

          

        });


      
        
        document.getElementById('txt_factura_foto').addEventListener('change',()=>{

            const image = document.getElementById('txt_factura_foto').files[0];
    
            if (image !== undefined) {
                const fileReader = new FileReader();
                
                fileReader.addEventListener('load', function () {
                    const imgEl = document.getElementById('img_factura_foto');
                    imgEl.src = this.result;
                    imgEl.alt = 'La imagen no cargado correctamente.';
                    
                });    
                
                fileReader.readAsDataURL(image);
            }else{
                document.getElementById('img_factura_foto').src = '';
            }
        });



};

function get_correlativo_recibos(){

    return new Promise((resolve, reject) => {
        
            classTipoDocumentos.correlativo(document.getElementById('cmb_factura_coddoc').value)
            .then((correlativo)=>{
                document.getElementById('txt_factura_correlativo').value = correlativo;
                resolve();
            })
            .catch(()=>{
                document.getElementById('txt_factura_correlativo').value = '0';
                reject();
            })

    })

            

};

function initView(){

    getView();
    addListeners();

};

function get_total_fpago(){

    let total = 0;
    
    return new Promise((resolve, reject) => {

        
        let efectivo = document.getElementById('txt_factura_fp_efectivo').value || 0;
        let deposito = document.getElementById('txt_factura_fp_deposito').value || 0;
        let tarjeta = document.getElementById('txt_factura_fp_tarjeta').value || 0;
        let cheque = document.getElementById('txt_factura_fp_cheque').value || 0;

        try {
            total = Number(efectivo) + Number(deposito) + Number(tarjeta) + Number(cheque);
        } catch (error) {
            total = 0;
        }
        
        document.getElementById('lb_factura_total_recibo').innerText = funciones.setMoneda(total,'Q');

        resolve(total);
        
    })

};

function get_data_cxc(){
    return new Promise((resolve,reject)=>{

        axios.post('/cxc/listado', {empnit:GlobalEmpnit,codven:GlobalCodUsuario})
        .then((response) => {
            if(response.status.toString()=='200'){
                let data = response.data;
                if(Number(data.rowsAffected[0])>0){
                    resolve(data);             
                }else{
                    reject();
                }            
            }else{
                reject();
            }             
        }, (error) => {
            reject();
        });
    }) 
}


function get_tbl_cxc(){


    let tabla = document.getElementById('containerCxc');
    
    let datos_tabla = '';
    
       
        datos_tabla = `<div class="form-group">
                            <label class="negrita text-secondary">Escriba para buscar...</label>
                            <input type="text" class="form-control negrita" id="txtBuscar"
                            oninput="funciones.FiltrarTabla('tblCxc','txtBuscar')"
                            placeholder="Escriba para buscar....">
                        </div>

                        <table class="table table-responsive table-hover col-12" id="tblCxc">
                            <thead class="bg-onne text-white">
                                 <td>DOCUMENTO</td>
                                    <td>CLIENTE</td>
                                    <td>VENCE</td>
                                    <td>IMPORTE</td>
                                    <td>ABONOS</td>
                                    <td>SALDO</td>
                                    <td></td>
                                    <td></td>
                            </thead>
                            <tbody id="tblDataCxc">
                            
                            </tbody>
                        </table>
                        `;
        tabla.innerHTML = datos_tabla;
        container = document.getElementById('tblDataCxc');
        container.innerHTML = GlobalLoader;

    

    get_data_cxc()
    .then((data)=>{
        let str = '';

                data.recordset.map((r)=>{
                     str += `
                    <tr>
                        <td>${r.CODDOC}-${r.CORRELATIVO}
                            <br>
                            <small>${funciones.convertDateNormal(r.FECHA)}</small>
                        </td>
                        <td>${r.NOMCLIE}
                            <br>
                            <small>${r.DIRCLIE}</small>
                        </td>
                        <td>${funciones.convertDateNormal(r.VENCE)}</td>
                        <td>${funciones.setMoneda(r.IMPORTE,'Q')}</td>
                        <td>${funciones.setMoneda(r.ABONOS,'Q')}</td>
                        <td>${funciones.setMoneda(r.SALDO,'Q')}</td>
                        <td>
                            <button class="btn btn-circle btn-success btn-md hand shadow"
                            onclick="get_nuevo_abono('${r.CODDOC}','${r.CORRELATIVO}','${r.FEL_SERIE}','${r.FEL_NUMERO}','${funciones.limpiarTexto(r.NOMCLIE)}','${r.IMPORTE}','${r.ABONOS}','${r.SALDO}')">
                                <i class="fal fa-dollar-sign"></i>
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-circle btn-warning btn-md hand shadow"
                            onclick="get_listado_abonos('${r.CODDOC}','${r.CORRELATIVO}','${r.NOMCLIE}','${funciones.setMoneda(r.IMPORTE,'Q')}')">
                                <i class="fal fa-list"></i>
                            </button>
                        </td>
                    </tr>
                    `
                })
                 container.innerHTML = str;

       

    })
    .catch(()=>{
        container.innerHTML = 'No hay datos...'
    })


};





function get_listado_abonos(coddoc,correlativo,nomclie,importe){

    document.getElementById('tab-tres').click();


    document.getElementById('lbFactura').innerText = `${coddoc}-${correlativo}`;
    document.getElementById('lbFacturaCliente').innerText = nomclie;
    document.getElementById('lbFacturaImporte').innerText = importe;


    get_tbl_abonos(coddoc,correlativo);

};


function get_tbl_abonos(coddoc,correlativo){


    let container = document.getElementById('tblDataAbonos');
    container.innerHTML = GlobalLoader;

    GF.data_cxc_abonos_factura(coddoc,correlativo)
    .then((data)=>{
        let str = '';

        data.recordset.map((r)=>{
            str += `
                <tr>
                    <td>${r.CODDOC}-${r.CORRELATIVO}</td>
                    <td>${r.NODOCPAGO}</td>
                    <td>${funciones.convertDateNormal(r.FECHA)}</td>
                    <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                    <td>${funciones.limpiarTexto(r.OBS)}</td>
                    <td>
                        <button class="btn btn-circle btn-outline-info btn-md hand shadow"
                        onclick="funciones.AvisoError('Aun no disponible')">
                            <i class="fal fa-print"></i>
                        </button>
                    </td>
                </tr>
            `
        })
        container.innerHTML = str;

    })
    .catch((err)=>{
        console.log(err);
        container.innerHTML = 'No se cargaron datos...'

    })



};






function get_nuevo_abono(coddoc,correlativo,felserie,felnumero,nomclie,importe,abonos,saldo){


    document.getElementById('tab-dos').click();


    document.getElementById('lbCobroFacturaCoddoc').innerText = coddoc;
    document.getElementById('lbCobroFacturaCorrelativo').innerText = correlativo;
    

    document.getElementById('lbCobroFacturaFel').innerText = `SAT: ${felserie} - ${felnumero}`;
    document.getElementById('lbCobroFacturaCliente').innerText = nomclie;

    document.getElementById('txt_factura_fp_efectivo').value = 0;
    document.getElementById('txt_factura_fp_deposito').value = 0;
    document.getElementById('txt_factura_fp_tarjeta').value = 0;
    document.getElementById('txt_factura_fp_cheque').value = 0;

    document.getElementById('txt_factura_fecha').value = funciones.getFecha();


    document.getElementById('lb_factura_importe').innerText = funciones.setMoneda(importe,'Q');
    document.getElementById('lb_factura_abonos').innerText = funciones.setMoneda(abonos,'Q');
    document.getElementById('lb_factura_saldo').innerText = funciones.setMoneda(saldo,'Q');

    document.getElementById('img_factura_foto').src = '';
    document.getElementById('txt_factura_foto').value = '';

    get_total_fpago();
    
};


function insert_data_cxc(){


        let saldo = 0;
        let abonos = 0;
        let foto = document.getElementById('img_factura_foto').src || '';
    
        let data = {
            sucursal:GlobalEmpnit,
            fecha:funciones.devuelveFecha('txt_factura_fecha'),
            coddoc:document.getElementById('cmb_factura_coddoc').value,
            correlativo: document.getElementById('txt_factura_correlativo').value,
            usuario:GlobalUsuario,
            codven:GlobalCodUsuario,
            saldo_fac:saldo,
            abono_fac:abonos,
            coddoc_fac:document.getElementById('lbCobroFacturaCoddoc').innerText,
            correlativo_fac:document.getElementById('lbCobroFacturaCorrelativo').innerText,
            norecibo:document.getElementById('txt_factura_no_recibo').value || '',
            fpago_efectivo:Number(document.getElementById('txt_factura_fp_efectivo').value || 0),
            fpago_deposito:Number(document.getElementById('txt_factura_fp_deposito').value || 0),
            fpago_tarjeta:Number(document.getElementById('txt_factura_fp_tarjeta').value || 0),
            fpago_cheque:Number(document.getElementById('txt_factura_fp_cheque').value || 0),
            fpago_descripcion:funciones.limpiarTexto(document.getElementById('txt_factura_fp_descripcion').value || ''),
            obs:funciones.limpiarTexto(document.getElementById('txt_factura_obs').value || ''),
            foto:foto
        };



        return new Promise((resolve,reject)=>{

            axios.post('/cxc/insert_recibo_factura', data)
            .then((response) => {

                console.log(response);

                if(response.status.toString()=='200'){
                        
                        let data = response.data;
                        if(data=='error'){
                            reject()
                        }else{
                            if(Number(data.rowsAffected[0])>0){ 
                                resolve();             
                            }else{
                                reject();
                            }
                        }   
                           
                }else{
                    reject();
                }             
            }, (error) => {
                reject();
            });
        });
    
    

};


function listeners_cobro_multiple(){

    
    document.getElementById('btnListadoRecibos').addEventListener('click',()=>{

        document.getElementById('tab-siete').click();

        tbl_lista_recibos();

    })


        classTipoDocumentos.comboboxTipodoc('PRC','cmb_multi_coddoc')
        .then(()=>{
            classTipoDocumentos.correlativo(document.getElementById('cmb_multi_coddoc').value)
            .then((correlativo)=>{
                document.getElementById('txt_multi_correlativo').value = correlativo;
            })
            .catch(()=>{
                document.getElementById('txt_multi_correlativo').value = '0';
            })
        })
        .catch(()=>{
            document.getElementById('txt_multi_correlativo').value = '0';
        });

        document.getElementById('cmb_multi_coddoc').addEventListener('change',()=>{
            
                classTipoDocumentos.correlativo(document.getElementById('cmb_multi_coddoc').value)
                .then((correlativo)=>{
                    document.getElementById('txt_multi_correlativo').value = correlativo;
                })
                .catch(()=>{
                    document.getElementById('txt_multi_correlativo').value = '0';
                })

        });

        
        document.getElementById('btnNuevoCobroMultiple').addEventListener('click',()=>{
            nuevo_cobro_multiple();
           
        });


        document.getElementById('txt_multi_fp_efectivo').addEventListener('input',()=>{
            get_total_multiple_fpago()
        });

        document.getElementById('txt_multi_fp_deposito').addEventListener('input',()=>{
            get_total_multiple_fpago()
        });

        document.getElementById('txt_multi_fp_tarjeta').addEventListener('input',()=>{
            get_total_multiple_fpago()
        });
        
        document.getElementById('txt_multi_fp_cheque').addEventListener('input',()=>{
            get_total_multiple_fpago()
        });


        document.getElementById('txt_multi_foto').addEventListener('change',()=>{

            const image = document.getElementById('txt_multi_foto').files[0];
    
            if (image !== undefined) {
                const fileReader = new FileReader();
                
                fileReader.addEventListener('load', function () {
                    const imgEl = document.getElementById('img_multi_foto');
                    imgEl.src = this.result;
                    imgEl.alt = 'La imagen no cargado correctamente.';
                    
                });    
                
                fileReader.readAsDataURL(image);
            }else{
                document.getElementById('img_multi_foto').src = '';
            }
        });


        document.getElementById('btnSiguienteCobroMultiple').addEventListener('click',()=>{
            
                document.getElementById('tab-seis').click();

                if(get_total_abonos_cliente()==0){
                    funciones.AvisoError('Indique el monto abonado a cada documento');
                    return;
                }

        });



};
function nuevo_cobro_multiple(){
  
        document.getElementById('tab-cuatro').click();

        document.getElementById('lb_multi_total_recibo').innerText = 'Q 0.00';
        document.getElementById('txt_multi_fecha').value = funciones.getFecha();
        document.getElementById('txt_multi_no_recibo').value = '';
        document.getElementById('txt_multi_fp_efectivo').value = '0';
        document.getElementById('txt_multi_fp_deposito').value = '0';
        document.getElementById('txt_multi_fp_tarjeta').value = '0';
        document.getElementById('txt_multi_fp_cheque').value = '0';

        document.getElementById('txt_multi_fp_descripcion').value = '';
        document.getElementById('txt_multi_obs').value = '';
        document.getElementById('img_multi_foto').src = '';
        document.getElementById('txt_multi_foto').value = '';
    
        tbl_clientes_saldo();

};
function get_total_multiple_fpago(){

    let total = 0;
    
    return new Promise((resolve, reject) => {

        
        let efectivo = document.getElementById('txt_multi_fp_efectivo').value || 0;
        let deposito = document.getElementById('txt_multi_fp_deposito').value || 0;
        let tarjeta = document.getElementById('txt_multi_fp_tarjeta').value || 0;
        let cheque = document.getElementById('txt_multi_fp_cheque').value || 0;

        try {
            total = Number(efectivo) + Number(deposito) + Number(tarjeta) + Number(cheque);
        } catch (error) {
            total = 0;
        }
        
        document.getElementById('lb_multi_total_recibo').innerText = funciones.setMoneda(total,'Q');

        resolve(total);
        
    })

};
function data_cxc_clientes(){

    return new Promise((resolve,reject)=>{

        axios.post('/cxc/listado_clientes', {empnit:GlobalEmpnit,codven:GlobalCodUsuario})
        .then((response) => {
            if(response.status.toString()=='200'){
                let data = response.data;
                if(Number(data.rowsAffected[0])>0){
                    resolve(data);             
                }else{
                    reject();
                }            
            }else{
                reject();
            }             
        }, (error) => {
            reject();
        });
    }) 
};
function tbl_clientes_saldo(){

    let container = document.getElementById('tbl_multi_data_clientes');
    container.innerHTML = GlobalLoader;

    data_cxc_clientes()
    .then((data)=>{
        let str = '';
        data.recordset.map((r)=>{
            str += `
                <tr class="hand"
                    onclick="nuevo_cobro_multiple_cliente('${r.CODCLIE}')">
                    <td>${r.NOMCLIE}
                        <br>
                        <small>NIT: ${r.NIT}</small>
                    </td>
                    <td>${funciones.limpiarTexto(r.DIRCLIENTE)}</td>
                    <td>${funciones.setMoneda(r.SALDO,'Q')}</td>
                </tr>
            `
        })
        container.innerHTML = str;
    })
    .catch(()=>{
        container.innerHTML = '';
    })

};

function nuevo_cobro_multiple_cliente(codclie){

    document.getElementById('tab-cinco').click();




};

function get_total_abonos_cliente(){

    let total = 0;





    return total;

}



function tbl_lista_recibos(){

        let container = document.getElementById('tbl_data_recibos');
        container.innerHTML = GlobalLoader;
        
        GF.data_cxc_recibos_pago_pendientes_autorizar(GlobalCodUsuario)
        .then((data)=>{
            let str = '';
            data.recordset.map((r)=>{
                let btnElim = `btnElimn${r.CODDOC}-${r.CORRELATIVO}`
                str += `
                <tr>
                    <td>${r.CODDOC}-${r.CORRELATIVO}</td>
                    <td>${funciones.convertDateNormal(r.FECHA)}</td>
                    <td>${r.NOMCLIE}</td>
                    <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                    <td>
                        <button class="btn btn-primary btn-md btn-circle hand shadow"
                        onclick="fcn_abrir_ticket_pago('${GlobalEmpnit}','${r.CODDOC}','${r.CORRELATIVO}')">
                            <i class="fal fa-print"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-md btn-circle hand shadow" id="${btnElim}"
                        onclick="eliminar_recibo_pago('${GlobalEmpnit}','${r.CODDOC}','${r.CORRELATIVO}','${btnElim}')">
                            <i class="fal fa-trash"></i>
                        </button>
                    </td>
                </tr>
                `
            })
            container.innerHTML = str;
        })
        .catch((error)=>{
            console.log(error)
            container.innerHTML = 'No se cargaron datos...';
        })

  

};


function fcn_abrir_ticket_pago(sucursal,coddoc,correlativo){

    let url = `${window.location.origin.toString()}/factura?sucursal=${sucursal}&coddoc=${coddoc}&correlativo=${correlativo}`;
   
    window.open( url, '_blank');

};

function eliminar_recibo_pago(sucursal,coddoc,correlativo,idbtn){

    let btn = document.getElementById(idbtn);

    funciones.Confirmacion('¿Está seguro que desea ELIMINAR este recibo de pago?')
    .then((value)=>{
        if(value==true){

            btn.disabled = true;
            btn.innerHTML = `<i class="fal fa-trash fa-spin"></i>`;


            GF.cxc_delete_recibo_pago(coddoc,correlativo)
            .then(()=>{

                btn.disabled = false;
                btn.innerHTML = `<i class="fal fa-trash"></i>`;

                funciones.Aviso('Documento Eliminado Exitosamente!!');

                tbl_lista_recibos();                

            })
            .catch(()=>{
                
                funciones.AvisoError('El documento no se pudo ELIMINAR');

                btn.disabled = false;
                btn.innerHTML = `<i class="fal fa-trash"></i>`;

            })


        }
    })

};