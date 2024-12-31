const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post("/rpt_inventario", async(req,res)=>{

    const {token,sucursal,filtro} = req.body;

    let qry = `
        SELECT TOP 50 INVSALDO.CODPROD, PRODUCTOS.DESPROD, 
            INVSALDO.SALDO, INVSALDO.FISICO, 
            PRODUCTOS.COSTO AS COSTO_ULTIMO, 
            isnull(PRODUCTOS.COSTO_PROMEDIO,0) AS COSTO_PROMEDIO, 
            isnull(PRODUCTOS.COSTO_ANTERIOR,0) AS COSTO_ANTERIOR, 
            MARCAS.DESMARCA
        FROM MARCAS RIGHT OUTER JOIN
            PRODUCTOS ON MARCAS.CODMARCA = PRODUCTOS.CODMARCA AND MARCAS.EMPNIT = PRODUCTOS.EMPNIT RIGHT OUTER JOIN
            INVSALDO ON PRODUCTOS.CODPROD = INVSALDO.CODPROD AND PRODUCTOS.EMPNIT = INVSALDO.EMPNIT
        WHERE (INVSALDO.EMPNIT = '${sucursal}')
            AND (PRODUCTOS.DESPROD LIKE '%${filtro}%') 
            AND (INVSALDO.ANIO = 0) AND (INVSALDO.MES = 0)
            AND (PRODUCTOS.HABILITADO='SI') 
        `

     
  
    execute.Query(res,qry)

});


router.post("/rpt_ventas_fechas_compras", async(req,res)=>{

    const {sucursal,anio,mes} = req.body;

    let qry = `
        SELECT DOCUMENTOS.FECHA, 
                SUM(DOCUMENTOS.TOTALCOSTO) AS COSTO, 
                SUM(DOCUMENTOS.TOTALPRECIO) AS VENTA, 
                SUM(DOCUMENTOS.TOTALPRECIO) - SUM(DOCUMENTOS.TOTALCOSTO) AS UTILIDAD
        FROM  DOCUMENTOS LEFT OUTER JOIN TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT
        WHERE 
            (DOCUMENTOS.EMPNIT = '${sucursal}') AND 
            (DOCUMENTOS.MES = ${mes}) AND 
            (DOCUMENTOS.ANIO = ${anio}) AND 
            (DOCUMENTOS.STATUS <> 'A') AND 
            (TIPODOCUMENTOS.TIPODOC IN('COM'))
        GROUP BY DOCUMENTOS.FECHA
        ORDER BY DOCUMENTOS.FECHA DESC
        `

     
  
    execute.Query(res,qry)

});

router.post("/rpt_ventas_fechas", async(req,res)=>{

    const {sucursal,anio,mes} = req.body;

    let qry = `
        SELECT DOCUMENTOS.FECHA, 
                SUM(DOCUMENTOS.TOTALCOSTO) AS COSTO, 
                SUM(DOCUMENTOS.TOTALPRECIO) AS VENTA, 
                SUM(DOCUMENTOS.TOTALPRECIO) - SUM(DOCUMENTOS.TOTALCOSTO) AS UTILIDAD
        FROM  DOCUMENTOS LEFT OUTER JOIN TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT
        WHERE 
            (DOCUMENTOS.EMPNIT = '${sucursal}') AND 
            (DOCUMENTOS.MES = ${mes}) AND 
            (DOCUMENTOS.ANIO = ${anio}) AND 
            (DOCUMENTOS.STATUS <> 'A') AND 
            (TIPODOCUMENTOS.TIPODOC IN('FAC','FPC','FCP','FEF','FEC','FES'))
        GROUP BY DOCUMENTOS.FECHA
        ORDER BY DOCUMENTOS.FECHA DESC
        `

     
  
    execute.Query(res,qry)

});


router.post("/rpt_ventas_productos", async(req,res)=>{

    const {sucursal,anio,mes} = req.body;

    let qry = `
            SELECT DOCPRODUCTOS.CODPROD, 
                    DOCPRODUCTOS.DESPROD, 
                    SUM(DOCPRODUCTOS.TOTALUNIDADES) AS UNIDADES, 
                    SUM(DOCPRODUCTOS.TOTALCOSTO) AS COSTO, 
                    SUM(DOCPRODUCTOS.TOTALPRECIO) AS VENTA
            FROM  DOCUMENTOS LEFT OUTER JOIN
                  TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT LEFT OUTER JOIN
                  DOCPRODUCTOS ON DOCUMENTOS.CORRELATIVO = DOCPRODUCTOS.CORRELATIVO AND DOCUMENTOS.CODDOC = DOCPRODUCTOS.CODDOC AND DOCUMENTOS.EMPNIT = DOCPRODUCTOS.EMPNIT
            WHERE 
                (DOCUMENTOS.ANIO = ${anio}) AND 
                (DOCUMENTOS.MES = ${mes}) AND 
                (DOCUMENTOS.EMPNIT = '${sucursal}') AND 
                (DOCUMENTOS.STATUS <> 'A') AND 
                (TIPODOCUMENTOS.TIPODOC  IN('FAC','FPC','FCP','FEF','FEC','FES'))
            GROUP BY DOCPRODUCTOS.CODPROD, DOCPRODUCTOS.DESPROD
            ORDER BY VENTA DESC
        `

    execute.Query(res,qry)

});



module.exports = router;