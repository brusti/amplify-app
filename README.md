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

## Add amplify dependencies 
    npm install --save aws-amplify @aws-amplify/ui-angular
- in `src\app.module.ts` add `AmplifyAuthenticatorModule` to imports

## Create an API
    amplify add api
- select GraphQL with simple objects for now
- check `amplify/backend/api/amplifyapp/schema.graphql`
- add `@auth(rules: [{ allow: public }])` to the model
- you can test the api running `amplify console api`

## Connecting FE to BE
- create aws-exports.d.ts
    `declare const awsmobile: Record<string, any>
    export default awsmobile;`

- add this to main.ts to enable aws types
  `import { Amplify } from 'aws-amplify';
  import aws_exports from './aws-exports';
  Amplify.configure(aws_exports);`

- if aws_exports is not recognized, is because of ts strict mode, rename the file from js to ts

- in `tsconfig.app.json` include node to compiler options
  
  "compilerOptions": {
  "types" : ["node"]
  }
- it might be necessary to install `npm i -D @types/node`
- enable angular forms, in `app.module.ts` add `FormsModule, ReactiveFormsModule`

### Add polyfills
- get polyfills from git or
- create `src/polyfills.ts`
  `(window as any).global = window;
  (window as any).process = {
  env: { DEBUG: undefined },
  };`

- in `angular.json` add to polyfills `scr/polyfills.ts`
- in `tsconfig.app.json` to `files` add `scr/polyfills.ts`


### Generate todoList
    npx ng generate component todo
- just get the code from git or create a component that connects to the database using `API.service` subscribe to new added items and unsubscribe when the item is deleted

## Authentication
### Add cognito
    amplify add auth
- select default
- sign in with username
    
- `amplify push` to publish your changes
- check console for cognito

### Create login component
- add ui-angular dependency `npm i @aws-amplify/ui-angular`
- generate auth infrastructure `amplify add auth`
- push changes to aws `amplify add auth`
- check console `amplify add auth`
- import styles `@import '~@aws-amplify/ui-angular/theme.css';`
- wrap todolist component in https://ui.docs.amplify.aws/angular/connected-components/authenticator

## Hosting and deployment
- `amplify add hosting`
- select managed hosting
- in `angular.json`, increase budgets.maximumError to 2mb
- `amplify publish` 
- to deploy the application
- if deployment is failing `amplify configure project` select distribution to dist/amplify-app

## Clean environment
    amplify delete
    amplify push
    amplify publish
