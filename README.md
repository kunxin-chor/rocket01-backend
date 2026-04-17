# rocket01-backend

## Dependencies

1. Express: it's a HTTP framework for writing backend with NodeJS
2. Express has lots of middlewares ('plugins') - `cors` is one of them and it
   allows to enable CORS (cross origin resources sharing)

## Create a new NodeJS application

1. `npm init -y`
2.  A NodeJS application is a folder with a `package.json` inside
3. Run: `npm install express cors`
4. Express and CORS are packages in `NodeJS`.

## For Express to send back an entire file.

1. `npm install ejs`

## To use environment files in your project

1. In the terminal: `npm install dotenv`
2. At the top of `index.js`, add `require('dotenv').config()`
3. Add your API key to `.env` file]

## Converting from `axios.request(config)` to  `axios.get`

```
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://fr24api.flightradar24.com/api/live/flight-positions/full?bounds=50.682,46.218,14.422,22.243',
  headers: {
       'Accept': 'application/json',
    'Accept-Version': 'v1',
    'Authorization': 'Bearer <token>'
  }
};

const response = await
axios.get('https://fr24api.flightradar24.com/api/live/flight-positions/full', {
   maxBodyLength: Infinity
   params: {
      bounds:"50.682,46.218,14.422,22.243"    
   },
   headers: {
      'Accept': 'application/json',
    'Accept-Version': 'v1',
    'Authorization': 'Bearer ' + process.env.TOKEN
   }
});
```