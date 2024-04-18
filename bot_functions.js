function $exec(content) {
    exec(content, (error, stdout, stderr) => {
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
}

function $rng(content) {
    const parts = content.match(/\d+/g);
    if (parts && parts.length == 2) {
    const min = parseInt(parts[0]);
    const max = parseInt(parts[1]);
        if (!isNaN(min) && !isNaN(max)) {
            message.channel.send(`${Math.floor(Math.random() * (max - min + 1)) + min}`);
        } else {
            message.channel.send("Invalid range. Please provide two valid numbers.");
        }
    } else {
        message.channel.send("Invalid input format. Please provide a range in the format 'min, max'.");
    }
}

module.exports = [
    $exec,
    $rng
]