const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port = 5000;

app.use(express.json());
require('dotenv').config();

// app.use('/user', require('./routes/user.js'));
app.use('/api/users', require('./routes/user'));
app.use('/api/authentication', require('./routes/authentication'));
app.use('/api/meals', require('./routes/meal'));
app.use('/api/expenditure', require('./routes/expenditure'));
app.use('/api/show-user-state', require('./routes/process_bill'));

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//     res.send('hello world')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})