import PublicIp from 'public-ip'
import { updateInterval } from '../config';
import { from, interval } from 'rxjs';
import { UpdateIp } from '../state/UpdateIp';
import { map } from 'rxjs/operators';
import { logBeauty } from '../public/logger';
import { updateIp } from '../service';

(() => {

    UpdateIp.rxSystem(
        () => from(PublicIp.v4()),
        updateIp,
        [
            () => interval(updateInterval * 1000).pipe(map(() => ({ kind: 'OnTriggerGetPublicIp' } as UpdateIp.Mutation)))
        ]
    )
        .forEach(value => {
            console.log('State:')
            logBeauty(value)
            console.log('')
        })
})()
