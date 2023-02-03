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

app.post('/updateInventory', function (req, res) {
    if (req.body.operation === "add") {
        Inventory.create((req.body), (err, res) => {
            if (err) {
                res.send("Error", err)
            } else {
                res.send("Added", res)
            }
        });
    } else if (req.body.operation === "subtract" && req.body._id) {
        Inventory.findOneAndDelete({ "_id": mongoose.Types.ObjectId(req.body._id) }, { new: true }, (err, res) => {
            if (err) {
                res.send("Error", err)
            } else {
                res.send("Deleted", res)
            }
        });
    }
})

app.listen(port, () => {
    console.log("Server started on" + port);
})