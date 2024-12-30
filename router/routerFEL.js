const SQL = require('./connection');
const express = require('express');
const router = express.Router();
var axios = require('axios');



let FEL = {
    IVA: 1.12,
    CodigoEstablecimiento:"1",
    NITEmisor:"108983668",
    NombreComercial:"COMMUNITY - ONNE BUSSINES",
    NombreEmisor:"COMMUNITY - ONNE BUSSINES",
    Direccion:"5 AVENIDA RESIDENCIAL PAISAJES II 5-03 B ZONA 8",
    CodigoPostal:"01057",
    Municipio:"MIXCO",
    Departamento:"GUATEMALA",
    ACCESO_REQ_NOMBRE:"108983668",
    ACCESO_REQ_CLAVE:"10C31B59EBA52440AA96D5753D84CB4D",
    ACCESO_FIRMA_USUARIO:"108983668",
    ACCESO_FIRMA_CLAVE:"c6342c726fd2f28a656e55bcea33abf6",
    URL_REPORT_INFILE: "https://report.feel.com.gt/ingfacereport/ingfacereport_documento?uuid=",
    CONFIG_FEL_HABILITADO: 'SI'
};

// C30070E7-D7F6-41E5-8551-5B5B5BE32905

let QRYS = {
    qryFacturaNormal: (nofactura)=>{
        
        let qry = "SELECT " +
        " `tabPOS Invoice`.company AS EMPNIT, `tabPOS Invoice`.name AS CODDOC,  `tabPOS Invoice`.posting_date AS FECHA, " + 
        " tabCustomer.custom_nit AS NITCLIE, `tabPOS Invoice`.TITLE AS NOMCLIE, " + " 'CIUDAD' AS DIRCLIE," +
        " `tabPOS Invoice Item`.item_code AS CODPROD, `tabPOS Invoice Item`.description AS DESPROD, " + 
        " `tabPOS Invoice Item`.UOM AS CODMEDIDA,  `tabPOS Invoice Item`.QTY AS CANTIDAD, " + 
        " `tabPOS Invoice Item`.stock_qty AS TOTALUNIDADES," + 
        " `tabPOS Invoice Item`.price_list_rate AS PRECIO, `tabPOS Invoice Item`.amount AS IMPORTE, " + 
        " `tabPOS Invoice`.NET_TOTAL AS TOTAL, 0 AS EXCENTO  " + 
        "FROM  `tabPOS Invoice`  INNER JOIN  `tabPOS Invoice Item` ON `tabPOS Invoice`.NAME = `tabPOS Invoice Item`.parent " + 
        "INNER JOIN tabCustomer ON `tabPOS Invoice`.customer = tabCustomer.name  " + 
        " WHERE `tabPOS Invoice`.NAME = '" + nofactura + "' " + 
        "ORDER BY  `tabPOS Invoice Item`.description;"

        return qry;

    },
    qryUpdateDatosFel:(nofactura,uudi,serie,numero,fecha,errores)=>{
        let qry = 'UPDATE `tabPOS Invoice` ' + `
                SET custom_uuid = '${uudi}', 
                terms = '${errores}', 
                custom_serie = '${serie}', 
                custom_numero = '${numero}', 
                custom_fecha_certificacion = '${fecha}'
            WHERE name = '${nofactura}'`
        
        return qry
    }
};

// certifica factura normal iva
router.post("/fel_factura_iva_normal", async(req,res)=>{
   
    const {nofactura,fecha} =req.body;
	
    fcn_certificar_factura_iva_normal(res,nofactura,fecha)
    
});


// TIPOS DE DOCUMENTOS A CERTIICAR
function fcn_certificar_factura_iva_normal(res,nofactura,fecha){
        
    return new Promise((resolve,reject)=>{
        // arma el xml
        funciones.getXmlFel(nofactura,fecha)
        .then((xmlstring)=>{   
                
                // lo convierte a base 64   
                funciones.converBase64(xmlstring)
                .then((xmlconvertido)=>{
                        
                        // lo envia a firmar (verifica que esté correcto)
                        funciones.solicitar_firma_FEL(nofactura,xmlconvertido)
                        .then((data)=>{
                            if(data.resultado==true){
                                
                                // lo envía a infile para certificar y obtener serie y número
                                funciones.certificar_xml_firmado(nofactura,data.archivo)
                                .then((data)=>{
                                       
                                        if(data.resultado==true){
                                                console.log('Factura certificada: ' + nofactura);
                                            
                                                let certificacion = [{
                                                    resultado:true,
                                                    uuid:data.uuid.toString(),
                                                    serie:data.serie.toString(),
                                                    numero:data.numero.toString(),
                                                    fecha:data.fecha.toString(),
                                                    url_infile_pdf:FEL.URL_REPORT_INFILE.toString() + data.uuid.toString() 
                                                }]

        
                                                update_documento_feldata(nofactura,data.uuid.toString(),data.serie.toString(),data.numero.toString(),data.fecha.toString(),'SN')
                                               
                                                res.send(certificacion);
                                                /* 
                                                funciones.update_FEL_series(coddoc,correlativo,data.uuid.toString(),data.serie.toString(),data.numero.toString(),data.fecha.toString())
                                                .then(()=>{
                                                    resolve(data.uuid.toString())
                                                })
                                                .catch(()=>{
                                                    reject('La factura se certificó pero no se actualizaron los datos')
                                                })
                                                */
                                        }else{
                                            update_documento_feldata(nofactura,'SN','SN','SN','SN',data.descripcion_errores)
                                            res.send(data.descripcion_errores);
                                        }
                                        
                                })
                                .catch((error)=>{
                                    res.send('error al certificar' + error)
                                })
                            }else{
                                res.sen('Factura no se pudo firmar. Error: ' + data.descripcion)
                            }
                        })
                        .catch((error)=>{
                            res.send('Factura no se pudo firmar. Error: ' + error)
                        })
                })      
        })
        .catch((err)=>{
            res.send('No se pudo obtener el xml')
        })
    })

};

function update_documento_feldata(nofactura,uudi,serie,numero,fecha,errores){
  
    let qry = QRYS.qryUpdateDatosFel(nofactura,uudi,serie,numero,fecha,errores);

    SQL.update_fel_data(qry);

};


// FUNCIONES AUXILIARES
let funciones = {
        getXmlFel(nofactura,fecha){

            // usé "let" para las variables que arman el xml y "var" para las que solo meten valores
            let xmlstring = '';

            return new Promise((resolve,reject)=>{

                    var fechaemision = funciones.get_FEL_fecha(fecha); 

                    var numeroacceso = '400000110';
                
                    let encabezado = `<dte:GTDocumento xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:dte="http://www.sat.gob.gt/dte/fel/0.2.0"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="0.1" xsi:schemaLocation="http://www.sat.gob.gt/dte/fel/0.2.0">
                                    <dte:SAT ClaseDocumento="dte">
                                    <dte:DTE ID="DatosCertificados">
                                        <dte:DatosEmision ID="DatosEmision">
                                        <dte:DatosGenerales CodigoMoneda="GTQ" FechaHoraEmision="${fechaemision}" NumeroAcceso="${numeroacceso}" Tipo="FACT" />
                                    `
            
                    let emisor = `  <dte:Emisor AfiliacionIVA="GEN" CodigoEstablecimiento="${FEL.CodigoEstablecimiento}" CorreoEmisor="" NITEmisor="${FEL.NITEmisor}" NombreComercial="${FEL.NombreComercial}" NombreEmisor="${FEL.NombreEmisor}">
                                    <dte:DireccionEmisor>
                                    <dte:Direccion>${FEL.Direccion}</dte:Direccion>
                                    <dte:CodigoPostal>${FEL.CodigoPostal}</dte:CodigoPostal>
                                    <dte:Municipio>${FEL.Municipio}</dte:Municipio>
                                    <dte:Departamento>${FEL.Departamento}</dte:Departamento>
                                    <dte:Pais>GT</dte:Pais>
                                    </dte:DireccionEmisor>
                                </dte:Emisor>`;
            
                    let receptor = ''; // lo lleno abajo al leer los datos de la qry
                                    
                
                    let frases =    `<dte:Frases>
                                        <dte:Frase CodigoEscenario="1" TipoFrase="1" />
                                    </dte:Frases>`
            
                    let totales = '';
                    let items = '';
            
                    let footer =   `</dte:DatosEmision>
                            </dte:DTE>
                            <dte:Adenda>
                                <dte:Valor1>${nofactura}</dte:Valor1>
                            </dte:Adenda>
                        </dte:SAT>
                    </dte:GTDocumento>`
            
                    let strdata ='';
            

                    SQL.getData(QRYS.qryFacturaNormal(nofactura))
                    .then((results)=>{

                        const data = results;

                        let receptor_nit = '';
                        let receptor_nombre = '';
                        let receptor_direccion = '';
                        let receptor_municipio = '';
                        let receptor_departamento = '';
                    
                        let total =0;
                        let totaliva = 0;
                        let numerolinea = 0;
                        data.map((rows)=>{
                            // datos del cliente - receptor
                            receptor_nit = rows.NITCLIE;
                            receptor_nombre = rows.NOMCLIE;
                            receptor_direccion = rows.DIRCLIE;
                            receptor_municipio = 'GUATEMALA';
                            receptor_departamento = 'GUATEMALA';
                            // items de la factura
                                numerolinea += 1;
                                let subtotal = 0;
                                let iva = 0;
                                total = Number(total) + Number(rows.IMPORTE);
                                iva = (Number(Number(rows.IMPORTE).toFixed(3)) - (Number(Number(rows.IMPORTE).toFixed(3))/Number(FEL.IVA))).toFixed(3);
                                subtotal = (Number(rows.IMPORTE)-iva).toFixed(2);
                                totaliva += Number(iva);
                                strdata += funciones.getStrItem(numerolinea,rows.CANTIDAD,rows.CODMEDIDA,rows.DESPROD,rows.PRECIO,0,subtotal,iva);
                        })
                        items = '<dte:Items>' + strdata + '</dte:Items>';
                        totales = ` <dte:Totales>
                                        <dte:TotalImpuestos>
                                        <dte:TotalImpuesto NombreCorto="IVA" TotalMontoImpuesto="${Number(totaliva).toFixed(3)}" />
                                        </dte:TotalImpuestos>
                                        <dte:GranTotal>${total.toFixed(3)}</dte:GranTotal>
                                    </dte:Totales>`;


                        var tipoespecial = "";
                        receptor_nit = funciones.limpiarTexto(receptor_nit).toUpperCase();
                        if(receptor_nit.length.toString()=='13'){tipoespecial ='TipoEspecial="CUI"'}; //es una frase que se incluye si el nit es un dpi

                        receptor = ` <dte:Receptor CorreoReceptor="" IDReceptor="${receptor_nit}" NombreReceptor="${receptor_nombre}" ${tipoespecial}>
                                        <dte:DireccionReceptor>
                                        <dte:Direccion>${receptor_direccion}</dte:Direccion>
                                        <dte:CodigoPostal>0</dte:CodigoPostal>
                                        <dte:Municipio>${receptor_municipio}</dte:Municipio>
                                        <dte:Departamento>${receptor_departamento}</dte:Departamento>
                                        <dte:Pais>GT</dte:Pais>
                                        </dte:DireccionReceptor>
                                    </dte:Receptor>`;

                        xmlstring = encabezado + emisor + receptor + frases + items + totales + footer;
                        
                        resolve(xmlstring);

                    })
                    .catch((error)=>{
                        console.log(error);
                        xmlstring = 'NO';
                        reject(xmlstring);
                    })

            })

        



        },
        get_FEL_fecha(date) {
        
            let strFecha = '';
        
            const [yy, mm, dd] = date.split(/-/g);
        
            let hoy = new Date();
                let hora = hoy.getHours();
                if(hora.toString().length==1){hora="0" + hora.toString()};
                let minuto = hoy.getMinutes();
                if(minuto.toString().length==1){minuto="0" + minuto.toString()};
                let segundo = hoy.getSeconds();
                if(segundo.toString().length==1){segundo="0" + segundo.toString()};
            
            strFecha = `${yy}-${mm}-${dd}T${hora.toString()}:${minuto.toString()}:${segundo.toString()}.000-06:00`.replace('T00:00:00.000Z', '');
            return strFecha;
        
        },
        limpiarTexto: (texto) =>{
            var ignorarMayMin = true;
            var reemplazarCon = " pulg";
            var reemplazarQue = '"';
            reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
            reemplazarCon = reemplazarCon.replace(/\$(?=[$&`"'\d])/g, "$$$$"),
            modif = "g" + (ignorarMayMin ? "i" : ""),
            regex = new RegExp(reemplazarQue, modif);
            return texto.replace(regex,reemplazarCon);
        },
        getStrItem(numerolinea,cantidad,codmedida,descripcion,precioun,descuento,subtotal,iva){
            
            
            let totalprecio = (Number(precioun)*Number(cantidad));
            
            let str = ` 
                    <dte:Item BienOServicio="B" NumeroLinea="${numerolinea}">
                    <dte:Cantidad>${cantidad}</dte:Cantidad>
                    <dte:UnidadMedida>${codmedida.substring(0,3)}</dte:UnidadMedida>
                    <dte:Descripcion>${descripcion}</dte:Descripcion>
                    <dte:PrecioUnitario>${Number(precioun).toFixed(3)}</dte:PrecioUnitario>
                    <dte:Precio>${Number(totalprecio).toFixed(3)}</dte:Precio>
                    <dte:Descuento>${Number(descuento)}</dte:Descuento>
                    <dte:Impuestos>
                        <dte:Impuesto>
                        <dte:NombreCorto>IVA</dte:NombreCorto>
                        <dte:CodigoUnidadGravable>1</dte:CodigoUnidadGravable>
                        <dte:MontoGravable>${Number(subtotal)}</dte:MontoGravable>
                        <dte:MontoImpuesto>${Number(iva)}</dte:MontoImpuesto>
                        </dte:Impuesto>
                    </dte:Impuestos>
                    <dte:Total>${Number(Number(totalprecio)-Number(descuento)).toFixed(3)}</dte:Total>
                    </dte:Item>   
                    `;
            
            return str;
        },
        converBase64:(xmlstring)=>{
            return new Promise((resolve, reject)=>{
                let str = btoa(xmlstring)
                resolve(str);
            })
        },
        solicitar_firma_FEL(nofactura,xml){
            return new Promise((resolve,reject)=>{
                axios.post('https://signer-emisores.feel.com.gt/sign_solicitud_firmas/firma_xml', {
                    llave: FEL.ACCESO_FIRMA_CLAVE, 
                    archivo: xml, 
                    codigo: nofactura, 
                    alias: FEL.ACCESO_FIRMA_USUARIO, 
                    es_anulacion: "N" 
                })
                .then((response) => {
                    
                    const data = response.data;
                    if(data.resultado==true){
                        console.log('factura firmada ' + nofactura)
                        resolve(data);
                    }else{
                        reject(data.descripcion);
                    }
                }, (error) => {
                    console.log('factura NO firmada:' + error);
                    reject(error);
                });
            })
        },
        certificar_xml_firmado(nofactura,xml){
            return new Promise((resolve,reject)=>{
                
                try {
                    axios.post('https://certificador.feel.com.gt/fel/certificacion/v2/dte/',
                    {nit_emisor: FEL.NITEmisor, 
                    correo_copia: "", 
                    xml_dte: xml
                    }, 
                    {
                    headers: {
                        usuario: FEL.ACCESO_REQ_NOMBRE,
                        llave: FEL.ACCESO_REQ_CLAVE,
                        identificador: nofactura,
                        'Content-Type': 'application/json'
                    } 
                    })
                    .then((response) => {
                        const data = response.data;
                       
                        resolve(data);
                    }, (error) => {
                    
                        reject(error);
                    });
                } catch (error) {
                
                    reject({result:false});
                };
            
        
            })
        }
};


module.exports = router;