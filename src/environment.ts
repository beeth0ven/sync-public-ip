import dotenv from "dotenv";

const isValid = () => process.env.AWS_ACCESS_KEY_ID != undefined
        && process.env.AWS_SECRET_ACCESS_KEY != undefined
        && process.env.REGION != undefined
        && process.env.HOSTED_ZONE_ID != undefined
        && process.env.RECORD_NAME != undefined

if (!isValid()) {
    dotenv.config()
}

if (!isValid()) {
    throw new Error('Environment variable is not valid!')
}