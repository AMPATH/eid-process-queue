'use strict'
import { syncPatientResults } from './services/sync-manager-service.mjs';
import { SyncSettings } from './syncSettinngs/SyncSettings.mjs';
import { syncIntervalSettings } from './conf/config.mjs';
import moment from "moment";


const start = ()=>{
  console.log('Start Sync process...');

  syncPatientLabs('ampath');
  syncPatientLabs('alupe');
  
 
}

const syncPatientLabs = (lab)=>{
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