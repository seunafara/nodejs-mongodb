import path from "path"
import fs from "fs"

export const getFileNamesAndPaths = (folder: string) => {
	try {
		let fileNamesAndPaths: any[] = []
		let files = fs.readdirSync(folder)
		if (files.length) {
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
		}

		return fileNamesAndPaths
	} catch (error) {
		console.log("Error ", error)

		return []
	}
}
