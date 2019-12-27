const settings = require('./../botconfig.json')
const Discord = require('discord.js');
const malScraper = require('mal-scraper');

module.exports = async (bot,oldPresence,newPresence) => {
  const isFemale = oldPresence.roles.some(r=>r.name==='Female')
  const loggingChannels = ['watching','currently-watching']
  if (oldPresence.user.bot) return;
  if (newPresence.user.bot) return;
  textTruncate = function(str, length, ending) {
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '...';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    };
  if (newPresence.presence.game){
  if (newPresence.presence.equals(oldPresence.presence)) {return;}
  if (newPresence.presence.game.name === 'Taiga'){
    var cha = newPresence.guild.channels.find(c=>loggingChannels.includes(c.name))
    if (!cha) return console.log(`Channel Not Found!`)
      const Embed = new Discord.RichEmbed()
      .setColor(settings.colors.embedDefault)
      if ((newPresence.presence.game.name === 'Taiga')&&(newPresence.presence.game.details !== null)){
      malScraper.getInfoFromName(newPresence.presence.game.details).then( async (data) => {
        var image = (data.picture) ? data.picture : "www.notavailable.com";
        var url = (data.url) ? data.url : "www.notavailable.com";
        var syn = (data.synopsis) ? data.synopsis : "No Synopsis found";
        var aired = (data.aired.length > 0) ? data.aired : "Not Availeble";
        var status = (data.status.length > 0) ? data.status : "Not Available";
        var episodes = (data.episodes.length > 0) ? data.episodes : "Not Available";
        const episode = newPresence.presence.game.state.split('/')
        var scoring = data.score + " " + data.scoreStats;
        var score = ((data.score.length > 0) && (data.scoreStats.length > 0)) ? scoring : "Not Available";
        if (data){
          Embed.setAuthor(`${newPresence.displayName} has started watching ${episode[0]} of ${newPresence.presence.game.details}`, newPresence.user.displayAvatarURL)
          .addField(`Synopsis`, textTruncate(syn,250)).addField(`Aired`, aired,true).addField(`Status`,status,true).addField(`Episodes`,episodes,true).setThumbnail(image).setFooter("Score: "+score).setTimestamp()
      }else {
          Embed.setAuthor(`${newPresence.displayName} has started watching ${newPresence.presence.game.details} ${episode[0]}`, newPresence.presence.game.assets.smallImageUrl)
          .setDescription(`No Information was found for  ${newPresence.presence.game.details}`).setTimestamp()
      }
        var hook = await cha.createWebhook(`Taiga`,newPresence.presence.game.assets.largeImageURL)
        await hook.send(Embed).catch(console.error);
        setTimeout(async function() {
            await hook.delete()
        }, 1000);
      })
    }
  }
} if (oldPresence.presence.game){
  if (oldPresence.presence.equals(newPresence.presence)) {return;}
  if (oldPresence.presence.game.name === 'Taiga'){
    var cha = oldPresence.guild.channels.find(c=>loggingChannels.includes(c.name))
    if (!cha) return console.log(`Channel Not Found!`)
    const episode = oldPresence.presence.game.state.split('/')
      const Embed = new Discord.RichEmbed()
      .setColor(settings.colors.embedDefault)
      .setAuthor(`${oldPresence.displayName} has finished watching ${episode[0]} of ${oldPresence.presence.game.details}`, oldPresence.user.displayAvatarURL)
      .setTimestamp()
      var hook = await cha.createWebhook(`Taiga`,oldPresence.presence.game.assets.largeImageURL)
      await hook.send(Embed).catch(console.error);
      setTimeout(async function() {
          await hook.delete()
      }, 1000);
  }
}
}
