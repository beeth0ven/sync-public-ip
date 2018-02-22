import AWS from 'aws-sdk';
import {region} from '../config.js';
import {hostedZoneId, recordName} from "../config";

AWS.config.update({region});
const route53 = new AWS.Route53();

const getRecordIP = async () => {
  console.log('getRecordIP');
  const recordSet = await route53
    .listResourceRecordSets({
      HostedZoneId: hostedZoneId,
      StartRecordName: recordName,
      MaxItems: '1'
    })
    .promise()
    .then(recordSets => recordSets.ResourceRecordSets[0]);

  return recordSet.ResourceRecords[0].Value;
};

const updateRecordIP = (ip) => {
  console.log('updateRecordIP');
  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: "UPSERT",
          ResourceRecordSet: {
            Name: recordName,
            Type: "A",
            TTL: 30,
            ResourceRecords: [ { Value: ip } ],
          }
        }
      ],
      Comment: `Web server for ${recordName}`
    },
    HostedZoneId: hostedZoneId
  };

  return route53.changeResourceRecordSets(params).promise();
};

export {
  getRecordIP,
  updateRecordIP,
}