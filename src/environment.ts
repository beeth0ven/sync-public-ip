import dotenv from "dotenv";

const isValid = () => process.env.AWS_ACCESS_KEY_ID != null
    && process.env.AWS_SECRET_ACCESS_KEY != null
    && process.env.REGION != null
    && process.env.HOSTED_ZONE_ID != null
    && process.env.RECORD_NAME != null

if (!isValid()) {
    dotenv.config()
}

if (!isValid()) {
    throw new Error('Environment variable is not valid!')
}