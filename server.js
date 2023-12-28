const app = require('./app')

const port = process.env.PORT;

app.listen (port, () => {  /*listen need to be close after call app.js*/
    console.log(`MovieRate APP is listening on port ${port}!`)
    });