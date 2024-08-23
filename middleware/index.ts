import { MIDDLEWARE_DIR } from "../config"
import { getFileNamesAndPaths } from "../lib/utils/index"

export default async (app: any) => {
	for (let file of getFileNamesAndPaths(process.cwd() + MIDDLEWARE_DIR)) {
		const isThis = file.path.split("middleware")[1].includes("index")
		if (!isThis) {
			// we do not want to recursively call this function
			const myCustomMiddleware = await import(file.path)
			myCustomMiddleware.middleware(app)
		}
	}
}
