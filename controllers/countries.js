var express = require('express');
var app = express();
var countryRouter = express.Router();
var CountryQuery = require('../client/db/countryQuery.js');
var query = new CountryQuery();




module.exports = countryRouter;