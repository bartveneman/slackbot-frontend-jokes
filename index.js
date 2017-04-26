const Bot = require('slackbots')
const settings = {
  token: 'xoxb-175055758964-fbB80fO6tVUccFPc6N1El2JN',
  name: 'CSS Facts'
}

const bot = new Bot(settings)

bot.on('start', () => {
  bot.postMessageToChannel('random', 'Hello!!!')
})
