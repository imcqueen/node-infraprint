/* Copyright 2013 Iain McQueen, see LICENSE */
"use strict";

var https = require('https');
var querystring = require('querystring');

function setup_response_handler(req, callback) {
    if (typeof callback !== "function") {
        //console.log("missing callback");
        return;
    }
    req.on('response',
        function(res) {
            var response = '';
            res.setEncoding('utf8');
            res.on('data',
                function(chunk) {
                    response += chunk;
            });
            res.on('end',
                function() {
                    var err = 200 == res.statusCode ? null : res.statusCode;
                    try {
                        response = JSON.parse(response);
                    }
                    catch(e) {
                        err = 1;
                        response = { error : { message : "Invalid JSON from infraprint.com" } };
                    }
                    err && (err = { statusCode: err, response: response });
                    callback(err, response);
            });
        });
}

module.exports = function (api_key, options) {
    var defaults = options || {};

    var auth = 'Basic ' + new Buffer(api_key + ":").toString('base64');

    function _request(method, path, data, callback) {

        //console.log("data", typeof data, data);
		
		//based on current Infraprint API this is not necessary, but leaving it for the future
        // convert first level of deep data structures to foo[bar]=baz syntax
        Object.keys(data).forEach(function(key) {
            if (typeof data[key] === 'object' && data[key] !== null) {
                var o = data[key];
                delete data[key];
                Object.keys(o).forEach(function(k) {
                    var new_key = key + "[" + k + "]";
                    data[new_key] = o[k];
                });
            }
        });

        var request_data = querystring.stringify(data);

        //console.log(method, "request for", path);
        //console.log("http request", request_data);

        var request_options = {
              host: 'api.infraprint.com',
              port: '443',
              path: path,
              method: method,
              headers: {
                  'Authorization': auth,
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': request_data.length
              }
          };

        var req = https.request(request_options);
        setup_response_handler(req, callback);
        req.write(request_data);
        req.end();
    }

    function post(path, data, callback) {
        _request('POST', path, data, callback);
    }

    function get(path, data, callback) {
        _request('GET', path, data, callback);
    }

    function del(path, data, callback) {
        _request('DELETE', path, data, callback);
    }

    return {
		addresses:{
			create: function(data,cb){
				post("/v1/addresses",data,cb);
			},
			retrieve: function(address_id,cb){
                if(!(address_id && typeof address_id === 'string')) {
                    cb("address_id required");
                }				
				get("/v1/addresses/"+address_id,{},cb);
			},
			del: function(address_id,cb){
                if(!(address_id && typeof address_id === 'string')) {
                    cb("address_id required");
                }				
				del("/v1/addresses/"+address_id,{},cb);
			},
			list: function(data,cb){
				get("/v1/addresses",data,cb);
			}
		},
		objects:{
			create: function(data,cb){
				post("/v1/objects",data,cb);
			},
			retrieve: function(object_id, cb){
                if(!(object_id && typeof object_id === 'string')) {
                    cb("object_id required");
                }
				get("/v1/objects/"+object_id,{},cb);
			},
			del: function(object_id,cb){
                if(!(object_id && typeof object_id === 'string')) {
                    cb("object_id required");
                }
				del("/v1/objects/"+object_id,{},cb);
			},
			list: function(data,cb){
				get("/v1/objects",data,cb);
			}
		},
		print_jobs:{
			create: function(data,cb){
				post("/v1/jobs",data,cb);
			},
			retrieve: function(job_id,cb){
                if(!(job_id && typeof job_id === 'string')) {
                    cb("job_id required");
                }				
				get("/v1/jobs/"+job_id,{},cb);
			},
			list: function(data,cb){
				get("/v1/jobs",data,cb);
			}
		},
		paper_types:{
			list:function(cb){
				get("/v1/paper_types",{},cb);
			}
		},
		paper_sizes:{
			list:function(cb){
				get("/v1/paper_sizes",{},cb);
			}
		},
		packagings:{
			list:function(cb){
				get("/v1/packagings",{},cb);
			}
		},
		paper_colors:{
			list:function(cb){
				get("/v1/paper_colors",{},cb);
			}
		},
		services:{
			list:function(cb){
				get("/v1/services",{},cb);
			}
		}
    };
}
