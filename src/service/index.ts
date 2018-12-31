import { provider } from "../config";
import { Observable } from "rxjs";
import { createUpdateIp } from "./route53";

const chooseUpdateIp: () => (ip: string) => Observable<string> = () => {
    switch (provider) {
        case 'AWS':
            return createUpdateIp()
        case 'DigitalOcean':
            return createUpdateIp()
        default:
            throw new Error(`Unknown provider: ${provider}`)
    }
}

const updateIp = createUpdateIp()

export {
    updateIp
}