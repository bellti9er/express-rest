import 'dotenv/config'

import App from './app'

const startServer = async() => {
  const port: number    = (process.env.PORT! || 8080) as number
  const app: App        = await App.createInstance()

  const server = await app.initialize()

  server.listen(port, () => console.log(`🚀🚀🚀 Server Listening on port ${port} 🚀🚀🚀`))
}

startServer();
