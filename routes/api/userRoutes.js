const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    addThought,
    removeThought,
  } = require('../../controllers/userController');
  
  // /api/user
  router.route('/').get(getUser).post(createUser);
  
  // /api/user/:userId
  router.route('/:userId').get(getSingleUser).delete(deleteUser);
  
  // /api/user/:userId/thought
  router.route('/:userId/thought').post(addThought);
  
  // /api/user/:userId/thought/:thoughtId
  router.route('/:userId/thought/:thoughtId').delete(removeThought);
  
  module.exports = router;
  