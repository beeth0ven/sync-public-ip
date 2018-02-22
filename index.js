require('dotenv').config({path: __dirname + '/server/.env'});
require('babel-register');
require('babel-polyfill');
require('./server');