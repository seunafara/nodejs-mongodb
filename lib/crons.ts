import { getFileNamesAndPaths } from "./utils/index"
import { CRONS_DIR } from "../config"

export default () => {
  const routes = getFileNamesAndPaths(process.cwd() + CRONS_DIR)

  routes.forEach(async (file) => {
    await import(file.path)
  })
}
