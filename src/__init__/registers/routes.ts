import fs from "fs"

// const fs = require("fs")
import path from "path"

function getFileNamesAndPaths(folder: string) {
	let fileNamesAndPaths: any[] = []
	let files = fs.readdirSync(folder)

	files.forEach((file) => {
		let filePath = path.join(folder, file)
		let stat = fs.lstatSync(filePath)
		if (stat.isDirectory()) {
			let subFiles = getFileNamesAndPaths(filePath)
			fileNamesAndPaths = fileNamesAndPaths.concat(subFiles)
		} else {
			fileNamesAndPaths.push({ name: file, path: filePath })
		}
	})

	return fileNamesAndPaths
}

export default (app: any) => {
	getFileNamesAndPaths(process.cwd() + "/src/routes").forEach((file) => {
		const endpoint = require(file.path)
		if (Object.keys(endpoint).length === 0) {
			console.log("No endpoints found in route at: " + file.path)
		} else {
			// console.log("endpoint", endpoint)
			// Extract endpoint URL from file path
			// E.g /my-backend-app/src/routes/register.ts = /register
			// /my-backend-app/src/routes/products/index.ts = /products
			// /my-backend-app/src/routes/products/cart.ts = /products/cart

            const endpointUrl = file.path
							.split("routes")[1]
							.replace(/\.(ts|js)$/, "")
							.replace("/index", "")

			Object.keys(endpoint).forEach((method) => {
				// Register the route
				app[method](endpointUrl, endpoint[method])
			})
		}
	})
}
