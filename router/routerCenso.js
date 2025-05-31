const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.post("/nuevocliente", async(req,res)=>{

    const{sucursal,codven,fecha,nitclie,tiponegocio,negocio,nomclie,dirclie,codmun,coddepto,referencia,obs,telefono,visita,lat,long,sector,codgira} = req.body;

    let qry = `
    INSERT INTO CLIENTES (
                    EMPNIT,DPI,NIT,NOMBRECLIENTE,DIRCLIENTE,CODMUNICIPIO,CODDEPARTAMENTO,TELEFONOCLIENTE,EMAILCLIENTE,ESTADOCIVIL,SEXO,
                    FECHANACIMIENTOCLIENTE,LATITUDCLIENTE,LONGITUDCLIENTE,CATEGORIA,CIUDADANIA,OCUPACION,CODRUTA,CALIFICACION,SALDO,FECHAINICIO,
                    HABILITADO,DIAVISITA,LIMITECREDITO,DIASCREDITO,PROVINCIA,TIPONEGOCIO,NEGOCIO,CODCLIE,GIRA) 
        SELECT 
            '${sucursal}' AS EMPNIT,'SN' AS DPI,'${nitclie}' AS NIT, '${nomclie}' AS NOMBRECLIENTE,
                '${dirclie}' AS DIRCLIENTE, ${codmun} AS CODMUNICIPIO, ${coddepto} AS CODDEPARTAMENTO,
                '${telefono}' AS TELEFONOCLIENTE, '' AS EMAILCLIENTE, '' AS ESTADOCIVIL, '' AS SEXO,
                '${fecha}' AS FECHANACIMIENTOCLIENTE, '${lat}' AS LATITUDCLIENTE, '${long}' AS LONGITUDCLIENTE,
                'P' AS CATEGORIA, '' AS CIUDADANIA, '' AS OCUPACION, CODRUTA AS CODRUTA, 'REGULAR' AS CALIFICACION,
                0 AS SALDO, '${fecha}' AS FECHAINICIO, 'SI' AS HABILITADO, '${visita}' AS DIAVISITA,
                0 AS LIMITECREDITO, 0 AS DIASCREDITO, '${referencia}' AS PROVINCIA, '${tiponegocio}' AS TIPONEGOCIO,
                '${negocio}' AS NEGOCIO, '0' AS CODCLIE, ${codgira} AS GIRA 
        FROM RUTAS WHERE  (EMPNIT = '${sucursal}') AND (CODEMPLEADO = ${codven});
    `
    
    console.log(qry);
    
     execute.Query(res,qry);
     
});


router.post("/rutas", async(req,res)=>{


    let qry = `SELECT CODMUNICIPIO AS CODIGO, DESMUNICIPIO AS DESCRIPCION
                FROM MUNICIPIOS; `

     execute.Query(res,qry);
     
});

router.post("/municipios", async(req,res)=>{


    let qry = `SELECT CODMUNICIPIO AS CODIGO, DESMUNICIPIO AS DESCRIPCION
                FROM MUNICIPIOS; `

     execute.Query(res,qry);
     
});

router.post("/departamentos", async(req,res)=>{


    let qry = `SELECT CODDEPARTAMENTO AS CODIGO, 
                DESDEPARTAMENTO AS DESCRIPCION  
                FROM DEPARTAMENTOS; `

     execute.Query(res,qry);
     
});











module.exports = router;

