const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const auth = require('./auth.json');
const fs = require("fs");
const bot = new Commando.Client({disableEveryone: true,unknownCommandResponse: false});
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldn't find commands");
      return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});
//scann all items in commands folder

fs.readdir("./events/", (err, files) => {

  if(err) console.log(err);

  let evtFiles = files.filter(f => f.split(".").pop() === "js")
  if (evtFiles.length <=0){
    return console.log(`Couldn't find events`);
  }

  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    console.log(`${eventName} event loaded!`);
    const event = require(`./events/${file}`);
    bot.on(eventName, event.bind(null, bot));
  });
});


bot.login(process.env.token);
