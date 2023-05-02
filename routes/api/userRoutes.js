const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
  } = require('../../controllers/userController');
  
  // /api/user GET all users and POST create a user
  router.route('/').get(getUser).post(createUser);
  
  // /api/user/:userId GET a user and PUT(update) and DELETE user by ID
  router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);
  
// /api/user/:userId/friends/:friendId POST and DELETE a friend by ID
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);
  
  module.exports = router;
  