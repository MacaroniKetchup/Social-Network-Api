const { Schema, model, VirtualType } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_lenght: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp 
            //on query probably done on the route or controller
            format: unsure,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJson: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = thoughtSchema