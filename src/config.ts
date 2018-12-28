
const region = process.env.REGION!
const hostedZoneId = process.env.HOSTED_ZONE_ID!
const recordName = process.env.RECORD_NAME!
const updateInterval = parseInt(process.env.UPDATE_INTERVAL || `${1 * 60}`)

console.log(`region: ${region}`)
console.log(`hostedZoneId: ${hostedZoneId}`)
console.log(`recordName: ${recordName}`)
console.log(`updateInterval: ${updateInterval} s`)
console.log('')

export {
    region,
    hostedZoneId,
    recordName,
    updateInterval,
}