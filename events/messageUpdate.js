const settings = require('./../botconfig.json')
const Discord = require('discord.js');
const timeConvert = require('./../utils/timeConvert.js')

module.exports = async (bot,oldMessage,newMessage) => {
const logs = ['logs','mod-logs','modlog','audits']
const isFemale = oldMessage.guild.roles.some(r=>r.name==='Female')
var cha = oldMessage.guild.channels.find(c=>logs.includes(c.name))
if (!cha) return console.log(`Channel Not Found!`)
var changes ='';

const Embed = new Discord.RichEmbed()
.setAuthor(`Message Edited`,oldMessage.author.displayAvatarURL)
.setColor(settings.colors.embedDefault)
.setTimestamp()
.setFooter(`Message ID: ${newMessage.id}`)

if (oldMessage.content!==newMessage.content){
  Embed.addField(`*Before*`,oldMessage.content).addField('*After*',newMessage.content)
} else if (oldMessage.embeds.size<newMessage.embeds.size){
  changes += `Added Embed to message`
} else if (oldMessage.embeds.size>newMessage.embeds.size){
  changes += `Removed Embed to message`
}

if (oldMessage.author.bot) {
  return;
} else
Embed.setDescription(`**${oldMessage.author} edited ${isFemale ? 'her' : `his`} message on ${oldMessage.channel}**\n${changes}`)

cha.send(Embed).catch(console.error)

  }
