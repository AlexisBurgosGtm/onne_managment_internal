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
                <div class="card-body p-2">
                    
                    <h4 class="negrita text-danger">Facturas por Cobrar</h4>
                    
                    <div class="table-responsive col-12">
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
        vista_nuevo:()=>{

        }
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
                        <td></td>
                    </tr>
            `

        })

        container.innerHTML = str;

    })
    .catch(()=>{
        container.innerHTML = 'No hay datos...'
    })


};
