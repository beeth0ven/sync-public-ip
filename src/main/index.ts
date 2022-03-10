import { updateInterval, provider, publicIpProvider } from '../config';
import { interval, EMPTY } from 'rxjs';
import { Main } from '../state/Main';
import { map } from 'rxjs/operators';
import { logBeauty } from '../public/logger';
import { chooseGetPublicIp, chooseUpdateIp } from '../service';

(async () => {

    const getPublicIp = chooseGetPublicIp(publicIpProvider)
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
