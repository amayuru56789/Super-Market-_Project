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
            // console.log(result); // 
            // console.log("table created");
            if (result.warningCount === 0) {
                console.log("Customer table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    // res.send('customer get')
    var query = "SELECT * FROM customers";
    connection.query(query, (err, rows) => {
        if (err) throw err

        res.send(rows)
    })
})

// router.get('/customer-name', (req, res) => {
//     res.send('customer-name request came')
// })

router.post('/', (req, res) => {
    // console.log(req.body);
    // res.send('customer post')

    const id = req.body.id
    const name = req.body.name
    const address = req.body.address

    var query = "INSERT INTO users (id, name, address) VALUES (?, ?, ?)";

    connection.query(query, [id, name, address], (err) => {
        if (err) {
            res.send({ 'message' : 'duplicate entry' })
        } else {
            res.send({ 'message' : 'customer created!' })
        }
    })

})

router.put('/', (req, res) => {
    // res.send('put method')
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address

    var query = "UPDATE users SET name=?, address=? WHERE id=?";

    connection.query(query, [name, address, id], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'customer updated'})
        } else {
            res.send({ 'message': 'customer not found' })
        }
        res.send(rows)
    })
})

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    res.send('delete method')
})

router.get('/:id', (req, res) => {
    res.send('get customer by id')
})

module.exports = router