const Discord= require('discord.js');
const token="NTg3NDc3NDQxMTY2MDQ5Mjgx.XP3JYg.8zKEU3ws-oTE0Fj29KmuJNKLDD0";
const cmd=require('./cmd_func.js');
const client=new Discord.Client();
const ytdl=require('ytdl-core');
const yt=require('youtube-node');

client.on('message', (msg)=>{
    if(msg.author == client.user)
    {
        return;
    }
    if(msg.content.startsWith("-")){
    var generalchannel = client.channels.get(msg.member.lastMessage.channel.id);
    var generalvoicechannel = client.channels.get(msg.member.voiceChannelID);
    var fullcommand=msg.content.substr(1);
    var split_cmd=fullcommand.split(" ");
    if(!generalvoicechannel)
    {
        generalchannel.send("join voice channel to command");
        return;
    }

    if(split_cmd[0] === "join")
    {
        cmd.join(generalvoicechannel,generalchannel);
    }
    if(split_cmd[0] === "server")
    {
        cmd.server(client,generalchannel);
    }
    if(split_cmd[0] === "play")
    {
        cmd.play(msg,generalvoicechannel,ytdl,yt);
    }
    if(split_cmd[0] === "disconnect")
    {
        if(!generalvoicechannel){
            generalchannel.send("join a voice channel to give commands");
        } else {
        generalvoicechannel.leave();
        }
    }
}
});

client.login(token);