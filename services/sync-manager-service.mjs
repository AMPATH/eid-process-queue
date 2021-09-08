'use strict'
import { getPatientFromAmpathQueue, getPatientFromAlupeQueue, deletePatientFromQueue  } from '../services/eid-queue-service.mjs';
import { deleteEidPatientLogByUuid } from '../services/eid-log-service.mjs';
import { syncPatientLabOrders } from '../services/lab-orders-service.mjs';
import { queueTables } from '../conf/config.mjs';

const syncAmpathPatientResults = async ()=>{

   const queueTable = queueTables.ampath;

try{

 const patientUuid = await getPatientFromAmpathQueue();
 console.log('PatientUuid', patientUuid);
 if(patientUuid.length > 0){

   await deleteEidPatientLogByUuid(patientUuid);
   await syncPatientLabOrders(patientUuid);
   await deletePatientFromQueue(patientUuid,queueTable);

 }

 return Promise.resolve('sucess');

}catch(e){
   console.log('Error', e);
   return Promise.reject(e);
}


   
}


const syncAlupePatientResults = async ()=>{

   const queueTable = queueTables.alupe;

try{

 const patientUuid = await getPatientFromAlupeQueue();
 console.log('PatientUuid', patientUuid);
 await deleteEidPatientLogByUuid(patientUuid);
 await syncPatientLabOrders(patientUuid);
 await deletePatientFromQueue(patientUuid,queueTable);
 return Promise.resolve('sucess');

}catch(e){
   console.log('Error', e);
   return Promise.reject(e);
}


   
}


export { syncAmpathPatientResults }