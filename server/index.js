import PublicIP from 'public-ip';
import {getRecordIP, updateRecordIP} from "./awsService";
import {updateInterval} from "./config";

const syncIPIfNeeded = async () => {
  console.log('\nsyncIPIfNeeded start at:', new Date());
  try {
    const computerPublicIP = await PublicIP.v4();
    const recordIP = await getRecordIP();
    console.log('computerPublicIP', computerPublicIP);
    console.log('recordIP', recordIP);
    if (computerPublicIP === recordIP) {
      console.log('No need to update record IP');
      return;
    }
    await updateRecordIP(computerPublicIP);
    console.log('Update Record IP Success:', computerPublicIP);
  } catch (error) {
    console.error('Update Record IP Fail:', error);
  } finally {
    console.log('syncIPIfNeeded end at:', new Date());
  }
};

setInterval(async () => {
  await syncIPIfNeeded();
}, updateInterval);


console.log('\nit works!');
