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



module.exports = router;

