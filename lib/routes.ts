import { isEmpty } from "ramda"
import passport from "passport"
import { getFileNamesAndPaths } from "./utils/index"
import { ROUTES_DIR } from "../config"

export default (app: any) => {
  const routes = getFileNamesAndPaths(process.cwd() + ROUTES_DIR)
  
	routes.forEach(async (file) => {
		const endpoint = await import(file.path)

		if (isEmpty(endpoint)) {
			console.log("No endpoints found in route at: " + file.path)
		} else {
			const endpointUrl = file.path
				.split("routes")[1] // grab everything after routes
				.replace(/\.(ts|js)$/, "") // replace .ts .js with empty string
				.replace("/index", "") // replace index files with empty string

			for (let method of Object.keys(endpoint.routes)) {
				const requiresAuth = method.slice(-1) === "#"
				const formattedMethodName = requiresAuth
					? method.replace("#", "")
					: method
				if (!["get", "post", "put", "delete"].includes(formattedMethodName))
					continue // skip if not a valid Express method
				if (requiresAuth) {
					// Register the route with authentication
					app[formattedMethodName](
						endpointUrl,
						passport.authenticate("jwt", { session: false }),
						endpoint.routes[method],
					)
				} else {
					// Register the route without authentication
					app[formattedMethodName](endpointUrl, endpoint.routes[method])
				}
			}
		}
	})
}
