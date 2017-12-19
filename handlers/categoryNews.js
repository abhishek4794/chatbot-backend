var db = {}
process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;
const request = require('request')
const http = require('../models/httpRequest.js')
const _ = require('lodash')
let counter = 0
let R;


let catMap = {
    "politics": 1,
    "sports": 2,
    "sci&tech": 3,
    "lifestyle": 4,
    "business": 5,
    "education": 6,
    "health": 8,
    "world": 9,
    "top stories": 10,
    "entertainment": 11,
    "most recent stories": 12,
    "bollywood": 13,
    "cricket": 14,
    "local news": 15
}


module.exports.categoryNews = {
    conf: {
        handler: categoryNews,
    },
    method: "POST"
};


module.exports.init = function(runtime) {
    R = runtime;
}

function categoryNews(assistant, accesstoken) {
    let catName = assistant.getArgument('categoryName').toLowerCase();

    let url = 'https://newsapi.org/v1/sources?language=en&category='+catName 
    let obj = {
        url: url,
        proxy: null,
	method:'GET',
    }

	
        
	http.request(obj, (err, body) => {
        
	if (err) {
            console.log(err,'<--- err')

        }

        try {


	catData = JSON.parse(body)
	
	console.log(catData.sources[0].description)	
	
	assistant.ask('<speak>Following are some News of ' + catName + '<break time="1s" />' +catData.sources[0].description + '</speak>');				

        } catch (e) {

            console.log(e)
        }

    })

}

