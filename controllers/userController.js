const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of userss overall
// .count will count the total of users in the User array 
// model and give it a property 'userCount'
const headCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
  }

module.exports = {
 // Get all Users
 async getUser(req, res) {
    try {
      const user = await User.find();

      const userObj = {
        user,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('thought')
      .populate('friends')
      .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      res.json(user);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try{
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        {new: true }
        );
        if (!user) {
          return res.status(404).json({ message: 'No such user exists with this ID' });
        }
        res.json({ message: 'User successfully updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a user and remove thoughts from the user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thought = await Thought.deleteMany(
        { user: req.params.userId },
        { $pull: { user: req.params.userId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no Thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a Friend to a User
  async addFriend(req, res) {
    console.log('You are adding a Friend');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove Friend from a User
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId  } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  };