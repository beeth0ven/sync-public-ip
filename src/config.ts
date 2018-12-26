const region = process.env.REGION
const hostedZoneId = process.env.HOSTED_ZONE_ID
const recordName = process.env.RECORD_NAME
const updateInterval = process.env.UPDATE_INTERVAL || 5 * 60 * 1000

export function isValid(): boolean {
    return process.env.AWS_ACCESS_KEY_ID != null
        && process.env.AWS_SECRET_ACCESS_KEY != null
        && region != null
        && hostedZoneId != null
        && recordName != null
}