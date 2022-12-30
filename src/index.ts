import Server from './__init__/server';
import { PORT } from "./config"

const server = new Server(PORT)

const app = server.create().register(['middleware', 'cron'])

app.start()
