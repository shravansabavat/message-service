# message-service

> A simple message service to store messages sent by the client and store them in a file system. This service has the ability to list messages, get/delete a specific message.

## Getting Started

## Endpoints

### 1. getMessages

* URL
  * http://localhost:8081/message/list
* Method
  * GET
* Headers
  * Content-Type = application/json

#####Sample response
```bash
[
    {
        "input": "Sator Arepo Tenet Opera Rotas",
        "date": "Tuesday, March 1st, 2016, 9:49:39 PM",
        "palindrome": "Yes"
    },
    {
        "input": "This is not a palindrome",
        "date": "Tuesday, March 1st, 2016, 9:49:54 PM",
        "palindrome": "No"
    }
]
```

### 2. getMessageDetails

* URL
  * http://{host}:8081/message/{message}
* Method
  * GET
* Headers
  * Content-Type = application/json

#####Sample response
```bash
[
    {
        "input": "Sator Arepo Tenet Opera Rotas",
        "date": "Tuesday, March 1st, 2016, 9:49:39 PM",
        "palindrome": "Yes"
    }
]
```
### 3.saveMessage

* URL
  * http://{host}:8081/message/
* Method
  * POST
* Headers
  * Content-Type = application/json

#####Sample request body
```bash
  {
    "input": "here is a message"
  }
```
### 4. deleteMessage

* URL
  * http://{host}:8081/message/{message}
* Method
  * DELETE
* Headers
  * Content-Type = application/json

## Installation
1. Clone the repository
2. Install npm modules: `npm install`
4. Start up the server: `node server.js`
4. View in browser at http://localhost:8081

## Run Automation Tests
* As of now since the port number in webApp.js is 8081, automation tests are hardcoded to run on 8081 (Although this is not a best practice). If you change the port in webApp.js, please change the port in automation tests which are under {project root}/automation/routers.

```bash
> cd {project}/automation
> npm install
> ./runAutomation.sh
```

##Run unit tests
```bash
> cd {project}
> mocha app/test/ --recursive
```

##Run unit tests coverage
```bash
> cd {project}/app
> grunt coverage
```
####Unit test coverage
* Open file locate at {project}/app/coverage/index.html in chrome

![Alt text](images/test_coverage.png?raw=true "Test Coverage")
