const express = require('express')
const app = express()
const port = 5000

// app.use('/user', require('./routes/user.js'));
app.use('/api/users', require('./routes/user'));

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//     res.send('hello world')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})