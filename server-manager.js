// Only create the Sharding Manager

const DiscordRSS = require('./index.js')
const Discord = require('discord.js')
const shardingManager = new Discord.ShardingManager('./server-shard.js', { respawn: false })
const shardedDiscordRSSClient = new DiscordRSS.ClientSharded(shardingManager, { readFileSchedules: true, setPresence: true, forceSharded: true })

shardedDiscordRSSClient.run()

shardedDiscordRSSClient.on('finishInit', () => {
  // Do whatever once the sharding manager has finished spawning and waiting for all shards to finish initialization
  if (process.env.DRSS_EXPERIMENTAL_FEATURES) {
    try {
      require('./web/index.js')()
    } catch (err) {
      throw new Error(`process.env.DRSS_EXPERIMENTAL_FEATURES was defined but ./web/index.js could not be loaded ${err.message}`)
    }
  }
})
