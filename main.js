const { Client, Events, GatewayIntentBits, ActivityType } = require("discord.js");
const { token } = require('./config.json');
const { exec } = require('child_process');

const { $exec, $rng } = require("./bot_functions.js")

const { createChannel, deleteChannel, replyMessage }  = require('./additional functions/main.js');

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

client.on(Events.MessageCreate, async (message) => {
    if (message.author.id === "600677384689025026") {
        if (message.content.startsWith("$exec")) {
            $exec(message.content.slice(6))
        } else if (message.content.startsWith("$createChannel")) {
            await createChannel(`${message.content.slice(15)}`, "904732937738657863", message.channelId)
        } else if (message.content.startsWith("$deleteChannel")) {
            await deleteChannel(message.content.slice(15))
        } else if (message.content.startsWith("$echo")) {
            message.channel.send(message.content.slice(6));
        } else if (message.content.startsWith("$reply")) {
            const secondLastMessageId = (await message.channel.messages.fetch({limit: 2})).last().id;
            await replyMessage(message.content.slice(7), message.guildId, message.channelId, secondLastMessageId);
        } else if (message.content.startsWith("$rng")) {
            $rng(message.content);
        }
    } else if (message.content.startsWith("$echo")) {
        message.channel.send(message.content.slice(6));
    } else if (message.content.startsWith("$reply")) {
        const secondLastMessageId = (await message.channel.messages.fetch({limit: 2})).last().id;
        await replyMessage(message.content.slice(7), message.guildId, message.channelId, secondLastMessageId);
    } else if (message.content.startsWith("$exec")) {
        $exec(message.content.slice(6))
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

client.on(Events.ShardDisconnect, (event) => {
    console.log(`Shard ${event.shardId} disconnected.`);
})

client.login(token);