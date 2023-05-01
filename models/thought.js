const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// reactionSchema added to thought model since reacts are imbedded in thoughts, eliminates the need for a seperate reactions model file
const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use a getter method to format the timestamp using moment
        get: createdAt => moment(createdAt).format('MM DD, YYYY [at] hh:mm:a')
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
            min_length: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp using moment
            get: createdAt => moment(createdAt).format('MM DD, YYYY [at] hh:mm:a')

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create thought model
const Thought = model('thought', thoughtSchema);
// export of model
module.exports = Thought