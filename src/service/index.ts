import { Provider } from "../config/Provider";
import { createAWSUpdateIp } from "./route53";
import { createDigitalOceanUpdateIp } from "./digitalocean";
import { UpdateIp } from "../internal/UpdateIp";
import { createAWSLightsailUpdateIp } from "./lightsail";

const chooseUpdateIp: (provider: Provider) => UpdateIp = (provider) => {
    switch (provider.name) {
        case 'AWS':
            return createAWSUpdateIp(provider.config)
        case 'AWS-Lightsail':
            return createAWSLightsailUpdateIp(provider.config)
        case 'DigitalOcean':
            return createDigitalOceanUpdateIp(provider.config)
        default:
            throw new Error(`Unknown provider: ${provider}`)
    }
}

export {
    chooseUpdateIp
}