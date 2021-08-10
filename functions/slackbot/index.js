"use strict"
/*
1. request module deprecation
2. var vs let
3. const vs strings
4. async/await*/
const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
var request = require('request');
const app = express();
app.use(express.json());

app.post("/slack", (req, res) => {

    const catalystApp = catalyst.initialize(req);
	/*res.send({
		"message":req.body.challenge
	})*/
	var msg_txt = String(JSON.stringify(req.body.event.blocks[0].elements[0].elements[0].text));
	Catalyst_connector(catalystApp, msg_txt);

});

function Catalyst_connector(catalystapp, msg_text){
	var connector = catalystapp.connection({
 	ConnectorName: {
   			client_id: '{{CLIENT_ID}}',
   			client_secret: '{{CLIENT_SECRET}}',
   			auth_url: 'https://accounts.zoho.com/oauth/v2/token',
   			refresh_url: 'https://accounts.zoho.com/oauth/v2/token',
   			refresh_token: '{{REFRESH_TOKEN}}'
  					}
 	}).getConnector('ConnectorName');
 	connector.getAccessToken().then((accessToken) => {
		//sentiment analysis API
		console.log("accesstoken"+accessToken)
  		sentiment_analysis(accessToken, msg_text)
	});
}

function sentiment_analysis (accessToken,msg_text){

 	var document_json = {"document" : "["+msg_text+"]"}
  	console.log("body:"+JSON.stringify(document_json))
	var options = {
  					'method': 'POST',
  					'url': 'https://api.catalyst.zoho.com/baas/v1/project/5407000000626170/ml/text-analytics/sentiment-analysis',
  					'headers': {
    				'Authorization': 'Zoho-oauthtoken '+accessToken,
    				'Content-Type': 'application/json'
  				},body:  JSON.stringify(document_json)
				  };

 	request(options, function (error, response) {
  		if (error) throw new Error(error);
  	//	if(response.body.data[0].sentiment_prediction.document_sentiment=="Negative" && response.body.data[0].sentiment_prediction.document_sentiment.overall_score>0.70){
    		push_to_desk(msg_text);
  	//	}
   });
}
function push_to_desk(msg_text){
	var options = {
 					 'method': 'POST',
  					 'url': 'https://zylkertech.zendesk.com/api/v2/tickets.json',
  					'headers': {
    							'Content-Type': 'application/json',
   								 'Authorization': 'Basic {{token}}'
     							},
  					body: JSON.stringify({"ticket":{"subject":"Ticket from Slack","comment":{"body":msg_text}}})

					};

	request(options, function (error, response) {
  		if (error) throw new Error(error);
  		console.log(response.body);
	});
}
module.exports = app;
