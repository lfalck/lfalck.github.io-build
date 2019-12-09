---
title: Azure REST API Postman collections for integration
published: true
description: Azure REST API Postman collections for integration
tags: #azure #integration #postman #servicebus #eventhubs #azurestorage
date: '2018-04-09'
canonicalURL: 'azure-rest-apis-postman'
---

I like to use [Postman](https://getpostman.com) while developing and testing HTTP APIs and thought it would be nice to add support for other integration scenarios as well, so I have created Postman collections for Azure Service Bus, Event Hubs, Event Grid and Storage (blob storage and queues for now).

You can check them out on [GitHub](https://github.com/lfalck/AzureRestApiPostmanCollections) and continue reading if you are interested in the implementation details.

## Azure Service Bus and Event Hubs
To use the Azure Service Bus and Event Hubs REST APIs a SAS token needs to be included in the Authorization header of all operations. A SAS token grants time limited permissions to a particular Azure resource. Brent Stineman wrote [a great blog post](https://brentdacodemonkey.wordpress.com/2015/02/21/sas-its-just-another-token) with more details.

Examples how to generate SAS tokens can be found [here](https://docs.microsoft.com/en-us/rest/api/eventhub/generate-sas-token), and since Postman uses JavaScript as its scripting language the NodeJS part is what is interesting. Unfortunately, the example uses the `crypto` and `utf8` npm packages, and there is currently no way to use external libraries in Postman. However, Postman has a number of [built-in library modules](https://www.getpostman.com/docs/postman/scripts/postman_sandbox_api_reference) and `crypto-js` is the one that is useful in this case. 

This is the NodeJS example from the link above but rewritten to use `crypto-js`. I also lowered the lifetime of the token to one minute since we will regenerate it for each request.

```javascript
function createServiceBusOrEventHubsSASToken(resourceUri, sasKeyName, sasKey) {
    if (!resourceUri || !sasKeyName || !sasKey) {
        throw "Missing required parameter";
    }
    const encoded = encodeURIComponent(resourceUri);
    const now = new Date();
    const minute = 60;
    const ttl = Math.round(now.getTime() / 1000) + minute;
    const signature = encoded + '\n' + ttl;
    const hash = CryptoJS.HmacSHA256(signature, sasKey)
        .toString(CryptoJS.enc.Base64);
    return 'SharedAccessSignature sr=' + encoded + '&sig=' +
        encodeURIComponent(hash) + '&se=' + ttl + '&skn=' + sasKeyName;
}
```
This function is used in a collection level pre-request script which means it will run before every request in the collection. The parameters to the script are taken from collection variables and the resulting token is stored in another collection variable and used in in all requests.

## Azure Storage
Creating a collection for Azure storage was more straightforward since you have the ability to generate an account level SAS query string directly in the portal by going to a storage account in the Azure Portal and clicking **Shared access signature**. 

## Azure Event Grid
The only relevant action available for Azure Event Grid is to send events to custom Topics. Authentication is provided by a SAS key in a custom header called **aeg-sas-key**.

The body format looks like this:

```json
[{
  "id": "{{$guid}}",
  "eventType": "recordInserted",
  "subject": "myapp/messages",
  "eventTime": "{{currentTime}}",
  "data": {
    "message": "Hello World Event Grid!"
  },
  "dataVersion": "1.0"
}]
``` 
```{{$guid}}``` is a dynamic Postman variable which generates a GUID and ```{{currentTime}}``` is populated with a timestamp in a pre-request script.


That is all, have a good day!