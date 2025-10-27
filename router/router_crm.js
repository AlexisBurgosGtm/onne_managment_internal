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






module.exports = router;

