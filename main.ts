import { 
    GatewayIntentBits,
    ActivityType,
    Events,
    Message,
    Client,
    User,
    MessageReaction,
    CloseEvent as DiscordCloseEvent,
    PartialMessage,
    PartialMessageReaction,
    PartialUser,
    Attachment,
    ClientUser
} from "discord.js";

import { TOKEN } from './config.json';

import exec from 'child_process';

import { createChannel, deleteChannel, replyMessage } from "./additional_functions/main.js";

const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessageReactions
    ],
});

client.once(Events.ClientReady, (readyClient: Client): void => {
    if (readyClient) {
        const user: ClientUser | null = readyClient.user;
        if (user) {
            console.log(`Ready! Logged in as ${user.tag}`);
            user.setActivity("MONEY!!!!", { type: ActivityType.Playing, state: "🤑" })
        }        
    }
});

async function rng(message: Message): Promise<void> {
    const parts: RegExpMatchArray | null = message.content.match(/\d+/g);
    if (parts && parts.length == 2) {
        const min: number = parseInt(parts[0]);
        const max: number = parseInt(parts[1]);
        if (!isNaN(min) && !isNaN(max)) {
            await message.channel.send(`${Math.floor(Math.random() * (max - min + 1)) + min}`);
        } else {
            await message.channel.send("Invalid range. Please provide two valid numbers.");
        }
    } else {
        await message.channel.send("Invalid input format. Please provide a range in the format 'min, max'.");
    }
}

async function exec_cmd(message: Message): Promise<void> {
    if (message.author.id === "600677384689025026") {
        exec.exec(message.content.slice(6), async (error: exec.ExecException | null, stdout: string, stderr: string): Promise<void> => {
            if (error) {
              await message.channel.send(`${error}`);
              return;
            }
            if (stdout) {
                await message.channel.send(`Command result:\n${stdout}`);
            }
            if (stderr) {
                await message.channel.send(`Command Error:\n${stderr}`);
            }
        });
    } else {
        return;
    }
}

client.on(Events.MessageCreate, async (message: Message): Promise<void> => {
    if (message.author.id === "600677384689025026") {
        if (message.content.startsWith("$exec")) {
            exec_cmd(message);
        } else if (message.content.startsWith("$createChannel")) {
            await createChannel(message.content.slice(15), 904732937738657863);
        } else if (message.content.startsWith("$deleteChannel")) {
            await deleteChannel(message.content.slice(15));
        } else if (message.content.startsWith("$echo")) {
            message.channel.send(message.content.slice(6));
        } else if (message.content.startsWith("$reply")) {
            const secondLastMessage: Message<boolean> | undefined = (await message.channel.messages.fetch({limit: 2})).last();
            if (secondLastMessage !== undefined) {
                const secondLastMessageId: string = secondLastMessage.id;
                await replyMessage(message.guildId as string, message.channelId, secondLastMessageId, message.content.slice(7));
            }
        } else if (message.content.startsWith("$rng")) {
            rng(message);
        }
    } else if (message.content.startsWith("$echo")) {
        message.channel.send(message.content.slice(6));
    } else if (message.content.startsWith("$reply")) {
        const secondLastMessage: Message<boolean> | undefined = (await message.channel.messages.fetch({limit: 2})).last();
        if (secondLastMessage !== undefined) {
            const secondLastMessageId: string = secondLastMessage.id;
            await replyMessage(message.guildId as string, message.channelId, secondLastMessageId, message.content.slice(7));
        }
    } else if (message.content.startsWith("$rng")) {
        rng(message);
    } else if (message.content.startsWith("$exec")) {
        exec_cmd(message);
    }
})

client.on(Events.MessageDelete, (message: Message | PartialMessage): void => {
    if (!message.partial) {
        if (message.content.startsWith("<@") && message.content.endsWith(">")) {
            message.channel.send(`Message deleted by ${message.author}: no lol not double ping`);
            console.log("ping delete");
        } else if (message.embeds.length > 0 || message.attachments.size > 0) {
            message.attachments.forEach((element: Attachment) => {
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
    }
});

client.on(Events.MessageUpdate, (oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage): void => {
    if (!oldMessage.partial && !newMessage.partial && oldMessage.content !== newMessage.content) {
        newMessage.channel.send(`Old message: ${oldMessage.content}`);
        newMessage.channel.send(`Message updated by ${newMessage.author}: ${newMessage.content}`);
        console.log("message update");
    }
});

client.on(Events.MessageReactionAdd, (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): void => {
    if (!reaction.partial && !user.partial) {
        reaction.message.channel.send(`Reaction added by ${user}: ${reaction.emoji.name}`);
        console.log("added reaction");
    }
});

client.on(Events.MessageReactionRemove, (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): void => {
    if (!reaction.partial && !user.partial) {
        reaction.message.channel.send(`Reaction removed by ${user}: ${reaction.emoji.name}`);
        console.log("removed reaction");
    }
});

client.on("debug", (message: string): void => {
    console.log(message);
})

client.on("error", (error: Error): void => {
    console.log(`An error occurred: ${error.message}`)
})

client.on(Events.ShardDisconnect, (event: DiscordCloseEvent): void => {
    console.log(`Shard ${event.code} disconnected.`);
})

client.login(TOKEN)