const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUsername, getRandomThoughtText } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const user = [];

  // // Loop 20 times -- add users to the users array
  // for (let i = 0; i < 20; i++) {
  //   // Get some random thought objects using a helper function that we imported from ./data
  //   const thoughts = getRandomThoughtText(20);

  //   const username = getRandomUsername();

  //   user.push({
  //       username,
  //       thoughts,
  //   });
  // }

  // // Add users to the collection and await the results
  // await User.collection.insertMany(user);

  // // Add thoughts to the collection and await the results
  // await Thought.collection.insertMany(user.map(user => ({
  //   thoughtName: 'Thought',
  //   user: user._id,
  // })));

  // Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});