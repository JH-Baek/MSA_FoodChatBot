var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/cbe1ebe3-efcf-4b2d-9a39-9eec4cdb27d9/url?iterationId=77c5e55c-bece-4db7-969e-06254e6580c5',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': '276ff48006a24c9e803072f4783da479'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}