import Server from './__init__/server';
import { PORT } from "./config"

const server = new Server(PORT)

server.create().register(['middleware', 'cron'])

server.start()
