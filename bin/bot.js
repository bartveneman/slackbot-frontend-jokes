#!/usr/bin/env node

var CssBot = require('../lib/cssbot');

var TOKEN = process.env.BOT_API_TOKEN;
var NAME = process.env.BOT_NAME;

var cssbot = new CssBot({
  token: TOKEN,
  name: NAME
});

cssbot.run();
