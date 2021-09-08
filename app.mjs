'use strict'
import { syncAmpathPatientResults } from './services/sync-manager-service.mjs';

const start = ()=>{
  console.log('Start Sync process...');
  setInterval(()=>{
    syncAmpathPatients();
  },30000);
 
}

const syncAmpathPatients = ()=>{
  console.log('Sync Ampath Patients ...');
   syncAmpathPatientResults()
   .then((results)=>{
     console.log('Results', results);
   })
   .catch((error)=>{
     console.log(error);
   });
}


start();