const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const db = require('../configs/db.configs')

const connection = mysql.createConnection(db.database)

connection.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
        var userTableQuery = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))"
        connection.query(userTableQuery, function (err, result) {
            if (err) throw err;
            // console.log(result);
            if (result.warningCount === 0) {
                console.log("Customer table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    res.send('customer get')
})

// router.get('/customer-name', (req, res) => {
//     res.send('customer-name request came')
// })

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('customer post')
})

router.put('/', (req, res) => {
    res.send('put method')
})

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.send('delete method')
})

router.get('/:id', (req, res) => {
    res.send('get customer by id')
})

module.exports = router