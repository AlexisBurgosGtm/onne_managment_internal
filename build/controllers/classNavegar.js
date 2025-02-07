let classNavegar = {
    login : async(historial)=>{
        
        GlobalCoddoc = '';
        GlobalCodUsuario=99999;
        GlobalUsuario = '';
        GlobalPassUsuario = '';
        GlobalTipoUsuario ='';
        
            funciones.loadScript('../views/login/index.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGIN';
                InicializarVista();

                rootMenuFooter.innerHTML = '<b class="text-white"></b>';
                if(historial=='SI'){

                }else{
                    window.history.pushState({"page":0}, "login", GlobalUrl + '/login')
                }

                //document.getElementById('btnPedidosPend').style="visibility:hidden";
                
            })
        
            
    },
    inicio : async(tipousuario)=>{
      
        switch (tipousuario.toString()) {
            case '3':
                classNavegar.inicioVendedor();
                break;

            case '1':
                classNavegar.inicio_gerente();
                break;

            default:
                funciones.AvisoError('Esta aplicación es solo para VENTAS y ADMINISTRACION');
                break;
        };
    },
    inicioProgramador: ()=>{
        funciones.loadScript('../views/programador.js','root')
        .then(async()=>{
            GlobalSelectedForm='DEVELOPER';
            InicializarVista();
        })
    },
    inicioVendedor : async ()=>{

       

        let strFooter =    `<button class="btn btn-sm text-white"  id="btnMenu2VendedorClientes">
                                <i class="fal fa-shopping-cart"></i>
                                Facturar
                            </button>                            

                            <button class="btn btn-sm text-white" id="btnMenu2VendedorLogro">
                                <i class="fal fa-folder"></i>
                                Documentos
                            </button>

                            <button class="btn btn-sm text-white"  id="btnMenu2VendedorCxc">
                                <i class="fal fa-list"></i>
                                CxC
                            </button>

                            <button class="btn btn-sm text-white"  id="btnMConfig">
                                <i class="fal fa-cog"></i>
                                Config
                            </button>

                             

                            <button class="btn btn-sm text-white hidden"  id="btnMenu2VendedorClientesMapa">
                                <i class="fal fa-map"></i>
                                Mapa
                            </button>

                            <button class="btn btn-sm text-white hidden" id="btnPedidosPend">
                                <i class="fal fa-bell"></i>
                                Pendientes
                            </button>

                            <button class="btn btn-sm text-white hidden" id="btnMenu2Censo">
                                <i class="fal fa-edit"></i>
                                Cliente nuevo
                            </button>

                            
                    
                            `

            

                    rootMenuFooter.innerHTML = strFooter;
                                                 
                    let btnMenu2VendedorClientes = document.getElementById('btnMenu2VendedorClientes');
                    btnMenu2VendedorClientes.addEventListener('click',()=>{
                        classNavegar.inicioVendedorListado();
                    });


                    let btnMenu2VendedorClientesMapa = document.getElementById('btnMenu2VendedorClientesMapa');
                    btnMenu2VendedorClientesMapa.addEventListener('click',()=>{
                        classNavegar.ventasMapaClientes();
                    });

             
             
                    let btnMenu2VendedorLogro = document.getElementById('btnMenu2VendedorLogro');
                    btnMenu2VendedorLogro.addEventListener('click',()=>{
                        classNavegar.logrovendedor();
                    });

                    let btnMenu2VendedorCxc = document.getElementById('btnMenu2VendedorCxc');
                    btnMenu2VendedorCxc.addEventListener('click',()=>{
                        classNavegar.cxc();
                    });
                 
                    
                    let btnMenu2Censo = document.getElementById('btnMenu2Censo');
                    btnMenu2Censo.addEventListener('click',()=>{

                        classNavegar.inicio_censo();

                    });

                    let btnPedidosPend = document.getElementById('btnPedidosPend');
                    btnPedidosPend.addEventListener('click',()=>{
                            $('#ModalPendientes').modal('show');
                            dbCargarPedidosPendientes();
                    });

                 

                 
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();

                    //classNavegar.ventasMapaClientes();
                    classNavegar.inicioVendedorListado();

                    //document.getElementById('btnPedidosPend').style="visibility:visible";

                    
                    let btnMConfig = document.getElementById('btnMConfig');
                    btnMConfig.addEventListener('click',()=>{
                        if(GlobalSelectedForm=='LOGIN'){
                            funciones.AvisoError('Debe iniciar sesión para ver esta sección');
                            return;
                        };
                        classNavegar.ConfigVendedor();
                    });
                    
                  
             
    },
    inicioVendedorListado :async ()=>{
        funciones.loadScript('../views/vendedor/clientes.js','root')
        .then(async()=>{
            GlobalSelectedForm='INICIO';
            InicializarVista();
            window.history.pushState({"page":1}, "clientes", '/clientes');
        })
    },
    inicio_censo :async ()=>{
        funciones.loadScript('../views/vendedor/censo.js','root')
        .then(async()=>{
            GlobalSelectedForm='INICIO';
            InicializarVista();
            window.history.pushState({"page":5}, "censo", '/censo');
        })
    },
    ventas: async(codigo,nombre,direccion,nit)=>{
        
            funciones.loadScript('./views/vendedor/facturacion.js','root')
            .then(()=>{
                GlobalSelectedForm ='VENTAS';
                iniciarVistaVentas(codigo,nombre,direccion,nit);
                window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
            })
          
    },
    cxc: async()=>{
        
        funciones.loadScript('./views/cxc/cxc.js','root')
        .then(()=>{
            GlobalSelectedForm ='CXC';
            initView();
        })
      
    },
    vendedorCenso: async()=>{
        
        funciones.loadScript('./views/vendedor/censo.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORCENSO';
            iniciarVistaVendedorCenso();
        })
      
    },
    ventasMapaClientes: async(historial)=>{
        funciones.loadScript('./views/vendedor/mapaclientes.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORMAPACLIENTES';
            iniciarVistaVendedorMapaClientes();
            if(historial=='SI'){

            }else{
            window.history.pushState({"page":3}, "mapaclientes", GlobalUrl + '/mapaclientes')
            }
        })
    },
    vendedorReparto: async()=>{
        
        funciones.loadScript('./views/vendedor/reparto.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORREPARTO';
            iniciarVistaVendedorReparto();
        })
      
    },
    pedidos: async (historial)=>{
        funciones.loadScript('../views/pedidos/vendedor.js','root')
        .then(()=>{
            GlobalSelectedForm='PEDIDOS';
            inicializarVistaPedidos();
            if(historial=='SI'){

            }else{
            window.history.pushState({"page":4}, "logro", GlobalUrl + '/logro')
            }
        })             
    },
    logrovendedor: (historial)=>{
        funciones.loadScript('../views/vendedor/logro.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGROVENDEDOR';
                inicializarVistaLogro();
                if(historial=='SI'){

                }else{
                window.history.pushState({"page":5}, "logromes", GlobalUrl + '/logromes')
                }
        })
    },
    ConfigVendedor: ()=>{
        funciones.loadScript('../views/config.js','root')
        .then(()=>{
            GlobalSelectedForm='CONFIG';
            initView();
        })
    },
    inicio_supervisor : async ()=>{
        let strFooter =    `<button class="btn btn-sm "  id="btnMenu2SuperMapa">
                                <i class="fal fa-map"></i>
                                Gps Ventas
                            </button> 
                            <button class="btn btn-sm "  id="btnMenu2SuperVentas">
                                <i class="fal fa-shopping-cart"></i>
                                Reportes
                            </button>
                            <button class="btn btn-sm "  id="btnMenu2SuperHorarios">
                                <i class="fal fa-clock"></i>
                                Horarios
                            </button>
                            `
                    rootMenuFooter.innerHTML = strFooter;
                                               
                                        
                    let btnMenu2SuperMapa = document.getElementById('btnMenu2SuperMapa');
                    btnMenu2SuperMapa.addEventListener('click',()=>{
                            classNavegar.supervisor_mapa();
                    });

                    let btnMenu2SuperVentas = document.getElementById('btnMenu2SuperVentas');
                    btnMenu2SuperVentas.addEventListener('click',()=>{
                            classNavegar.supervisor_ventas();
                    });

                    let btnMenu2SuperHorarios = document.getElementById('btnMenu2SuperHorarios');
                    btnMenu2SuperHorarios.addEventListener('click',()=>{
                            classNavegar.supervisor_horarios();
                    });

                
                 
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();

                    //actualiza las credenciales
                    updateDateDownload();

                    document.getElementById('btnPedidosPend').style="visibility:hidden";

                    classNavegar.supervisor_ventas();

                  
             
    },
    supervisor_ventas:()=>{
        funciones.loadScript('./views/supervisor/ventas.js','root')
        .then(()=>{
            GlobalSelectedForm ='SUPERVISOR';
            initView();
            //window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
        })
    },
    supervisor_mapa:()=>{
        funciones.loadScript('./views/supervisor/mapa.js','root')
        .then(()=>{
            GlobalSelectedForm ='SUPERVISORMAPA';
            initView();
            //window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
        })
    },
    supervisor_horarios:()=>{
        funciones.loadScript('./views/supervisor/horarios.js','root')
        .then(()=>{
            GlobalSelectedForm ='SUPERVISORHORARIOS';
            initView();
            //window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
        })
    },
    inicio_repartidor : async ()=>{
        console.log('inicio Repartidor....')

        let strFooter =    `
                            `
                    rootMenuFooter.innerHTML = strFooter;
                                               
                                        
                  
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();

                    
                    document.getElementById('btnPedidosPend').style="visibility:hidden";

                    classNavegar.repartidor_inicio();

                  
             
    },
    repartidor_inicio:()=>{
        funciones.loadScript('./views/repartidor/repartidor.js','root')
        .then(()=>{
            GlobalSelectedForm ='REPARTIDOR';
            initView();
        })
    },
    inicio_gerente : async ()=>{
       
        let strFooter =    `
                            `
        rootMenuFooter.innerHTML = strFooter;
                                               
        funciones.loadScript('./views/mgm_gerencia/inicio_gerencia.js','root')
        .then(()=>{
            GlobalSelectedForm ='GERENCIA';
            initView();
        })
                  
             
    },
}