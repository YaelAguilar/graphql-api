const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphql/schema');
const {connectDB} = require('./db/db');

connectDB()
const app = express()

app.get('/', (req, res) => {
    res.send('ruta inicial')
})

app.use('/graphql', 
graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000)
console.log('server is running on port 3000')