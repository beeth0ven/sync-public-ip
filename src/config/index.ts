import { getProvider } from "./getProvider";
import { description } from "./Provider";

const updateInterval = parseInt(process.env.UPDATE_INTERVAL || `${1 * 60}`)
const provider = getProvider()
const publicIpProvider = process.env.PUBLIC_IP_PROVIDER;

console.log(`updateInterval: ${updateInterval} s`)
console.log(`provider: ${description(provider)}`)
console.log(`publicIpProvider: ${publicIpProvider}`)

export {
    updateInterval,
    provider,
    publicIpProvider,
}