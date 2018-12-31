export function getConfig(): ({
    region: string,
    hostedZoneId: string,
    recordName: string,
}) {
    
    const region = process.env.AWS_REGION
    const hostedZoneId = process.env.AWS_HOSTED_ZONE_ID
    const recordName = process.env.AWS_RECORD_NAME

    const isValid = () => process.env.AWS_ACCESS_KEY_ID != null
        && process.env.AWS_SECRET_ACCESS_KEY != null
        && region != null
        && hostedZoneId != null
        && recordName != null

    if (!isValid()) {
        throw new Error('AWS environment variable is not valid!')
    }

    console.log(`region: ${region}`)
    console.log(`hostedZoneId: ${hostedZoneId}`)
    console.log(`recordName: ${recordName}`)
    console.log('')

    return {
        region: region!,
        hostedZoneId: hostedZoneId!,
        recordName: recordName!,
    }
} 