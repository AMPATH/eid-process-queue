'use strict'
import { processPatientLabOrders } from '../api/etl/patient-lab-orders.mjs';
import { addPatientToErrorQueue  } from '../services/eid-queue-service.mjs';

const syncPatientLabOrders = (patientUuid,lab) =>{
  console.log('syncPatientLabOrders.. called', patientUuid);
  return new Promise((resolve,reject)=>{

    processPatientLabOrders(patientUuid,lab)
    .then((result)=>{
      resolve(result);

    })
    .catch((error)=>{
      const sycnError = error;
      console.log('processPatientLabOrders Error:', error);
      addPatientToErrorQueue(patientUuid)
      .then((result)=>{
        resolve(sycnError);
      });
    });
     
  });

}

export { syncPatientLabOrders };