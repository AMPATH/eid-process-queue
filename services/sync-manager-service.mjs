'use strict'
import { getPatientUuidFromQueue , deletePatientFromQueue  } from '../services/eid-queue-service.mjs';
import { deleteEidPatientLogByUuid } from '../services/eid-log-service.mjs';
import { syncPatientLabOrders } from '../services/lab-orders-service.mjs';
import { queueTables } from '../conf/config.mjs';

const syncPatientResults = async (lab)=>{

   const queueTable = queueTables[lab];

try{

 const patientUuid = await getPatientUuidFromQueue(queueTable);
 console.log('PatientUuid', patientUuid);
 if(patientUuid.length > 0){
   await deleteEidPatientLogByUuid(patientUuid);
   await syncPatientLabOrders(patientUuid,lab);
   await deletePatientFromQueue(patientUuid,queueTable);
 }

 return Promise.resolve('sucess');

}catch(e){
   console.log('Error', e);
   return Promise.reject(e);
}


   
}

export { syncPatientResults }