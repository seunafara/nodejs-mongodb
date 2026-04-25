import express from "express"
import mongoose from "mongoose"
import routes from "./routes"
import { __isProd__, WHITELIST } from "../config"
import { isEmpty } from 'ramda'
import middleware from './middleware'

class Server {
	port: string | number
	app: any
	whitelist: string[]

	constructor(PORT: string | number) {
		this.port = PORT
		this.whitelist = WHITELIST
	}

  async create(options: Array<String>) {
    let _app: any = await this.#register(options, express())
    _app.listen(this.port, () =>
      console.log(`Express is working on port ${this.port}`),
    )
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

	async #register(options: Array<String>, app: any) {
    for (let idx = 0; idx < options.length; idx++) {
      const option: any = options[idx];
      switch (option) {
        case "middleware":
         await middleware(app)
          break
        // case "cron":
        // 	bootCron()
        // 	break
        case "routes":
         routes(app)
          break
        // case "static-path":
        // 	registerStaticPath(this.app)
        // 	break
        default:
          break
      } 
    }
		return app
	}

	start(): void {
		this.app.listen(this.port, () =>
			console.log(`Express is working on port ${this.port}`),
		)
	}
}

export default Server
