const express = require('express');
const mongoose = require('mongoose');
const Inventory = require('./schema');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3030;

mongoose.connect('mongodb://0.0.0.0:27017/test2', {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", (err, res) => {
    console.log("Database Connected");
})
const app = express();
app.get('/', (req, res) => {
    res.send("Test")
})
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/*', (req, res, next) => {
    next();
})

app.post('/updateInventory', async function (req, res) {
    const productIdArray = req.body.productIds
        Inventory.updateMany({"productId":{$in : [...productIdArray]}},{ $set: {"quantity":req.body.quantity}}, (err, result) => {
            if (err) {
                res.status(400).json({"responsemessage":"failure","responseData":err})
            } else {
                res.status(200).json({"responsemessage":"success","responseData":result})
            }
        });
})

app.listen(port, () => {
    console.log("Server started on" + port);
})