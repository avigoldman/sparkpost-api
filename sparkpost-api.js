import { HTTP } from 'meteor/http';

var Sparkpost = function(apiKey, options) {
	this.options = {
		apiKey: null,
		origin: 'https://api.sparkpost.com/api',
		apiVersion: 'v1',
		headers: {
			 'Accept': 'application/json'
		}
	};

	if (typeof apiKey === 'object') {
	    options = apiKey;
	}
	else {
	    options = options || {};
	    options.apiKey = apiKey;
	}

	// merge options with default options
	for (var key in options) {
        if (options.hasOwnProperty(key))
        	this.options[key] = options[key];
    }

	if(typeof this.options.apiKey === 'undefined') 
		throw new Meteor.Error('api-key-required', 'Client requires API Key');
};

Sparkpost.prototype._buildURL = function(data) {
	// accept the path as either string or array
	var path = (Array.isArray(data.path) ? data.path.join('/') : data.path) || '';
	
	data.params = data.params || {};
	var params = "";
	for (var key in data.params) {
	    if (paramsString !== "") {
	        paramsString += "&";
	    }

	    // if param value is array make it a string
	    var value = Array.isArray(data.params[key]) ? data.params[key].join(',') : data.params[key];

	    params += key + "=" + encodeURIComponent(value);
	}
	
	return this.options.origin + "/" + this.options.apiVersion + "/" + data.endpoint + "/" + path + (params.length > 0 ? "?" + params : '');
};

Sparkpost.prototype.request = function(method, endpoint, data, callback) {
	method = method.toUpperCase();

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
			data: data.data || {},
			headers: {
				'Authorization': '5705847ed881d1031ec0fce89ecdee4d13010ef7',
    			'Accept': 'application/json'
			}
		},
		callback);
};

Sparkpost.prototype.post = function(endpoint, data, callback) {
	this.request('POST', endpoint, data, callback);
};

Sparkpost.prototype.put = function(endpoint, data, callback) {
	this.request('PUT', endpoint, data, callback);
};

Sparkpost.prototype.get = function(endpoint, data, callback) {
	this.request('GET', endpoint, data, callback);
};

Sparkpost.prototype.delete = function(endpoint, data, callback) {
	this.request('DELETE', endpoint, data, callback);
};

export { Sparkpost };
