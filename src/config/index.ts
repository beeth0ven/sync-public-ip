import { getProvider } from "./getProvider";

const updateInterval = parseInt(process.env.UPDATE_INTERVAL || `${1 * 60}`)
const provider = getProvider()

console.log(`updateInterval: ${updateInterval} s`)
console.log(`provider: ${JSON.stringify(provider, null, 4)}`)

export {
    updateInterval,
    provider,
}