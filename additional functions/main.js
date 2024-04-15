const { token } = require("/home/cata/coding things/js things/node/discord bot/config.json")

function getWebhook(serverID) {
  return fetch(`https://discord.com/api/v9/guilds/${serverID}/webhooks`, {
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
    return data;
  })
  .catch((err) => {
    console.error("Error fetching webhook:", err);
    throw err;
  });
};

function createWebhook(name="Captain Hook", channelID) {
  return fetch(`https://discord.com/api/v9/channels/${channelID}/webhooks`, {
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
    return data;
  }).catch((err) => {
    console.error("Error creating webhook:", err);
    throw err;
  });
};

function deleteWebhook(webhookID) {
  return fetch(`https://discord.com/api/v9/webhooks/${webhookID}`, {
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
    return data;
  }).catch((err) => {
    console.error("Error deleting webhook:", err);
    throw err;
  });
};

function sendMessage(channelID, message) {
  return fetch(`https://discord.com/api/v9/channels/${channelID}/messages`, {
    "headers": {
      "authorization": token,
      "content-type": "application/json"
    },
    "body": {
      "content": message
    },
    "method": "POST"
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Network response was not ok while sending message");
    }
    return resp.json();
  }).then((data) => {
    return data;
  }).catch((err) => {
    console.error("Error sending message:", err);
    throw err;
  })
}

module.exports = {
  getWebhook,
  createWebhook,
  deleteWebhook,
  sendMessage
};