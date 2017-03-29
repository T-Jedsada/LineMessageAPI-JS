var express = require('express')
var linebot = require('linebot');
var app = express()
var bot_port = 3004
var express_port = 3005

var bot = linebot({
	channelId: "1507921090",
	channelSecret: "3ba5cf55ace8c48f1903bb46ac80a7d5",
	channelAccessToken: "9bZKkxvQL8Mp5AZdztBF1fUx5tFgZKHvpOVieLN7+MCDaK5ivTZmYqPUwOog8jXb5Qi2B71icAb0DSw5TBx3NqtCJfYMttVfYKL4atrbNsYjVLsAgOdm/yBUl4PkXTUjAHY5GzgVeNR/Y1kQhwnS8gdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function (event) {
	event.reply(event.message.text).then(function (data) {
		// success
		console.log(data)
	}).catch(function (error) {
		// error
		console.log(error)
	});
});


bot.listen('/linewebhook', bot_port,function(){
	console.log('Bot listening on port! '+bot_port)
});

const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);

app.listen(express_port, function () {
  console.log('Express listening on port! '+express_port)
})