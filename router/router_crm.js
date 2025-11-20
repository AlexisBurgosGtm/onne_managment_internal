const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/eventos_pendientes", async(req,res)=>{

    const{sucursal,codemp} = req.body;

    let qry = `
        SELECT 
            CRM_EVENTOS.IDEVENTO, 
            CRM_EVENTOS.EMPNIT, 
            CRM_EVENTOS.CODEMP, 
            CRM_EVENTOS.FECHA, 
            CRM_EVENTOS.TITULO, 
            CRM_EVENTOS.DESCRIPCION, 
            CRM_EVENTOS.ALLDAY, 
            CRM_EVENTOS.HORA_INICIA, 
            CRM_EVENTOS.HORA_TERMINA, 
            CRM_EVENTOS.PRIORIDAD, 
            CRM_EVENTOS.FINALIZADO, 
            CRM_EVENTOS.CODCLIENTE, 
            CLIENTES.NOMBRECLIENTE AS CLIENTE, 
            EMPLEADOS.NOMEMPLEADO AS EMPLEADO
        FROM CRM_EVENTOS LEFT OUTER JOIN
            EMPLEADOS ON CRM_EVENTOS.EMPNIT = EMPLEADOS.EMPNIT AND CRM_EVENTOS.CODEMP = EMPLEADOS.CODEMPLEADO LEFT OUTER JOIN
            CLIENTES ON CRM_EVENTOS.EMPNIT = CLIENTES.EMPNIT AND CRM_EVENTOS.CODCLIENTE = CLIENTES.CODCLIENTE
        WHERE 
            CRM_EVENTOS.EMPNIT='${sucursal}' AND 
            CRM_EVENTOS.CODEMP=${codemp} AND 
            CRM_EVENTOS.FINALIZADO='NO';
        `
    
    
     execute.Query(res,qry);
     
});


router.post("/insert_evento", async(req,res)=>{

    const{sucursal,codemp,codcliente,fecha,titulo,descripcion,allday,inicia,termina,prioridad} = req.body;

    let qry = `
        INSERT INTO CRM_EVENTOS (EMPNIT,CODEMP,CODCLIENTE,FECHA,TITULO,DESCRIPCION,ALLDAY,HORA_INICIA,HORA_TERMINA,PRIORIDAD,FINALIZADO)
        SELECT '${sucursal}' AS EMPNIT, 
            ${codemp} AS CODEMP,
            ${codcliente} AS CODCLIENTE,
            '${fecha}' AS FECHA,
            '${titulo}' AS TITULO,
            '${descripcion}' AS DESCRIPCION,
            ${allday} AS ALLDAY,
            '${inicia}' AS HORA_INICIA,
            '${termina}' AS HORA_TERMINA,
            '${prioridad}' AS PRIORIDAD,
            'NO' AS FINALIZADO
    `
    
    
     execute.Query(res,qry);
     
});
router.post("/finalizar_evento", async(req,res)=>{

    const{idevento} = req.body;

    let qry = `
        UPDATE CRM_EVENTOS SET FINALIZADO='SI' WHERE IDEVENTO=${idevento};
    `
    
     execute.Query(res,qry);
     
});
router.post("/delete_evento", async(req,res)=>{

    const{idevento} = req.body;

    let qry = `
        DELETE FROM CRM_EVENTOS WHERE IDEVENTO=${idevento};
    `
    
     execute.Query(res,qry);
     
});


router.post("/select_cliente", async(req,res)=>{

    const{sucursal,codemp,filtro} = req.body;

    let qry = `
        SELECT 
            CLIENTES.CODCLIENTE AS CODIGO, 
            CLIENTES.DIAVISITA AS VISITA, 
            CLIENTES.TIPONEGOCIO, 
            CLIENTES.NEGOCIO, 
            CLIENTES.NIT, 
            CLIENTES.NOMBRECLIENTE AS CLIENTE, 
            CLIENTES.DIRCLIENTE AS DIRECCION, 
            CLIENTES.CODMUNICIPIO AS CODMUN, 
            CLIENTES.CODDEPARTAMENTO AS CODDEPTO, 
            MUNICIPIOS.DESMUNICIPIO AS MUNICIPIO, 
            DEPARTAMENTOS.DESDEPARTAMENTO AS DEPARTAMENTO, 
            CLIENTES.TELEFONOCLIENTE AS TELEFONO, 
            CLIENTES.LATITUDCLIENTE AS LAT, 
            CLIENTES.LONGITUDCLIENTE AS LONG, 
            CLIENTES.CODRUTA, 
            RUTAS.DESRUTA AS RUTA, 
            CLIENTES.SALDO, 
            CLIENTES.HABILITADO, 
            CLIENTES.LASTSALE, 
            CLIENTES.GIRA AS CODGIRA, 
            DESCRIPCIONES.DESCRIPCION AS DESGIRA, 
            CLIENTES.CRM_INSTITUCION, 
            CLIENTES.CRM_CONTACTO, 
            CLIENTES.CRM_TELCONTACTO, 
            CLIENTES.CRM_FACTURA_NIT, 
            CLIENTES.CRM_FACTURA_NOMBRE, 
            CLIENTES.CRM_FACTURA_DIRECCION
        FROM  CLIENTES LEFT OUTER JOIN
            RUTAS ON CLIENTES.EMPNIT = RUTAS.EMPNIT AND CLIENTES.CODRUTA = RUTAS.CODRUTA LEFT OUTER JOIN
            DESCRIPCIONES ON CLIENTES.EMPNIT = DESCRIPCIONES.EMPNIT AND CLIENTES.GIRA = DESCRIPCIONES.CODIGO LEFT OUTER JOIN
            MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO LEFT OUTER JOIN
            DEPARTAMENTOS ON CLIENTES.CODDEPARTAMENTO = DEPARTAMENTOS.CODDEPARTAMENTO
        WHERE  
            (CLIENTES.EMPNIT = '${sucursal}') AND 
            (RUTAS.CODEMPLEADO = ${codemp}) AND 
            (CONCAT(CLIENTES.NEGOCIO, ' ', CLIENTES.NOMBRECLIENTE) LIKE '%${filtro}%') AND
            (CLIENTES.HABILITADO='SI')
        OR
            (CLIENTES.EMPNIT = '${sucursal}') AND 
            (RUTAS.CODEMPLEADO = ${codemp}) AND 
            (CLIENTES.NIT='${filtro}') AND
            (CLIENTES.HABILITADO='SI');
        `
    
    
     execute.Query(res,qry);
     
});


// VISITAS A CLIENTES

router.post("/select_visitas", async(req,res)=>{

    const{sucursal,codemp,fi,ff} = req.body;

    let qry = '';

    if(codemp.toString()=='TODOS'){
        qry = `
            SELECT 
                CRM_VISITAS.ID,
                CRM_VISITAS.FECHA, 
                CRM_VISITAS.CODEMP,
                EMPLEADOS.NOMEMPLEADO AS EMPLEADO, 
                CRM_VISITAS.CODCLIENTE, 
                CRM_VISITAS.MOTIVO, 
                CRM_VISITAS.NOTAS, 
                CRM_VISITAS.ACCIONES,
                ISNULL(CLIENTES.TIPO,'VENTAS') AS TIPO, 
                CLIENTES.NOMBRECLIENTE AS CLIENTE, 
                CLIENTES.DIRCLIENTE, 
                MUNICIPIOS.DESMUNICIPIO AS MUNICIPIO, 
                DEPARTAMENTOS.DESDEPARTAMENTO AS DEPARTAMENTO, 
                DESCRIPCIONES.DESCRIPCION AS GIRA,
                ISNULL(CRM_VISITAS.LATITUD,'0') AS LATITUD,
                ISNULL(CRM_VISITAS.LONGITUD,'0') AS LONGITUD
            FROM  DESCRIPCIONES RIGHT OUTER JOIN
                CLIENTES ON DESCRIPCIONES.CODIGO = CLIENTES.GIRA LEFT OUTER JOIN
                DEPARTAMENTOS ON CLIENTES.CODDEPARTAMENTO = DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
                MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO RIGHT OUTER JOIN
                CRM_VISITAS LEFT OUTER JOIN
                EMPLEADOS ON CRM_VISITAS.EMPNIT = EMPLEADOS.EMPNIT AND 
                CRM_VISITAS.CODEMP = EMPLEADOS.CODEMPLEADO ON CLIENTES.EMPNIT = CRM_VISITAS.EMPNIT AND 
                CLIENTES.CODCLIENTE = CRM_VISITAS.CODCLIENTE
            WHERE 
                (CRM_VISITAS.EMPNIT='${sucursal}') AND 
                (CRM_VISITAS.FECHA BETWEEN '${fi}' AND '${ff}');
            `
    }else{
        qry = `
            SELECT 
                CRM_VISITAS.ID,
                CRM_VISITAS.FECHA, 
                CRM_VISITAS.CODEMP,
                EMPLEADOS.NOMEMPLEADO AS EMPLEADO, 
                CRM_VISITAS.CODCLIENTE, 
                CRM_VISITAS.MOTIVO, 
                CRM_VISITAS.NOTAS, 
                CRM_VISITAS.ACCIONES,
                ISNULL(CLIENTES.TIPO,'VENTAS') AS TIPO,  
                CLIENTES.NOMBRECLIENTE AS CLIENTE, 
                CLIENTES.DIRCLIENTE, 
                MUNICIPIOS.DESMUNICIPIO AS MUNICIPIO, 
                DEPARTAMENTOS.DESDEPARTAMENTO AS DEPARTAMENTO, 
                DESCRIPCIONES.DESCRIPCION AS GIRA,
                ISNULL(CRM_VISITAS.LATITUD,'0') AS LATITUD,
                ISNULL(CRM_VISITAS.LONGITUD,'0') AS LONGITUD
            FROM  DESCRIPCIONES RIGHT OUTER JOIN
                CLIENTES ON DESCRIPCIONES.CODIGO = CLIENTES.GIRA LEFT OUTER JOIN
                DEPARTAMENTOS ON CLIENTES.CODDEPARTAMENTO = DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
                MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO RIGHT OUTER JOIN
                CRM_VISITAS LEFT OUTER JOIN
                EMPLEADOS ON CRM_VISITAS.EMPNIT = EMPLEADOS.EMPNIT AND 
                CRM_VISITAS.CODEMP = EMPLEADOS.CODEMPLEADO ON CLIENTES.EMPNIT = CRM_VISITAS.EMPNIT AND 
                CLIENTES.CODCLIENTE = CRM_VISITAS.CODCLIENTE
            WHERE 
                (CRM_VISITAS.EMPNIT='${sucursal}') AND 
                (CRM_VISITAS.FECHA BETWEEN '${fi}' AND '${ff}') AND
                (CRM_VISITAS.CODEMP=${codemp});
            `

    }

    
    
     execute.Query(res,qry);
     
});
router.post("/insert_visita", async(req,res)=>{

    const{sucursal,fecha,codemp,codcliente,motivo,notas,acciones,latitud,longitud} = req.body;

    let qry = `
        INSERT INTO CRM_VISITAS 
            (EMPNIT,FECHA,MES,ANIO,CODEMP,CODCLIENTE,MOTIVO,NOTAS,ACCIONES,LATITUD,LONGITUD)
        SELECT '${sucursal}' AS EMPNIT, 
                '${fecha}' AS FECHA, MONTH('${fecha}') AS MES, 
                YEAR('${fecha}') AS ANIO, 
                ${codemp} AS CODEMP, ${codcliente} AS CODCLIENTE, 
                '${motivo}' AS MOTIVO, '${notas}' AS NOTAS, '${acciones}' AS ACCIONES,
                '${latitud}' AS LATITUD, '${longitud}' AS LONGITUD;
                `

   
    
     execute.Query(res,qry);
     
});
router.post("/delete_visita", async(req,res)=>{

    const{idvisita} = req.body;

    let qry = `
        DELETE FROM CRM_VISITAS WHERE ID=${idvisita};
        `
    
  

     execute.Query(res,qry);
     
});
router.post("/select_visitas_mes", async(req,res)=>{

    const{sucursal,mes,anio} = req.body;

    let qry = '';


        qry = `
            SELECT 
                CRM_VISITAS.ID,
                CRM_VISITAS.FECHA, 
                CRM_VISITAS.CODEMP,
                EMPLEADOS.NOMEMPLEADO AS EMPLEADO, 
                CRM_VISITAS.CODCLIENTE, 
                CRM_VISITAS.MOTIVO, 
                CRM_VISITAS.NOTAS, 
                CRM_VISITAS.ACCIONES,
                ISNULL(CLIENTES.TIPO,'VENTAS') AS TIPO, 
                CLIENTES.NOMBRECLIENTE AS CLIENTE, 
                CLIENTES.DIRCLIENTE, 
                MUNICIPIOS.DESMUNICIPIO AS MUNICIPIO, 
                DEPARTAMENTOS.DESDEPARTAMENTO AS DEPARTAMENTO, 
                DESCRIPCIONES.DESCRIPCION AS GIRA,
                ISNULL(CRM_VISITAS.LATITUD,'0') AS LATITUD,
                ISNULL(CRM_VISITAS.LONGITUD,'0') AS LONGITUD,
                CLIENTES.LATITUDCLIENTE AS LATITUDCLIE, 
                CLIENTES.LONGITUDCLIENTE AS LONGITUDCLIE
            FROM  DESCRIPCIONES RIGHT OUTER JOIN
                CLIENTES ON DESCRIPCIONES.CODIGO = CLIENTES.GIRA LEFT OUTER JOIN
                DEPARTAMENTOS ON CLIENTES.CODDEPARTAMENTO = DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
                MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO RIGHT OUTER JOIN
                CRM_VISITAS LEFT OUTER JOIN
                EMPLEADOS ON CRM_VISITAS.EMPNIT = EMPLEADOS.EMPNIT AND 
                CRM_VISITAS.CODEMP = EMPLEADOS.CODEMPLEADO ON CLIENTES.EMPNIT = CRM_VISITAS.EMPNIT AND 
                CLIENTES.CODCLIENTE = CRM_VISITAS.CODCLIENTE
            WHERE 
                (CRM_VISITAS.EMPNIT='${sucursal}') AND 
                (CRM_VISITAS.MES=${mes}) AND (CRM_VISITAS.ANIO=${anio});
            `
    
    
     execute.Query(res,qry);
     
});




module.exports = router;

