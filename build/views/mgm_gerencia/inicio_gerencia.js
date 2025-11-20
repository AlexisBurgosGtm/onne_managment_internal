function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                            <div class="row">
                                <div class="col-sm-12 col-xl-3 col-lg-3 col-md-4">
                                    <img src="./favicon.png" width="90px" height="90px">
                                </div>
                                <div class="col-sm-12 col-xl-9 col-lg-9 col-md-8">
                                    ${view.parametros()}    
                                </div>
                                
                            </div>
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                                    
                            <br>
                            <div class="row">
                                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    ${view.vista_card_ventas()}
                                </div>
                                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    ${view.vista_card_compras()}
                                </div>
                                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    ${view.vista_card_visitas()}
                                </div>
                            </div>

                            <br>
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    ${view.vista_chart_ventas()}
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    ${view.vista_chart_devoluciones()}
                                </div>
                            </div>
                            

                        </div>
                        
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_lista_fechas_compras()}
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_lista_inventarios()}
                        </div>
                        <div class="tab-pane fade" id="cuatro" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_lista_visitas()}
                        </div>
                        <div class="tab-pane fade" id="cinco" role="tabpanel" aria-labelledby="home-tab">
                             ${view.vista_lista_fechas()}
                        </div>
                        <div class="tab-pane fade" id="seis" role="tabpanel" aria-labelledby="home-tab">
                            
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
                    </ul>
                </div>

                 <button class="btn btn-secondary btn-xl btn-circle hand shadow btn-bottom-l"
                    id="btnInicio">
                        <i class="fal fa-home"></i>
                    </button>

                <button class="btn btn-info btn-xl btn-circle hand shadow btn-bottom-r"
                onclick="document.getElementById('tab-tres').click()">
                    <i class="fal fa-search"></i>
                </button>
               
            `
        },
        parametros:()=>{
            return `
            <div class="card card-rounded shadow hand col-12 border-onne">
                <div class="card-body">
                    <div class="form-group">
                        <label>Seleccione mes y año</label>
                        <div class="input-group">
                            <select class="form-control negrita border-onne text-onne" id="cmbMes"></select>
                            <select class="form-control negrita border-onne text-onne" id="cmbAnio"></select>
                        </div>
                    </div>
                </div>
            </div>
            `
        },
        vista_card_ventas:()=>{
            return `
            <div class="card card-rounded shadow hand col-12 border-primary" id="btnMenVentas">
                <div class="card-body">
                    <h5 class="text-onne negrita">VENTAS</h5>
                    
                </div>
            </div>
            `
        },
        vista_card_compras:()=>{
            return `
            <div class="card card-rounded shadow hand col-12 border-info" id="btnMenCompras">
                <div class="card-body">
                    <h5 class="text-info negrita">COMPRAS</h5>

                </div>
            </div>
            `
        },
        vista_card_visitas:()=>{
            return `
            <div class="card card-rounded shadow hand col-12 border-secondary" 
                id="btnMenVisitas">
                <div class="card-body">
                    <h5 class="text-secondary negrita">REGISTRO VISITAS</h5>
                                       
                </div>
            </div>
            `
        },
        vista_lista_fechas:()=>{
            return `
            <br>
            <div class="table-responsive col-12">
                <table class="table h-full col-12" id="tblFechas">
                    <thead class="bg-onne text-white negrita">
                        <tr>
                            <td>FECHA</td>
                            <td>TOTAL COSTO</td>
                            <td>TOTAL VENTA</td>
                            <td>UTILIDAD</td>
                        </tr>
                    </thead>
                    <tbody id="tblDataFechas">
                    </tbody>
                    <tfoot class="bg-onne text-warning negrita">
                        <tr>
                            <td></td>
                            <td id="lbTotalCostoVentas"></td>
                            <td id="lbTotalPrecioVentas"></td>
                            <td id="lbTotalUtilidadVentas"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

           
            `
        },
        vista_lista_fechas_compras:()=>{
            return `
            <br>
            <div class="table-responsive col-12">
                <table class="table h-full col-12" id="tblFechasC">
                    <thead class="bg-info text-white negrita">
                        <tr>
                            <td>FECHA</td>
                            <td>TOTAL COSTO</td>
                        </tr>
                    </thead>
                    <tbody id="tblDataFechasC">
                    </tbody>
                    <tfoot class="bg-info text-warning negrita">
                        <tr>
                            <td></td>
                            <td id="lbTotalCompraCosto"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
        
            
            `
        },
        vista_lista_inventarios:()=>{
            return `
            <br><br>
            <div class="form-group">
                <label>Búsqueda de producto</label>
                <div class="input-group">
                    <input type="text" id="txtBuscarProducto" class="form-control negrita text-danger border-secondary">
                    <button class="btn btn-secondary hand" id="btnBuscarProducto">
                        <i class="fal fa-search"></i>
                    </button>
                </div>
            </div>
            <br>
            <div class="table-responsive col-12">
                <table class="table table-responsive col-12" id="tblInventarios">
                    <thead class="bg-secondary text-white negrita">
                        <tr>
                            <td>PRODUCTO</td>
                            <td>EXIS.SISTEMA</td>
                            <td>C.ULTIMO</td>
                            <td>C.ANTERIOR</td>
                        </tr>
                    </thead>
                    <tbody id="tblDataInventarios">
                    </tbody>
                </table>
            </div>

            


            `
        },
        vista_lista_visitas:()=>{
            return `
         
            <br>
            <div class="table-responsive col-12">
                <table class="table h-full btn-bordered col-12" id="tblVisitas">
                    <thead class="bg-onne text-white negrita">
                        <tr>
                            <td>FECHA</td>
                            <td>EMPLEADO</td>
                            <td>TIPO</td>
                            <td>CLIENTE</td>
                            <td>MOTIVO / NOTAS</td>
                            <td>UBICACION</td>
                        </tr>
                    </thead>
                    <tbody id="tblDataVisitas">
                    </tbody>
                </table>
            </div>

        
            `
        },
        vista_chart_ventas:()=>{
            return `
            <div class="card card-rounded col-12">
                <div class="card-body p-4" id="container_chart_v">
                 
                   
                    
                </div>
            </div>
            `
        },
        vista_chart_devoluciones:()=>{
            return `
            <div class="card card-rounded col-12">
                <div class="card-body p-4" id="container_chart_d">
                 
                   
                    
                </div>
            </div>
            `
        },
       
    }


    root.innerHTML = view.body();


};


function addListeners(){


        funciones.slideAnimationTabs();

        let f = new Date();

        let mes = document.getElementById('cmbMes');
        let anio = document.getElementById('cmbAnio');
        mes.innerHTML = funciones.ComboMeses();
        anio.innerHTML = funciones.ComboAnio();

        mes.value = f.getMonth()+1;
        anio.value = f.getFullYear();

        selected_tab = 'inicio';


        mes.addEventListener('change',()=>{
            get_reports();
        });

        anio.addEventListener('change',()=>{
            get_reports();
        });


        get_reports();


        document.getElementById('btnBuscarProducto').addEventListener('click',()=>{
            let filtro = document.getElementById('txtBuscarProducto').value || '';
            get_rpt_inventarios(filtro);
        });


        document.getElementById('txtBuscarProducto').addEventListener('keyup',(e)=>{
            if (e.code === 'Enter') { 
                let filtro = document.getElementById('txtBuscarProducto').value || '';
                get_rpt_inventarios(filtro);
            };
            if (e.keyCode === 13 && !e.shiftKey) {
                let filtro = document.getElementById('txtBuscarProducto').value || '';
                get_rpt_inventarios(filtro);
            }; 
        });

        document.getElementById('btnInicio').addEventListener('click',()=>{
            document.getElementById('tab-uno').click();
            selected_tab = 'inicio';
            get_reports();  
        })


        document.getElementById('btnMenVentas').addEventListener('click',()=>{

            selected_tab = 'ventas';

            document.getElementById('tab-cinco').click();
            get_reports();

        });
        document.getElementById('btnMenCompras').addEventListener('click',()=>{

            selected_tab = 'compras';

            document.getElementById('tab-dos').click();
            get_reports();

        });
        document.getElementById('btnMenVisitas').addEventListener('click',()=>{
                
            selected_tab = 'visitas';

            document.getElementById('tab-cuatro').click();
            get_reports();

        });





};

function get_reports(){

    switch (selected_tab) {
        case 'inicio':
            chart_ventas();
            vista_chart_devoluciones();

            break;
        case 'ventas':
            get_rpt_fechas();

            break;
        case 'compras':
            get_rpt_fechas_compras();

            break;
        case 'inventario':
            
            break;
        case 'visitas':
            rpt_visitas_mes();

            break;
    
        default:
            break;
    }
};

function initView(){

    getView();
    addListeners();

};


function get_rpt_fechas(){
    
    let varTotalCosto = 0;
    let varTotalVenta = 0;
    let varTotalUtilidad = 0;

    let anio = document.getElementById('cmbAnio').value;
    let mes = document.getElementById('cmbMes').value;
    let container = document.getElementById('tblDataFechas')
    container.innerHTML = GlobalLoader;

    let data = {sucursal:GlobalEmpnit,
                anio:anio,
                mes:mes}

    GF.get_data_qry('/reportes/rpt_ventas_fechas',data)
    .then((datos)=>{

        let str = '';
        datos.recordset.map((r)=>{
            
            varTotalCosto += Number(r.COSTO);
            varTotalVenta += Number(r.VENTA);
            varTotalUtilidad += Number(r.UTILIDAD);

            let margen = funciones.setMoneda((Number(r.UTILIDAD)/Number(r.VENTA))*100,'')
            str += `
            <tr>
                <td>${funciones.convertDateNormal(r.FECHA)}</td>
                <td>${funciones.setMoneda(r.COSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.VENTA,'Q')}</td>
                <td>${funciones.setMoneda(r.UTILIDAD,'Q')} <small class="text-danger">(${margen})%</small></td>
            </tr>
            `
        })
        container.innerHTML = str;
      
        document.getElementById('lbTotalCostoVentas').innerText = funciones.setMoneda(varTotalCosto,'Q');
        document.getElementById('lbTotalPrecioVentas').innerText = funciones.setMoneda(varTotalVenta,'Q');
        document.getElementById('lbTotalUtilidadVentas').innerText = funciones.setMoneda(varTotalUtilidad,'Q');
        
    
    })
    .catch((error)=>{
        console.log(error);
        container.innerHTML = 'No hay datos para mostrar...';

        document.getElementById('lbTotalCostoVentas').innerText = '---';
        document.getElementById('lbTotalPrecioVentas').innerText = '---';
        document.getElementById('lbTotalUtilidadVentas').innerText = '---';
    })


};

function get_rpt_fechas_compras(){
    
    let varTotalCosto = 0;
    let varTotalVenta = 0;
    let varTotalUtilidad = 0;

    let anio = document.getElementById('cmbAnio').value;
    let mes = document.getElementById('cmbMes').value;
    let container = document.getElementById('tblDataFechasC')
    container.innerHTML = GlobalLoader;

    let data = {sucursal:GlobalEmpnit,
                anio:anio,
                mes:mes}

    GF.get_data_qry('/reportes/rpt_ventas_fechas_compras',data)
    .then((datos)=>{
        let str = '';
        datos.recordset.map((r)=>{
            
            varTotalCosto += Number(r.COSTO);
            varTotalVenta += Number(r.VENTA);
            varTotalUtilidad += Number(r.UTILIDAD);

            let margen = funciones.setMoneda((Number(r.UTILIDAD)/Number(r.VENTA))*100,'')
            str += `
            <tr>
                <td>${funciones.convertDateNormal(r.FECHA)}</td>
                <td>${funciones.setMoneda(r.COSTO,'Q')}</td>
            </tr>
            `
        })
        container.innerHTML = str;
    
        document.getElementById('lbTotalCompraCosto').innerText = funciones.setMoneda(varTotalCosto,'Q');
    })
    .catch((error)=>{
        console.log(error);
     
        document.getElementById('lbTotalCompraCosto').innerText = '---';

        container.innerHTML = 'No hay datos para mostrar...';
    })


};

function get_rpt_productos(){
    
    let anio = document.getElementById('cmbAnio').value;
    let mes = document.getElementById('cmbMes').value;
    let container = document.getElementById('tblDataProductos')
    container.innerHTML = GlobalLoader;

    let data = {sucursal:GlobalEmpnit,
                anio:anio,
                mes:mes}

    GF.get_data_qry('/reportes/rpt_ventas_productos',data)
    .then((datos)=>{
        let str = '';
        datos.recordset.map((r)=>{
            
            let margen = funciones.setMoneda(((Number(r.VENTA)-Number(r.COSTO))/Number(r.VENTA))*100,'')
            str += `
            <tr>
                <td>${r.DESPROD}</td>
                <td>${r.UNIDADES}</td>
                <td>${funciones.setMoneda(r.COSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.VENTA,'Q')}</td>
                <td>${funciones.setMoneda(Number(r.VENTA)-Number(r.COSTO),'Q')} <small class="text-danger">(${margen})%</small></td>
            </tr>
            `
        })
        container.innerHTML = str;
    })
    .catch((error)=>{
        container.innerHTML = 'No hay datos para mostrar...';
    })


};


function get_rpt_inventarios(filtro){
    
    let varTotalCosto = 0;
    let varTotalItems = 0;
    
    let container = document.getElementById('tblDataInventarios')
    container.innerHTML = GlobalLoader;

    let data = {sucursal:GlobalEmpnit,
                filtro:filtro
            }

    GF.get_data_qry('/reportes/rpt_inventario',data)
    .then((datos)=>{
        let str = '';
        datos.recordset.map((r)=>{
            varTotalItems +=1;
            varTotalCosto += Number(r.COSTO_ULTIMO);
            str += `
            <tr>
                <td>${funciones.limpiarTexto(r.DESPROD)}
                    <br>
                    <small>${r.DESMARCA}</small>
                </td>
                <td>${r.SALDO}</td>
                <td>${funciones.setMoneda(r.COSTO_ULTIMO,'Q')}</td>
                <td>${funciones.setMoneda(r.COSTO_ANTERIOR,'Q')}</td>
            </tr>
            `
        })
        container.innerHTML = str;
        
    })
    .catch((error)=>{
        console.log(error);
      
        container.innerHTML = 'No hay datos para mostrar...';
    })


};


function rpt_visitas_mes(){

    let container = document.getElementById('tblDataVisitas');
    container.innerHTML = GlobalLoader;

    let anio = document.getElementById('cmbAnio').value;
    let mes = document.getElementById('cmbMes').value;

    DATA_CRM.get_visitas_mes(GlobalEmpnit,mes,anio)
    .then((data)=>{

        let str = '';

        data.recordset.map((r)=>{
            str += `
            <tr>
                <td>${funciones.convertDateNormal(r.FECHA)}</td>
                <td>${r.EMPLEADO}</td>
                <td>${r.TIPO}</td>
                <td>${r.CLIENTE}
                    <br>
                    <small>${r.DIRCLIENTE}</small>
                </td>
                <td>${r.MOTIVO}
                    <br>
                    <small>${r.NOTAS}</small>
                </td>
                <td>
                    <button class="btn btn-md btn-circle btn-info hand shadow"
                    onclick="get_mapa_visita('${r.CLIENTE}','${r.LATITUD}','${r.LONGITUD}','${r.LATITUDCLIE}','${r.LONGITUDCLIE}')">
                        <i class="fal fa-map"></i>
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

function get_mapa_visita(cliente,visita_lat,visita_long,cliente_lat,cliente_long){



};


function get_data_ventas(){

    return new Promise((resolve,reject)=>{

        let anio = document.getElementById('cmbAnio').value;
        let mes = document.getElementById('cmbMes').value;

        let data = {sucursal:GlobalEmpnit,
                anio:anio,
                mes:mes}

        GF.get_data_qry('/reportes/rpt_ventas_fechas_asc',data)
        .then((datos)=>{
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })

    })

        
};
function chart_ventas(){


    document.getElementById('container_chart_v').innerHTML = '';
    document.getElementById('container_chart_v').innerHTML = ` <canvas id="container_chart_ventas" height="200px" width="500px"></canvas>`


    get_data_ventas()
    .then((datos)=>{

        let data = [];

        datos.recordset.map((r)=>{
            data.push({fecha:funciones.convertDateNormal(r.FECHA),importe:Number(r.VENTA)})
        })

        new Chart(
        document.getElementById('container_chart_ventas'),
        {
        type: 'line',
        data: {
            labels: data.map(row => row.fecha),
            datasets: [
            {
                label: 'Ventas por Fechas',
                data: data.map(row => row.importe)
            }
            ]
        }
        }
    );

    })
    .catch(()=>{

    })
    
  

};

function get_data_devoluciones(){

    return new Promise((resolve,reject)=>{

        let anio = document.getElementById('cmbAnio').value;
        let mes = document.getElementById('cmbMes').value;

        let data = {sucursal:GlobalEmpnit,
                anio:anio,
                mes:mes}

        GF.get_data_qry('/reportes/rpt_devoluciones_fechas_asc',data)
        .then((datos)=>{
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })

    })

        
}
function vista_chart_devoluciones(){


    document.getElementById('container_chart_d').innerHTML = '';
    document.getElementById('container_chart_d').innerHTML = ` <canvas id="container_chart_devoluciones" height="200px" width="500px"></canvas>`


    get_data_devoluciones()
    .then((datos)=>{

        let data = [];

        datos.recordset.map((r)=>{
            data.push({fecha:funciones.convertDateNormal(r.FECHA),importe:Number(r.VENTA)})
        })

        new Chart(
        document.getElementById('container_chart_devoluciones'),
        {
        type: 'line',
        data: {
            labels: data.map(row => row.fecha),
            datasets: [
                {
                    label: 'Devoluciones por Fechas',
                    borderColor: 'rgba(210, 20, 20, 1)',
                    data: data.map(row => row.importe)
                }
            ]
        }
        }
    );

    })
    .catch(()=>{

    })
    
  

};