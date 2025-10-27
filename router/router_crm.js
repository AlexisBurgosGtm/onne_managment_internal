const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/eventos_pendientes", async(req,res)=>{

    const{sucursal,codemp} = req.body;

    let qry = `
        SELECT IDEVENTO, EMPNIT,CODEMP,FECHA,TITULO,DESCRIPCION,ALLDAY,HORA_INICIA,HORA_TERMINA,PRIORIDAD,FINALIZADO
            FROM CRM_EVENTOS
            WHERE EMPNIT='${sucursal}' AND CODEMP=${codemp} AND FINALIZADO='NO';
    `
    
    
     execute.Query(res,qry);
     
});


router.post("/insert_evento", async(req,res)=>{

    const{sucursal,codemp,fecha,titulo,descripcion,allday,inicia,termina,prioridad} = req.body;

    let qry = `
        INSERT INTO CRM_EVENTOS (EMPNIT,CODEMP,FECHA,TITULO,DESCRIPCION,ALLDAY,HORA_INICIA,HORA_TERMINA,PRIORIDAD,FINALIZADO)
        SELECT '${sucursal}' AS EMPNIT, 
            ${codemp} AS CODEMP,
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

