import { TOKEN } from "../config.json";

const BASE_URL: string = "https://discord.com/api/v9"

export async function getWebhook(serverID: number): Promise<string | null> {
  try {
    const resp = await fetch(`${BASE_URL}/guilds/${serverID}/webhooks`, {
      "headers": {
        "authorization": TOKEN,
      },
      "method": "GET",
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok while getting webhook");
    }
    console.log("got webhook successfully");
    return await resp.json();
  } catch (err) {
    console.error("Error fetching webhook:", err);
    return null;
  }
};

export async function createWebhook(name: string = "Captain Hook", channelID: number): Promise<string | null> {
    try {
      const resp = await fetch(`${BASE_URL}/channels/${channelID}/webhooks`, {
        headers: {
          authorization: TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name
        }),
        method: "POST"
      });
      if (!resp.ok) {
        throw new Error("Network response was not ok while creating webhook");
      }
      console.log("created webhook successfully");
      return await resp.json();
    } catch (err) {
      console.error("Error creating webhook:", err);
      return null;
    }
};  

export async function deleteWebhook(webhookID: number): Promise<string | null> {
  try {
    const resp = await fetch(`${BASE_URL}/webhooks/${webhookID}`, {
      "headers": {
        "authorization": TOKEN,
      },
      "method": "DELETE"
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok while deleting webhook");
    }
    console.log("deleted webhook successfully");
    return await resp.json();
  } catch (err) {
    console.error("Error deleting webhook:", err);
    return null;
  }
};

export async function sendMessage(channelID: number, message: string): Promise<string | null> {
  try {
    const resp: Response = await fetch(`${BASE_URL}/channels/${channelID}/messages`, {
      "headers": {
        "authorization": TOKEN,
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "content": message
      }),
      "method": "POST"
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok while sending message");
    }
    console.log("sent message successfully");
    return await resp.json();
  } catch (err) {
    console.error("Error sending message:", err);
    return null;
  }
}

export async function replyMessage(guildID: string, channelID: string, messageID: string, message: string): Promise<string | null> {
  try {
    const resp: Response = await fetch(`${BASE_URL}channels/${channelID}/messages`, {
      "headers": {
        "authorization": TOKEN
      },
      "body": JSON.stringify({
        "message": message,
        "message_reference": {
          "guild_id": guildID,
          "channel_id": channelID,
          "message_id": messageID
        }
      }),
      "method": "POST"
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok while replying message");
    }
    console.log("replied to message successfully");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteMessage(messageID: number, channelID: number): Promise<string | null> {
  try {
    const resp: Response = await fetch(`${BASE_URL}/channels/${channelID}/messages/${messageID}`, {
      "headers": {
        "authorization": TOKEN
      },
      "method": "DELETE"
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok while deleting message");
    }
    console.log("deleted message sucessfully");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createChannel(name: string, serverID: number, type=0, parentID=null): Promise<string | null> {
  try {
    const resp: Response = await fetch(`${BASE_URL}/guilds/${serverID}/channels`, {
      "headers": {
        "authorization": TOKEN,
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "type": type,
        "name": name,
        "parent_id": parentID
      }),
      "method": "POST"
    });
    if (!resp.ok) {
      throw new Error("response not ok");
    }
    console.log("created channel successfully");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteChannel(channelID: string): Promise<string | null> {
  try {
    const resp: Response = await fetch(`${BASE_URL}/channels/${channelID}`, {
      "headers": {
        "authorization": TOKEN,
        "content-type": "application/json"
      },
      "body": null,
      "method": "DELETE"
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok while deleting channel");
    }
    console.log("deleted channel successfully");
    return await resp.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  getWebhook,
  createWebhook,
  deleteWebhook,
  sendMessage,
  replyMessage,
  deleteMessage,
  createChannel,
  deleteChannel
};