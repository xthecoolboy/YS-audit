const settings = require('./../botconfig.json')
const Discord = require('discord.js');
const timeConvert = require('./../utils/timeConvert.js')

module.exports = async (bot,oldChannel,newChannel) => {
const logs = ['logs','mod-logs','modlog','audits']
var cha = oldChannel.guild.channels.find(c=>logs.includes(c.name))
if (!cha) return console.log(`Channel Not Found!`)
var changes = '';
if (!(oldChannel.type===newChannel.type)){
  changes += `• Updated **Channel type** from *${oldChannel.type}* to *${newChannel.type}*\n`
}

if (!(oldChannel.name===newChannel.name)){
  changes += `• Updated **Channel name** from *${oldChannel.name}* to *${newChannel.name}*\n`
}

if (!(oldChannel.topic===newChannel.topic)){
  if (newChannel.topic===''){
    changes += `• Removed **Channel topic**\n`
  } else if (oldChannel.topic===''){
    changes += `• Added **Channel topic**: *${newChannel.topic}*\n`
  } else changes += `• Updated **Channel topic** from *${oldChannel.topic}* to *${newChannel.topic}*\n`
}

if (!(oldChannel.nsfw===newChannel.nsfw)){
  if (oldChannel.nsfw === false){
    changes += `• Converted **Channel** from SFW to a NSFW Channel!\n`
  } else changes += `• Converted **Channel** from NSFW to a SFW Channel!\n`
}

if (!(oldChannel.rateLimitPerUser===newChannel.rateLimitPerUser)){
  if (oldChannel.rateLimitPerUser===0){
    changes += `• Enabled **Slow Mode**: Users without Manage Message permissions can now only send messages once every ${"`"+timeConvert(newChannel.rateLimitPerUser)+"`"}*\n`
  } else if (newChannel.rateLimitPerUser===0){
    changes += `• Removed **Slow Mode**\n`
  } else if (oldChannel.rateLimitPerUser>newChannel.rateLimitPerUser){
    changes += `• Reduced **Slow Mode** interval from ${"`"+timeConvert(oldChannel.rateLimitPerUser)+"`"} to ${"`"+timeConvert(newChannel.rateLimitPerUser)+"`"}\n`
  } else changes  += `• Increased **Slow Mode** interval from ${"`"+timeConvert(oldChannel.rateLimitPerUser)+"`"} to ${"`"+timeConvert(newChannel.rateLimitPerUser)+"`"}\n`
}

if (changes===''){
  return;
} else {
  oldChannel.guild.fetchAuditLogs().then(audit => {
  const Embed = new Discord.RichEmbed()
  .setAuthor(`Channel Updated`,audit.entries.first().executor.displayAvatarURL)
  .setColor(settings.colors.embedDefault)
  .setTimestamp()
  .setDescription(`Changes made by **${audit.entries.first().executor.username}**#${audit.entries.first().executor.discriminator} on ${oldChannel}\n\n${changes}`)
  .setFooter(`ID: ${oldChannel.id}`)

  cha.send(Embed).catch(console.error)

  })
  }
}
