const provider = process.env.PROVIDER!
const updateInterval = parseInt(process.env.UPDATE_INTERVAL || `${1 * 60}`)

console.log(`provider: ${provider}`)
console.log(`updateInterval: ${updateInterval} s`)

export {
    provider,
    updateInterval,
}