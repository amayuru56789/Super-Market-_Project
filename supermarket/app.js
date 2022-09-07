const express = require('express');
const app = express();

const port = 4000;

// if we use json obejct inside our app.js
app.use(express.json());

app.get('/', (req, res) => {
    console.log('get request comming!');
    res.send('get req came for / route')
})

app.post('/', (req, res) => {
    res.send('<h2>post request came for / route</h2>')
})

app.get('/customer', (req, res) => {
    console.log('customer get come');
    res.send('<h1>Customer get req came</h1>')
})

app.post('/customer', (req, res) => {
    res.send('customer post req came')
})

// app.get('/', (req, res) => {
//     console.log('Get Request has come')
//     res.send('Hello KITT!')
// })

// app.get('/customer', (req, res) => {
//     console.log(req.body)
//     res.send('Hello Customer')
// })

// app.get('/customer/:id', (req, res) => {
//     console.log(req.params);
// })

// app.get('/customer', (req, res) => {
//     console.log(req.params.id);
// })

app.listen(port, (req, res) => {
    console.log(`Express app listening on port ${port}`);
})