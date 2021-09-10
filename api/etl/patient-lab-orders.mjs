"use strict";
import { server } from "../../conf/config.mjs";
import axios from "axios";
import moment from "moment";
import qs from "qs";

const processPatientLabOrders = (patientUuid,lab) => {
  return new Promise((resolve, reject) => {
    console.log("processPatientLabOrders :", patientUuid);



    const url = determineLabUrl(lab) + "patient-lab-orders";
    const finalpayload = {
      startDate: "2006-01-01",
      endDate: moment().format("YYYY-MM-DD"),
      patientUuId: patientUuid,
      mode: "batch",
    };

    const request = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${server.amrs.auth}`,
      }
    };

    console.log("processPatientLabOrders : request :", request);

    console.log("processPatientLabOrders : payload :", finalpayload);

    axios.get(url,{headers: request.headers, params : finalpayload})
      .then((response) => {
        console.log("response data ", response.data);
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

const determineLabUrl = (lab)=>{
  console.log('determineLabUrl',lab);
 let labUrl = server.etl[lab];
  console.log('labUrl',labUrl);
 return labUrl;

}

export { processPatientLabOrders };
