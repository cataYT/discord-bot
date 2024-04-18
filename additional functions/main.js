const { token } = require("/com.docker.devenvironments.code/config.json")

BASE_URL = "https://discord.com/api/v9"

async function getWebhook(serverID) {
  try {
    const resp = await fetch(`${BASE_URL}/guilds/${serverID}/webhooks`, {
      "headers": {
        "authorization": token,
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

async function createWebhook(name="Captain Hook", channelID) {
  try {
    const resp = await fetch(`${BASE_URL}/channels/${channelID}/webhooks`, {
      "headers": {
        "authorization": token,
      },
      "body": {
        "name": name
      },
      "method": "POST"
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

async function deleteWebhook(webhookID) {
  try {
    const resp = await fetch(`${BASE_URL}/webhooks/${webhookID}`, {
      "headers": {
        "authorization": token,
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

async function sendMessage(channelID, message) {
  try {
    const resp = await fetch(`${BASE_URL}/channels/${channelID}/messages`, {
      "headers": {
        "authorization": token,
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

async function deleteMessage(messageID, channelID) {
  try {
    const resp = await fetch(`{BASE_URL}/channels/${channelID}/messages/${messageID}`, {
      "headers": {
        "authorization": token
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

async function createChannel(name, serverID, type=0, parentID=null) {
  try {
    const resp = await fetch(`${BASE_URL}/guilds/${serverID}/channels`, {
      "headers": {
        "authorization": token,
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

async function deleteChannel(channelID) {
  try {
    const resp = await fetch(`${BASE_URL}/channels/${channelID}`, {
      "headers": {
        "authorization": token,
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