# Sample News-bot using Node.js and dialogFlow

This is a super simple Action, built using API.AI and Node.js, to generate a
news based on your input.

## Setup Instructions

### Pre-requisites
 1. API.AI account: [https://api.ai](https://api.ai)
 2. Google Cloud project: [https://console.cloud.google.com/project](https://console.cloud.google.com/project)

See the developer guide and release notes at [https://developers.google.com/actions/](https://developers.google.com/actions/) for more details.

### Steps for setting up bot on dialogflow.com 
 1. Create a new agent in API.AI [https://api.ai](https://api.ai).
 1. Click on the project gear icon to see the project settings.
 1. Select "Export and Import".
 1. Select "Restore from zip". Follow the directions to restore.
 1. Select the NewsBot.zip file in this repo.
 1. Deploy this action to your preferred hosting environment
 1. Set the "Fulfillment" webhook URL to the hosting URL.
 1. Make sure all domains are turned off.
 1. Enable Actions on Google in the Integrations.
 1. In the make_name intent, check "End Conversation" for Actions on Google.
 1. Provide an invocation name for the action.
 1. Authorize and preview the action in the [web simulator](https://developers.google.com/actions/tools/web-simulator).

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/samples/).

### Steps for setting up backend 
 1. Install Node.js and npm
 1. npm install 
 1. node server.js
 1. Install ngrok
 1. Run ./ngrok http {{http_port}}
 


