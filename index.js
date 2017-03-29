var express = require('express');
var linebot = require('linebot');
var app = express()
var bot_port = 5001
var Microgear = require('microgear');

var APPID = "20scoopsSmartHome";
var APPKEY = "9m6JZvFwYd42YWR";
var APPSECRET = "tRH075AnfqAi6Z2XY62TyDyjZ";
var topic = '/gearname/claw_machine';

var microgear = Microgear.create({
    key: APPKEY,
    secret: APPSECRET,
    alias: "claw_machine"
});

microgear.on('connected', function () {
    microgear.setAlias('claw_machine');
});

microgear.connect(APPID);

app.set('port', (process.env.PORT || 5000));

var bot = linebot({
	channelId: "1507921090",
	channelSecret: "3ba5cf55ace8c48f1903bb46ac80a7d5",
	channelAccessToken: "9bZKkxvQL8Mp5AZdztBF1fUx5tFgZKHvpOVieLN7+MCDaK5ivTZmYqPUwOog8jXb5Qi2B71icAb0DSw5TBx3NqtCJfYMttVfYKL4atrbNsYjVLsAgOdm/yBUl4PkXTUjAHY5GzgVeNR/Y1kQhwnS8gdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function (event) {
	console.log(event.message.text)
	var msg = event.message.text;
	if(event.message.tex.includes("on")) {
		microgear.publish(topic, "6");
		event.reply('Hello, world').then(function (data) {
				// success
			}).catch(function (error) {
				// error
			});
	}else if(msg.includes("off") || msg.includes("ปิด" )){
		microgear.publish(topic, "0");
		
	}else if(msg.includes("temp") || msg.includes("temperature")){
		microgear.publish(topic, "0");
		
	}else if(msg.includes("humi") || msg.includes("humidity")){
		microgear.publish(topic, "0");
		
	}
});

bot.listen('/linewebhook', bot_port,function(){
	console.log('Bot listening on port! '+bot_port)
});

const linebotParser = bot.parser();

app.post('/linewebhook', linebotParser);
app.get('/pond',function(req,res){
	return res.send('Pond');
});

var port = app.get('port')
app.listen(port, function () {
  console.log('Express listening on port! '+port)
});