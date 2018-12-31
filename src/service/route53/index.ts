import { Observable } from "rxjs";
import Route53Service from "./Rout53Service";
import { AWSConfig } from "../../config/Provider";

export const createAWSUpdateIp: (config: AWSConfig) => (ip: string) => Observable<string> = (config) => {
    const { region, hostedZoneId, recordName, } = config
    const route53Service = new Route53Service(region)
    return (ip) => route53Service.updateRecordIp(ip, hostedZoneId, recordName)
}
