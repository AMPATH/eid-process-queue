'use strict'
 import { queueTables } from '../conf/config.mjs';
 import { runSqlQuery } from '../utils/sql-runner.mjs';

const getPatientUuidFromQueue = (queueTable) =>{

  const sqlQuery = `select person_uuid from etl.${queueTable} limit 1;`;

   return new Promise((resolve,reject)=>{
    runSqlQuery(sqlQuery)
    .then((results)=>{
      let patientUuid = '';
      if(results.length > 0){
         patientUuid = results[0].person_uuid;
      }
      resolve(patientUuid);

    }).catch((error)=>{
        reject(error);
    });

  });

};

  const getPatientFromAmpathQueue = () =>{
      const table = queueTables.ampath;
      return getPatientUuidFromQueue(table);
  };

  const getPatientFromAlupeQueue = () =>{
    const table = queueTables.alupe;
    return getPatientUuidFromQueue(table);
  };
  const deletePatientFromQueue = (patientUuid,queueTable) => {

    const sqlQuery = `delete from etl.${queueTable} where person_uuid = '${patientUuid}';`;

    runSqlQuery(sqlQuery);
     
  };

  const addPatientToErrorQueue = (patientUuid)=>{

    const sqlQuery = `replace into etl.eid_sync_queue_backup values ('${patientUuid}');`;

    return runSqlQuery(sqlQuery);

  }

  export { getPatientFromAmpathQueue, getPatientFromAlupeQueue, deletePatientFromQueue, addPatientToErrorQueue }