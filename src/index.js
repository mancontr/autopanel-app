import { config, providers } from 'autopanel'
import 'src/styles/main.sass'

config.registerProvider(new providers.Demo({
  appUrl: process.env.APP_URL
}))

config.registerProvider(new providers.Gitlab({
  appUrl: process.env.APP_URL,
  appId: process.env.APP_ID
}))
