// const username = [
//   'Chewie',
//   'Leia',
//   'Han',
//   'Luke',
//   'Lando',
//   'Yoda',
//   'Obi-Wan',
//   'Vader',
//   'Palpatine',
//   'Boba'
// ];

// const thoughtText = [
//   'May the Force be with you!',
//   'I find your lack of faith disturbing.',
//   'Never tell me the odds!',
//   'Do. Or do not. There is no try.',
//   'The Force will be with you, always.',
//   'I love you. / I know.',
//   'You cant stop the change, any more than you can stop the suns from setting.',
//   'It is your destiny.',
//   'Ive been looking forward to this for a long time.',
//   'I am the best. No one can stop me!'
// ];

// Get a random item given an array
// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // Gets a random username
// const getRandomUsername = () =>
//   `${getRandomArrItem(username)}`;

// // Function to generate random thoughts that we can add to user object.
// const getRandomThoughtText = (int) => {
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       thoughtText: getRandomArrItem(thoughtText),
//     });
//   }
//   return results;
// };

// // Export the functions for use in seed.js
// module.exports = { getRandomUsername, getRandomThoughtText };