import { Observable } from "rxjs";
import { AWSLightsailConfig } from "../../config/Provider";
import LightsailService from "./LightsailService";

export const createAWSLightsailUpdateIp: (config: AWSLightsailConfig) => (ip: string) => Observable<string> = (config) => {
  const { region, domainName, domainEntryName, } = config
  const lightsailService = new LightsailService(region)
  return (ip) => lightsailService.updateRecordIp(ip, domainName, domainEntryName)
}