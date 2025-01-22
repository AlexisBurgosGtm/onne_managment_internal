const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/get_codupdate", async(req,res)=>{
    
    const {sucursal} = req.body;
    // app= sucusal
    // K= CAMBIO DE PRODUCTO

    let qry ='';

     
    qry = `SELECT TOP 1 ISNULL(ME_Productos.CODUPDATE,'NOCODE') AS CODUPDATE
            FROM ME_Productos 
            WHERE (ME_Productos.CODSUCURSAL = '${sucursal}') 
            ` 
            
    execute.Query(res,qry);

})


router.get('/online_productos_subidos',async(req,res)=>{

    const{sucursal} = req.query;

    let qry = `
                SELECT COUNT(ME_Productos.CODPROD) AS PRODUCTOS 
            FROM ME_Productos LEFT OUTER JOIN
                ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA LEFT OUTER JOIN
                ME_Precios ON ME_Productos.CODSUCURSAL = ME_Precios.CODSUCURSAL AND ME_Productos.CODPROD = ME_Precios.CODPROD
            WHERE (ME_Productos.CODSUCURSAL = '${sucursal}') 
    `;

    execute.Query(res,qry);
});


router.get('/online_clientes_subidos',async(req,res)=>{

    const{sucursal,codven} = req.query;

    let qry = `
        SELECT COUNT(NITCLIE) AS CLIENTES FROM ME_CLIENTES WHERE CODSUCURSAL='${sucursal}' AND CODVEN=${codven}
    `;

    execute.Query(res,qry);
});


//REPORTE DE VENTAS Y DEVOLUCIONES
router.post('/rptventas_vendedor',async(req,res)=>{

    const{sucursal, codven, mes, anio} = req.body;

    let qry = `SELECT DISTINCT       NOMVEN,FECHA, TIPO, SUM(TOTALPRECIO)  AS TOTALPRECIO, LASTUPDATE
    FROM            ME_RPT_VENTAS
    GROUP BY NOMVEN,FECHA, TIPO, LASTUPDATE, CODSUCURSAL, ANIO, MES, CODVEN
    HAVING        (ANIO = ${anio}) AND (MES = ${mes}) AND (CODSUCURSAL = '${sucursal}') AND (CODVEN=${codven})
    ORDER BY FECHA
    `;

    execute.Query(res,qry);
});



//EDICION DEL PEDIDO
router.post('/loadpedido',async(req,res)=>{

    const {sucursal, usuario, coddoc, correlativo} = req.body;
    
    let qry='';
    let qryold = `SELECT EMP_NIT AS EMPNIT, CODPROD, DESCRIPCION AS DESPROD, 
        CODMEDIDA, CANTIDAD, EQUIVALE, CANTIDADINV AS TOTALUNIDADES, 
        COSTO, PRECIO, TOTALCOSTO, TOTALPRECIO, 0 AS EXENTO, 
        '${usuario}' AS USUARIO, TIPOPRECIO, '${sucursal}' AS CODSUCURSAL 
        FROM ME_DOCPRODUCTOS
        WHERE CODSUCURSAL='${sucursal}' 
        AND CODDOC='${coddoc}' 
        AND DOC_NUMERO='${correlativo}'; `


        qry = `
        SELECT ME_Docproductos.EMP_NIT AS EMPNIT, ME_Docproductos.CODPROD, ME_Docproductos.DESCRIPCION AS DESPROD, ME_Docproductos.CODMEDIDA, 
                         ME_Docproductos.CANTIDAD, ME_Docproductos.EQUIVALE, ME_Docproductos.CANTIDADINV AS TOTALUNIDADES, ME_Docproductos.COSTO, ME_Docproductos.PRECIO, 
                         ME_Docproductos.TOTALCOSTO, ME_Docproductos.TOTALPRECIO, 0 AS EXENTO, '${usuario}' AS USUARIO, ME_Docproductos.TIPOPRECIO, 
                         '${sucursal}' AS CODSUCURSAL, 
                         ISNULL(ME_Productos.EXISTENCIA,0) AS EXISTENCIA
        FROM ME_Docproductos LEFT OUTER JOIN
                         ME_Productos ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND ME_Docproductos.CODPROD = ME_Productos.CODPROD AND 
                         ME_Docproductos.EMP_NIT = ME_Productos.EMP_NIT
        WHERE (ME_Docproductos.CODSUCURSAL = '${sucursal}') AND (ME_Docproductos.CODDOC = '${coddoc}') AND (ME_Docproductos.DOC_NUMERO = '${correlativo}') 
    `

    execute.Query(res, qry);

})

router.post('/loadpedido_original',async(req,res)=>{

    const {sucursal, usuario, coddoc, correlativo} = req.body;

    let qrydel = `DELETE FROM ME_TEMP_VENTAS 
            WHERE CODSUCURSAL='${sucursal}' 
            AND USUARIO='${usuario}'; `

    let qry='';
    qry = `INSERT INTO ME_TEMP_VENTAS 
            (EMPNIT,CODPROD,DESPROD,CODMEDIDA,CANTIDAD,EQUIVALE,TOTALUNIDADES,COSTO,PRECIO,TOTALCOSTO,TOTALPRECIO,EXENTO,USUARIO,TIPOPRECIO,CODSUCURSAL) 
        SELECT EMP_NIT AS EMPNIT, CODPROD, DESCRIPCION AS DESPROD, 
        CODMEDIDA, CANTIDAD, EQUIVALE, CANTIDADINV AS TOTALUNIDADES, 
        COSTO, PRECIO, TOTALCOSTO, TOTALPRECIO, 0 AS EXENTO, '${usuario}' AS USUARIO, TIPOPRECIO, '${sucursal}' AS CODSUCURSAL 
        FROM ME_DOCPRODUCTOS
        WHERE CODSUCURSAL='${sucursal}' 
        AND CODDOC='${coddoc}' 
        AND DOC_NUMERO='${correlativo}'; `

    execute.Query(res,qrydel + qry);

})


router.post('/eliminarpedidocargado',async(req,res)=>{

    const {sucursal,coddoc,correlativo} = req.body;

    let qry = `DELETE FROM ME_DOCUMENTOS 
    WHERE CODSUCURSAL='${sucursal}' 
    AND CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}'
    AND DOC_ESTATUS='O'; `
    let qryprods = `DELETE FROM ME_DOCPRODUCTOS 
        WHERE CODSUCURSAL='${sucursal}' AND CODDOC='${coddoc}' 
        AND DOC_NUMERO='${correlativo}' ;`

    execute.Query(res, qry + qryprods);

})






// VENTAS BUSCAR PRODUCTO POR DESCRIPCION
router.post("/buscarproductotodos", async(req,res)=>{
    
    
    const {sucursal,filtro,tipoprod} = req.body;
  

    let qry ='';
    qry = `
            SELECT TOP (30) PRODUCTOS.EMPNIT AS CODSUCURSAL, PRODUCTOS.CODPROD, PRODUCTOS.DESPROD, 
                    PRODUCTOS.DESPROD2, PRODUCTOS.DESPROD3, PRODUCTOS.TIPOPROD, 
                    PRODUCTOS.EXENTO, 
                    PRODUCTOS.EXISTENCIA AS EXISTENCIA2, PRODUCTOS.NF, 
                    PRODUCTOS.HABILITADO, PRECIOS.CODMEDIDA, PRECIOS.EQUIVALE, 
                    PRECIOS.COSTO, PRECIOS.PRECIO, PRECIOS.MAYOREOA AS PRECIOA, 
                  PRECIOS.MAYOREOB AS PRECIOB, PRECIOS.MAYOREOC AS PRECIOC, 
                  MARCAS.DESMARCA, view_invsaldo.EXISTENCIA, 
                  (ISNULL(PRODUCTOS.BONO,0) * PRECIOS.EQUIVALE) AS BONO
            FROM  PRODUCTOS LEFT OUTER JOIN
                  view_invsaldo ON PRODUCTOS.CODPROD = view_invsaldo.CODPROD AND PRODUCTOS.EMPNIT = view_invsaldo.EMPNIT LEFT OUTER JOIN
                  MARCAS ON PRODUCTOS.CODMARCA = MARCAS.CODMARCA AND PRODUCTOS.EMPNIT = MARCAS.EMPNIT LEFT OUTER JOIN
                  PRECIOS ON PRODUCTOS.CODPROD = PRECIOS.CODPROD AND PRODUCTOS.EMPNIT = PRECIOS.EMPNIT
            WHERE  (PRODUCTOS.EMPNIT = '${sucursal}') 
                    AND (PRODUCTOS.CODPROD = '${filtro}') 
                    AND (PRODUCTOS.HABILITADO = 'SI')
                    AND (PRECIOS.COSTO IS NOT NULL) 
                    AND (PRODUCTOS.TIPOPROD='${tipoprod}')
            OR
                  (PRODUCTOS.EMPNIT = '${sucursal}') 
                  AND (PRODUCTOS.HABILITADO = 'SI') 
                  AND (PRODUCTOS.DESPROD LIKE '%${filtro}%')
                  AND (PRECIOS.COSTO IS NOT NULL)
                  AND (PRODUCTOS.TIPOPROD='${tipoprod}')

    `
            
    execute.Query(res,qry);

})





// obtiene el total de temp ventas según sea el usuario
router.get("/tempVentastotal", async(req,res)=>{
    let empnit = req.query.empnit;
    let usuario = req.query.usuario;
    let token = req.query.token;
    let app = req.query.app;

    let qry = '';


            qry = `SELECT COUNT(CODPROD) AS TOTALITEMS, SUM(TOTALCOSTO) AS TOTALCOSTO, SUM(TOTALPRECIO) AS TOTALPRECIO, SUM(EXENTO) AS TOTALEXENTO
            FROM ME_TEMP_VENTAS
            WHERE (CODSUCURSAL = '${app}') AND (USUARIO = '${usuario}')`        

    execute.Query(res,qry);
    
});

// obtiene el grid de temp ventas
router.get("/tempVentas", async(req,res)=>{
    let empnit = req.query.empnit;
    let coddoc = req.query.coddoc;
    let usuario = req.query.usuario;
    let token = req.query.token;
    let app = req.query.app;

    let qry = '';

    qry = `SELECT 
            ME_TEMP_VENTAS.ID,ME_TEMP_VENTAS.CODPROD, 
            ME_TEMP_VENTAS.DESPROD, 
            ME_TEMP_VENTAS.CODMEDIDA, 
            ME_TEMP_VENTAS.CANTIDAD, 
            ME_TEMP_VENTAS.EQUIVALE,
            ME_TEMP_VENTAS.COSTO,
            ME_TEMP_VENTAS.TOTALCOSTO,  
            ME_TEMP_VENTAS.PRECIO, 
            ME_TEMP_VENTAS.TOTALPRECIO
                FROM ME_TEMP_VENTAS 
            WHERE (ME_TEMP_VENTAS.CODSUCURSAL = '${app}') AND (ME_TEMP_VENTAS.USUARIO = '${usuario}')
            ORDER BY ME_TEMP_VENTAS.ID DESC`

       
    execute.Query(res,qry);
    
});

// obtiene row de temp ventas
router.post("/tempVentasRow", async(req,res)=>{
    
    const {id,app} = req.body;

    let qry = '';
    
    qry = `SELECT ID,CODPROD,DESPROD,CODMEDIDA,CANTIDAD,EQUIVALE,COSTO,PRECIO,EXENTO FROM ME_TEMP_VENTAS WHERE ID=${id}`
  
    execute.Query(res,qry);
    
});

// ACTUALIZA el grid de temp ventas
router.put("/tempVentasRow", async(req,res)=>{
    
    const {app,id,totalcosto,totalprecio,cantidad,totalunidades,exento} = req.body;
    
    let qry = '';
    
    qry = `UPDATE ME_TEMP_VENTAS SET CANTIDAD=${cantidad},TOTALCOSTO=${totalcosto},TOTALPRECIO=${totalprecio},TOTALUNIDADES=${totalunidades},EXENTO=${exento} WHERE ID=${id}`
    
    
    execute.Query(res,qry);
    
});

// inserta un nuevo registro en temp ventas   
router.post("/tempVentas", async(req,res)=>{
        
    let empnit = req.body.empnit;
    let usuario = req.body.usuario;
    let token = req.body.token;

    let tipoprecio = req.body.tipoprecio;

    let codprod = req.body.codprod;
    let desprod = req.body.desprod;
    let codmedida= req.body.codmedida;
    let cantidad=Number(req.body.cantidad);
    let equivale = Number(req.body.equivale);
    let totalunidades = Number(req.body.totalunidades);
    let costo = Number(req.body.costo);
    let precio=Number(req.body.precio);
    let totalcosto =Number(req.body.totalcosto);
    let totalprecio=Number(req.body.totalprecio);
    let exento=Number(req.body.exento);

    let coddoc = req.body.coddoc;


    let app = req.body.app;
    let qry = '';

    qry = `INSERT INTO ME_TEMP_VENTAS 
            (EMPNIT,CODPROD,DESPROD,CODMEDIDA,CANTIDAD,EQUIVALE,TOTALUNIDADES,COSTO,PRECIO,TOTALCOSTO,TOTALPRECIO,EXENTO,USUARIO,TIPOPRECIO,CODSUCURSAL) 
    VALUES ('${empnit}','${codprod}','${desprod}','${codmedida}',${cantidad},${equivale},${totalunidades},${costo},${precio},${totalcosto},${totalprecio},${exento},'${usuario}','${tipoprecio}','${app}')`        
     
        
   execute.Query(res,qry);

});

// elimina un item de la venta
router.delete("/tempVentas", async(req,res)=>{
    let id=Number(req.body.id);
    

      let qry = `DELETE FROM ME_TEMP_VENTAS WHERE ID=${id}`
    
   execute.Query(res,qry);

});

// elimina un item de la venta todos 
router.post("/tempVentastodos", async(req,res)=>{
    const{empnit,usuario,app} = req.body;
    let qry = "";
   
    qry = `DELETE FROM ME_TEMP_VENTAS WHERE CODSUCURSAL='${app}' AND USUARIO='${usuario}'`

    execute.Query(res,qry);

});

// SIN USAR
// VENTAS BUSCAR CLIENTE POR NIT O CODIGO
router.get("/buscarcliente", async(req,res)=>{
    
    const {empnit,nit, app} = req.query;
    
    let qry = '';

    qry = `SELECT NITCLIE AS CODCLIENTE,NITFACTURA AS NIT,NOMCLIE AS NOMCLIENTE,DIRCLIE AS DIRCLIENTE,TIPOCLIE AS CATEGORIA FROM ME_CLIENTES WHERE NITCLIE='${nit}' AND CODSUCURSAL='${app}'`         

    execute.Query(res,qry);

});






//******************************* */
// REPORTES DE VENDEDORES
//******************************* */

router.post('/historialcliente',async (req,res)=>{
    const {sucursal,codcliente} = req.body;
    let qry = `
    SELECT top 70 Documentos.CODDOC, 
            Documentos.CORRELATIVO, 
            Documentos.FECHA, 
            Documentos.DOC_NIT AS NITCLIE, 
            Docproductos.CODPROD, 
            Docproductos.DESPROD,
            Docproductos.CODMEDIDA, 
            Docproductos.CANTIDAD, 
            Docproductos.PRECIO, 
            Docproductos.TOTALPRECIO
    FROM Documentos LEFT OUTER JOIN
            Docproductos ON Documentos.CORRELATIVO = Docproductos.CORRELATIVO 
            AND Documentos.CODDOC = Docproductos.CODDOC 
            AND Documentos.EMPNIT = Docproductos.EMPNIT 
            AND Documentos.EMPNIT = Docproductos.EMPNIT 
        LEFT OUTER JOIN
            Tipodocumentos ON Documentos.EMPNIT = Tipodocumentos.EMPNIT 
            AND Documentos.CODDOC = Tipodocumentos.CODDOC 
            AND Documentos.EMPNIT = Tipodocumentos.EMPNIT
    WHERE (Tipodocumentos.TIPODOC IN ('FAC','FCP','FEC','FEF','FES')) 
        AND (Documentos.EMPNIT = '${sucursal}') 
        AND (Documentos.CODCLIENTE = ${codcliente})
        AND (Documentos.STATUS<>'A') 
    ORDER BY Documentos.FECHA DESC
    `;

    execute.Query(res,qry);
})

// UNA FECHA (DIA)

//Elimina un pedido, desde el vendedor
router.post("/deletepedidovendedor",async(req,res)=>{
    const {sucursal,fecha,codven,coddoc,correlativo} = req.body;

    let qry = `DELETE FROM ME_DOCUMENTOS WHERE CODSUCURSAL='${sucursal}' AND CODDOC='${coddoc}' AND DOC_FECHA='${fecha}' AND DOC_NUMERO='${correlativo}' AND DOC_ESTATUS='O'; `
    let qryprods = `DELETE FROM ME_DOCPRODUCTOS WHERE CODSUCURSAL='${sucursal}' AND CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}' ;`
    execute.Query(res, qry + qryprods);

})


//LOGRO MES
router.post("/logromesvendedor", async(req,res)=>{
    const {sucursal,codven,mes,anio}  = req.body;
    
    let qry = '';
    
    qry = `
    SELECT  COUNT(ME_Documentos.DOC_NUMERO) AS PEDIDOS, ISNULL(SUM(ME_Documentos.DOC_TOTALVENTA), 0) AS IMPORTE, ME_USUARIOS.OBJETIVOMES AS OBJETIVO
    FROM  ME_Documentos LEFT OUTER JOIN
                             ME_USUARIOS ON ME_Documentos.CODVEN = ME_USUARIOS.CODUSUARIO AND ME_Documentos.CODSUCURSAL = ME_USUARIOS.CODSUCURSAL
    WHERE (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.CODVEN = 1) AND (ME_Documentos.DOC_ESTATUS <> 'A')
    GROUP BY ME_USUARIOS.OBJETIVOMES, ME_USUARIOS.TIPO, ME_Documentos.DOC_ANO, ME_Documentos.DOC_MES
    HAVING  (ME_USUARIOS.TIPO = 'VENDEDOR') AND (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes})
    `

    execute.Query(res,qry);
});


// TOTAL VENTAS Y TOTAL PEDIDOS POR FECHA
router.post("/totalventadia", async(req,res)=>{

    const {sucursal,codven,fecha}  = req.body;
    
    let qry = '';
    qry = `SELECT COUNT(CODDOC) AS PEDIDOS, 
            ISNULL(SUM(TOTALPRECIO),0) AS IMPORTE
            FROM DOCUMENTOS
            WHERE (EMPNIT ='${sucursal}') 
            AND (FECHA = '${fecha}') 
            AND (CODVEN = ${codven}) 
            AND (STATUS<>'A')`
        
    execute.Query(res,qry);

});

// LISTA DE PEDIDOS POR UNA FECHA
router.post("/listapedidos", async(req,res)=>{
    const {sucursal,codven,fecha}  = req.body;
    
    let qry = '';
    qry = `SELECT DOCUMENTOS.CODDOC, DOCUMENTOS.CORRELATIVO, DOCUMENTOS.CODCLIENTE AS CODCLIE, CLIENTES.NEGOCIO, DOCUMENTOS.DOC_NOMCLIE AS NOMCLIE, DOCUMENTOS.DOC_DIRCLIE AS DIRCLIE, '' AS DESMUN, 
                  CASE WHEN Documentos.STATUS = 'A' THEN 0 ELSE ISNULL(Documentos.TOTALPRECIO, 0) END AS IMPORTE, ISNULL(DOCUMENTOS.TOTALPRECIO, 0) AS IMPORTE2, DOCUMENTOS.FECHA, DOCUMENTOS.LAT, DOCUMENTOS.LONG, 
                  DOCUMENTOS.OBS, DOCUMENTOS.DIRENTREGA, DOCUMENTOS.STATUS AS ST, DOCUMENTOS.HORA, 
                  ISNULL(DOCUMENTOS.FEL_UUDI, 'SN') AS FEL_UUDI, DOCUMENTOS.FEL_SERIE, DOCUMENTOS.FEL_NUMERO, 
                  DOCUMENTOS.FEL_FECHA, TIPODOCUMENTOS.TIPODOC
FROM     DOCUMENTOS LEFT OUTER JOIN
                  TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT LEFT OUTER JOIN
                  CLIENTES ON DOCUMENTOS.CODCLIENTE = CLIENTES.CODCLIENTE AND DOCUMENTOS.EMPNIT = CLIENTES.EMPNIT
WHERE  (DOCUMENTOS.EMPNIT = '${sucursal}') 
AND (DOCUMENTOS.FECHA = '${fecha}') 
AND (DOCUMENTOS.CODVEN = ${codven}) AND (TIPODOCUMENTOS.TIPODOC IN('FAC','FEF','FEC','FES','FCP','FPC'))
ORDER BY DOCUMENTOS.CORRELATIVO`

    
    execute.Query(res,qry);
});


router.post("/lista_bonos", async(req,res)=>{

    const {sucursal,codven,fecha}  = req.body;
    
    let qry = '';
    qry = `SELECT DOCUMENTOS.CODDOC, DOCUMENTOS.CORRELATIVO, 
            CLIENTES.NEGOCIO, 
            DOCUMENTOS.DOC_NOMCLIE AS NOMCLIE, 
            DOCUMENTOS.DOC_DIRCLIE AS DIRCLIE, '' AS DESMUN, 
            DOCUMENTOS.FEL_FECHA, 
            SUM(DOCPRODUCTOS.BONO) AS IMPORTE
FROM     DOCUMENTOS LEFT OUTER JOIN
                  DOCPRODUCTOS ON DOCUMENTOS.CORRELATIVO = DOCPRODUCTOS.CORRELATIVO AND DOCUMENTOS.CODDOC = DOCPRODUCTOS.CODDOC AND DOCUMENTOS.EMPNIT = DOCPRODUCTOS.EMPNIT LEFT OUTER JOIN
                  TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT LEFT OUTER JOIN
                  CLIENTES ON DOCUMENTOS.CODCLIENTE = CLIENTES.CODCLIENTE AND DOCUMENTOS.EMPNIT = CLIENTES.EMPNIT
            WHERE  (DOCUMENTOS.EMPNIT = '${sucursal}') 
            AND (DOCUMENTOS.FECHA = '${fecha}') 
            AND (DOCUMENTOS.CODVEN = ${codven}) 
            AND (TIPODOCUMENTOS.TIPODOC IN ('FAC', 'FEF', 'FEC', 'FES', 'FCP', 'FPC')) 
            AND (DOCUMENTOS.STATUS <> 'A')
GROUP BY DOCUMENTOS.CODDOC, DOCUMENTOS.CORRELATIVO, DOCUMENTOS.CODCLIENTE, CLIENTES.NEGOCIO, DOCUMENTOS.DOC_NOMCLIE, DOCUMENTOS.DOC_DIRCLIE, DOCUMENTOS.HORA, DOCUMENTOS.FEL_SERIE, 
                  DOCUMENTOS.FEL_NUMERO, DOCUMENTOS.FEL_FECHA
ORDER BY DOCUMENTOS.CORRELATIVO`

    
    execute.Query(res,qry);
});



router.post("/listancr", async(req,res)=>{
    const {sucursal,codven,fecha}  = req.body;
    
    let qry = '';
    qry = `
    SELECT DOCUMENTOS.CODDOC, DOCUMENTOS.CORRELATIVO, DOCUMENTOS.CODCLIENTE AS CODCLIE, CLIENTES.NEGOCIO, DOCUMENTOS.DOC_NOMCLIE AS NOMCLIE, DOCUMENTOS.DOC_DIRCLIE AS DIRCLIE, '' AS DESMUN, 
                  CASE WHEN Documentos.STATUS = 'A' THEN 0 ELSE ISNULL(Documentos.TOTALPRECIO, 0) END AS IMPORTE, ISNULL(DOCUMENTOS.TOTALPRECIO, 0) AS IMPORTE2, DOCUMENTOS.FECHA, DOCUMENTOS.LAT, DOCUMENTOS.LONG, 
                  DOCUMENTOS.OBS, DOCUMENTOS.DIRENTREGA, DOCUMENTOS.STATUS AS ST, DOCUMENTOS.HORA, ISNULL(DOCUMENTOS.FEL_UUDI, 'SN') AS FEL_UUDI, DOCUMENTOS.FEL_SERIE, DOCUMENTOS.FEL_NUMERO, 
                  DOCUMENTOS.FEL_FECHA, TIPODOCUMENTOS.TIPODOC
FROM     DOCUMENTOS LEFT OUTER JOIN
                  TIPODOCUMENTOS ON DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT LEFT OUTER JOIN
                  CLIENTES ON DOCUMENTOS.CODCLIENTE = CLIENTES.CODCLIENTE AND DOCUMENTOS.EMPNIT = CLIENTES.EMPNIT
WHERE  (DOCUMENTOS.EMPNIT = '${sucursal}') 
AND (DOCUMENTOS.FECHA = '${fecha}') 
AND (DOCUMENTOS.CODVEN = ${codven}) AND (TIPODOCUMENTOS.TIPODOC IN('DEV','FNC'))
ORDER BY DOCUMENTOS.CORRELATIVO
    `

    
    execute.Query(res,qry);
});



//reporte de productos del dia y vendedor
router.post('/reporteproductosdia', async(req,res)=>{
    
    const {fecha,sucursal,codven} = req.body;

    let qry = `
    SELECT ISNULL(DOCPRODUCTOS.CODPROD, 'SN') AS CODPROD, ISNULL(PRODUCTOS.DESPROD, 'SN') AS DESPROD, SUM(ISNULL(DOCPRODUCTOS.TOTALUNIDADES, 0)) AS TOTALUNIDADES, SUM(ISNULL(DOCPRODUCTOS.TOTALCOSTO, 
                  0)) AS TOTALCOSTO, SUM(ISNULL(DOCPRODUCTOS.TOTALPRECIO, 0)) AS TOTALPRECIO
FROM     DOCPRODUCTOS LEFT OUTER JOIN
                  PRODUCTOS ON DOCPRODUCTOS.EMPNIT = PRODUCTOS.EMPNIT AND DOCPRODUCTOS.CODPROD = PRODUCTOS.CODPROD RIGHT OUTER JOIN
                  DOCUMENTOS ON DOCPRODUCTOS.CORRELATIVO = DOCUMENTOS.CORRELATIVO AND DOCPRODUCTOS.CODDOC = DOCUMENTOS.CODDOC AND DOCPRODUCTOS.EMPNIT = DOCUMENTOS.EMPNIT AND 
                  DOCPRODUCTOS.EMPNIT = DOCUMENTOS.EMPNIT LEFT OUTER JOIN
                  TIPODOCUMENTOS ON DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT AND DOCUMENTOS.CODDOC = TIPODOCUMENTOS.CODDOC AND DOCUMENTOS.EMPNIT = TIPODOCUMENTOS.EMPNIT
WHERE  (TIPODOCUMENTOS.TIPODOC IN ('FAC','FCP','FPC','FES','FEF','FEC')) 
AND (DOCUMENTOS.FECHA = '${fecha}') 
AND (DOCUMENTOS.EMPNIT = '${sucursal}') 
AND (DOCUMENTOS.CODVEN = ${codven}) 
AND (DOCUMENTOS.STATUS <> 'A')
GROUP BY DOCPRODUCTOS.CODPROD, PRODUCTOS.DESPROD

    `;
    
    execute.Query(res,qry);

});

// reporte de marcas por vendedor y dia
router.post('/reportemarcasdia',async(req,res)=>{

    const {fecha,sucursal,codven} = req.body;

    let qry = `SELECT  ISNULL(ME_Marcas.DESMARCA, 'SN') AS DESMARCA, 
    ISNULL(SUM(ME_Docproductos.TOTALCOSTO),0) AS TOTALCOSTO, 
    ISNULL(SUM(ME_Docproductos.TOTALPRECIO),0) AS TOTALPRECIO,
    ISNULL(SUM(ME_Docproductos.CANTIDADINV),0) AS FARDOS
    FROM            ME_Productos LEFT OUTER JOIN
                             ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA RIGHT OUTER JOIN
                             ME_Docproductos ON ME_Productos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Productos.CODPROD = ME_Docproductos.CODPROD RIGHT OUTER JOIN
                             ME_Documentos ON ME_Docproductos.DOC_MES = ME_Documentos.DOC_MES AND ME_Docproductos.DOC_ANO = ME_Documentos.DOC_ANO AND ME_Docproductos.EMP_NIT = ME_Documentos.EMP_NIT AND 
                             ME_Docproductos.CODDOC = ME_Documentos.CODDOC AND ME_Docproductos.DOC_NUMERO = ME_Documentos.DOC_NUMERO LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODVEN = ${codven}) AND (ME_Documentos.DOC_FECHA = '${fecha}') AND 
                             (ME_Documentos.CODSUCURSAL = '${sucursal}')
                GROUP BY ME_Marcas.DESMARCA`;

    execute.Query(res,qry);

});

// MENSUALES
//reporte de fechas por vendedor y mes
router.post("/reportedinero", async (req,res)=>{

    const {anio,mes,sucursal,codven} = req.body;

    let qry = `SELECT Documentos.FECHA, 
            COUNT(Documentos.FECHA) AS PEDIDOS, 
            SUM(ISNULL(Documentos.TOTALPRECIO,0)) AS TOTALVENTA
                FROM Documentos LEFT OUTER JOIN
                    Tipodocumentos ON Documentos.EMPNIT = Tipodocumentos.EMPNIT 
                    AND Documentos.CODDOC = Tipodocumentos.CODDOC 
                    AND Documentos.EMPNIT = Tipodocumentos.EMPNIT
                WHERE (Documentos.ANIO = ${anio}) 
                AND (Documentos.MES = ${mes}) 
                AND (Documentos.CODVEN = ${codven}) 
                AND (Documentos.EMPNIT = '${sucursal}') 
                AND (Tipodocumentos.TIPODOC IN ('FAC','FCP','FPC','FES','FEF','FEC')) 
                AND (Documentos.STATUS <> 'A')
                GROUP BY Documentos.FECHA`;
    
    execute.Query(res,qry);
                             
});

//reporte de productos por mes y vendedo
router.post('/reporteproductos', async(req,res)=>{
    
    const {anio,mes,sucursal,codven} = req.body;

    let qry = `SELECT ISNULL(ME_Docproductos.CODPROD,'SN') AS CODPROD, ISNULL(ME_Productos.DESPROD,'SN') AS DESPROD, SUM(ISNULL(ME_Docproductos.CANTIDADINV,0)) AS TOTALUNIDADES, SUM(ISNULL(ME_Docproductos.TOTALCOSTO,0)) AS TOTALCOSTO, SUM(ISNULL(ME_Docproductos.TOTALPRECIO,0)) 
    AS TOTALPRECIO
FROM            ME_Docproductos LEFT OUTER JOIN
    ME_Productos ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND ME_Docproductos.CODPROD = ME_Productos.CODPROD RIGHT OUTER JOIN
    ME_Documentos ON ME_Docproductos.DOC_NUMERO = ME_Documentos.DOC_NUMERO AND ME_Docproductos.CODDOC = ME_Documentos.CODDOC AND 
    ME_Docproductos.CODSUCURSAL = ME_Documentos.CODSUCURSAL AND ME_Docproductos.DOC_ANO = ME_Documentos.DOC_ANO AND ME_Docproductos.EMP_NIT = ME_Documentos.EMP_NIT LEFT OUTER JOIN
    ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
            WHERE (ME_Documentos.DOC_ESTATUS<>'A') AND (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.CODVEN = ${codven})
            GROUP BY ME_Docproductos.CODPROD, ME_Productos.DESPROD`;
    
    execute.Query(res,qry);

});


// reporte de marcas por vendedor y mes
router.post('/reportemarcas',async(req,res)=>{

    const {anio,mes,sucursal,codven} = req.body;

    let qry = `SELECT ISNULL(ME_Marcas.DESMARCA,0) AS DESMARCA, 
        ISNULL(SUM(ME_Docproductos.TOTALCOSTO),0) AS TOTALCOSTO, 
        ISNULL(SUM(ME_Docproductos.TOTALPRECIO),0) AS TOTALPRECIO
    FROM            ME_Marcas RIGHT OUTER JOIN
                             ME_Productos ON ME_Marcas.CODSUCURSAL = ME_Productos.CODSUCURSAL AND ME_Marcas.CODMARCA = ME_Productos.CODMARCA RIGHT OUTER JOIN
                             ME_Documentos LEFT OUTER JOIN
                             ME_Docproductos ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_MES = ME_Docproductos.DOC_MES AND ME_Documentos.DOC_ANO = ME_Docproductos.DOC_ANO AND 
                             ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT AND ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO ON 
                             ME_Productos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Productos.CODPROD = ME_Docproductos.CODPROD LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODVEN = ${codven}) AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ANO = ${anio}) AND 
                             (ME_Documentos.CODSUCURSAL = '${sucursal}')
                GROUP BY ME_Marcas.DESMARCA`;

                

    execute.Query(res,qry);


});

// reporte de locaciones por vendedor y mes
router.post('/reportelocaciones',async(req,res)=>{

    const {anio,mes,sucursal,codven} = req.body;

    let qry = `
    SELECT ME_Documentos.DOC_FECHA AS FECHA, ME_Documentos.DOC_NOMREF AS CLIENTE, COUNT(ME_Documentos.DOC_FECHA) AS PEDIDOS, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALVENTA, ME_Documentos.LAT, ME_Documentos.LONG
    FROM ME_Documentos LEFT OUTER JOIN ME_Tipodocumentos ON ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
    WHERE (ME_Documentos.DOC_ANO = ${anio}) 
            AND (ME_Documentos.DOC_MES = ${mes}) 
            AND (ME_Documentos.CODVEN = ${codven}) 
            AND (ME_Documentos.CODSUCURSAL = '${sucursal}') 
            AND (ME_Tipodocumentos.TIPODOC = 'PED') 
            AND (ME_Documentos.DOC_ESTATUS <> 'A')
    GROUP BY ME_Documentos.DOC_FECHA, ME_Documentos.DOC_NOMREF, ME_Documentos.LAT, ME_Documentos.LONG`;

    execute.Query(res,qry);

});


//******************************* */
// REPORTES DE GERENCIA
//******************************* */

// reporte de sucursales ventas
router.post('/rptsucursalesventas',async(req,res)=>{

    const {anio,mes} = req.body;

    let qry = `SELECT ME_Sucursales.NOMBRE AS SUCURSAL, SUM(ME_Documentos.DOC_TOTALCOSTO) AS COSTO, SUM(ME_Documentos.DOC_TOTALVENTA) AS IMPORTE, Me_Sucursales.COLOR
                    FROM     ME_Documentos LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND 
                             ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT LEFT OUTER JOIN
                             ME_Sucursales ON ME_Documentos.CODSUCURSAL = ME_Sucursales.CODSUCURSAL
                    WHERE   (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Tipodocumentos.TIPODOC = 'PED')
                    GROUP BY ME_Sucursales.NOMBRE, ME_Sucursales.COLOR`;

    execute.Query(res,qry);

});

// ranking de vendedores / datos del host
router.post('/rptrankingvendedores', async(req,res)=>{
    const {anio,mes} = req.body;
    let qry = `SELECT ME_Vendedores.NOMVEN, ME_Sucursales.NOMBRE AS SUCURSAL, SUM(ME_Documentos.DOC_TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALPRECIO
                FROM ME_Documentos LEFT OUTER JOIN
                ME_Vendedores ON ME_Documentos.CODVEN = ME_Vendedores.CODVEN AND ME_Documentos.CODSUCURSAL = ME_Vendedores.CODSUCURSAL LEFT OUTER JOIN
                ME_Sucursales ON ME_Vendedores.CODSUCURSAL = ME_Sucursales.CODSUCURSAL
                WHERE (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes})
                GROUP BY ME_Vendedores.NOMVEN, ME_Sucursales.NOMBRE
                ORDER BY TOTALPRECIO DESC`;
    
    execute.Query(res,qry);
});


// reporte de sucursales ventas - DATOS DE LA SUCURSAL
router.post('/rptsucursalesventassucursales',async(req,res)=>{

    const {anio,mes} = req.body;

    let qry = `SELECT ME_Sucursales.COLOR, ME_RPT_VENTAS.CODSUCURSAL AS SUCURSAL, ME_Sucursales.NOMBRE AS NOMSUCURSAL, SUM(ME_RPT_VENTAS.TOTALPRECIO) AS IMPORTE
    FROM            ME_RPT_VENTAS LEFT OUTER JOIN
                             ME_Sucursales ON ME_RPT_VENTAS.CODSUCURSAL = ME_Sucursales.CODSUCURSAL
    WHERE        (ME_RPT_VENTAS.ANIO =${anio}) AND (ME_RPT_VENTAS.MES = ${mes})
    GROUP BY ME_Sucursales.COLOR, ME_RPT_VENTAS.CODSUCURSAL, ME_Sucursales.NOMBRE`;

    execute.Query(res,qry);

});
// ranking de vendedores / datos de la sucursal
router.post('/rptrankingvendedoressucursal', async(req,res)=>{
    const {anio,mes} = req.body;
    let qry = `SELECT        NOMVEN, SUM(TOTALPRECIO) AS TOTALPRECIO, CODSUCURSAL AS SUCURSAL
    FROM            ME_RPT_VENTAS
    WHERE        (ANIO = ${anio}) AND (MES = ${mes})
    GROUP BY NOMVEN, CODSUCURSAL
    ORDER BY TOTALPRECIO DESC`;
    
    execute.Query(res,qry);
});




//******************************* */
// REPORTES DE SUPERVISOR
//******************************* */


// ranking de vendedores por sucursal y fecha
router.post('/rptrankingvendedoressucursal2', async(req,res)=>{
    const {fecha,sucursal} = req.body;
    let qry = `SELECT       ME_Vendedores.NOMVEN, COUNT(ME_Documentos.CODDOC) AS PEDIDOS, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Vendedores ON ME_Documentos.CODVEN = ME_Vendedores.CODVEN AND ME_Documentos.CODSUCURSAL = ME_Vendedores.CODSUCURSAL
                WHERE (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.DOC_FECHA = '${fecha}')
                GROUP BY ME_Vendedores.NOMVEN
                ORDER BY TOTALPRECIO DESC`;
    
    execute.Query(res,qry);
});

// ranking de vendedores por sucursal y fecha
router.post('/rptrankingvendedoressucursalmes', async(req,res)=>{
    const {anio,mes,sucursal} = req.body;

    let qry = `SELECT  ME_Vendedores.NOMVEN, COUNT(ME_Documentos.CODDOC) AS PEDIDOS, SUM(ME_Documentos.DOC_TOTALVENTA) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Vendedores ON ME_Documentos.CODVEN = ME_Vendedores.CODVEN AND ME_Documentos.CODSUCURSAL = ME_Vendedores.CODSUCURSAL
                WHERE (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.DOC_ANO = ${anio}) AND (ME_Documentos.DOC_MES = ${mes})
                GROUP BY ME_Vendedores.NOMVEN
                ORDER BY TOTALPRECIO DESC`;
    

                //console.log(qry);
                
    execute.Query(res,qry);
});

// reporte de marcas por fecha
router.post('/reportemarcasfecha',async(req,res)=>{

    const {sucursal,fecha} = req.body;

    let qry = `SELECT       ME_Marcas.DESMARCA, SUM(ME_Docproductos.TOTALCOSTO) AS TOTALCOSTO, SUM(ME_Docproductos.TOTALPRECIO) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Docproductos LEFT OUTER JOIN
                             ME_Productos LEFT OUTER JOIN
                             ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND 
                             ME_Docproductos.CODPROD = ME_Productos.CODPROD ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_MES = ME_Docproductos.DOC_MES AND 
                             ME_Documentos.DOC_ANO = ME_Docproductos.DOC_ANO AND ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT AND ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND 
                             ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.CODSUCURSAL = '${sucursal}') AND (ME_Documentos.DOC_FECHA = '${fecha}')
                GROUP BY ME_Marcas.DESMARCA`;

                

    execute.Query(res,qry);


});

// reporte de marcas por mes
router.post('/reportemarcasmes',async(req,res)=>{

    const {anio,mes,sucursal} = req.body;

    let qry = `SELECT ISNULL(ME_Marcas.DESMARCA,'SN') AS DESMARCA, SUM(ISNULL(ME_Docproductos.TOTALCOSTO,0)) AS TOTALCOSTO, SUM(ISNULL(ME_Docproductos.TOTALPRECIO,0)) AS TOTALPRECIO
    FROM            ME_Documentos LEFT OUTER JOIN
                             ME_Docproductos LEFT OUTER JOIN
                             ME_Productos LEFT OUTER JOIN
                             ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA ON ME_Docproductos.CODSUCURSAL = ME_Productos.CODSUCURSAL AND 
                             ME_Docproductos.CODPROD = ME_Productos.CODPROD ON ME_Documentos.CODSUCURSAL = ME_Docproductos.CODSUCURSAL AND ME_Documentos.DOC_MES = ME_Docproductos.DOC_MES AND 
                             ME_Documentos.DOC_ANO = ME_Docproductos.DOC_ANO AND ME_Documentos.EMP_NIT = ME_Docproductos.EMP_NIT AND ME_Documentos.CODDOC = ME_Docproductos.CODDOC AND 
                             ME_Documentos.DOC_NUMERO = ME_Docproductos.DOC_NUMERO LEFT OUTER JOIN
                             ME_Tipodocumentos ON ME_Documentos.CODSUCURSAL = ME_Tipodocumentos.CODSUCURSAL AND ME_Documentos.CODDOC = ME_Tipodocumentos.CODDOC AND ME_Documentos.EMP_NIT = ME_Tipodocumentos.EMP_NIT
                WHERE (ME_Tipodocumentos.TIPODOC = 'PED') AND (ME_Documentos.DOC_ESTATUS <> 'A') AND (ME_Documentos.DOC_MES = ${mes}) AND (ME_Documentos.DOC_ANO = ${anio}) AND 
                             (ME_Documentos.CODSUCURSAL = '${sucursal}')
                GROUP BY ME_Marcas.DESMARCA`;

                

    execute.Query(res,qry);


});


// INSERTA UN PEDIDO EN LAS TABLAS DE DOCUMENTOS Y DOCPRODUCTOS
router.post("/insertventa", async (req,res)=>{
    
    const {jsondocproductos,codsucursal,concre,empnit,anio,mes,dia,poriva,coddoc,correl,fecha,vence,fechaentrega,formaentrega,codcliente,nomclie,codbodega,totalcosto,totalprecio,nitclie,dirclie,obs,direntrega,usuario,codven,lat,long,hora,minuto} = req.body;
  

    let tblDocproductos = JSON.parse(jsondocproductos);
   
    let qry = ''; // inserta los datos en la tabla documentos
    let qrydoc = ''; // inserta los datos de la tabla docproductos
    let qrycorrelativo = ''; //actualiza el correlativo del documento
    let tiponit = ''
    if(Number(nitclie.toString().length)>11){tiponit='DPI'}else{tiponit='NIT'}


    let correlativo = correl;
      //carga los espacios en blanco en el correlativo actual
      //correlativo = getCorrelativo(correlativo);

    tblDocproductos.map((p)=>{
        qrydoc = qrydoc + `INSERT INTO DOCPRODUCTOS
        (EMPNIT
            ,ANIO
            ,MES
            ,DIA
            ,CODDOC
            ,CORRELATIVO
            ,CODPROD
            ,DESPROD
            ,CODMEDIDA
            ,CANTIDAD
            ,CANTIDADBONIF
            ,EQUIVALE
            ,TOTALUNIDADES
            ,TOTALBONIF
            ,COSTO
            ,PRECIO
            ,TOTALCOSTO
            ,TOTALPRECIO
            ,ENTREGADOS_TOTALUNIDADES
            ,ENTREGADOS_TOTALCOSTO
            ,ENTREGADOS_TOTALPRECIO
            ,COSTOANTERIOR
            ,COSTOPROMEDIO
            ,DESCUENTO
            ,PORCDESCUENTO
            ,NOSERIE
            ,EXENTO
            ,OBS
            ,TOTALIVA
            ,TOTALSINIVA
            ,TIPOPROD
            ,TIPOPRECIO
            ,LASTUPDATE
            ,TOTALUNIDADES_DEVUELTAS
            ,POR_IVA
            ,BONO)
        SELECT 
            '${p.EMPNIT}' AS EMPNIT
            ,${anio} AS ANIO
            ,${mes} AS MES
            ,0 AS DIA
            ,'${coddoc}' AS CODDOC
            ,${correlativo} AS CORRELATIVO
            ,'${p.CODPROD}' AS CODPROD
            ,'${p.DESPROD}' AS DESPROD
            ,'${p.CODMEDIDA}' AS CODMEDIDA
            ,${p.CANTIDAD} AS CANTIDAD
            ,0 AS CANTIDADBONIF
            ,${p.EQUIVALE} AS EQUIVALE
            ,${p.TOTALUNIDADES} AS TOTALUNIDADES
            ,0 AS TOTALBONIF
            ,${p.COSTO} AS COSTO
            ,${p.PRECIO} AS PRECIO
            ,${p.TOTALCOSTO} AS TOTALCOSTO
            ,${p.TOTALPRECIO} AS TOTALPRECIO
            ,${p.TOTALUNIDADES} AS ENTREGADOS_TOTALUNIDADES
            ,${p.TOTALCOSTO} AS ENTREGADOS_TOTALCOSTO
            ,${p.TOTALPRECIO} AS ENTREGADOS_TOTALPRECIO
            ,${p.COSTO} AS COSTOANTERIOR
            ,${p.COSTO} AS COSTOPROMEDIO
            ,${p.DESCUENTO || 0} AS DESCUENTO
            ,0 AS PORCDESCUENTO
            ,'' AS NOSERIE
            ,0 AS EXENTO
            ,'' AS OBS
            ,0 AS TOTALIVA
            ,0 AS TOTALSINIVA
            ,'P' AS TIPOPROD
            ,'${p.TIPOPRECIO}' AS TIPOPRECIO
            ,'${fecha}' AS LASTUPDATE
            ,0 AS TOTALUNIDADES_DEVUELTAS
            ,${poriva} AS POR_IVA
            ,${Number(p.BONO) * Number(p.CANTIDAD)} AS BONO;`
    });


    //obtiene el número del correlativo actual para actualizar luego
    let ncorrelativo = correl;


    //contado o credito
    let abono = 0; 
    let saldo = 0;

    if(concre.toString()=='CON'){
        abono = totalprecio;
        saldo = 0;
    }else{
        saldo = totalprecio;
        abono = 0;
    }
      
    let nuevocorrelativo = Number(ncorrelativo) + 1;

            qry = `
                INSERT INTO DOCUMENTOS
                    (EMPNIT
                    ,ANIO
                    ,MES
                    ,DIA
                    ,FECHA
                    ,HORA
                    ,MINUTO
                    ,CODDOC
                    ,CORRELATIVO
                    ,CODCLIENTE
                    ,DOC_NIT
                    ,DOC_NOMCLIE
                    ,DOC_DIRCLIE
                    ,TOTALCOSTO
                    ,TOTALPRECIO
                    ,CODEMBARQUE
                    ,STATUS
                    ,USUARIO
                    ,CONCRE
                    ,CORTE
                    ,SERIEFAC
                    ,NOFAC
                    ,CODVEN
                    ,PAGO
                    ,VUELTO
                    ,OBS
                    ,DOC_SALDO
                    ,DOC_ABONO
                    ,OBSMARCA
                    ,TOTALDESCUENTO
                    ,CODCAJA
                    ,TOTALTARJETA
                    ,RECARGOTARJETA
                    ,DIRENTREGA
                    ,TOTALEXENTO
                    ,LAT
                    ,LONG
                    ,VENCIMIENTO
                    ,DIASCREDITO
                    ,TOTALIVA
                    ,TOTALSINIVA
                    ,TIPO_NIT
                    ,POR_IVA
                )
                SELECT 
                    '${empnit}' AS EMPNIT
                    ,${anio} AS ANIO
                    ,${mes} AS MES
                    ,${dia} AS DIA
                    ,'${fecha}' AS FECHA
                    ,${hora} AS HORA
                    ,${minuto} AS MINUTO
                    ,'${coddoc}' AS CODDOC
                    ,${correlativo} AS CORRELATIVO
                    ,${codcliente} AS CODCLIENTE
                    ,'${nitclie}' AS DOC_NIT
                    ,'${nomclie}' AS DOC_NOMCLIE
                    ,'${dirclie}' AS DOC_DIRCLIE
                    ,${totalcosto} AS TOTALCOSTO
                    ,${totalprecio} AS TOTALPRECIO
                    ,'APP' AS CODEMBARQUE
                    ,'O' AS STATUS
                    ,'${usuario}' AS USUARIO
                    ,'${concre}' AS CONCRE
                    ,'NO' AS CORTE
                    ,'${coddoc}' AS SERIEFAC
                    ,'${correlativo}' AS NOFAC
                    ,${codven} AS CODVEN
                    ,0 AS PAGO
                    ,0 AS VUELTO
                    ,'${obs}' AS OBS
                    ,${saldo} AS DOC_SALDO
                    ,${abono} AS DOC_ABONO
                    ,'' AS OBSMARCA
                    ,0 AS TOTALDESCUENTO
                    ,1 AS CODCAJA
                    ,0 AS TOTALTARJETA
                    ,0 AS RECARGOTARJETA
                    ,'' AS DIRENTREGA
                    ,0 AS TOTALEXENTO
                    ,${lat} AS LAT
                    ,${long} AS LONG
                    ,'${vence}'AS VENCIMIENTO
                    ,0 AS DIASCREDITO
                    ,${Number(totalprecio) - (Number(totalprecio)/Number(poriva))} AS TOTALIVA
                    ,${(Number(totalprecio)/Number(poriva))} AS TOTALSINIVA
                    ,'${tiponit}' AS TIPO_NIT
                    ,${poriva} AS POR_IVA;
`
                   
                qrycorrelativo =`   UPDATE TIPODOCUMENTOS 
                                        SET CORRELATIVO=${nuevocorrelativo} 
                                        WHERE EMPNIT='${codsucursal}' 
                                            AND CODDOC='${coddoc}';`
      
 
 
     
    execute.Query(res, qrycorrelativo + qry + qrydoc);
    
});



router.post("/updatecorrelativo", async (req,res)=>{

    const {codsucursal,coddoc,correlativo} = req.body;

    let nuevocorrelativo = Number(correlativo) + 1;

    let qrycorrelativo =`UPDATE ME_TIPODOCUMENTOS 
                            SET CORRELATIVO=${nuevocorrelativo} 
                            WHERE CODSUCURSAL='${codsucursal}' AND CODDOC='${coddoc}';
                        UPDATE ME_USUARIOS 
                            SET CORRELATIVO=${nuevocorrelativo} 
                            WHERE CODSUCURSAL='${codsucursal}' AND CODDOC='${coddoc}';`
    execute.Query(res,qrycorrelativo);

});




module.exports = router;