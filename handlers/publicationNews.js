var db = {}
process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;
const http = require('../models/httpRequest.js')
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
    "local news": 15,
    "national": 58
}


module.exports.publicationNews = {
    conf: {
        handler: publicationNews,
    },
    method: "POST"
};


module.exports.init = function(runtime) {
    R = runtime;
}

function publicationNews(assistant, accesstoken) {
    let pubName = assistant.getArgument('publicationName')

    let sortBy = assistant.getArgument('sortBy') || undefined

    pubName = pubName.toLowerCase().split(" ").join("-")

    console.log('PubName --> ', pubName)
    let url = 'https://newsapi.org/v1/articles?source=' + pubName + '&apiKey=' + R.apikey

    if (sortBy) {
        url += 'sortBy=' + sortBy
    }

    let obj = {
        url: url,
        proxy: null,
        method: 'GET',
    }

    

    http.request(obj, (err, body) => {

        if (err) {
            console.log(err, '<--- err')

        }

        try {


            let pubData = JSON.parse(body)
		console.log(pubData)
            console.log(pubData.articles[0].title)
            assistant.ask('<speak>Following are some News of ' + pubName + '<break time="1s" />' + pubData.articles[0].title + '</speak>');

        } catch (e) {

            console.log(e, '<---- in catch')
            assistant.ask('<speak>Sorry there are no news for ' + pubName + ' Try some other publication</speak>');
        }

    })
}
