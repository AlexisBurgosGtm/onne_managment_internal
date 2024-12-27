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







module.exports = router;

