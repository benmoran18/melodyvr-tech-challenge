# melodyvr-tech-challenge
Technical challenge for MelodyVR

-- A simple url shortener api --

### Pre-requisites
* Node 8 or above
* NPM

After cloning the project, be sure to run:
```
npm i
```

### Terminal commands
All of the following commands should be used via terminal inside the root directory of the project.

Project configuration can be found in the config.json file in the root directory.

Run the project and watch for file changes
```
npm start
or
nodemon .
```
This will launch the project at http://localhost:9000 unless changed in the config file

Run the tests
```
npm test
```

Run linting rules
```
npm run lint
```

### Endpoints
**POST /shorten**

Creates a new short link for the specified uri.

BODY
```
{
    baseUrl: 'http://some_valid_url.com'
}
```

*SUCCESS EXAMPLE*
```
{
    "success": true,
    "url": "localhost:9000",
    "shortCode": "GM2YRt0jd"
}
```

*FAIL EXAMPLE*
```
{
    "success": false,
    "error": {
        "code": "CODE_INVALID_URI",
        "message": "the uri supplied is not valid"
    }
}
```


**GET /goto/:shortCode**

Redirects to the store uri and increases the number of visits on the link by 1.

*SUCCESS EXAMPLE*
You are redirected to the uri for the generated short link

*FAIL EXAMPLE*
```
{
    "success": false,
    "error": {
        "code": "CODE_INVALID_SHORT_CODE",
        "message": "invalid short code supplied"
    }
}
```

**GET /stats/:shortCode**

Retrieves the statistics for a code generated by the api.

*SUCCESS EXAMPLE*
```
{
    "success": true,
    "visits": 1,
    "shortCode": "PYdwj5tLG"
}
```

*FAIL EXAMPLE*
```
{
    "success": false,
    "error": {
        "code": "CODE_INVALID_SHORT_CODE",
        "message": "invalid short code supplied"
    }
}
```

### Further tasks (mainly for scaling and reliability)

1. Replace in-memory connection store with shared data storage (E.g. Redis, MYSQL, MongoDB)
2. Separate out communication layer using something like RabbitMQ
3. Integrate something like new relic for performance monitoring
4. Replace call to automated tests in pre-push hook with ci tool
