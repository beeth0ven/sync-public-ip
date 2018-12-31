import { DigitalOceanConfig } from "../../config/Provider";
import { Observable } from "rxjs";
import DigitalOcean from 'do-wrapper';
import { map } from "rxjs/operators";
import { UpdateIp } from "../../internal/UpdateIp";

export const createDigitalOceanUpdateIp: (config: DigitalOceanConfig) => UpdateIp = (config) => {
    const { token, domain, recordId } = config
    const api = new DigitalOcean(token, 12)
    return (ip) => domainRecordsUpdate(api)(domain, recordId, ip)
}

type DomainRecordsUpdate = (domain: string, recordId: number, ip: string) => Observable<string> 

const domainRecordsUpdate: (api: DigitalOcean) => DomainRecordsUpdate = (api) => {
   return (domain, recordId, ip) => new Observable((observer) => {
        api.domainRecordsUpdate(domain, recordId, {data: ip}, (err, res, body) => {
            if (err != null) {
                observer.error(err)
                return
            }
            observer.next(body)
            observer.complete()
        })
    }).pipe(map(() => ip))
}
