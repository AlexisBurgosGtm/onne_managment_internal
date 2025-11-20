function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                            <div class="row">
                                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    ${view.vista_card_dos()}
                                </div>
                                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    ${view.vista_card_tres()}
                                </div>
                                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                    ${view.vista_card_inventario()}
                                </div>
                            </div>
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            <div class="row">
                                ${view.parametros()}
                            </div>
                            
                            <div class="row">
                                ${view.vista_lista_fechas()}
                            </div>
                        </div>
                        
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_lista_fechas_compras()}
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            ${view.vista_lista_inventarios()}
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
                            <td>TOTAL COMPRA</td>
                            <td>UTILIDAD</td>
                        </tr>
                    </thead>
                    <tbody id="tblDataFechasC">
                    </tbody>
                </table>
            </div>
            `
        },
        vista_lista_inventarios:()=>{
            return `
            <br>
            <div class="form-group">
                <label>Búsqueda de producto</label>
                <div class="input-group">
                    <input type="text" id="txtBuscarProducto" class="form-control negrita text-danger border-secondary">
                    <button class="btn btn-secondary hand" id="btnBuscarProducto">
                        <i class="fal fa-search"></i>
                    </button>
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
        vista_card_dos:()=>{
            return `
            <div class="card card-rounded shadow hand col-12 border-primary" onclick="document.getElementById('tab-uno').click()">
                <div class="card-body">
                    <h5 class="text-onne negrita">VENTAS</h5>
                    <small class="negrita">Total Costo:</small>
                    <label id="lbTotalCosto" class="text-secondary negrita"></label>
                    <br>
                    <small class="negrita">Total Venta:</small>
                    <label id="lbTotalVenta" class="text-success negrita"></label>
                    <br>
                    <small class="negrita">Utilidad:</small>
                    <label id="lbTotalUtilidad" class="text-danger negrita"></label>
                </div>
            </div>
            `
        },
        vista_card_tres:()=>{
            return `
            <div class="card card-rounded shadow hand col-12 border-info"  onclick="document.getElementById('tab-dos').click()">
                <div class="card-body">
                    <h5 class="text-info negrita">COMPRAS</h5>
                    <small class="negrita">Total Costo:</small>
                    <label id="lbTotalCostoC" class="text-secondary negrita"></label>
                    <br>
                    <small class="negrita">Total Venta:</small>
                    <label id="lbTotalVentaC" class="text-success negrita"></label>
                    <br>
                    <small class="negrita">Utilidad:</small>
                    <label id="lbTotalUtilidadC" class="text-danger negrita"></label>
                </div>
            </div>
            `
        },
        vista_card_inventario:()=>{
            return `
            <div class="card card-rounded shadow hand col-12 border-secondary" onclick="document.getElementById('tab-tres').click()">
                <div class="card-body">
                    <h5 class="text-secondary negrita">INVENTARIO</h5>
                    <small class="negrita">Total Costo:</small>
                    <label id="lbTotalCostoInv" class="text-secondary negrita"></label>
                    <br>
                    <small class="negrita">Total Items:</small>
                    <label id="lbTotalItems" class="text-success negrita"></label>
                    
                </div>
            </div>
            `
        }
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

    mes.addEventListener('change',()=>{
        try {
            get_rpt_fechas();
            get_rpt_fechas_compras();
            //get_rpt_productos();
        } catch (error) {
            
        }
    })

    anio.addEventListener('change',()=>{
        try {
            get_rpt_fechas();
            get_rpt_fechas_compras();
            //get_rpt_productos();
        } catch (error) {
            
        }
    })
 
    get_rpt_fechas();
    get_rpt_fechas_compras();
    //get_rpt_productos();
    //get_rpt_inventarios();

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
    })




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
        document.getElementById('lbTotalCosto').innerText = funciones.setMoneda(varTotalCosto,'Q');
        document.getElementById('lbTotalVenta').innerText = funciones.setMoneda(varTotalVenta,'Q');
        let margen = funciones.setMoneda((Number(varTotalUtilidad)/Number(varTotalVenta))*100,'')
        document.getElementById('lbTotalUtilidad').innerText = `${funciones.setMoneda(varTotalUtilidad,'Q')} (${margen}%)`;
    })
    .catch((error)=>{
        console.log(error);
        document.getElementById('lbTotalCosto').innerText = '---';
        document.getElementById('lbTotalVenta').innerText = '---';
        document.getElementById('lbTotalUtilidad').innerText = '---';
        container.innerHTML = 'No hay datos para mostrar...';
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
                <td>${funciones.setMoneda(r.VENTA,'Q')}</td>
                <td>${funciones.setMoneda(r.UTILIDAD,'Q')} <small class="text-danger">(${margen})%</small></td>
            </tr>
            `
        })
        container.innerHTML = str;
        document.getElementById('lbTotalCostoC').innerText = funciones.setMoneda(varTotalCosto,'Q');
        document.getElementById('lbTotalVentaC').innerText = funciones.setMoneda(varTotalVenta,'Q');
        let margen = funciones.setMoneda((Number(varTotalUtilidad)/Number(varTotalVenta))*100,'')
        document.getElementById('lbTotalUtilidadC').innerText = `${funciones.setMoneda(varTotalUtilidad,'Q')} (${margen}%)`;
    })
    .catch((error)=>{
        console.log(error);
        document.getElementById('lbTotalCostoC').innerText = '---';
        document.getElementById('lbTotalVentaC').innerText = '---';
        document.getElementById('lbTotalUtilidadC').innerText = '---';
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
        document.getElementById('lbTotalCostoInv').innerText = funciones.setMoneda(varTotalCosto,'Q');
        document.getElementById('lbTotalItems').innerText = varTotalItems;
    })
    .catch((error)=>{
        console.log(error);
        document.getElementById('lbTotalCostoInv').innerText = '----';
        document.getElementById('lbTotalItems').innerText = '0'
        container.innerHTML = 'No hay datos para mostrar...';
    })


};