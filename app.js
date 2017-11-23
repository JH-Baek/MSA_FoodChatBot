var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

// Some sections have been omitted

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '88945187-0731-44ca-a2f0-6f746fa7b681',
    appPassword: 'amfwwyLRHEE928?!nFV27$}'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {

    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});

// This line will call the function in your LuisDialo.js file
luis.startDialog(bot);