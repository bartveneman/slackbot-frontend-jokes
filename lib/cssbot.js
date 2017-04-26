var util = require('util')
var Bot = require('slackbots')

var CssBot = function Contructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'css-facts';
};

util.inherits(CssBot, Bot);

CssBot.prototype.run = function () {
  CssBot.super_.call(this, this.settings)

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
}

CssBot.prototype._onStart = function () {
  this._loadBotUser()
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
    !this._isFromCssBot(message) &&
    this._isWorthReplying(message)
  ) {
    this._replyWithCssFact(message)
  }
}

CssBot.prototype._isChatMessage = function (message) {
  return message.type === 'message' && Boolean(message.text)
}

CssBot.prototype._isChannelConversation = function (message) {
  return typeof message.channel === 'string' &&
    message.channel[0] === 'C'
};

CssBot.prototype._isFromCssBot = function (message) {
  return message.user === this.user.id
};

CssBot.prototype._isWorthReplying = function (message) {
  return message
    .text
    .toLowerCase()
    .includes('css') ||
    message.text.toLowerCase().startsWith('audio')
};

CssBot.prototype._replyWithCssFact = function (originalMessage) {
  var self = this;
  var channel = self._getChannelById(originalMessage.channel)

  self.postMessageToChannel(channel.name, 'HA, CSS much funny')
};

CssBot.prototype._getChannelById = function (channelId) {
  return this.channels
    .filter(c => c.id === channelId)
    .shift()
};

module.exports = CssBot
