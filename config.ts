import "dotenv/config"

// is Production Environment?
export const __isProd__: boolean = process.env.NODE_ENV === "production"

// Routes Dir
export const ROUTES_DIR: string = __isProd__
	? "/dist/routes"
	: "/routes"

// Middleware Dir
export const MIDDLEWARE_DIR: string = __isProd__
	? "/dist/middleware"
	: "/middleware"

// JWT Dir
export const JWT_PATH: string = __isProd__
	? "/dist/src/utils/jwtStrategy.js"
	: "/Authenticator/utils/jwtStrategy"

// Use CORS
export const USE_CORS: boolean = __isProd__
	? true
	: Boolean(Number(process.env.USE_CORS))

// Frontend Localhost URLs
export const LOCALHOST_URLS = ["http://localhost:3000"]

// Frontend Production URLS
export const PRODUCTION_URLS = [
	// Add Prod Url
]

// App port
export const PORT: number = !__isProd__
	? Number(process.argv[2] || 7777)
	: Number(process.env.PORT)

// MongoDB URL
export const DB: string = process.env.MONGODB_URL as string

// Should Run Cron?
export const RUN_CRON: boolean = Boolean(Number(process.env.RUN_CRON))
