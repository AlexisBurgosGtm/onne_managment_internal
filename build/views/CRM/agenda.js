function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.vista_calendario() + view.modal_nuevo_evento() + view.modal_detalles_evento()}
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
        vista_calendario:()=>{
            return `
            <div class="card card-rounded shadow col-12">
                <div class="card-body p-2">
                
                
                   
                    <div id="calendar"></div>
                                <!-- Modal : TODO -->
                                <!-- Modal end -->
                    


                </div>
            </div>            

            `
        },
        modal_nuevo_evento:()=>{
            return `
            <div class="modal fade" 
                id="modal_nuevo_evento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <label class="modal-title h3" id="">Detalles del nuevo Evento</label>
                            </div>

                            <div class="modal-body p-2">

                                <div class="card card-rounded col-12 p-2">
                                    <div class="card-body">

                                        <div class="form-group">
                                            <label class=text-secondary">Fecha</label>
                                            <input type="date" class="form-control text-primary negrita" id="txt_evento_fecha">
                                        </div>

                                        <br>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label class=text-secondary">Hora Empieza</label>
                                                    <div class="input-group">
                                                        <select class="form-control text-info negrita" id="cmb_evento_hora_inicia">
                                                        </select>
                                                        <select class="form-control text-info negrita" id="cmb_evento_minuto_inicia"'>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label class=text-secondary">Hora Finaliza</label>
                                                    <div class="input-group">
                                                        <select class="form-control text-info negrita" id="cmb_evento_hora_finaliza">
                                                        </select>
                                                        <select class="form-control text-info negrita" id="cmb_evento_minuto_finaliza">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br>

                                        <div class="form-group">
                                            <label class=text-secondary">Titulo del Evento</label>
                                            <input type="text" class="form-control text-primary negrita" id="txt_evento_titulo">
                                        </div>

                                        <div class="form-group">
                                            <label class=text-secondary">Detalles del Evento</label>
                                            <textarea rows="4" class="form-control text-primary negrita" id="txt_evento_detalles">
                                            </textarea>
                                        </div>

                                        <div class="form-group">
                                            <label class=text-secondary">Prioriad</label>
                                            <select class="form-control text-primary negrita" id="cmb_evento_prioridad">
                                                <option value="NORMAL">NO URGENTE</option>
                                                <option value="MEDIA">IMPORTANCIA MEDIA</option>
                                                <option value="ALTA">URGENTE</option>
                                            </select>
                                        </div>



                                        <br>
                                        <div class="row">
                                            <div class="col-6">
                                                <button class="btn btn-secondary btn-xl btn-circle hand shadow" data-dismiss="modal">
                                                    <i class="fal fa-arrow-left"></i>
                                                </button>
                                            </div>
                                            <div class="col-6">
                                                <button class="btn btn-onne btn-xl btn-circle hand shadow" id="btnGuardarEvento">
                                                    <i class="fal fa-save"></i>
                                                </button>
                                            </div>
                                        </div>

                                    
                                    
                                    </div>
                                </div>    

                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
        },
        modal_detalles_evento:()=>{
            return `
            <div class="modal fade" 
                id="modal_nuevo_detalles_evento" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <label class="modal-title h3" id="">Detalles del Evento</label>
                            </div>

                            <div class="modal-body p-2">

                                <div class="card card-rounded col-12 p-2">
                                    <div class="card-body">

                                        <div class="form-group">
                                            <label class=text-secondary">Fecha</label>
                                            <input type="date" class="form-control text-primary negrita" id="txt_evento_fechaD">
                                        </div>

                                        <br>
                                        <div class="row hidden">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label class=text-secondary">Hora Empieza</label>
                                                    <div class="input-group">
                                                        <select class="form-control text-info negrita" id="cmb_evento_hora_iniciaD">
                                                        </select>
                                                        <select class="form-control text-info negrita" id="cmb_evento_minuto_iniciaD"'>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label class=text-secondary">Hora Finaliza</label>
                                                    <div class="input-group">
                                                        <select class="form-control text-info negrita" id="cmb_evento_hora_finalizaD">
                                                        </select>
                                                        <select class="form-control text-info negrita" id="cmb_evento_minuto_finalizaD">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br>

                                        <div class="form-group">
                                            <label class=text-secondary">Titulo del Evento</label>
                                            <input type="text" class="form-control text-primary negrita" id="txt_evento_tituloD">
                                        </div>

                                        <div class="form-group">
                                            <label class=text-secondary">Detalles del Evento</label>
                                            <textarea rows="4" class="form-control text-primary negrita" id="txt_evento_detallesD">
                                            </textarea>
                                        </div>

                                        <div class="form-group">
                                            <label class=text-secondary">Prioriad</label>
                                            <select class="form-control text-primary negrita" id="cmb_evento_prioridadD">
                                                <option value="NORMAL">NO URGENTE</option>
                                                <option value="MEDIA">IMPORTANCIA MEDIA</option>
                                                <option value="ALTA">URGENTE</option>
                                            </select>
                                        </div>



                                        <br>
                                        <div class="row">
                                           
                                            <div class="col-4">
                                                <button class="btn btn-secondary btn-xl btn-circle hand shadow" data-dismiss="modal">
                                                    <i class="fal fa-arrow-left"></i>
                                                </button>
                                            </div>
                                             <div class="col-4">
                                                <button class="btn btn-danger btn-xl btn-circle hand shadow" id="btnEliminarEvento">
                                                    <i class="fal fa-trash"></i>
                                                </button>
                                            </div>
                                             <div class="col-4">
                                                <button class="btn btn-primary btn-xl btn-circle hand shadow" id="btnFinalizarEvento">
                                                    <i class="fal fa-check"></i>
                                                </button>
                                            </div>
                                        </div>

                                    
                                    
                                    </div>
                                </div>    

                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            `
        },
        vista_listado:()=>{
            return `
            <div class="card card-rounded shadow">
                <div class="card-body p-2">
                    <div class="table-responsive col-12">
                       




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


        document.getElementById('cmb_evento_hora_inicia').innerHTML = funciones.combo_horas();
        document.getElementById('cmb_evento_hora_finaliza').innerHTML = funciones.combo_horas();
        document.getElementById('cmb_evento_minuto_inicia').innerHTML = funciones.combo_minutos();
        document.getElementById('cmb_evento_minuto_finaliza').innerHTML = funciones.combo_minutos();

        init_calendar();


        let btnGuardarEvento = document.getElementById('btnGuardarEvento');
        btnGuardarEvento.addEventListener('click',()=>{

            let hi = document.getElementById('cmb_evento_hora_inicia').value;
            let mi = document.getElementById('cmb_evento_minuto_inicia').value;
            let hf = document.getElementById('cmb_evento_hora_finaliza').value;
            let mf = document.getElementById('cmb_evento_minuto_finaliza').value;

            let fecha = funciones.devuelveFecha('txt_evento_fecha');
            let hora_inicia = `${fecha.replace('/','-')}T${hi}:${mi}:00`;
            let hora_finaliza = `${fecha.replace('/','-')}T${hf}:${mf}:00`;
            let titulo = document.getElementById('txt_evento_titulo').value || '';
            let detalles = document.getElementById('txt_evento_detalles').value || '';
            let prioridad = document.getElementById('cmb_evento_prioridad').value;

            let allDay = 0;

            funciones.Confirmacion('¿Está seguro que desea CREAR este evento?')
            .then((value)=>{
                if(value==true){
        
                        btnGuardarEvento.disabled = true;
                        btnGuardarEvento.innerHTML = `<i class="fal fa-save fa-spin"></i>`;

                        DATA_CRM.insert_evento(GlobalCodSucursal,GlobalCodUsuario,fecha,
                            funciones.limpiarTexto(titulo),funciones.limpiarTextoCRM(detalles),
                            allDay,hora_inicia,hora_finaliza,prioridad)
                        .then(()=>{

                            btnGuardarEvento.disabled = false;
                            btnGuardarEvento.innerHTML = `<i class="fal fa-save"></i>`;
                        
                            funciones.Aviso('Evento creado exitosamente!!');

                            $("#modal_nuevo_evento").modal('hide');

                            init_calendar();

                        })
                        .catch(()=>{
                            
                            funciones.AvisoError('No se pudo crear este Evento');  
                            btnGuardarEvento.disabled = false;
                            btnGuardarEvento.innerHTML = `<i class="fal fa-save"></i>`;
                        
                        })



                }
            })
            

            
                        
            
           
           

        });


        let btnEliminarEvento = document.getElementById('btnEliminarEvento');
        btnEliminarEvento.addEventListener('click',()=>{

            funciones.Confirmacion('¿Está seguro que desea ELIMINAR este evento?')
            .then((value)=>{
                if(value==true){


                    btnEliminarEvento.disabled = true;
                    btnEliminarEvento.innerHTML = `<i class="fal fa-spin fa-trash"></i>`;

                    DATA_CRM.delete_evento(CRM_Selected_Id)
                    .then(()=>{
                        
                        btnEliminarEvento.disabled = false;
                        btnEliminarEvento.innerHTML = `<i class="fal fa-trash"></i>`;
                    
                        funciones.Aviso('Evento eliminado exitosamente!!');
                        
                        $("#modal_nuevo_detalles_evento").modal('hide');

                        init_calendar();

                    })
                    .catch(()=>{
                        funciones.AvisoError('No se pudo eliminar este evento, intentelo de nuevo');
                        btnEliminarEvento.disabled = false;
                        btnEliminarEvento.innerHTML = `<i class="fal fa-trash"></i>`;
                    })


                }
            })
        })

        let btnFinalizarEvento = document.getElementById('btnFinalizarEvento');
        btnFinalizarEvento.addEventListener('click',()=>{

             funciones.Confirmacion('¿Está seguro que desea FINALIZAR este evento?')
            .then((value)=>{
                if(value==true){


                    btnFinalizarEvento.disabled = true;
                    btnFinalizarEvento.innerHTML = `<i class="fal fa-spin fa-check"></i>`;

                    DATA_CRM.finalizar_evento(CRM_Selected_Id)
                    .then(()=>{
                        
                        btnFinalizarEvento.disabled = false;
                        btnFinalizarEvento.innerHTML = `<i class="fal fa-check"></i>`;
                    
                        funciones.Aviso('Evento finalizado exitosamente!!');

                        $("#modal_nuevo_detalles_evento").modal('hide');

                        init_calendar();

                    })
                    .catch(()=>{
                        funciones.AvisoError('No se pudo finalizar este evento, intentelo de nuevo');
                        btnFinalizarEvento.disabled = false;
                        btnFinalizarEvento.innerHTML = `<i class="fal fa-check"></i>`;
                    })


                }
            })


        });


};



function initView(){

    getView();
    addListeners();

};





//--------------------------------
//--- EVENTOS DEL CALENDARIO -----


function init_calendar(){

            //var todayDate = moment().startOf('day');
            //var YM = todayDate.format('YYYY-MM');
            //var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
            //var TODAY = todayDate.format('YYYY-MM-DD');
           // var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

                document.getElementById('calendar').innerHTML = '';
           
                var calendarEl = document.getElementById('calendar');

                DATA_CRM.get_eventos(GlobalCodSucursal,GlobalCodUsuario)
                .then((data)=>{

                    let eventos = [];

                    try {
                            data.recordset.map((r)=>{
                                let datos = {
                                    id: Number(r.IDEVENTO),
                                    title: r.TITULO,
                                    start: r.HORA_INICIA,
                                    end: r.HORA_TERMINA,
                                    allDay: Number(r.ALLDAY),
                                    className:FCRM.get_color_prioridad(r.PRIORIDAD),
                                    extendedProps: {
                                        date: r.FECHA.replace('T00:00:00.000Z','').replace('/','-'),
                                        description: r.DESCRIPCION,
                                        prioridad: r.PRIORIDAD
                                    },
                                }
                                eventos.push(datos)
                            })    
                    } catch (error) {
                        
                    }
                    

                        var calendar = new FullCalendar.Calendar(calendarEl,
                        {
                            plugins: ['dayGrid', 'list', 'timeGrid','dayGridPlugin', 'interaction', 'bootstrap'],
                            initialView: 'dayGridMonth',
                            themeSystem: 'bootstrap',
                            timeZone: 'UTC',
                            //dateAlignment: "month", //week, month
                            selectable: true,
                            locale: 'es',
                            buttonText:
                            {
                                today: 'Hoy',
                                month: 'Mes',
                                week: 'Semana',
                                day: 'Dia',
                                list: 'Lista'
                            },
                            eventTimeFormat:
                            {
                                hour: 'numeric',
                                minute: '2-digit',
                                meridiem: 'short'
                            },
                            navLinks: true,
                            header: {
                                left: 'prev,next',
                                center: 'title',
                                right: 'dayGridMonth,dayGridWeek,dayGridDay'
                            },
                            fixedWeekCount: false,
                            editable: true,
                            eventLimit: true, // allow "more" link when too many events
                            events: eventos,
                            eventClick:  function(info) {
                                
                                document.getElementById('txt_evento_tituloD').value = info.event.title;
                                document.getElementById('txt_evento_detallesD').value = info.event.extendedProps.description;
                                document.getElementById('txt_evento_fechaD').value = info.event.extendedProps.date;
                                document.getElementById('cmb_evento_prioridadD').value = info.event.extendedProps.prioridad;
                                
                                CRM_Selected_Id = Number(info.event.id);

                                $("#modal_nuevo_detalles_evento").modal('show');
                            },
                            dateClick: function(info) {
                                
                            
                                document.getElementById('txt_evento_fecha').value = info.dateStr;
                                document.getElementById('cmb_evento_hora_inicia').value = '06'
                                document.getElementById('cmb_evento_minuto_inicia').value = '00'
                                document.getElementById('cmb_evento_hora_finaliza').value = '06'
                                document.getElementById('cmb_evento_minuto_finaliza').value = '00'
                                document.getElementById('txt_evento_titulo').value = '';
                                document.getElementById('txt_evento_detalles').value = '';
                                document.getElementById('cmb_evento_prioridad').value = 'NORMAL'; 

                                
                                $("#modal_nuevo_evento").modal('show');


                            }
                            /*viewRender: function(view) {
                                localStorage.setItem('calendarDefaultView',view.name);
                                $('.fc-toolbar .btn-primary').removeClass('btn-primary').addClass('btn-outline-secondary');
                            },*/

                        });

                        calendar.render();

                })
              

};

function get_eventos(sucursal,){

}

//--- EVENTOS DEL CALENDARIO -----
//--------------------------------