const { token } = require("/home/cata/coding things/js things/node/discord bot/config.json")

BASE_URL = "https://discord.com/api/v9"

function getWebhook(serverID) {
  return fetch(`${BASE_URL}/guilds/${serverID}/webhooks`, {
    "headers": {
      "authorization": token,
    },
    "method": "GET",
  })
  .then((resp) => {
    if (!resp.ok) {
      throw new Error("Network response was not ok while getting webhook");
    }
    return resp.json();
  })
  .then((data) => {
    console.log("got webhook successfully");
    return data;
  })
  .catch((err) => {
    console.error("Error fetching webhook:", err);
  });
};

function createWebhook(name="Captain Hook", channelID) {
  return fetch(`${BASE_URL}/channels/${channelID}/webhooks`, {
  "headers": {
    "authorization": token,
  },
  "body": {
    "name": name
  },
  "method": "POST"
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Network response was not ok while creating webhook");
    }
    return resp.json();
  }).then((data) => {
    console.log("created webhook successfully");
    return data;
  }).catch((err) => {
    console.error("Error creating webhook:", err);
  });
};

function deleteWebhook(webhookID) {
  return fetch(`${BASE_URL}/webhooks/${webhookID}`, {
  "headers": {
    "authorization": token,
  },
  "method": "DELETE"
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Network response was not ok while deleting webhook");
    }
    return resp.json();
  }).then((data) => {
    console.log("deleted webhook successfully");
    return data;
  }).catch((err) => {
    console.error("Error deleting webhook:", err);
  });
};

function sendMessage(channelID, message) {
  return fetch(`${BASE_URL}/channels/${channelID}/messages`, {
    "headers": {
      "authorization": token,
      "content-type": "application/json"
    },
    "body": JSON.stringify({
      "content": message
    }),
    "method": "POST"
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Network response was not ok while sending message");
    }
    return resp.json();
  }).then((data) => {
    console.log("sent message successfully");
    return data;
  }).catch((err) => {
    console.error("Error sending message:", err);
  })
}

function deleteMessage(messageID, channelID) {
  return fetch(`{BASE_URL}/channels/${channelID}/messages/${messageID}`, {
    "headers": {
      "authorization": token
    },
    "method": "DELETE"
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Network response was not ok while deleting message");
    }
    return resp.json();
  }).then((data) => {
    console.log("deleted message sucessfully");
    return data;
  }).catch((err) => {
    console.error(err);
  })
}

function createChannel(name, serverID, type=0, parentID=null) {
  return fetch(`${BASE_URL}/guilds/${serverID}/channels`, {
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
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("response not ok")
    }
    return resp.json();
  }).then((data) => {
    console.log("created channel successfully")
    return data;
  }).catch((err) => {
    console.error(err);
  })
}

function deleteChannel(channelID) {
  return fetch(`${BASE_URL}/channels/${channelID}`, {
    "headers": {
      "authorization": token,
      "content-type": "application/json"
    },
    "body": null,
    "method": "DELETE"
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Network response was not ok while deleting channel");
    }
    return resp.json();
  }).then((data) => {
    console.log("deleted channel successfully");
    return data;
  }).catch((err) => {
    console.error(err);
  })
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