import Server from "./lib/server"
import { PORT, DB, RUN_CRON } from "./config"

// Create a new server by passing a port
const server = new Server(PORT)

// Create express app, connect DB and register effects you would like to use
// routes, cron, midddleware
server.create().connectDB(DB).register(["routes", "middleware"])

if (RUN_CRON) {
  console.log('No Cron Lib');
	// server.register(["cron"])
} else {
	console.log("CRON JOBS NOT running...")
}

// Finally we start our server
server.start()
