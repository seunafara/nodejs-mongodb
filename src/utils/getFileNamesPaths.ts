import path from "path"
import fs from "fs"

const getFileNamesAndPaths = (folder: string) => {
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


export default getFileNamesAndPaths
