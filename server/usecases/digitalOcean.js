import {formatNow} from "../services/timeService";
import PublicIP from "public-ip";
import DigitalOcean from 'do-wrapper';
import {digitalOceanDomain as domain, digitalOceanRecordId as recordId, digitalOceanToken as token} from "../config";

const api = new DigitalOcean(token, 12);

export const syncIPIfNeeded = async () => {

  console.log('\nsyncIPIfNeeded start at:', formatNow());
  try {
    const computerPublicIP = await PublicIP.v4();
    const recordIP = await api.domainRecordsGet(domain, recordId).then(result => result.body.domain_record.data);
    console.log('computerPublicIP', computerPublicIP);
    console.log('recordIP', recordIP);
    if (computerPublicIP === recordIP) {
      console.log('No need to update record IP');
      return;
    }
    await api.domainRecordsUpdate(domain, recordId, {data: computerPublicIP});
    console.log('Update Record IP Success:', computerPublicIP);
  }  catch (error) {
    console.error('Update Record IP Fail:', error);
  } finally {
    console.log('syncIPIfNeeded end at:', formatNow());
  }
};

// $ doctl compute domain records list beeth0ven.cf
