import middlewares from "../middleware/index"

export default (app: any) => {
  try {
    for (let idx = 0; idx < middlewares.length; idx++) {
      const middleware = middlewares[idx];
      app.use(middleware)
    }
    return app
  } catch (e) {
    throw new Error('Middleware registration failed')
  }
}
