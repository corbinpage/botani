'use strict';

const { getMessageFromSNS } = require('./utils');

const Path = require('path');
const fs = require('fs');
const Twit = require('twit');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const axios = require('axios');

async function sendTweet(params) {
	var T = new Twit({
	  consumer_key: process.env.TWITTER_CONSUMER_KEY,
	  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	  access_token: process.env.TWITTER_ACCESS_TOKEN,
	  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	})

	return T.post('statuses/update', params)
}

module.exports.start2 = async (event) => {
	let params = getMessageFromSNS(event)
	let response

  if(params.mediaUrl) {

  }

	console.log('Params')
	console.log(params)

	if(params.message && params.media_ids) {
		response = await sendTweet({
			status: params.message,
      media_ids: params.media_ids
    })
  } else if(params.message) {
    response = await sendTweet({
      status: params.message
    })
  }

	return responses
};


module.exports.start = async (event) => {
  


};




