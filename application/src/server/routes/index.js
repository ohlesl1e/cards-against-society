const express = require('express');

const router = express.Router();

router.use('/users', require('./users-router'));
/* GET home page. */

router.get('/api/', (req, res) => res.send({ title: 'Express' }));

module.exports = router;
