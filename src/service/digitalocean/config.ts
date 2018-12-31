export function getConfig(): ({
    token: string,
    domain: string,
    recordId: string,
}) {
    
    const token = process.env.DIGITALOCEAN_TOKEN
    const domain = process.env.DIGITALOCEAN_DOMAIN
    const recordId = process.env.DIGITALOCEAN_RECORD_ID

    const isValid = () => token != null
        && domain != null
        && recordId != null

    if (!isValid()) {
        throw new Error('DigitalOcean environment variable is not valid!')
    }

    console.log(`domain: ${domain}`)
    console.log(`recordId: ${recordId}`)
    console.log('')

    return {
        token: token!,
        domain: domain!,
        recordId: recordId!,
    }
}