import {updateInterval} from "./config";
import {syncIPIfNeeded} from "./usecases/aws";
// import {syncIPIfNeeded} from "./usecases/digitalOcean";

console.log('\nit works!');

(async () => await syncIPIfNeeded())();
setInterval(async () => {
  await syncIPIfNeeded();
}, updateInterval);


