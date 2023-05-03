const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
 // Get all thoughts
 async getThought(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a Thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a Thought
  async createThought (req, res) {
    try {
      const thought = await Thought.create(req.body)
      .then (({ _id }) => {
        return User.findOneAndUpdate(
          { _id: ReadableStreamBYOBRequest.body.userId },
          { $push: {thought: _id } },
          { new: true }
        );
      })
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.findOneAndDelete({ _id: { $in: thought.User } });
      res.json({ message: 'Thought and User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a Reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      )
      if (!thought) {
        res.status(404).json ({ message: 'No thought with that ID'});
      }
      res.json(thought);
    } catch(err) {
      res.status(500).json(err)
    }
  },
  // Delete a Reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true}
      )
      if (!thought) {
        res.status(404).json ({ message: 'No thought with that ID'});
      }
      res.json(thought);
    } catch(err) {
      res.status(500).json(err)
    }
  },
};