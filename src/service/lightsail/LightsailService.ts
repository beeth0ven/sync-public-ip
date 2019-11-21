
import Lightsail from 'aws-sdk/clients/lightsail';
import { Observable, defer } from 'rxjs';

export default class LightsailService {

  private readonly lightsail: Lightsail

  constructor(region: string) {
    this.lightsail = new Lightsail({ region: region });
  }

  updateRecordIp(ip: string, domainName: string, domainEntryName: string): Observable<string> {
    return defer(async () => {

      const result = await this.lightsail.getDomain({ domainName }).promise()

      const domain = result.domain
      if (!domain || !domain.domainEntries) throw new Error('无法获取 domain domainEntries')
      const domainEntry = domain.domainEntries.find((value) => value.name == domainEntryName)
      if (!domainEntry || !domainEntry.id) throw new Error('无法获取 domain entry id')

      await this.lightsail.updateDomainEntry({
        domainName,
        domainEntry: {
          id: domainEntry.id,
          name: domainEntryName,
          type: 'A',
          target: ip
        }
      }).promise();
      return ip
    })
  }
}