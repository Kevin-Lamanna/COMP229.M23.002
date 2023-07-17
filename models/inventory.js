let mongoose = require('mongoose');

let inventoryModel = mongoose.Schema(
    {
        item: String,
        qty: Number,
        tags: [],
        status: String,
        size: {
            h: Number,
            w: Number,
            uom: String
        },
        // Adds relationship with User
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },

    {
        collection: "inventories"
    }
);

module.exports = mongoose.model("Inventory", inventoryModel);
