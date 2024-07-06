const { TOKEN } = require("/com.docker.devenvironments.code/config.json")

const BASE_URL = "https://discord.com/api/v9"

async function getWebhook(serverID: number) {
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
    const data = await resp.json();
    console.log("got webhook successfully");
    return data;
  } catch (err) {
    console.error("Error fetching webhook:", err);
  }
};

async function createWebhook(name: string = "Captain Hook", channelID: number) {
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
      const data = await resp.json();
      console.log("created webhook successfully");
      return data;
    } catch (err) {
      console.error("Error creating webhook:", err);
    }
};  

async function deleteWebhook(webhookID: number) {
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
    const data = await resp.json();
    console.log("deleted webhook successfully");
    return data;
  } catch (err) {
    console.error("Error deleting webhook:", err);
  }
};

async function sendMessage(channelID: number, message: string) {
  try {
    const resp = await fetch(`${BASE_URL}/channels/${channelID}/messages`, {
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
    const data = await resp.json();
    console.log("sent message successfully");
    return data;
  } catch (err) {
    console.error("Error sending message:", err);
  }
}

async function deleteMessage(messageID: number, channelID: number) {
  try {
    const resp = await fetch(`{BASE_URL}/channels/${channelID}/messages/${messageID}`, {
      "headers": {
        "authorization": TOKEN
      },
      "method": "DELETE"
    });
    if (!resp.ok) {
      throw new Error("Network response was not ok while deleting message");
    }
    const data = await resp.json();
    console.log("deleted message sucessfully");
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function createChannel(name: string, serverID: number, type=0, parentID=null) {
  try {
    const resp = await fetch(`${BASE_URL}/guilds/${serverID}/channels`, {
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
    const data = await resp.json();
    console.log("created channel successfully");
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function deleteChannel(channelID: number) {
  try {
    const resp = await fetch(`${BASE_URL}/channels/${channelID}`, {
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
    const data = await resp.json();
    console.log("deleted channel successfully");
    return data;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getWebhook,
  createWebhook,
  deleteWebhook,
  sendMessage,
  deleteMessage,
  createChannel,
  deleteChannel
};