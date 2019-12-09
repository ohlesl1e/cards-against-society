const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const router = express.Router();
const models = require('../models');

