#!/usr/bin/env node

'use strict'

var CssBot = require('../lib/cssbot')

var TOKEN = process.env.BOT_API_TOKEN || 'xoxb-175055758964-fbB80fO6tVUccFPc6N1El2JN'
var NAME = process.env.BOT_NAME

var cssbot = new CssBot({
  token: TOKEN,
  name: NAME
})

cssbot.run()
