
import Route53 from 'aws-sdk/clients/route53'

export default class Route53Service {
 
    private readonly route53: Route53 

    constructor(region: string) {
        this.route53 = new Route53({region: region});
    }

    async getIp(hostedZoneId: string, recordName: string): Promise<string> {
        const info = await this.route53.listResourceRecordSets({
            HostedZoneId: hostedZoneId,
            StartRecordName: recordName,
            MaxItems: "1",
        }).promise()
        return info.ResourceRecordSets[0].ResourceRecords![0].Value
    }

    async updateRecordIp(ip: string, hostedZoneId: string, recordName: string): Promise<Route53.Types.ChangeResourceRecordSetsResponse> {
        return this.route53.changeResourceRecordSets({
            ChangeBatch: {
              Changes: [
                {
                  Action: "UPSERT",
                  ResourceRecordSet: {
                    Name: recordName,
                    Type: "A",
                    TTL: 30,
                    ResourceRecords: [ { Value: ip } ],
                  }
                }
              ],
              Comment: `Web server for ${recordName}`
            },
            HostedZoneId: hostedZoneId
          }).promise()
    }
}

