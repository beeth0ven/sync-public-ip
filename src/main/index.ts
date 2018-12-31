import PublicIp from 'public-ip'
import { updateInterval, provider } from '../config';
import { from, interval } from 'rxjs';
import { Main } from '../state/Main';
import { map } from 'rxjs/operators';
import { logBeauty } from '../public/logger';
import { chooseUpdateIp } from '../service';

(() => {

    const updateIp = chooseUpdateIp(provider)

    Main.rxSystem(
        () => from(PublicIp.v4()),
        updateIp,
        [
            () => interval(updateInterval * 1000).pipe(map(() => ({ kind: 'OnTriggerGetPublicIp' } as Main.Mutation)))
        ]
    )
        .forEach(value => {
            console.log('State:')
            logBeauty(value)
            console.log('')
        })
})()
