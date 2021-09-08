'use strict'
import { runSqlQuery } from '../utils/sql-runner.mjs';

const deleteEidPatientLogByUuid = (patientUuid)=>{

  const sqlQuery = `delete from etl.eid_sync_log where person_uuid = '${patientUuid}';`;

   return runSqlQuery(sqlQuery);

}

export { deleteEidPatientLogByUuid }