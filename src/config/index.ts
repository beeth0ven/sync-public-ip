import { getProvider } from "./getProvider";
import { description } from "./Provider";

const updateInterval = parseInt(process.env.UPDATE_INTERVAL || `${1 * 60}`)
const provider = getProvider()

console.log(`updateInterval: ${updateInterval} s`)
console.log(`provider: ${description(provider)}`)

export {
    updateInterval,
    provider,
}