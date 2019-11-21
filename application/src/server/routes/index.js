const express = require('express');

const router = express.Router();

router.use('/users', require('./users-router'));
router.use('/games', require('./game-router'));

router.get('/api/', (req, res) => res.send({ title: 'Express' }));

module.exports = router;
