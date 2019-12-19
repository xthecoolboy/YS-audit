
module.exports.run = async (bot, message, args) => {

const replies = [
  "Senpai! I canno't help you in any way, I only watch the server for changes!",
  "Uhmm ano nee senpai! I'm just a server Auditor. I provide no help",
  "If you're asking for commands, here it is senpai!: `ping` and `uptime`",
  "No help for you senpai"
]

message.channel.send(`${message.author}, ${replies[Math.floor(Math.random()*(replies.length-1))]}`).catch(console.error)


}

module.exports.help = {
	name: "help"
}
