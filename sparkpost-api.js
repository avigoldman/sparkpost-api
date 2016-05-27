var sparky = function() {
	this._options: {
		apiKey: null,
		origin: 'https://api.sparkpost.com:443',
		apiVersion: 'v1',
		headers: {
			"Content-Type: application/json"
		}
	};
};

export var Sparkpost = sparky;
