const router = require('express').Router();
// Import of api routes 
const apiRoutes = require('./api');
// adds '/api' to all api routes in the search query
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
