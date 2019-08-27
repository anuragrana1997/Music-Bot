const Discord= require('discord.js');

module.exports.join = function(generalvoicechannel,generalchannel) {
    generalvoicechannel.join();
    generalchannel.send("hello i m connected");
}

module.exports.server =function(client,generalchannel)
{
    client.guilds.forEach((guild) => {
        var i=1;
        generalchannel.send("Server Name :-" + guild.name);
        guild.channels.forEach((chnl) => {
            generalchannel.send(i++ + chnl.name);
        })
    });
}

module.exports.play =function(msg,generalvoicechannel,ytdl,yt)
{
    generalvoicechannel.leave();
    var music_nm=msg.content.substring(6);
    const streamOptions = { seek : 0, volume : 1}
    generalvoicechannel.join().then(connection => {
        console.log("joined channel");
        var youTube = new yt();
        youTube.setKey("YOUR Key Here");
        youTube.search(music_nm, 1, function(error, result) {
            if (error) {
              console.log(error);
            }
            else {
                const stream=ytdl("https://www.youtube.com/watch?v="+result.items[0].id.videoId, {filter: 'audioonly'});
                const dispatcher=connection.playStream(stream, streamOptions);
                    dispatcher.on('end',end => {
                    console.log("left");
                    generalvoicechannel.leave();
                });
            }
          });
    });
}
