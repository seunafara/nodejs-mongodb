import "dotenv/config"
export const PORT = process.env.PORT as string
export const DB = process.env.MONGODB_URL as string
