import { updateInterval, provider } from '../config';
import { interval } from 'rxjs';
import { Main } from '../state/Main';
import { map } from 'rxjs/operators';
import { logBeauty } from '../public/logger';
import { chooseUpdateIp } from '../service';
import { getPublicIp } from "../service/getpublicip";

(async () => {

    const updateIp = chooseUpdateIp(provider)

    Main.rxSystem(
        getPublicIp,
        updateIp,
        [() => interval(updateInterval * 1000).pipe(map(Main.Mutation.onTriggerGetPublicIp))]
    ).forEach(value => {
        console.log('State:')
        logBeauty(value)
        console.log('')
    })

})()
