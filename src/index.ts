import Server from './__init__/server';

const server = new Server(9999)

const app = server.create().register(['middleware', 'cron'])

app.start()
