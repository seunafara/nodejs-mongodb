import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import routes from "./routes"
import { __isProd__, LOCALHOST_URLS, PRODUCTION_URLS, USE_CORS } from "../config"
import { isEmpty } from 'ramda'
import middleware from './middleware'

class Server {
	port: string | number
	app: any
	whitelist: string[]

	constructor(PORT: string | number) {
		this.port = PORT
		this.whitelist = [...PRODUCTION_URLS]
		if (!__isProd__) {
			this.whitelist.push(...LOCALHOST_URLS)
		}
	}

	create() {
		this.app = express()
		const whitelist = this.whitelist

		const corsOptions = {
			origin: function (
				origin: any,
				callback: (arg0: Error | null, arg1: boolean | undefined) => void,
			) {
				if(USE_CORS){
          if (whitelist.indexOf(origin) !== -1) {
						callback(null, true)
					} else {
						callback(
							new Error("Origin: " + origin + " is Not allowed by CORS"),
							false,
						)
					}
        } else callback(null, true)
			},
		}

		this.app.use(cors(corsOptions))
		return this
	}

	connectDB(
		URL: string,
		options: object = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	) {
		if (isEmpty(options)) throw new Error("DB options cannot be empty")

		mongoose.set("strictQuery", false)
		mongoose
			.connect(URL, options)
			.then(() => console.log(`Database connected successfully`))
			.catch((err) => console.log(err))

		return this
	}

	register(options: Array<String>) {
		options.forEach((option: any) => {
			switch (option) {
				case "middleware":
					middleware(this.app)
					break
				// case "cron":
				// 	bootCron()
				// 	break
				case "routes":
					routes(this.app)
					break
				// case "static-path":
				// 	registerStaticPath(this.app)
				// 	break
				default:
					break
			}
		})

		return this
	}

	start(): void {
		this.app.listen(this.port, () =>
			console.log(`Express is working on port ${this.port}`),
		)
	}
}

export default Server
