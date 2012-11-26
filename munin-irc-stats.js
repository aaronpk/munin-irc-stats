#!/usr/local/bin/node

process.chdir(__dirname);

if(process.argv[2] == 'config') {
  console.log("graph_category irc");
  console.log("graph_title ircd status");
  console.log("graph_order clients channels");
  console.log("graph_args -l 0");
  console.log("clients.label clients");
  console.log("clients.draw LINE2");
  console.log("channels.label channels");
  console.log("channels.draw LINE2");

  process.exit();
} 

var irc = require('irc');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync("config.json", 'utf8'));

var options = {
  userName: config.username,
  port: config.port,
  channels: []
};
if(config.serverPassword) {
  options.password = config.serverPassword;
}

var client = new irc.Client(config.server, config.nick, options);

var collected = [];

client.on('raw', function(msg){
  var line;

  line = msg.args.join(' ');
  // console.log(line);

  if(match=line.match(/There are (\d+) users and (\d+) invisible on (\d+) servers/)) {
    console.log("clients.value " + (parseInt(match[1])+parseInt(match[2])));
    collected.push('clients');
  }
  if(match=line.match(/(\d+) channels formed/)) {
    console.log("channels.value " + match[1]);
    collected.push('channels');
  }

  if(collected.length == 2) {
    process.exit();
  }
});

// Trap errors
client.on('error', function(error){
  console.log(error);
});

// Kill the connection after a few seconds to prevent timeout errors
setTimeout(function(){
  client.disconnect();
}, 4000);

