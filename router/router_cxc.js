const execute = require('./connection');
const express = require('express');
const router = express.Router();



router.post("/insert_recibo_factura", async(req,res)=>{

    const{sucursal,fecha,coddoc,correlativo,usuario,coddoc_fac,correlativo_fac,saldo_fac,descuento_fac, abonos_fac,
        foto,foto2,
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
	                CORTE,SERIEFAC,NOFAC,CODVEN,PAGO,VUELTO,MARCA,OBS, DOC_SALDO,DOC_ABONO,TOTALDESCUENTO,NODOCPAGO,
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
                    'P' AS STATUS,
                    'CON' AS CONCRE,
                    '${usuario}' AS USUARIO,
	                0 AS CORTE,
                    '${coddoc}' AS SERIEFAC,
                    '${correlativo}' AS NOFAC,
                    ${codven} AS CODVEN,
                    ${totalprecio} AS PAGO,
                    0 AS VUELTO,
                    '' AS MARCA,
                    '${obs}' AS OBS, 
                    ${saldo_fac} AS DOC_SALDO,
                    ${totalprecio} AS DOC_ABONO,
                    ${descuento_fac} AS TOTALDESCUENTO,
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
                                        (EMPNIT,CODDOC,CORRELATIVO,FOTO,FOTO2) 
                                        SELECT '${sucursal}' AS EMPNIT, '${coddoc}' AS CODDOC, 
                                        ${correlativo} AS CORRELATIVO, 
                                        '${foto}' AS FOTO,'${foto2}' AS FOTO2;`

                if(foto==''){qryFotoDocumento=''}


                let qryDocumentosAbonos = `INSERT INTO DOCUMENTOS_FACTURAS_ABONADAS
                                        (EMPNIT,FECHA,CODDOC,CORRELATIVO,ABONO,CODDOC_FAC,CORRELATIVO_FAC)
                                        SELECT 
                                            '${sucursal}' AS EMPNIT,
                                            '${fecha}' AS FECHA,
                                            '${coddoc}' AS CODDOC,
                                            ${correlativo} AS CORRELATIVO,
                                            ${totalprecio} AS ABONO,
                                            '${coddoc_fac}' AS CODDOC_FAC,
                                            ${correlativo_fac} AS CORRELATIVO_FAC;`

             

     execute.Query(res,qry + qryDocumentosAbonos + qryUpdate + qryFotoDocumento);

     
});
router.post("/insert_recibo_factura_multiple", async(req,res)=>{

    //NO FUNCIONA REVISAR CAMPOS

    const{sucursal,fecha,coddoc,correlativo,usuario,coddoc_fac,correlativo_fac,saldo_fac, abonos_fac,
        foto,foto2,
        norecibo,fpago_efectivo,fpago_deposito,fpago_tarjeta,fpago_cheque,fpago_descripcion,obs,codven,jsonFacturasAbonadas
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
                    'P' AS STATUS,
                    'CON' AS CONCRE,
                    '${usuario}' AS USUARIO,
	                0 AS CORTE,
                    '${coddoc}' AS SERIEFAC,
                    '${correlativo}' AS NOFAC,
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
                                        '${foto}' AS FOTO,'${foto2}' AS FOTO2;`

                if(foto==''){qryFotoDocumento=''}

                let qryDocumentosAbonos = '';

                let datos_temp = JSON.parse(jsonFacturasAbonadas);

                datos_temp.map((r)=>{
                    qryDocumentosAbonos += `
                                INSERT INTO DOCUMENTOS_FACTURAS_ABONADAS
                                (EMPNIT,FECHA,CODDOC,CORRELATIVO,ABONO,CODDOC_FAC,CORRELATIVO_FAC)
                                    SELECT 
                                            '${sucursal}' AS EMPNIT,
                                            '${fecha}' AS FECHA,
                                            '${coddoc}' AS CODDOC,
                                            ${correlativo} AS CORRELATIVO,
                                            ${r.ABONO} AS ABONO,
                                            '${r.CODDOC}' AS CODDOC_FAC,
                                            ${r.CORRELATIVO} AS CORRELATIVO_FAC;`
                })

                

             

     execute.Query(res,qry + qryDocumentosAbonos + qryUpdate + qryFotoDocumento) ;
     
});



router.post("/listado", async(req,res)=>{

    const{empnit,codven} = req.body;

    let qry = `
            SELECT 
                DOCUMENTOS.DOC_NIT AS NIT, 
                DOCUMENTOS.DOC_NOMCLIE AS NOMCLIE, 
                ISNULL(CLIENTES.DIRCLIENTE, 'CIUDAD') AS DIRCLIE, 
                DOCUMENTOS.FECHA, 
                DOCUMENTOS.CODDOC, 
                DOCUMENTOS.CORRELATIVO, 
                DOCUMENTOS.TOTALPRECIO AS IMPORTE, 
                ISNULL(DOCUMENTOS.TOTALPRECIO, 0) - ISNULL(DOCUMENTOS.DOC_ABONO, 0) AS SALDO, 
                DOCUMENTOS.DOC_ABONO AS ABONOS, 
                DOCUMENTOS.CODCLIENTE, 
                DOCUMENTOS.VENCIMIENTO AS VENCE, 
                DOCUMENTOS.FEL_SERIE, 
                DOCUMENTOS.FEL_NUMERO, DOCUMENTOS.FEL_FECHA
            FROM  RUTAS RIGHT OUTER JOIN
                CLIENTES ON RUTAS.CODRUTA = CLIENTES.CODRUTA AND RUTAS.EMPNIT = CLIENTES.EMPNIT RIGHT OUTER JOIN
                DOCUMENTOS ON CLIENTES.EMPNIT = DOCUMENTOS.EMPNIT AND CLIENTES.CODCLIENTE = DOCUMENTOS.CODCLIENTE LEFT OUTER JOIN
                TIPODOCUMENTOS ON DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT AND DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC
            WHERE 
                (RUTAS.CODEMPLEADO = ${codven}) AND   
                (TIPODOCUMENTOS.TIPODOC IN ('FAC', 'FEF', 'FES', 'FEC', 'FPC', 'FCP')) 
                    AND (DOCUMENTOS.CONCRE = 'CRE') AND (DOCUMENTOS.DOC_SALDO > 0.01) 
                    AND (DOCUMENTOS.EMPNIT = '${empnit}') AND (DOCUMENTOS.STATUS <> 'A') 
        ORDER BY DOCUMENTOS.VENCIMIENTO ASC;
    `
    
    
     execute.Query(res,qry);
     
});
router.post("/listado_facturas_cliente", async(req,res)=>{

    const{empnit,codclie} = req.body;

    let qry = `
            SELECT
                DOCUMENTOS.EMPNIT AS CODSUCURSAL,
                DOCUMENTOS.CODDOC, 
                DOCUMENTOS.CORRELATIVO, 
                DOCUMENTOS.FECHA,
                DOCUMENTOS.VENCIMIENTO AS VENCE,  
                DOCUMENTOS.TOTALPRECIO AS IMPORTE,
                ISNULL(DOCUMENTOS.TOTALPRECIO, 0) - ISNULL(DOCUMENTOS.DOC_ABONO, 0) AS SALDO, 
                0 AS ABONO, 
                DOCUMENTOS.FEL_SERIE, 
                DOCUMENTOS.FEL_NUMERO
            FROM  RUTAS RIGHT OUTER JOIN
                CLIENTES ON RUTAS.CODRUTA = CLIENTES.CODRUTA AND RUTAS.EMPNIT = CLIENTES.EMPNIT RIGHT OUTER JOIN
                DOCUMENTOS ON CLIENTES.EMPNIT = DOCUMENTOS.EMPNIT AND CLIENTES.CODCLIENTE = DOCUMENTOS.CODCLIENTE LEFT OUTER JOIN
                TIPODOCUMENTOS ON DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT AND DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC
            WHERE 
                (DOCUMENTOS.CODCLIENTE = ${codclie}) AND   
                (TIPODOCUMENTOS.TIPODOC IN ('FAC', 'FEF', 'FES', 'FEC', 'FPC', 'FCP')) AND 
                (DOCUMENTOS.CONCRE = 'CRE') AND (DOCUMENTOS.DOC_SALDO > 0.01) AND 
                (DOCUMENTOS.EMPNIT = '${empnit}') AND 
                (DOCUMENTOS.STATUS <> 'A') 
        ORDER BY DOCUMENTOS.VENCIMIENTO DESC;
    `
    
    
     execute.Query(res,qry);
     
});
router.post("/BACKUP_listado", async(req,res)=>{

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
router.post("/listado_clientes", async(req,res)=>{

    const{empnit,codven} = req.body;

    let qry = `
        SELECT  
            CLIENTES.CODCLIENTE AS CODCLIE, 
            CLIENTES.NIT, 
            CLIENTES.NOMBRECLIENTE AS NOMCLIE, 
            CLIENTES.DIRCLIENTE, 
            SUM(DOCUMENTOS.TOTALPRECIO) AS IMPORTE, 
            SUM(ISNULL(DOCUMENTOS.TOTALPRECIO, 0) - ISNULL(DOCUMENTOS.DOC_ABONO, 0)) AS SALDO, 
            SUM(DOCUMENTOS.DOC_ABONO) AS ABONOS
        FROM  DOCUMENTOS LEFT OUTER JOIN
            TIPODOCUMENTOS ON DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT AND DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC RIGHT OUTER JOIN
            CLIENTES ON DOCUMENTOS.EMPNIT = CLIENTES.EMPNIT AND DOCUMENTOS.CODCLIENTE = CLIENTES.CODCLIENTE
        WHERE  (TIPODOCUMENTOS.TIPODOC IN ('FAC', 'FEF', 'FES', 'FEC', 'FPC', 'FCP')) AND 
            (DOCUMENTOS.CONCRE = 'CRE') AND 
            (DOCUMENTOS.DOC_SALDO > 0.01) AND 
            (DOCUMENTOS.EMPNIT = '${empnit}') AND 
            (DOCUMENTOS.STATUS <> 'A') AND (DOCUMENTOS.CODVEN = ${codven})
        GROUP BY CLIENTES.CODCLIENTE, CLIENTES.DIRCLIENTE, CLIENTES.NOMBRECLIENTE, CLIENTES.NIT
        ORDER BY CLIENTES.NOMBRECLIENTE
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
    
    
    
     execute.Query(res,qry);
     
});


router.post("/pagos_pendientes_autorizacion", async(req,res)=>{

    const{sucursal,codven} = req.body;

    let qry = `
        SELECT  DOCUMENTOS.FECHA, 
                DOCUMENTOS.CODDOC, 
                DOCUMENTOS.CORRELATIVO, 
                DOCUMENTOS.CODCLIENTE AS CODCLIE, 
                DOCUMENTOS.DOC_NIT AS NIT, 
                DOCUMENTOS.DOC_NOMCLIE AS NOMCLIE, 
                DOCUMENTOS.DOC_DIRCLIE AS DIRCLIE, 
                DOCUMENTOS.TOTALPRECIO, 
                DOCUMENTOS.FPAGO_EFECTIVO, 
                DOCUMENTOS.FPAGO_TARJETA, 
                DOCUMENTOS.FPAGO_DEPOSITO, 
                DOCUMENTOS.FPAGO_CHEQUE, 
                DOCUMENTOS.FPAGO_DESCRIPCION
        FROM  DOCUMENTOS LEFT OUTER JOIN
                TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC 
                AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT
        WHERE  (DOCUMENTOS.EMPNIT = '${sucursal}') AND 
            (DOCUMENTOS.CODVEN = ${codven}) AND 
            (DOCUMENTOS.STATUS = 'P') AND 
            (TIPODOCUMENTOS.TIPODOC = 'PRC')
    `
    
  
 

     execute.Query(res,qry);
     
});
router.post("/delete_recibo_pago", async(req,res)=>{

    const{sucursal,coddoc,correlativo} = req.body;

    let qry = `
        DELETE FROM DOCUMENTOS 
             WHERE EMPNIT='${sucursal}' AND 
                        CODDOC='${coddoc}' AND 
                        CORRELATIVO=${correlativo};
        DELETE FROM DOCUMENTOS_FACTURAS_ABONADAS
            WHERE EMPNIT='${sucursal}' AND 
                        CODDOC='${coddoc}' AND 
                        CORRELATIVO=${correlativo};
        DELETE FROM DOCUMENTOS_FOTOS
            WHERE EMPNIT='${sucursal}' AND 
                        CODDOC='${coddoc}' AND 
                        CORRELATIVO=${correlativo};
        `
    
    
     execute.Query(res,qry);
     
});






module.exports = router;

