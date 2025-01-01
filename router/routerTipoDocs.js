const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/update_correlativo_auto", async(req,res)=>{
    const {sucursal,coddoc} = req.body;
        
    let qry ='';

    qry = `
            SELECT MAX(CORRELATIVO) AS ULTIMO 
            FROM DOCUMENTOS 
            WHERE EMPNIT='${sucursal}' 
            AND CODDOC='${coddoc}';
            `     
    
    execute.QueryData(qry)
    .then((data)=>{
        let ultimo = 0;
        data.recordset.map((r)=>{
            ultimo = Number(r.ULTIMO);
        })

        let newQry = `UPDATE 
            TIPODOCUMENTOS SET CORRELATIVO=${(ultimo+1)} 
            WHERE EMPNIT='${sucursal}' 
            AND CODDOC='${coddoc}';   `

        execute.Query(res,newQry)
    
        
    })
    .catch(()=>{
        res.send('error')
    })

});



router.post("/updatecorrelativo", async(req,res)=>{
    const {sucursal,coddoc,correlativo} = req.body;
        
    let qry ='';

    qry = `UPDATE TIPODOCUMENTOS SET CORRELATIVO=${correlativo} 
            WHERE EMPNIT='${sucursal}' 
            AND CODDOC='${coddoc}';  `     
  
    execute.Query(res,qry);

});


router.post("/documentosvendedores", async(req,res)=>{
    const {sucursal} = req.body;
        
    let qry ='';

    qry = `SELECT isnull(ME_USUARIOS.NOMBRE,'SN') AS NOMBRE, ME_Tipodocumentos.CODDOC, ME_Tipodocumentos.CORRELATIVO
            FROM ME_Tipodocumentos LEFT OUTER JOIN ME_USUARIOS ON ME_Tipodocumentos.CODDOC = ME_USUARIOS.CODDOC AND ME_Tipodocumentos.CODSUCURSAL = ME_USUARIOS.CODSUCURSAL
            WHERE (ME_Tipodocumentos.CODSUCURSAL = '${sucursal}')`     
  
    execute.Query(res,qry);

});

// VENTAS BUSCAR PRODUCTO POR DESCRIPCION
router.get("/tipo", async(req,res)=>{
    const {app,empnit,tipo} = req.query;
        
    let qry ='';

    qry = `SELECT CODDOC,CORRELATIVO FROM ME_TIPODOCUMENTOS WHERE CODSUCURSAL='${app}' AND TIPODOC='${tipo}'`     
  
    execute.Query(res,qry);

});

router.get("/tipopedido", async(req,res)=>{
    const {app,empnit,tipo} = req.query;
        
    let qry ='';

    qry = `SELECT CODDOC,CORRELATIVO FROM ME_TIPODOCUMENTOS WHERE CODSUCURSAL='${app}' AND TIPODOC='PED'`     
  
    execute.Query(res,qry);

});

// VENTAS BUSCAR PRODUCTO POR DESCRIPCION
router.get("/correlativodoc", async(req,res)=>{
    const {app,empnit,tipo,coddoc} = req.query;
        
    let qry ='';

    qry = `SELECT CODDOC,CORRELATIVO 
            FROM TIPODOCUMENTOS 
            WHERE EMPNIT='${empnit}' AND CODDOC='${coddoc}'`     
    
    execute.Query(res,qry);

});


router.post("/correlativodoc", async(req,res)=>{
    const {app,empnit,tipo,coddoc} = req.body;
        
    let qry ='';

    qry = `SELECT CODDOC,
            CORRELATIVO 
        FROM TIPODOCUMENTOS 
        WHERE EMPNIT='${empnit}' AND CODDOC='${coddoc}'`     
    
    execute.Query(res,qry);

});





// OBTIENE LAS SUCURSALES
router.get("/sucursales", async(req,res)=>{
            
    let qry ='';

    qry = `SELECT CODSUCURSAL, NOMBRE, ENCARGADO FROM ME_SUCURSALES`     
  
    execute.Query(res,qry);

});

module.exports = router;
