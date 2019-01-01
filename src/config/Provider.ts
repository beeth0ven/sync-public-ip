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

export const description: (provider: Provider) => string = provider => {
    let value: any
    switch (provider.name) {
        case 'DigitalOcean':
            value = {
                name: provider.name,
                config: {
                    ...provider.config,
                    token: undefined,
                }
            }
            break
        default:
            value = provider
            break
    }
    return  JSON.stringify(value, null, 4)
}