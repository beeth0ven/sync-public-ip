import { Provider, AWSConfig, DigitalOceanConfig, AWSLightsailConfig } from "./Provider";

export const getProvider: () => Provider = () => {
    const provider = process.env.PROVIDER
    switch (provider) {
        case 'AWS':     
            return { name: 'AWS', config: getAWSConfig() } 
        case 'AWS-Lightsail':
            return { name: 'AWS-Lightsail', config: getAWSLightsailConfig() } 
        case 'DigitalOcean':    
            return { name: 'DigitalOcean', config: getDigitalOceanConfig() } 
        default:
            throw new Error(`Unknown provider: ${provider}`)
    }
}

const getAWSConfig: () => AWSConfig = () => {

    const isValid = () => process.env.AWS_ACCESS_KEY_ID != null
        && process.env.AWS_SECRET_ACCESS_KEY != null
        && process.env.AWS_REGION != null
        && process.env.AWS_HOSTED_ZONE_ID != null
        && process.env.AWS_RECORD_NAME != null

    if (!isValid()) {
        throw new Error('AWS environment variable is not valid!')
    }

    const region = process.env.AWS_REGION!
    const hostedZoneId = process.env.AWS_HOSTED_ZONE_ID!
    const recordName = process.env.AWS_RECORD_NAME!

    return {
        region,
        hostedZoneId,
        recordName,
    } 
    
}

const getAWSLightsailConfig: () => AWSLightsailConfig = () => {

    const isValid = () => process.env.AWS_ACCESS_KEY_ID != null
        && process.env.AWS_SECRET_ACCESS_KEY != null
        && process.env.AWS_REGION != null
        && process.env.AWS_DOMAIN_NAME != null
        && process.env.AWS_DOMAIN_ENTRY_NAME != null

    if (!isValid()) {
        throw new Error('AWS lightsail environment variable is not valid!')
    }

    const region = process.env.AWS_REGION!
    const domainName = process.env.AWS_DOMAIN_NAME!
    const domainEntryName = process.env.AWS_DOMAIN_ENTRY_NAME!

    return {
        region,
        domainName,
        domainEntryName,
    }
}


const getDigitalOceanConfig: () => DigitalOceanConfig = () => {

    const isValid = () => process.env.DIGITALOCEAN_TOKEN != null
        && process.env.DIGITALOCEAN_DOMAIN != null
        && process.env.DIGITALOCEAN_RECORD_ID != null

    if (!isValid()) {
        throw new Error('DigitalOcean environment variable is not valid!')
    }

    const token = process.env.DIGITALOCEAN_TOKEN!
    const domain = process.env.DIGITALOCEAN_DOMAIN!
    const recordId = parseInt(process.env.DIGITALOCEAN_RECORD_ID!)

    return {
        token,
        domain,
        recordId,
    }
}