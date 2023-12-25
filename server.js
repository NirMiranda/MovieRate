const app = require('./app')

const port = process.env.PORT;

app.listen (port, () => {
    console.log(`MovieRate APP is listening on port ${port}!`)
    });