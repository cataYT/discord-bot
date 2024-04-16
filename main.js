const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const { exec } = require('child_process');

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
    if (message.author.id === "600677384689025026") {
        if (message.content.startsWith("$echo")) {
            message.channel.send(message.content.slice(6));
        } else if (message.content.startsWith("$exec")) {
            exec(message.content.slice(6), (error, stdout, stderr) => {
                if (error) {
                  message.channel.send(`${error}`);
                  return;
                }
                if (stdout) {
                    message.channel.send(`Command result:\n${stdout}`);
                }
                if (stderr) {
                    message.channel.send(`Command Error:\n${stderr}`);
                }
            });
        } else if (message.content.startsWith("$channelCreate")) {
            additionalFunctions.createChannel(message.content.slice(15), "1119538529450594314").then(()=> {
                message.channel.send("Created channel successfully!")
            }).catch((error) => {
                message.channel.send(`Error creating channel: ${error}`)
            })
        } else if (message.content.startsWith("$channelDelete")) {
            additionalFunctions.deleteChannel(message.content.slice(15));
        }
    } else {
        return
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
            } else {
                message.channel.send(`Message deleted by ${message.author}: ${message.content}`);
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
    console.log("added reaction")
})

client.on(Events.MessageReactionRemove, (reaction, user) => {
    reaction.message.channel.send(`Reaction removed by ${user}: ${reaction.emoji.name}`);
    console.log("removed reaction")
})

client.login(token);