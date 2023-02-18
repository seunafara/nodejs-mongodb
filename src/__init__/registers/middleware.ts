import bodyParser from "body-parser"
import cors from "cors"
import customMiddleware from "../../middleware/index"

export default (app: any) => {
	// Middlewares
	// form data middleware
	app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
	// Json body middleware
	app.use(bodyParser.json({ limit: "50mb" }))
	// Cors Middleware
	app.use(cors())

    // Run custom middlewares
    customMiddleware(app)
}
