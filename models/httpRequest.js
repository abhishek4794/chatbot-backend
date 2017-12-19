var request = require('request');
let R;

module.exports.init = function(runtime) {
    R = runtime
}

module.exports.request = function(options, callback) {
	if(!options.headers) {
		options.headers = {}
	}
	options.headers.ua = {};
        options.headers.devicetype = "s";
        options.headers.os = "android";
	options.headers.appkey = "appkey";
	//console.log('In http options ************** ', options);
	try {
	request(options, (err, response, body) => {
	//	console.log('In http module ', err, body);
		if(err || !body) {
			var body = {};
			body.statusCode = response.statusCode;
			callback(err, body);
		} else {
			var jsonData = body
			//var jsonData = JSON.parse(body);
			jsonData.statusCode = response.statusCode;
			callback(null, jsonData);
		}
	});
	} catch(e) {
		console.log('In catch of httpRequest ', e);
		callback(e, null);
	}
}
