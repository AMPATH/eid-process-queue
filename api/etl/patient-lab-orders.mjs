'use strict';
import { server } from '../../conf/config.mjs';
import axios from 'axios';
import moment from 'moment';

const processPatientLabOrders =  (patientUuid) => {
  console.log('processPatientLabOrders :', patientUuid);

  const url = server.etl.url + 'patient-lab-orders';
  const data = {
    'startDate': '2006-01-01',
    'endDate': moment().format('YYYY-MM-DD'),
    'patientUuId': patientUuid,
    'mode': 'batch'
  }
  const request = {
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${ server.amrs.auth }`, 
    },
    body: JSON.stringify(data)
  };

  console.log('processPatientLabOrders : request :', request);

  return axios(request);
  

};

export { processPatientLabOrders }