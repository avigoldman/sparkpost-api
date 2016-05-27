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

sparky.prototype._buildURL = function(endpoint, segments, params) {
	var segmentsString = segments.join('/');
	
	var paramsString = "";
	for (var key in params) {
	    if (paramsString != "") {
	        paramsString += "&";
	    }
	    paramsString += key + "=" + encodeURIComponent(params[key]);
	}
	
	return this.origin + "/" + this.apiVersion + "/" + endpoint + "/" + segmentsString + (params.length > 0 ? "?" + paramsString : '');
};

sparky.prototype.request = function() {
	HTTP.call(method, this._buildURL(), [options], callback);
};


export var Sparkpost = sparky;
