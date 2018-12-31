export type Provider = 
    { name: 'AWS', config: AWSConfig } |
    { name: 'DigitalOcean', config: DigitalOceanConfig }

export type AWSConfig = {
    region: string,
    hostedZoneId: string,
    recordName: string,
}

export type DigitalOceanConfig = {
    token: string,
    domain: string,
    recordId: number,
}

