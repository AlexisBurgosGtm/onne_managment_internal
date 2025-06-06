const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/listado", async(req,res)=>{

    const{empnit,codven} = req.body;

    let qry = `
       SELECT DOCUMENTOS.DOC_NIT AS NIT, 
                    DOCUMENTOS.DOC_NOMCLIE AS NOMCLIE, 
                    ISNULL(CLIENTES.DIRCLIENTE,'CIUDAD') AS DIRCLIE, 
                    DOCUMENTOS.FECHA, 
                    DOCUMENTOS.CODDOC, DOCUMENTOS.CORRELATIVO, 
                    DOCUMENTOS.TOTALPRECIO AS IMPORTE, 
                    ISNULL(DOCUMENTOS.TOTALPRECIO, 0) - ISNULL(DOCUMENTOS.DOC_ABONO, 0) AS SALDO, 
                    DOCUMENTOS.DOC_ABONO AS ABONOS, 
                    DOCUMENTOS.CODCLIENTE, 
                    DOCUMENTOS.VENCIMIENTO AS VENCE
        FROM     DOCUMENTOS LEFT OUTER JOIN
                  CLIENTES ON DOCUMENTOS.EMPNIT = CLIENTES.EMPNIT AND DOCUMENTOS.CODCLIENTE = CLIENTES.CODCLIENTE LEFT OUTER JOIN
                  TIPODOCUMENTOS ON DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT AND DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC
        WHERE  (TIPODOCUMENTOS.TIPODOC IN ('FAC', 'FEF', 'FES', 'FEC', 'FPC', 'FCP')) 
            AND (DOCUMENTOS.CONCRE = 'CRE') AND (DOCUMENTOS.DOC_SALDO > 0.01) 
            AND (DOCUMENTOS.EMPNIT = '${empnit}') AND (DOCUMENTOS.STATUS <> 'A') 
                  AND (DOCUMENTOS.CODVEN = ${codven})
        ORDER BY DOCUMENTOS.VENCIMIENTO DESC;
    `
    
    
     execute.Query(res,qry);
     
});








module.exports = router;

