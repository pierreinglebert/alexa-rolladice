var APP_ID = undefined;

var AlexaSkill = require('./AlexaSkill');

var HelloWorld = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
RollADice.prototype.constructor = RollADice;

RollADice.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("RollADice onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
};

RollADice.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("RollADice onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the dice game, you can roll the dice";
    var repromptText = "You can roll the dice";
    response.ask(speechOutput, repromptText);
};

RollADice.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("RollADice onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
};

RollADice.prototype.intentHandlers = {
    "RollADiceIntent": function (intent, session, response) {
      var number = ~~(Math.random() * 6) + 1
      response.tellWithCard("You got a : "+number, "Dice", ""+number);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me to roll the dice");
    }
};

exports.handler = function (event, context) {
    var rollADice = new RollADice();
    rollADice.execute(event, context);
};
