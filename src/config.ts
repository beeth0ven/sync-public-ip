
const region = process.env.REGION!
const hostedZoneId = process.env.HOSTED_ZONE_ID!
const recordName = process.env.RECORD_NAME!
const updateInterval = process.env.UPDATE_INTERVAL || 5 * 60 * 1000

console.log(`region: ${region}`)
console.log(`hostedZoneId: ${hostedZoneId}`)
console.log(`recordName: ${recordName}`)
console.log(`updateInterval: ${recordName}`)

export {
    region,
    hostedZoneId,
    recordName
}