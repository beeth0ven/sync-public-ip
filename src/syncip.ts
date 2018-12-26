
import PublicIp from 'public-ip'
import { recordName, hostedZoneId, region } from './config';
import Route53Service from './service/Rout53Service';
import * as RxFeedback from 'rxfeedback'
import { Observable } from 'rxjs';


(async ()  => {
    console.log(`hostedZoneId: ${hostedZoneId}`)
    const ip = await PublicIp.v4()
    console.log(`ip: ${ip}`)

    const route53Service = new Route53Service(region)
    const domainIp = await route53Service.getIp(hostedZoneId, recordName)
    console.log(`domainIp: ${domainIp}`)

    // const updated = await route53Service.updateRecordIp('10.0.0.2', hostedZoneId, recordName)
    // console.log(`updated: ${JSON.stringify(updated, null, 4)}`)

    RxFeedback.system(0, (state, event) => {
        return state
    }, [])
    .subscribe(state => {
        console.log(`state: ${state}`)
    })

})()
