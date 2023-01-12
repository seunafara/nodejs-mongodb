import Server from './__init__/server';
import { PORT, DB } from "./config"

// Create a new server by passing a port
const server = new Server(PORT)

// Create express app, connect DB and register effects you would like to use
// routes, cron, midddleware
server.create().connectDB(DB).register(["routes", "middleware"])

// Finally we start our server
server.start()
