import dotenv from "dotenv";
dotenv.config()

const config = {
    REDIS_HOST: process.env.REDIS_HOST! as string,
    REDIS_PORT: process.env.REDIS_PORT! as string,
    PORT: process.env.PORT! as string,
}

export default config;