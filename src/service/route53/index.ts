import { Observable } from "rxjs";
import Route53Service from "./Rout53Service";
import { getConfig } from "./config";

export function createUpdateIp(): (ip: string) => Observable<string> {
    const { region, hostedZoneId, recordName, } = getConfig()
    const route53Service =  new Route53Service(region)
    return (ip) => {
        return route53Service.updateRecordIp(ip, hostedZoneId, recordName)
    }
}
