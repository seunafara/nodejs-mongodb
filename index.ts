import Server from "./lib/server"
import { PORT, DB, RUN_CRON } from "./config"

const app = async () => {
  // Create a new server by passing a port
  const server = new Server(PORT)

  // Create express app, connect DB and register effects you would like to use
  // routes, cron, midddleware
  const registry = ["routes", "middleware"]

  if (RUN_CRON) {
    console.log('No Cron Lib');
    // registry.push(["cron"])
  } else {
    console.log("CRON JOBS NOT running...")
  }

  server.connectDB(DB).create(registry)
}

app().catch(err => console.log(err))
