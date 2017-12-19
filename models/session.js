var request = require('request');
let R;

module.exports.init = function(runtime) {
    R = runtime
}

module.exports.check = function(userId, cbAccessToken) {
		
	console.log(userId)	
        R.db.redis.hget(userId,'acesstoken', function(errRes, resRed) {
		console.log('response hget --->',resRed)
                if (resRed) {
                    cbAccessToken(resRed)
                } else {
                    var socialParams = {
                        "type": "skip",
                        "userDetails": {},
                        "skipId": ""
                    }

                    var socialRequestOptions = {
                        url: R.conf.baseUrl+'/apis/common/v1/sociallogin/sociallogin',
                        headers: {
                            'Content-Type': 'application/json',
                            'ua': {}
                        },
                        method: 'POST',
                        json: socialParams
                    }
		console.log(socialRequestOptions)
                    request(socialRequestOptions, function(err, res, body) {
                            //console.log(res,body)
                            if (!err && res.statusCode == 200) {
                                //var json = JSON.parse(body);
                                console.log(body.accessToken, '<--- social login resp')
                                R.db.redis.hset(userId,'accesstoken', body.accessToken)

                                var setUserParams = {
                                    "lang_ids": [1],
                                    "screen": "onboarding",
                                    "removed_language_ids": "0"
                                }

                                var setUserRequestOptions = {
                                    url: R.conf.baseUrl+ '/apis/news/v2.2/setusercatlang/set_user_cat_lang',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'ua': {},
                                        'os': 'android',
                                        'devicetype': 'smartphone',
                                        'ssotoken': body.accessToken
                                    },
                                    method: 'POST',
                                    json: setUserParams
                                }

                                request(setUserRequestOptions, function(errSetUser, resSetUser, bodySetUser) {
                                        console.log(bodySetUser)
                                        if (!err && res.statusCode == 200) {
                                            cbAccessToken(body.accessToken)
                                        }
                                })
                        }
                    })
            }
            //}
        })
    /*
    request(conf.playUrl + song.id, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            var json = JSON.parse(body);
            try {
                var url = json.result.url;
                url = url.replace("http://jiobeats.cdn.jio.com", "https://dev.media.jio.com");
                cbUrl(null, url);
            } catch (e) {
                console.log("exception ocurred in PlayAudio intent", e);
                cbUrl({
                    'code': 404,
                    'message': 'song url not found'
                }, null)
            }
        } else {
            //console.log('error in fetching url of search ', err, res.statusCode);
            cbUrl({
                'code': 404,
                'message': 'song url not found'
            }, null)
        }
    });*/
}

//module.exports.getSongUrl = getSongUrl;
