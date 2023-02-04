const mongoose = require('mongoose');

const { Schema } = mongoose;

const inventorySchema = new Schema({
    productId: {
        type: String,
    },
    quantity: {
        type: Number
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema, "tbl_inventory");
module.exports = Inventory;