'use strict'
import { syncPatientResults } from './services/sync-manager-service.mjs';
import { SyncSettings } from './syncSettinngs/SyncSettings.mjs';
import { syncIntervalSettings } from './conf/config.mjs';
import moment from "moment";


const start = ()=>{
  console.log('Start Sync process...');
  Promise.allSettled([syncPatientLabs('ampath'),syncPatientLabs('alupe')])
  .then((results)=>{
     console.log('Results :', results);
  }).catch((error)=>{
    console.error('Error :',error);
  });

  
 
}



const syncPatientLabs = (lab)=>{
  return new Promise((resolve,reject)=>{

  console.log(`Sync ${lab} Patients ...`);
  const syncInterval = getSyncSettings(lab);
  console.log('syncInterval',syncInterval);
  setTimeout(()=>{

    syncPatientResults(lab)
   .then((results)=>{
     console.log('Results', results);
      syncAmpathPatients();
   })
   .catch((error)=>{
     console.log(error);
   });

  },syncInterval);

  resolve(`Started Sync for ${lab}`);

  });
  
}

const getSyncSettings = (lab)=>{
  let syncInterval = 10000;
  const curTimeInHrs = moment().format('HH');
  console.log('curTimeInHrs',curTimeInHrs);
  const labSyncIntervalSettings = syncIntervalSettings[lab];
  console.log(`${lab}SyncSettings`,labSyncIntervalSettings);
  const labSyncSettings = new SyncSettings(lab,labSyncIntervalSettings.offpeakHrSyncInterval,labSyncIntervalSettings.peakHrSyncInterval);
  syncInterval = labSyncSettings.getSyncIntervals(curTimeInHrs);
  return syncInterval;
}


start();