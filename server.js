// Require our dependencies
var express = require('express')
var http = require('http')
var bodyParser=require('body-parser')

var app = express();
let port = process.env.PORT || 6790;
let host = process.env.HOST || '0.0.0.0';
const requireTree = require("require-tree");
const _ = require('lodash')
const { DialogflowApp } = require('actions-on-google');
//const Assistant = require('actions-on-google').ApiAiAssistant;
const conf = require('./conf/devConf.js')
const redis = require('redis');
let path = require("path");
app.use(bodyParser.json({ type: 'application/json' }));


const session = require('./models/session.js')

let runtime = {

}
runtime.response={}
runtime.conf = {}
runtime.apikey = '2d5a7a7ae2824ecc97fe33d2325f8850'

let routes ={
	GET:{},
	POST:{}
}

app.post('/',function(req,res){
   const assistant = new DialogflowApp({request: req, response: res});	

    let actionMap = new Map();
    let actionName = assistant.getIntent()
    console.log(actionName,'<----------')
    let p = '/handlers/'+actionName+'/'+actionName

    console.log(p)	
    let userId;
  
     console.log(req.method)
    	 routes[req.method][p](assistant)
	
  });


function initHandlers(functions, filename, path){
	functions.init(runtime);
	
	let fun = _.without(_.keys(functions), "init");
	let apiPath = path.substring(__dirname.length, path.length - 3);
	for(var i in fun){
		let p = apiPath + '/' + fun[i]
		if(!routes[functions[fun[i]].method]){
			routes[functions[fun[i]].method]={}
		}
		
		routes[functions[fun[i]].method][p] = functions[fun[i]].conf.handler
		
	}
}

function initModels(functions, filename, path){
        functions.init(runtime);
}

/*
function initDbs(){
	runtime.db={}
		
	 if (conf.redis) {
        console.log("Connecting to redis", conf.redis);

        runtime.db.redis = redis.createClient(conf.redis);
        runtime.db.redisMaster = redis.createClient(conf.redisMaster);
        init()
    }
	
}
*/


function init() {
    requireTree("./handlers/", {
        each: initHandlers
    });
    console.log(routes)

}

//initDbs();
init();

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

