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
                    
                    <div class="table-responsive col-12">
                        
                        <div class="form-group">
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
                    </div>
                </div>
            </div>
            `
        },
        vista_cobro:()=>{
            return `
            <div class="card card-rounded col-12 shadow">
                <div class="card-body p-4">



                </div>
            </div>


            <button class="btn btn-secondary btn-bottom-l btn-circle btn-xl hand shadow"
            onclick="document.getElementById('tab-uno').click()">
                <i class="fal fa-arrow-left"></i>
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


};




function initView(){

    getView();
    addListeners();

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


    let container = document.getElementById('tblDataCxc');
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
                            onclick="get_nuevo_abono('${r.CODDOC}','${r.CORRELATIVO}')">
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


    
};






function get_nuevo_abono(coddoc,correlativo){

    document.getElementById('tab-dos').click();



    
};