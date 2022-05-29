const Discord = require('discord.js');
const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const request = require('request');
require('dotenv').config()

const client = new Client();
const prefix = '!';

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

import { DISCORD_TOKEN, CHANNEL_ID } from './constants'

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", (member) => {
    // console.log(member);
	const channelId = "775100831590252557";

    const message = `Welcome <@${
      member.id
    }> to our server!`;

	const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
  });

  client.on('guildMemberRemove', member => {
	const channelId = "775100831590252557";

    const message = `Goodbye ${
		member.user.username
	  }`;

	const channel = member.guild.channels.cache.get(channelId);
    channel.send(message);
})

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'commands') {
		message.channel.send('\
I know the follwing commands\n\
!cat\n\
!urban <Search term>\n\
!catfact\n\
!meme\n\
!yomama\n\
!dadjoke\n\
!dog\n\
!geekjoke\n\
!swanson\n\
		');
	} 

	if (command === 'cat') {
		const { file } = await fetch('https://kong.durp.info/random-cats').then(response => response.json());

		message.channel.send(file);
	} 

    if (command === 'urban') {
		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://kong.durp.info/urban-dictionary/v0/define?${query}`).then(response => response.json());

		if (!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
			);
		message.channel.send(embed);
	}

    if (command === 'catfact') {

		request({
            url:"https://kong.durp.info/cat-facts/fact",
            json: true
        }, (err, response, body) => {
            message.channel.send(body.fact);
        });
	}

	if (command === 'meme') {
		request({
            url:"https://kong.durp.info/random-meme",
            json: true
        }, (err, response, body) => {
            message.channel.send(body.url);
        });
	} 

	if (command === 'yomama') {
		request({
            url:"https://kong.durp.info/yomama",
            json: true
        }, (err, response, body) => {
            message.channel.send(body.joke);
        });
	} 

	if (command === 'dadjoke') {
		request({
            url:"https://kong.durp.info/dadjoke",
            json:true
        }, (err, response, body) => {
            message.channel.send(body.joke);
        });
	} 

	if (command === 'dog') {
		request({
            url:"https://kong.durp.info/random-dogs",
            json: true
        }, (err, response, body) => {
            message.channel.send(body.message);
        });
	} 

	if (command === 'geekjoke') {
		request({
            url:"https://kong.durp.info/geekjoke",
            json:true
        }, (err, response, body) => {
            message.channel.send(body);
        });
	} 

	if (command === 'swanson') {
		request({
            url:"https://kong.durp.info/ronswanson",
            json:true
        }, (err, response, body) => {
            message.channel.send(body);
        });
	} 

	if (command === 'jinglebells') {

		request({
            url:"https://kong.durp.info/foaas/jinglebells/durp",
            json:true
        }, (err, response, body) => {
            message.channel.send(body.message);
        });
	} 

	if (command === 'nugget') {

		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		request({
            url:'https://kong.durp.info/foaas/nugget/' + args + '/durp',
            json:true
        }, (err, response, body) => {
            message.channel.send(body.message);
        });
	} 

	if (command === 'rockstar') {

		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		request({
            url:'https://kong.durp.info/foaas/rockstar/' + args + '/durp',
            json:true
        }, (err, response, body) => {
            message.channel.send(body.message);
        });
	} 

	if (command === 'because') {

		request({
            url:"https://kong.durp.info/foaas/because/durp",
            json:true
        }, (err, response, body) => {
            message.channel.send(body.message);
        });
	} 

});

client.login(DISCORD_TOKEN);