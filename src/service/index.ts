import { GetPublicIp } from '../internal/GetPublicIp';
import { Provider } from "../config/Provider";
import { createAWSUpdateIp } from "./route53";
import { createDigitalOceanUpdateIp } from "./digitalocean";
import { UpdateIp } from "../internal/UpdateIp";
import { createAWSLightsailUpdateIp } from "./lightsail";
import { getPublicIpFromAWS, getPublicIpFromLinkSys, getPublicIpFromLinkSysSession } from './getpublicip';

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

const chooseGetPublicIp: (provider?: string) => GetPublicIp = (provider) => {
    switch (provider) {
        case 'LINK_SYS': {
            console.log('LINK_SYS');
            return getPublicIpFromLinkSys;
        }
        case 'LINK_SYS_SESSION': {
            console.log('LINK_SYS_SESSION');
            return getPublicIpFromLinkSysSession;
        }
        default: {
            console.log('AWS');
            return getPublicIpFromAWS;
        }
    }
}

export {
    chooseUpdateIp,
    chooseGetPublicIp,
}