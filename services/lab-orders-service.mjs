'use strict'
import { processPatientLabOrders } from '../api/etl/patient-lab-orders.mjs';
import { addPatientToErrorQueue  } from '../services/eid-queue-service.mjs';

const syncPatientLabOrders = (patientUuid) =>{
  console.log('syncPatientLabOrders.. called', patientUuid);
  return new Promise((resolve,reject)=>{

    processPatientLabOrders(patientUuid)
    .then((result)=>{
      resolve(result);

    })
    .catch((error)=>{
      const sycnError = error;
      addPatientToErrorQueue(patientUuid)
      .then((result)=>{
        resolve(sycnError);
      });
    });
     
  });

}

export { syncPatientLabOrders };