const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thought GET all thoughts and POST thought
router.route('/').get(getThought).post(createThought);

// /api/thought/:thoughtId GET one thought, PUT(update) and DELETE by ID
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thought/:thoughtId/reaction POST new Reacts
router
  .route('/:thoughtId/reaction')
  .post(createReaction);

// /api/thought/:thoughtId/reaction/:reactionId DELETE react by ID
router
  .route('/:thoughtId/reaction/:reactionId')
  .delete(deleteReaction);

module.exports = router;