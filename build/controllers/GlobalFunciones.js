let GF = {
    get_data_qry:(url,data)=>{
        return new Promise((resolve,reject)=>{

            axios.post(GlobalUrlCalls + url, data)
            .then((response) => {
                if(response.status.toString()=='200'){
                    let data = response.data;
                    if(Number(data.rowsAffected[0])>0){
                        resolve(data);             
                    }else{
                        reject();
                    }            
                }else{
                    reject();
                }             
            }, (error) => {
                reject();
            });
        }) 
    
    },
    verify_codprod:(codprod)=>{
    
        return new Promise((resolve,reject)=>{
    
            axios.post(GlobalUrlCalls + '/productos/verify_codprod',
                {
                    sucursal:cmbEmpresa.value,
                    token:TOKEN,
                    codprod:codprod
                })
            .then((response) => {
                if(response.status.toString()=='200'){
                    let data = response.data;
                    if(Number(data.rowsAffected[0])>0){
                        resolve(data);             
                    }else{
                        reject();
                    }            
                }else{
                    reject();
                }             
            }, (error) => {
                reject();
            });
        })   
    
    },
    verify_codprod_movimientos:(codprod)=>{
    
        return new Promise((resolve,reject)=>{
    
            axios.post(GlobalUrlCalls + '/productos/verify_codprod_movimientos',
                {
                    sucursal:cmbEmpresa.value,
                    token:TOKEN,
                    codprod:codprod
                })
            .then((response) => {
                if(response.status.toString()=='200'){
                    let data = response.data;
                    if(Number(data.rowsAffected[0])==0){
                        resolve();             
                    }else{
                        reject();
                    }            
                }else{
                    reject();
                }             
            }, (error) => {
                reject();
            });
        })   
    
    },
    get_data_empleados_tipo:(tipo)=>{
        return new Promise((resolve,reject)=>{
    
            axios.post(GlobalUrlCalls + '/empleados/empleados_tipo',
                {
                    sucursal:cmbEmpresa.value,
                    token:TOKEN,
                    tipo:tipo
                })
            .then((response) => {
                if(response.status.toString()=='200'){
                    let data = response.data;
                    if(Number(data.rowsAffected[0])>0){
                        resolve(data);             
                    }else{
                        reject();
                    }            
                }else{
                    reject();
                }             
            }, (error) => {
                reject();
            });
        })     
    }

};

