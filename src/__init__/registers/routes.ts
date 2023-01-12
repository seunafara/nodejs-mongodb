import { isEmpty } from 'ramda'
import getFileNamesAndPaths from '../../utils/getFileNamesPaths'

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
				app[method](endpointUrl, endpoint[method])
			})
		}
	})
}
