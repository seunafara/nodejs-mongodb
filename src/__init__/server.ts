import express from "express"
import { isEmpty } from "ramda"
import mongoose from "mongoose"
import registerRoutes from './registers/routes'

class Server {
	port: string | number
	app: any

	constructor(PORT: string | number) {
		this.port = PORT
	}

	create() {
		this.app = express()
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
		if (options.includes("middleware"))
			console.log("We have middleware to register")
		if (options.includes("cron")) console.log("We have cron jobs to register")

		if(options.includes("routes")) registerRoutes(this.app)

		return this
	}

	start(): void {
		this.app.listen(this.port, () =>
			console.log(`Express is working on port ${this.port}`),
		)
	}
}

export default Server
