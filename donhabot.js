const Discord = require('discord.io');
const request = require('request');
const seed = require('seed-random');
const NanoTimer = require('nanotimer');

const prefix = "d?"
var auth = require('./auth.json');

let allowed_users = ['282299817323921408', '138347158385590272', '219816289617575937', '218804046218133504'];
let Eightball = ["Perhaps","Well Maybe", "Yes", "No", "Absolutely", "Not A Chance", "Most Likely", "Don't Count On It", "Chances Aren't Good", "Very Doubtful", "Very Likely", "Signs Point to Yes", "Unlikely", "Yes, Definitely"];

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
	bot.setPresence({
        game: {
            name: `${prefix}help | release 1.0.0`,
            type: '0', // type '2' is listenning to
            url: null // not setting a url
		}
	});
});

bot.on('message', (user, userID, channelID, message, event) => {

	if(message.startsWith(prefix)) {
		let cmds = message.slice(prefix.length).split(" ");
		if(cmds[0] == "8ball") {
			var args = cmds.slice(1).join(' ').toString();
			// console.log(args);
			if(args == "") {
				bot.sendMessage({
					to:channelID,
					message:"<:error:444107855822454786> no sentence!"
				}, (err, res) => {
					if(err) {
						throw err;
					}
					setTimeout(() => {
						bot.deleteMessage({
							channelID:channelID,
							messageID:res.id
						});
					}, 5000);
				})
			}
			else {
				bot.sendMessage({
					to:channelID,
					embed:{
						"description": "8ball prediction",
						"color": 0xFBD038,
						"timestamp": new Date(),
						"footer":{
							"icon_url": "",
							"text": "Donhabot"
						},
						fields: [
							{
								name:`${user}: ${args}`,
								value:`8ball: ${Eightball[Math.floor(Math.random()*Eightball.length)]}`
							}
						]
					}
				})
			}
		}
		else if(message.substring(2, 6).toLowerCase() == "echo") {
			let msg = cmds.slice(1).join(' ').toString();
			
			bot.sendMessage({
				to: channelID,
				message:msg
			});
		}
		else if(cmds[0] == "love") {
		if(event.d.mentions.length == 1) {
			if(userID != event.d.mentions[0].id)
			{
				seed(`${event.d.mentions[0].username}${userID}`, {global: true});
				var love = Math.round(Math.random()*100);
				bot.sendMessage({
					to:channelID,
					embed: {
						title: `How much you love ${event.d.mentions[0].username}?`,
						description:`your love for ${event.d.mentions[0].username} is ${love}/100`,
						color: 0x00b4fa,
						timestamp: new Date(),
						footer:{
							icon_url: "",
							text: "Donhabot"
						}
					} 
				})
			}
			else {
				bot.sendMessage({
					to:channelID,
					message:"you can't love yourself!"
				}, (err, res) => {
					if(err) {
						console.log(err);
						return;
					}
					setTimeout(() => {
						bot.deleteMessage({
							channelID:channelID,
							messageID:res.id
						});
					}, 10000);
				})
			}
		}
		else if(event.d.mentions.length == 0) {
			bot.sendMessage({
				to:channelID,
				message:"a @user is required"
			}, (err, res) => {
				if(err) {
					console.log(err);
					return;
				}
				setTimeout(() => {
					bot.deleteMessage({
						channelID:channelID,
						messageID:res.id
					});
				}, 5000);
			})
		}

		}
		else if(cmds[0] == "mc") {
			var args = message.substring(4).split(' ');
			var url = "https://api.mojang.com/users/profiles/minecraft/" + args[1];
			var result = "";
			request.get(url, (err, res, body) => {
				if(err) throw err
				else {
					body = JSON.parse(res.body);
					let id = body.id;
					let url2 = "https://api.mojang.com/user/profiles/" + id + "/names"
					request.get(url2, (err, res1, body) => {
						body = JSON.parse(res1.body);
						// console.log(body)
						let fields = [];
						for(val of body) {
							// console.log(val);
							if(val.hasOwnProperty('changedToAt')) {
								fields.push({
									name: `\`${val.name}\``,
									value: `${new Date(val.changedToAt).toDateString()}`,
									inline:true
								});
							}
							else {
								fields.push({
									name: `\`${val.name}\``,
									value: "First Username.",
									inline:true
								});
							}
						}
						bot.sendMessage({
								to: channelID,
								embed: {
									title: "All your minecraft username change",
									color: 0x00b4fa,
									fields: fields
								} 
							});
					});
				}
		});
	}
	else if(cmds[0] == "echo") {
		if(allowed_users.includes(userID)) {
			let msg = message.slice(prefix.length+cmds.length).split(' ').join(' ').toString();
				bot.sendMessage({
					to:'358344471240507405',
					message:msg
				}, (err, res) => {
					if(err) throw err;
				})
		}
		else {
			bot.sendMessage({
				to:channelID,
				message:"You don't have permission to use this command!"
			}, (err, res) => {
				if(err) {
					console.log(err);
					return;
				}
				setTimeout(() => {
					bot.deleteMessage({
						channelID:channelID,
						messageID:res.id
					});
				}, 5000);
			})
		}
	}

	}
});

bot.on('disconnect', (errMsg, code) => {
    if(errMsg) {
        console.log(errMsg);
    }
    console.log(code);
    bot.connect();
});