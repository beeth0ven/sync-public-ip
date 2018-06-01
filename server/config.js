const region = process.env.REGION;
const hostedZoneId = process.env.HOSTED_ZONE_ID;
const recordName = process.env.RECORD_NAME;
const updateInterval = process.env.UPDATE_INTERVAL || 5 * 60 * 1000;

const digitalOceanToken = process.env.DIGITALOCEAN_TOKEN;
const digitalOceanDomain = process.env.DIGITALOCEAN_DOMAIN;
const digitalOceanRecordId = parseInt(process.env.DIGITALOCEAN_RECORD_ID);

export {
  region,
  hostedZoneId,
  recordName,
  updateInterval,
  digitalOceanToken,
  digitalOceanDomain,
  digitalOceanRecordId,
}
