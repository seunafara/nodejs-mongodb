import Server from './__init__/server';
import { PORT, DB } from "./config"

const server = new Server(PORT)

server.create().connectDB(DB).register(['routes'])

server.start()
