const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/config", async(req,res)=>{

    const{sucursal} = req.body;

    let qry = `
        SELECT ID, SINO,PASS FROM CONFIG
    `
    
    
     execute.Query(res,qry);
     
});


router.post("/config_fel", async(req,res)=>{

    const{sucursal} = req.body;

    let qry = `
        SELECT CERTIFICACION_USUARIO
            ,CERTIFICACION_LLAVE
            ,FIRMA_ALIAS
            ,FIRMA_LLAVE
            ,EMISOR_CODIGOESTABLECIMIENTO
            ,EMISOR_CODIGOPOSTAL
            ,EMISOR_DEPARTAMENTO
            ,EMISOR_DIRECCION
            ,EMISOR_MUNICIPIO
            ,EMISOR_NOMBRE
            ,EMISOR_NOMBRECOMECIAL
            ,EMISOR_NIT
            ,EMISOR_FRASE
            ,EMISOR_ESCENARIO
            ,EMISOR_FRASE2
            ,EMISOR_ESCENARIO2
            ,CONEXION
            ,EMPNIT
            ,NIT_RESOLUCION
            ,NIT_FECHA_RESOLUCION
            ,ADENDA_SUCURSAL
            ,ADENDA_TELSUCURSAL
            ,ADENDA_TELSUPERVISOR
        FROM FEL_CREDENCIALES

    `
    
    
     execute.Query(res,qry);
     
});






module.exports = router;

