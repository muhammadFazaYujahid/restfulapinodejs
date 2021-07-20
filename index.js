const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

// database connection
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'restful_db'
});

// connect database
conn.connect((err) => {
	if (err) throw err;
	console.log('Mysql Connected...');
});

// show all products
app.get('/api/products', (req, res) => {
	let sql = "SELECT * FROM product";
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// show single products
app.get('/api/products/:id', (req, res) => {
	let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// add new product
app.post('/api/products', (req, res) => {
	let data = { product_name: req.body.product_name, product_price: req.body.product_price };
	let sql = "INSERT INTO product SET ?";
	let query = conn.query(sql, data, (err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// update product
app.put('/api/products/:id', (req, res) => {
	let sql = "UPDATE product SET product_name='" +req.body.product_name+"', product_price='" +req.body.product_price+"' WHERE product_id="+req.params.id;
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// delete product
app.delete('/api/products/:id', (req, res) => {
	let sql = "DELETE FROM product WHERE product_id="+req.params.id;
	let query = conn.query(sql, (err, results) => {
		if (err) throw err;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// server listening
app.listen(3000, () => {
	console.log('server is running on localhost:3000');
});