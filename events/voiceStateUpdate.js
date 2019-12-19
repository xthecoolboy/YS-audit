const settings = require('./../botconfig.json')
const Discord = require('discord.js');

module.exports = async (bot,oldM,newM) => {

var changes = '';
  if (oldM.voiceChannel!==newM.voiceChannel){
    if (!newM.voiceChannel){
      changes = `**${newM} left the voice channel ${oldM.voiceChannel}**`
    } else if (newM.voiceChannel){
      changes = `**${newM} joined the voice channel ${newM.voiceChannel}**`
    }
  }

if (changes===''){
  return;
}

  const logs = ['logs','mod-logs','modlog','audits']
  var cha = oldM.guild.channels.find(c=>logs.includes(c.name))
  if (!cha) return console.log(`Channel Not Found!`)

    const Embed = new Discord.RichEmbed()
    .setAuthor(`${oldM.displayName}#${oldM.user.discriminator}`,oldM.user.displayAvatarURL)
    .setDescription(changes)
    .setTimestamp()
    .setColor(settings.colors.embedDefault)
    .setFooter(`ID: ${oldM.user.id}`)

    cha.send(Embed).catch(console.error)

}
