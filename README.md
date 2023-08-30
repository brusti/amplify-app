# AmplifyApp

## Prerequisites
    Node.js v14.x or later
    npm v6.14.4 or later

## Create AWS account
https://portal.aws.amazon.com/billing/signup

Install AWS CLI

    winget install -e --id Amazon.AWSCLI

Install aws-sdk for js

    npm install aws-sdk

## Amplify CLI

### Installation
    npm install -g @aws-amplify/cli

### Setting up the account

1. amplify configure
2. select region (recommend eu-central-1)
3. DON'T PROVIDE AWS MANAGEMENT CONSOLE
4. Attach policies AdministratorAccess-Amplify
5. Check user security credentials
6. Create access key
7. Download .csv with the secret and the key
8. Go back to terminal and add the accessKeyId

## Create new angular app
    npx -p @angular/cli ng new amplify-app

## Initialize amplify backend
    amplify init
- go with the default settings
- select to auth using aws profiles
- check console to see what was created
- check amplify folder
- check amplify project in aws config
