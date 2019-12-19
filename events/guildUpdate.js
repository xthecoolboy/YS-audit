const settings = require('./../botconfig.json')
const Discord = require('discord.js');
const timeConvert = require('./../utils/timeConvert.js')

module.exports = async (bot,oldGuild,newGuild) => {
const logs = ['logs','mod-logs','modlog','audits']
const isFemale = oldGuild.roles.some(r=>r.name==='Female')
var cha = oldGuild.channels.find(c=>logs.includes(c.name))
if (!cha) return console.log(`Channel Not Found!`)
var changes ='';

oldGuild.fetchAuditLogs().then(audit => {
const audited = audit.entries.first()
const Embed = new Discord.RichEmbed()
.setAuthor(`Server Updated`,newGuild.iconURL)
.setColor(settings.colors.embedDefault)
.setTimestamp()
.setFooter(`ID: ${audited.id}`)

if (oldGuild.name!==newGuild.name){
  changes += `• Changed **server name** from ${"`"+oldGuild.name+"`"} to ${"`"+newGuild.name+"`"}!\n`
}
if (oldGuild.ownerID!==newGuild.ownerID){
  changes += `• Transferred **server ownership** from ${"`"+oldGuild.owner.user.username+"`"} to ${"`"+newGuild.owner.user.username+"`"}!\n`
}

Embed.setDescription(`Changes made by **${audit.entries.first().executor.username}**#${audit.entries.first().executor.discriminator} on ${oldGuild.name}\n\n${changes}`)

cha.send(Embed).catch(console.error)

  })
  }
