var http = require('http');
var url = require('url');

var port = process.env.PORT || 8080;
function start(route, render){
	http.createServer(function(request, response) {

		//routing
		var path = url.parse(request.url);
		
		var result = route(path, render);
		response.writeHead(result.code, {"Content-Type": result.type});
		response.write(result.data);
		response.end();
	}).listen(port);
	console.log("Server listening port: "+port);
}

exports.start = start;