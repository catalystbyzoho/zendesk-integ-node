## Build a sentiment analysis microservice to automate generation of tickets in Zendesk.

**Step 1** : [Create an app](https://api.slack.com/apps) on Slack with events subscription

**Step 2**: Create an Advanced I/O function in your [Catalyst project](https://console.catalyst.zoho.com/) and use the function URL as target URL for events subscription

**Step 3** : Return the [challenge parameter](https://api.slack.com/apis/connections/events-api) in your code

**Step 4**: Add the appropriate scope in the Slack application

**Step 5**: Make a request to the [Catalyst Zia Sentiment Analysis API](https://www.zoho.com/catalyst/help/text-analytics.html)

Step 6: Check for negative comments and push the tickets to [Zendesk](https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/) using the tickets API
You can follow along by watching this video : https://www.youtube.com/watch?v=bN0FjxKBmaA
