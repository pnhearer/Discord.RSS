// Create a single client

const DiscordRSS = require('./index.js')
const drss = new DiscordRSS.Client() // Override default config values here
drss.login(require('./config.js').bot.token, true)

drss.on('finishInit', () => {
  // Do whatever once the bot has finished initialization
  if (process.env.DRSS_EXPERIMENTAL_FEATURES) {
    try {
      require('./web/index.js')()
    } catch (err) {
      throw new Error(`process.env.DRSS_EXPERIMENTAL_FEATURES was defined but ./web/index.js could not be loaded ${err.message}`)
    }
  }
})
