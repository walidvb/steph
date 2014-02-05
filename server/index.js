var server = require("./server");
var router = require('./router');
var haml = require('hamljs');

server.start(router.route, haml.render);