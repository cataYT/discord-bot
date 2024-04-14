const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
    ],
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
    if (message.content === 'ping') {
        console.log("!")
        message.reply('Pong!')
    }
});

client.on(Events.MessageDelete, (message) => {
    if (message.content.startsWith("<@") && message.content.endsWith(">")) {
        message.channel.send(`Message deleted by ${message.author}: no lol not double ping`)
        console.log("ping delete")
    } else if (message.embeds || message.attachments) {
        message.attachments.forEach(element => {
            if (element.url) {
                message.channel.send(`Message deleted by ${message.author}: ${element.url}`)
            }
        });
        console.log("embed delete")
    } else {
        message.channel.send(`Message deleted by ${message.author}: ${message.content}`)
        console.log("normal delete")
    }
})

  // Log in to Discord with your client's token
client.login(token);