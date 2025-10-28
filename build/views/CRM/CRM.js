let FCRM = {
    get_color_prioridad: (prioridad)=>{

        let color = '';

        switch (prioridad) {
            case 'NORMAL':
                color = 'bg-white border-dark text-dark';
                break;
            case 'MEDIA':
                color = 'bg-warning border-warning text-dark';
                break;
            case 'ALTA':
                color = 'bg-danger border-danger text-white';
                break;
        }

        return color;

    },
    insert_evento:(sucursal,datos)=>{
        
    }
};

let DATA_CRM = {
    get_eventos:(sucursal,codemp)=>{

        return new Promise((resolve,reject)=>{

            axios.post('/crm/eventos_pendientes', {
                sucursal:sucursal,
                codemp:codemp
            })  
            .then(async(response) => {
               
                const data = response.data;
                if(Number(data.rowsAffected[0])==0){
                    resolve();
                }else{
                    resolve(data);                         
                }

            }, (error) => {
               resolve();
            });
    
            
        })

    },
    insert_evento:(sucursal,codemp,codcliente,fecha,titulo,descripcion,allday,inicia,termina,prioridad)=>{

        return new Promise((resolve,reject)=>{

            axios.post('/crm/insert_evento', {
                sucursal:sucursal,
                codemp:codemp,
                codcliente:codcliente,
                fecha:fecha,
                titulo:titulo,
                descripcion:descripcion,
                allday:allday,
                inicia:inicia,
                termina:termina,
                prioridad:prioridad
            })  
            .then(async(response) => {
               
                const data = response.data;
                if(response=='error'){
                    reject()
                }else{
                    if(Number(data.rowsAffected[0])>0){
                          resolve(data);       
                    }else{
                        reject();
                    }
                }   
            }, (error) => {
               reject();
            });
    
            
        })

    },
    delete_evento:(idevento)=>{

        return new Promise((resolve,reject)=>{

            axios.post('/crm/delete_evento', {
                idevento:idevento
            })  
            .then(async(response) => {
               
                const data = response.data;
                if(response=='error'){
                    reject()
                }else{
                    if(Number(data.rowsAffected[0])>0){
                          resolve(data);       
                    }else{
                        reject();
                    }
                }   
            }, (error) => {
               reject();
            });
    
            
        })

    },
    finalizar_evento:(idevento)=>{

        return new Promise((resolve,reject)=>{

            axios.post('/crm/finalizar_evento', {
                idevento:idevento
            })  
            .then(async(response) => {
               
                const data = response.data;
                if(response=='error'){
                    reject()
                }else{
                    if(Number(data.rowsAffected[0])>0){
                          resolve(data);       
                    }else{
                        reject();
                    }
                }   
            }, (error) => {
               reject();
            });
    
            
        })

    },
    get_buscar_cliente:(sucursal,codemp,filtro)=>{

        return new Promise((resolve,reject)=>{

            axios.post('/crm/select_cliente', {
                sucursal:sucursal,
                codemp:codemp,
                filtro:filtro
            })  
            .then(async(response) => {
               
                const data = response.data;
                if(response=='error'){
                    reject()
                }else{
                    if(Number(data.rowsAffected[0])>0){
                          resolve(data);       
                    }else{
                        reject();
                    }
                }   
            }, (error) => {
               reject();
            });
    
            
        })


    }
}
