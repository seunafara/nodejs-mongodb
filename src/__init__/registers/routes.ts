import { isEmpty } from "ramda"
import getFileNamesAndPaths from "../../utils/getFileNamesPaths"
import passport from "passport"

export default (app: any) => {
	const ROUTES_DIR = process.cwd() + "/src/routes"

	getFileNamesAndPaths(ROUTES_DIR).forEach((file) => {
		const endpoint = require(file.path)
		if (isEmpty(endpoint)) {
			console.log("No endpoints found in route at: " + file.path)
		} else {
			// console.log("endpoint", endpoint)
			// Extract endpoint URL from file path
			// E.g /my-backend-app/src/routes/register.ts = /register
			// /my-backend-app/src/routes/products/index.ts = /products
			// /my-backend-app/src/routes/products/cart.ts = /products/cart

			const endpointUrl = file.path
				.split("routes")[1] // grab everything after routes
				.replace(/\.(ts|js)$/, "") // replace .ts .js with empty string
				.replace("/index", "") // replace index files with empty string

			Object.keys(endpoint).forEach((method) => {
				// Register the route
				const requiresAuth = method.slice(-1) === "#"
				if (requiresAuth) {
					const formattedMethodName = method.replace("#", "")
					app[formattedMethodName](
						endpointUrl,
						passport.authenticate("jwt", { session: false }),
						endpoint[method],
					)
					return
				}
				app[method](endpointUrl, endpoint[method])
			})
		}
	})
}
