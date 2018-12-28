import PublicIp from 'public-ip'
import { recordName, hostedZoneId, region, updateInterval } from '../config';
import Route53Service from '../service/Rout53Service';
import { from, interval } from 'rxjs';
import { UpdateIp } from '../state/UpdateIp';
import { map } from 'rxjs/operators';
import { logBeauty } from '../public/logger';

(() => {

    const route53Service = new Route53Service(region)

    UpdateIp.rxSystem(
        () => from(PublicIp.v4()),
        (ip) => route53Service.updateRecordIp(ip, hostedZoneId, recordName),
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
