const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');

const additionalFunctions = require('./additional functions/main.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessageReactions
    ],
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.user.setActivity("MONEY!!!!", { type: ActivityType.Playing, state: "🤑" })
});

client.on(Events.MessageCreate, (message) => {
    if (message.content === 'ping') {
        console.log("!");
        message.reply('Pong!');
    }
});

client.on(Events.MessageDelete, (message) => {
    if (message.content.startsWith("<@") && message.content.endsWith(">")) {
        message.channel.send(`Message deleted by ${message.author}: no lol not double ping`);
        console.log("ping delete");
    } else if (message.embeds || message.attachments) {
        message.attachments.forEach(element => {
            if (element.url) {
                message.channel.send(`Message deleted by ${message.author}: ${element.url}`);
            }
        });
        console.log("embed delete");
    } else {
        message.channel.send(`Message deleted by ${message.author}: ${message.content}`);
        console.log("normal delete");
    }
})

client.on(Events.MessageUpdate, (oldMessage, newMessage) => {
    if (oldMessage.content !== newMessage.content) {;
        newMessage.channel.send(`Old message: ${oldMessage.content}`);
        newMessage.channel.send(`Message updated by ${newMessage.author}: ${newMessage.content}`);
        console.log("message update");
    }
})

client.on(Events.MessageReactionAdd, (reaction, user) => {
    reaction.message.channel.send(`Reaction added by ${user}: ${reaction.emoji.name}`);
})

client.on(Events.MessageReactionRemove, (reaction, user) => {
    reaction.message.channel.send(`Reaction removed by ${user}: ${reaction.emoji.name}`);
})

client.login(token);