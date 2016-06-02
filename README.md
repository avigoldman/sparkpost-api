#### Just want to send email? Check out [sparkpost-mail](https://github.com/avrahamgoldman/sparkpost-mail)

# Meteor.js Client Library
#### A wrapper for the Sparkpost API
## What is Sparkpost?
tl;dr - Sparkpost sends up to 100k emails for you at no cost. It's easy to get started.

SparkPost, by Message Systems, offers companies of all sizes the same leading email platform trusted by the world’s largest email senders, without requiring them to install and manage their own email systems. It is available in two editions to meet the diverse email needs of companies of any size. SparkPost.com allows organizations to easily integrate pay-as-you-go email delivery into their web and mobile applications in minutes using a credit card.  -- Sparkpost Press Kit

## Get Started with Sparkpost
1. [Sign up](https://app.sparkpost.com/sign-up) for a sparkpost account
2. [Add](https://support.sparkpost.com/customer/en/portal/articles/1933318-creating-sending-domains) and [verify](https://support.sparkpost.com/customer/portal/articles/1933360-verify-sending-domains) a sending domain
3. [Configure API Key](https://app.sparkpost.com/onboarding/api) and make note of it

# Setup
### Install
Add this package using the following command
```bash
meteor add agoldman:sparkpost-api
```

# Documentation
## Initialization
#### new SparkPost(apiKey, options)
* `apiKey` 
    * Required: yes
    * Type: `String`
    * A Sparkpost API key with the permissions that you will need
* `options.origin`
    * Required: no
    * Type: `String`
    * The endpoint for the API calls
    * Default: `https://api.sparkpost.com/api`
* `options.apiVersion`
    * Required: no
    * Type: `String`
    * Default: `v1`
* `options.headers`
    * Required: no
    * Type: `Object`
    * The headers to be sent with all API calls
## Methods
#### request(method, endpoint, data, callback)
* `method`
    * Required: yes
    * Type: `String`
    * HTTP method for the request
* `endpoint`
    * Required: yes
    * Type: `String`
    * The Sparkpost API endpoint you want to hit
* `data`
    * Required: no
    * Type: `Object`
    * Data for request
        * `data.path` or `data.id`
            * Required: no
            * Type: `Array` or `String`
            * The path or id you want to hit in the specified endpoint
        * `data.params`
            * Required: no
            * Type: `Object`
            * Any parameters to put in the url for the request
        * `data.data` 
            * Required: no
            * Type: 'Object'
            * Any data to send in the body of the request
* `callback`
    * Required: no
    * Type: `function`
    * Standard `callback(error, res)`
        * `error` - An error if there is one
        * `res` - The response from the API
            * `res.statusCode` -  status code, or null on error.
            * `res.content` - the body of the response as a string
            * `res.data` - the body parsed to JSON
            * `res.headers` - the headers from the response

#### post | put | get | delete (endpoint, data, callback)
* passes all parameters into the request function 

 # Examples
 #### more examples can be found in the examples folder
```javascript
Meteor.startup(() => {
  var sparky = new Sparkpost('YOUR_API_KEY');
  sparky.post('transmissions', {
  	data: {
	  	recipients: [
	      {
	        address: {
	          email: "avi.goldman@sparkpost.com",
	        }
	      }
	    ],
	    content: {
	      from: {
	        email: "postmaster@<YOUR_SENDING_DOMAIN>"
	      },
	      subject: "Email Subject",
	      text: "Write your basic text message here!"
	    }
	}
}, function(error, res) {
  	if (error)
  	    console.log(error);
  	else
  	    console.log(res.content);
});
```


