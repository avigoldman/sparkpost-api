import { HTTP } from 'meteor/http'

var sparky = function() {
	this.options = {
		apiKey: null,
		origin: 'https://api.sparkpost.com:443',
		apiVersion: 'v1',
		headers: {
			"Content-Type: application/json"
		}
	};
};

sparky.prototype._buildURL = function(data) {
	// accept the path as either string or array
	var path = Array.isArray(data.path) ? data.path.join('/') : data.path;
	
	var params = "";
	for (var key in data.params) {
	    if (paramsString !== "") {
	        paramsString += "&";
	    }

	    // if param value is array make it a string
	    var value = Array.isArray(data.params[key]) ? data.params[key].join(',') : data.params[key];

	    params += key + "=" + encodeURIComponent(value);
	}
	
	return this.origin + "/" + this.apiVersion + "/" + endpoint + "/" + path + (data.params.length > 0 ? "?" + params : '');
};


sparky.prototype.request = function(method, endpoint, data, callback) {
	method = method.toUppercase();

	// override callback if data is a function
	if (typeof data === "function") {
		callback = data;
		data = {};
	}

	// setup url
	var urlData = {
		endpoint: endpoint,
		path: data.path || data.id,
		params: data.params
	};

	// setup header
	var headers = this.options.headers;
	headers['Authorization'] = this.options.apiKey;


	HTTP.call(
		method,
		this._buildURL(urlData),
		{
			data: data.data,
			headers: headers
		},
		callback);
};

sparky.prototype.post = function(endpoint, data, callback) {
	this.request('POST', endpoint, data, callback);
};

sparky.prototype.put = function(endpoint, data, callback) {
	this.request('PUT', endpoint, data, callback);
};

sparky.prototype.get = function(endpoint, data, callback) {
	this.request('GET', endpoint, data, callback);
};

sparky.prototype.delete = function(endpoint, data, callback) {
	this.request('DELETE', endpoint, data, callback);
};

export var Sparkpost = sparky;
