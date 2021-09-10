'use strict'
import { syncAmpathPatientResults,syncAlupePatientResults } from './services/sync-manager-service.mjs';

const start = ()=>{
  console.log('Start Sync process...');
  /*
  setInterval(()=>{
    syncAmpathPatients();
  },10000);

  */

  setInterval(()=>{
    syncAlupePatients();
   },15000);
 
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


const syncAlupePatients = ()=>{
  console.log('Sync Alupe Patients ...');
  syncAlupePatientResults()
   .then((results)=>{
     console.log('Results', results);
   })
   .catch((error)=>{
     console.log(error);
   });
}


start();