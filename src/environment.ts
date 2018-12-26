import dotenv from "dotenv";
import { isValid } from "./config";

if (isValid()) {
    dotenv.config()
}

if (isValid()) {
    throw new Error('Environment variable is not valid!')
}