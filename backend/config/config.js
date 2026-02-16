import dotenv from "dotenv";
dotenv.config();

const config = {
    port: process.env.PORT || 8000,
    envMode: process.env.ENV_MODE || "development",
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/grand-home-rakesh",
};

export default config;  