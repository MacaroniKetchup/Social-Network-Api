const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought');

// email validation function
var validateEmail = function(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

// Schema to create user model

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            max_length: 50,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [thoughtSchema],
        // Friends Array self-referencing the User model
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            // Might need this not sure, friendsCount might need to be set up in
            // userController.js
            // userSchema
            // .virtual('friendsCount')
            // .get(function () {
            //     return `${this._id} ${this.username}`;
            // })
            // .set(function (v) {
            //     const _id = v.split(' ')[0];
            //     const username = v.split(' ')[1];
            //     this.set({ _id, username });
            // })
        ],
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;