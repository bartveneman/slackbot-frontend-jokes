var util = require('util')
var Bot = require('slackbots')

var CssBot = function Contructor(settings) {
  this.settings = settings
  this.settings.name = this.settings.name || 'css-facts'
}

util.inherits(CssBot, Bot)

CssBot.prototype.run = function () {
  CssBot.super_.call(this, this.settings)

  this.on('start', this._onStart)
  this.on('message', this._onMessage)
}

CssBot.prototype._onStart = function () {
  console.log('Starting bot...')
  this._loadBotUser()
  this._loadJokes()
}

CssBot.prototype._loadJokes = function () {
  this.cssjokes = require('../data/css-jokes')
}

CssBot.prototype._loadBotUser = function () {
  var self = this
  this.user = this.users
    .filter(u => u.name === self.name)
    .shift()
}

CssBot.prototype._onMessage = function (message) {
  if (this._isChatMessage(message) &&
    this._isChannelConversation(message) &&
    !this._isFromThisBot(message) &&
    this._isWorthReplying(message)
  ) {
    this._replyWithCssJoke(message)
  }
}

CssBot.prototype._isChatMessage = function (message) {
  return message.type === 'message' && Boolean(message.text)
}

CssBot.prototype._isChannelConversation = function (message) {
  return typeof message.channel === 'string' &&
    message.channel[0] === 'C'
}

CssBot.prototype._isFromThisBot = function (message) {
  return message.user === this.user.id
}

CssBot.prototype._isWorthReplying = function (message) {
  var msg = message.text.toLowerCase()
  return msg.includes('css')
}

CssBot.prototype._replyWithCssJoke = function (originalMessage) {
  var self = this
  var channel = self._getChannelById(originalMessage.channel)

  var joke = "```\n" + this.cssjokes[Math.floor(Math.random()*this.cssjokes.length)] + "\n```"
  self.postMessageToChannel(channel.name, joke, { as_user: true })
}

CssBot.prototype._getChannelById = function (channelId) {
  return this.channels
    .filter(c => c.id === channelId)
    .shift()
}

module.exports = CssBot
