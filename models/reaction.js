const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        ractionId: {
            type: Schema.Types.ObjectId,
            default: () => new SchemaTypeOptions.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query 
            // probably done on the route or controller
            format: unsure,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema