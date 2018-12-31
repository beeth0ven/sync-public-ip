import dotenv from "dotenv";

const isValid = () => process.env.PROVIDER != null

if (!isValid()) {
    dotenv.config()
}

if (!isValid()) {
    throw new Error('Environment variable is not valid!')
}