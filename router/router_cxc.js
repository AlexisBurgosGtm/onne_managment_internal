const execute = require('./connection');
const express = require('express');
const router = express.Router();



router.post("/insert_recibo_factura", async(req,res)=>{

    const{sucursal,fecha,coddoc,correlativo,usuario,coddoc_fac,correlativo_fac,saldo_fac, abonos_fac,
        foto,
        norecibo,fpago_efectivo,fpago_deposito,fpago_tarjeta,fpago_cheque,fpago_descripcion,obs,codven
    } = req.body;

    
    let totalcosto = (Number(fpago_efectivo)+Number(fpago_deposito)+Number(fpago_tarjeta)+Number(fpago_cheque));
    let totalprecio= (Number(fpago_efectivo)+Number(fpago_deposito)+Number(fpago_tarjeta)+Number(fpago_cheque));


    let nuevocorrelativo = Number(correlativo)+1;

    let qry = `
            INSERT INTO DOCUMENTOS 
	                (EMPNIT,ANIO,MES,DIA,FECHA,HORA,
	                MINUTO,CODCAJA,CODDOC,CORRELATIVO,CODCLIENTE,
	                DOC_NIT,DOC_NOMCLIE,DOC_DIRCLIE,TOTALCOSTO,
	                TOTALPRECIO,CODEMBARQUE,STATUS,CONCRE,USUARIO,
	                CORTE,SERIEFAC,NOFAC,CODVEN,PAGO,VUELTO,MARCA,OBS, DOC_SALDO,DOC_ABONO,NODOCPAGO,
                    FPAGO_EFECTIVO,FPAGO_TARJETA,FPAGO_DEPOSITO,FPAGO_CHEQUE,FPAGO_DESCRIPCION)
                SELECT 
                    '${sucursal}' AS EMPNIT,
                    YEAR('${fecha}') AS ANIO,
                    MONTH('${fecha}') AS MES,
                    DAY('${fecha}') AS DIA,
                    '${fecha}' AS FECHA,
                    0 AS HORA,
	                0 AS MINUTO,
                    CODCAJA,
                    '${coddoc}' AS CODDOC,
                    ${correlativo} AS CORRELATIVO,
                    CODCLIENTE,
	                DOC_NIT,
                    DOC_NOMCLIE,
                    DOC_DIRCLIE,
                    ${totalcosto} AS TOTALCOSTO,
	                ${totalprecio} AS TOTALPRECIO,
                    CODEMBARQUE,
                    'O' AS STATUS,
                    'CON' AS CONCRE,
                    '${usuario}' AS USUARIO,
	                0 AS CORTE,
                    '${coddoc_fac}' AS SERIEFAC,
                    '${correlativo_fac}' AS NOFAC,
                    ${codven} AS CODVEN,
                    ${totalprecio} AS PAGO,
                    0 AS VUELTO,
                    '' AS MARCA,
                    '${obs}' AS OBS, 
                    0 AS DOC_SALDO,
                    ${totalprecio} AS DOC_ABONO,
                    '${norecibo}' AS NODOCPAGO,
                    ${fpago_efectivo} AS FPAGO_EFECTIVO,
                    ${fpago_tarjeta} AS FPAGO_TARJETA,
                    ${fpago_deposito} AS FPAGO_DEPOSITO,
                    ${fpago_cheque} AS FPAGO_CHEQUE,
                    '${fpago_descripcion}' AS FPAGO_DESCRIPCION
                FROM DOCUMENTOS
                WHERE 
                    EMPNIT='${sucursal}' AND 
                    CODDOC='${coddoc_fac}' AND 
                    CORRELATIVO=${correlativo_fac}; 
                `
    
            
                let qryUpdate = `UPDATE TIPODOCUMENTOS SET CORRELATIVO=${nuevocorrelativo} 
                                WHERE EMPNIT='${sucursal}' AND CODDOC='${coddoc}';`

                let qryFotoDocumento = `INSERT INTO DOCUMENTOS_FOTOS
                                        (EMPNIT,CODDOC,CORRELATIVO,FOTO) 
                                        SELECT '${sucursal}' AS EMPNIT, '${coddoc}' AS CODDOC, 
                                        ${correlativo} AS CORRELATIVO, 
                                        '${foto}' AS FOTO;`

                if(foto==''){qryFotoDocumento=''}


             

     execute.Query(res,qry + qryUpdate + qryFotoDocumento) ;
     
});
//FUNCIONA DIRECTO COMO RECIBO
router.post("/BACKUP_insert_recibo_factura", async(req,res)=>{

    const{sucursal,fecha,coddoc,correlativo,usuario,coddoc_fac,correlativo_fac,saldo_fac, abonos_fac,
        norecibo,fpago_efectivo,fpago_deposito,fpago_tarjeta,fpago_cheque,fpago_descripcion,obs,codven
    } = req.body;

    
    let totalcosto = (Number(fpago_efectivo)+Number(fpago_deposito)+Number(fpago_tarjeta)+Number(fpago_cheque));
    let totalprecio= (Number(fpago_efectivo)+Number(fpago_deposito)+Number(fpago_tarjeta)+Number(fpago_cheque));


    let nuevocorrelativo = Number(correlativo)+1;

    let qry = `
            INSERT INTO DOCUMENTOS 
	                (EMPNIT,ANIO,MES,DIA,FECHA,HORA,
	                MINUTO,CODCAJA,CODDOC,CORRELATIVO,CODCLIENTE,
	                DOC_NIT,DOC_NOMCLIE,DOC_DIRCLIE,TOTALCOSTO,
	                TOTALPRECIO,CODEMBARQUE,STATUS,CONCRE,USUARIO,
	                CORTE,SERIEFAC,NOFAC,CODVEN,PAGO,VUELTO,MARCA,OBS, DOC_SALDO,DOC_ABONO,NODOCPAGO,
                    FPAGO_EFECTIVO,FPAGO_TARJETA,FPAGO_DEPOSITO,FPAGO_CHEQUE,FPAGO_DESCRIPCION)
                SELECT 
                    '${sucursal}' AS EMPNIT,
                    YEAR('${fecha}') AS ANIO,
                    MONTH('${fecha}') AS MES,
                    DAY('${fecha}') AS DIA,
                    '${fecha}' AS FECHA,
                    0 AS HORA,
	                0 AS MINUTO,
                    CODCAJA,
                    '${coddoc}' AS CODDOC,
                    ${correlativo} AS CORRELATIVO,
                    CODCLIENTE,
	                DOC_NIT,
                    DOC_NOMCLIE,
                    DOC_DIRCLIE,
                    ${totalcosto} AS TOTALCOSTO,
	                ${totalprecio} AS TOTALPRECIO,
                    CODEMBARQUE,
                    'O' AS STATUS,
                    'CON' AS CONCRE,
                    '${usuario}' AS USUARIO,
	                0 AS CORTE,
                    '${coddoc_fac}' AS SERIEFAC,
                    '${correlativo_fac}' AS NOFAC,
                    ${codven} AS CODVEN,
                    ${totalprecio} AS PAGO,
                    0 AS VUELTO,
                    '' AS MARCA,
                    '${obs}' AS OBS, 
                    0 AS DOC_SALDO,
                    ${totalprecio} AS DOC_ABONO,
                    '${norecibo}' AS NODOCPAGO,
                    ${fpago_efectivo} AS FPAGO_EFECTIVO,
                    ${fpago_tarjeta} AS FPAGO_TARJETA,
                    ${fpago_deposito} AS FPAGO_DEPOSITO,
                    ${fpago_cheque} AS FPAGO_CHEQUE,
                    '${fpago_descripcion}' AS FPAGO_DESCRIPCION
                FROM DOCUMENTOS
                WHERE 
                    EMPNIT='${sucursal}' AND 
                    CODDOC='${coddoc_fac}' AND 
                    CORRELATIVO=${correlativo_fac}; 
                `
    
            
                let qryUpdate = `UPDATE TIPODOCUMENTOS SET CORRELATIVO=${nuevocorrelativo} 
                                WHERE EMPNIT='${sucursal}' AND CODDOC='${coddoc}';`


                let qryUpdateSaldo = `
                    UPDATE DOCUMENTOS
                        SET 
                            DOC_SALDO=${(Number(saldo_fac)-Number(totalprecio))},
                            DOC_ABONO=${(Number(abonos_fac)+Number(totalprecio))}
                    WHERE 
                        EMPNIT='${sucursal}' AND 
                        CODDOC='${coddoc_fac}' AND 
                        CORRELATIVO=${correlativo_fac}; 
                    `
    

     execute.Query(res,qry + qryUpdate + qryUpdateSaldo);
     
});


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
                    DOCUMENTOS.VENCIMIENTO AS VENCE,
                    DOCUMENTOS.FEL_SERIE,
                    DOCUMENTOS.FEL_NUMERO,
                    DOCUMENTOS.FEL_FECHA
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


router.post("/abonos_factura", async(req,res)=>{

    const{sucursal,coddoc,correlativo} = req.body;

    let qry = `
       SELECT  
			DOCUMENTOS.FECHA, DOCUMENTOS.HORA, 
			DOCUMENTOS.CODDOC, DOCUMENTOS.CORRELATIVO, 
            DOCUMENTOS.CODCLIENTE, 
			DOCUMENTOS.DOC_NIT, 
			DOCUMENTOS.DOC_NOMCLIE, 
			DOCUMENTOS.DOC_DIRCLIE, 
			DOCUMENTOS.TOTALPRECIO,
			DOCUMENTOS.CORTE, 
			DOCUMENTOS.SERIEFAC, 
			DOCUMENTOS.NOFAC, 
			DOCUMENTOS.NOCORTE, 
			DOCUMENTOS.PAGO, 
            DOCUMENTOS.VUELTO, 
			DOCUMENTOS.MARCA, 
			DOCUMENTOS.OBS, 
			DOCUMENTOS.DOC_SALDO, 
			DOCUMENTOS.DOC_ABONO, 
			DOCUMENTOS.OBSMARCA, 
			DOCUMENTOS.CODCAJA, 
            DOCUMENTOS.TOTALTARJETA, 
			DOCUMENTOS.RECARGOTARJETA, 
			DOCUMENTOS.NOGUIA, 
			DOCUMENTOS.LAT, DOCUMENTOS.LONG, 
			DOCUMENTOS.TIPOPAGO, 
			ISNULL(DOCUMENTOS.NODOCPAGO,'') AS NODOCPAGO, 
			DOCUMENTOS.IDENTIFICADOR, 
			DOCUMENTOS.TIPOVENTA
        FROM  DOCUMENTOS LEFT OUTER JOIN
            TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT
        WHERE  (DOCUMENTOS.EMPNIT='${sucursal}') 
            AND (DOCUMENTOS.STATUS<>'A') 
            AND (DOCUMENTOS.SERIEFAC = '${coddoc}') 
            AND (DOCUMENTOS.NOFAC = ${correlativo}) 
            AND (TIPODOCUMENTOS.TIPODOC = 'RCC')
        ORDER BY DOCUMENTOS.FECHA;

    `
    
    console.log(qry);
    
     execute.Query(res,qry);
     
});








module.exports = router;

