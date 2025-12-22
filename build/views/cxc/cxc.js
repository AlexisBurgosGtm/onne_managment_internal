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
        vista_listado:()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body p-2">
                    
                    <h4 class="negrita text-danger">Facturas por Cobrar</h4>
                    
                    <div class="table-responsive col-12" id="containerCxc">
                        
                       
                    </div>
                </div>
            </div>
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
                                        <input type="number" class="form-control negrita" disabled="true" id="txt_factura_correlativo">
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
                                <input type="file" class="form-control negrita border-secondary" id="">
                            </div>
                  
                </div>
            </div>


            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
            </button>

            <button class="btn btn-info btn-bottom-r btn-circle btn-xl hand shadow"
            id="btnGuardarCobro">
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
    }

    root.innerHTML = view.body();

};

function addListeners(){


        funciones.slideAnimationTabs();


        get_tbl_cxc();

       

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

            funciones.AvisoError('En construccion')

        });

};


function initView(){

    getView();
    addListeners();

};

function get_total_fpago(){

    let total = 0;
    
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

function NUEVA_get_tbl_cxc(){


    let tabla = document.getElementById('containerCxc');
    
    let datos_tabla = '';
    let container = '';

    if(funciones.detectarPc()=='pc'){

       
        datos_tabla = `<div class="form-group">
                            <label class="negrita text-secondary">Escriba para buscar...</label>
                            <input type="text" class="form-control negrita" id="txtBuscar"
                            oninput="funciones.FiltrarTabla('tblCxc','txtBuscar')"
                            placeholder="Escriba para buscar....">
                        </div>

                        <table class="table table-responsive table-hover col-12" id="tblCxc">
                            <thead class="bg-onne text-white">
                                <tr>
                                    <td>DOCUMENTO</td>
                                    <td>CLIENTE</td>
                                    <td>VENCE</td>
                                    <td>IMPORTE</td>
                                    <td>ABONOS</td>
                                    <td>SALDO</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tblDataCxc">
                            
                            </tbody>
                        </table>
                        `;
        tabla.innerHTML = datos_tabla;
        container = document.getElementById('tblDataCxc');
        container.innerHTML = GlobalLoader;

    }else{ // es TEL
        container = document.getElementById('containerCxc');
        container.innerHTML = GlobalLoader;
    }

    
   

    get_data_cxc()
    .then((data)=>{
        let str = '';

            if(funciones.detectarPc()=='tel'){
                data.recordset.map((r)=>{
                    str += `
                        <div class="card card-rounded col-12">
                            <div class="card-body p-2">

                                <div class="row">
                                    ${r.NOMCLIE}
                                    <br>
                                    <small>${r.DIRCLIE}</small>
                                </div>
                                <br>
                                <div class="row">

                                </div>

                                ${r.CODDOC}-${r.CORRELATIVO}

                            
                            </div>
                        </div>
                        <br>
                        `
                })

                container.innerHTML = str;
            }else{ // es PC
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
                            onclick="get_nuevo_abono('${r.CODDOC}','${r.CORRELATIVO}','${r.FEL_SERIE}','${r.FEL_NUMERO}','${funciones.limpiarTexto(r.NOMCLIE)}')">
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

            }
       

    })
    .catch(()=>{
        container.innerHTML = 'No hay datos...'
    })


};
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
                                <tr>
                                    <td>DOCUMENTO</td>
                                    <td>CLIENTE</td>
                                    <td>VENCE</td>
                                    <td>IMPORTE</td>
                                    <td>ABONOS</td>
                                    <td>SALDO</td>
                                    <td></td>
                                    <td></td>
                                </tr>
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
                            <br>
                            <small class="negrita text-info">${r.FEL_SERIE}</small>
                            <br>
                            <small class="negrita text-info">${r.FEL_NUMERO}</small>

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

    get_total_fpago();
    
};


function insert_data_cxc(){


    let importe_pago = Number(document.getElementById('lb_factura_total_recibo').innerText.replace('Q','').replace(' ',''));

    let data = {
        sucursal:GlobalEmpnit,
        fecha:funciones.devuelveFecha('txt_factura_fecha'),
        coddoc:document.getElementById('cmb_factura_coddoc').value,
        correlativo: document.getElementById('txt_factura_correlativo').value,
        totalcosto:importe_pago,
        totalprecio:importe_pago,
        usuario:GlobalUsuario,
        coddoc_fac:document.getElementById('lbCobroFacturaCoddoc').innerText,
        correlativo_fac:document.getElementById('lbCobroFacturaCorrelativo').innerText,
        norecibo:document.getElementById('txt_factura_no_recibo').value || '',
        fpago_efectivo:Number(document.getElementById('txt_factura_fp_efectivo').value || 0),
        fpago_deposito:Number(document.getElementById('txt_factura_fp_deposito').value || 0),
        fpago_tarjeta:Number(document.getElementById('txt_factura_fp_tarjeta').value || 0),
        fpago_cheque:Number(document.getElementById('txt_factura_fp_cheque').value || 0),
        fpago_descripcion:funciones.limpiarTexto(document.getElementById('txt_factura_fp_descripcion').value || ''),
        obs:funciones.limpiarTexto(document.getElementById('txt_factura_obs').value || '')
    }



    return new Promise((resolve,reject)=>{

        axios.post('/cxc/insert_recibo_factura', data)
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