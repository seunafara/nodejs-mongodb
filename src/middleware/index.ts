import getFileNamesAndPaths from "../utils/getFileNamesPaths"

export default (app: any) => {
	const MIDDLEWARE_DIR = process.cwd() + "/src/middleware"

	getFileNamesAndPaths(MIDDLEWARE_DIR).forEach((file) => {
		const isThis = file.path.split("middleware")[1].includes("index")
        if(!isThis){ // we do not want to recursively call this function
            
            const myCustomMiddleware = require(file.path)
            myCustomMiddleware.default(app)
            
        }
	})
}
