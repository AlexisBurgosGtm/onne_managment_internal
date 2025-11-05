
function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.vista_listado() + view.modal_detalles()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           
                            
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
        vista_listado:()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body p-4">

                    <h3 class="text-onne negrita">Archivo de Visitas</h3>
                
                    <div class="form-group">
                        <label>Seleccione fecha inicial y final</label>
                        <div class="input-group">
                            <input type="date" class="form-control" id="txtFechaInicial">
                                <button class="hidden btn btn-md"></button>
                            <input type="date" class="form-control" id="txtFechaFinal">
                        </div>
                    </div>

                    <div class="table-responsive col-12">
                        <table class="table table-responsive col-12 h-full">
                            <thead class="bg-onne text-white">
                                <tr>
                                    <td>FECHA</td>
                                    <td>CLIENTE</td>
                                    <td>MOTIVO</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody id="tbl_data_visitas">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            `
        },
        modal_detalles:()=>{
             return `
            <div class="modal fade modal-with-scroll" 
                id="modal_detalles_visita" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content">
                            <div class="modal-header bg-onne text-white">
                                <label class="modal-title h3" id="">Registrar visita</label>
                            </div>

                            <div class="modal-body p-2">

                                <div class="card card-rounded col-12 p-2">
                                    <div class="card-body">

                                        <div class="form-group">
                                            <label class=text-secondary">Fecha</label>
                                            <input type="date" class="form-control text-primary negrita" id="txt_visita_fecha">
                                        </div>

                                        <div class="form-group">
                                            <label class="text-secondary">Cliente</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control col-10" id="txtNomCliente" disabled>
                                            </div>
                                        </div>

                                        <br>
                                        <div class="form-group">
                                            <label class=text-secondary">Motivo</label>
                                            <input type="text" class="form-control text-primary negrita" id="txt_visita_motivo"> 
                                        </div>
                                        

                                        <div class="form-group">
                                            <label class=text-secondary">Anotaciones</label>
                                            <textarea rows="3" class="form-control border-info" id="txt_visita_obs"></textarea>
                                        </div>

                                         <div class="form-group">
                                            <label class=text-secondary">Plan de Acción</label>
                                            <textarea rows="3" class="form-control border-info" id="txt_visita_acciones"></textarea>
                                        </div>
                                        
                                        
                                        <br>
                                        <div class="row">
                                            <div class="col-6">
                                                <button class="btn btn-secondary btn-xl btn-circle hand shadow" data-dismiss="modal">
                                                    <i class="fal fa-arrow-left"></i>
                                                </button>
                                            </div>
                                            <div class="col-6">
                                                
                                            </div>
                                        </div>

                                    
                                    
                                    </div>
                                </div>    

                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
        }
    }

    root.innerHTML = view.body();

};

function addListeners(){


    funciones.slideAnimationTabs();


    document.getElementById('txtFechaInicial').value = funciones.getFecha();
    document.getElementById('txtFechaFinal').value = funciones.getFecha();

    get_listado_eventos();
    

    document.getElementById('txtFechaInicial').addEventListener('change',()=>{
         get_listado_eventos();
    });
    document.getElementById('txtFechaFinal').addEventListener('change',()=>{
         get_listado_eventos();
    });

};

function initView(){

    getView();
    addListeners();

};


function get_listado_eventos(){

    let fi = funciones.devuelveFecha('txtFechaInicial');
    let ff = funciones.devuelveFecha('txtFechaFinal');
    
    let container = document.getElementById('tbl_data_visitas');
    container.innerHTML = GlobalLoader;

    DATA_CRM.get_visitas(GlobalCodSucursal,GlobalCodUsuario,fi,ff)
    .then((data)=>{

        let str = '';
        data.recordset.map((r)=>{
            let idBtnE = `idBtnE${r.ID}`;
            str += `
                <tr>
                    <td>${funciones.convertDateNormal(r.FECHA)}
                        <br>
                        <small class="negrita text-danger">${r.TIPO}</small>
                    </td>
                    <td>${r.CLIENTE}
                        <br>
                        <small>${r.DIRCLIENTE}</small>
                        <br>
                        <small>${r.MUNICIPIO}</small>
                    </td>
                    <td>${r.MOTIVO}</td>
                    <td>
                        <button class="btn btn-circle btn-md btn-secondary hand shadow"
                        onclick="get_detalles_evento('${r.FECHA.replace('T00:00:00.000Z','')}','${r.CLIENTE}','${r.MOTIVO}','${r.NOTAS}','${r.ACCIONES}')">
                            <i class="fal fa-list"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-circle btn-md btn-danger hand shadow"
                        onclick="eliminar_visita('${r.ID}','${idBtnE}')"
                        id="${idBtnE}">
                            <i class="fal fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `
        })
        container.innerHTML = str;

    })
    .catch(()=>{

        container.innerHTML = 'No se cargaron datos...';

    })



};


function eliminar_visita(idvisita,idbtn){

    let btn = document.getElementById(idbtn);

    funciones.Confirmacion('¿Está seguro que desea ELIMINAR esta visita?')
    .then((value)=>{
        if(value==true){

            btn.disabled = true;
            btn.innerHTML = `<i class="fal fa-spin fa-trash"></i>`;

            DATA_CRM.delete_visita(idvisita)
            .then(()=>{

                btn.disabled = false;
                btn.innerHTML = `<i class="fal fa-trash"></i>`;

                funciones.Aviso('Visita eliminada exitosamente!!');

                get_listado_eventos();

            })
            .catch(()=>{

                funciones.AvisoError('No se pudo ELIMINAR');

                btn.disabled = false;
                btn.innerHTML = `<i class="fal fa-trash"></i>`;

            })


        }
    })

};

function get_detalles_evento(fecha,cliente,motivo,notas,acciones){


    $("#modal_detalles_visita").modal('show');


    document.getElementById('txt_visita_fecha').value = fecha;
    document.getElementById('txtNomCliente').value = cliente;
    document.getElementById('txt_visita_motivo').value = motivo;
    document.getElementById('txt_visita_obs').value = notas;
    document.getElementById('txt_visita_acciones').value = acciones;


};