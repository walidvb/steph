var fs = require('fs');

function route(url, render){
	var result = {
		data: 'error',
		type: 'text/plain',
		code : 200
	};
	var pathname = url.pathname;
	var prefix = pathname.split('/')[1];
	console.log("Routing " + pathname);
	try{
		switch(prefix)
		{
		//--------------ASSETS
		case 'js':
		case 'css':
		case 'lib':
			result = routeAsset(pathname, result);
			break;
		//--------------HTML FILES
		case '':
		case 'index':
		case 'home':
			result.data =render(fs.readFileSync('../app/index.haml'));
			result.type = 'text/html';
			console.error(e);
		return result;
		break;
		case 'admin':
		result.data = render(fs.readFileSync('../app/admin.haml'));
		result.type = 'text/html';
		break;
		default:
		result.data = '';
		break;
	}
}
catch(e){
	console.error(e);
	console.log('Route ' + pathname + 'not found');
	result.code = 404;
}

return result;
}

function routeAsset(pathname, result){
	var result = result || {};
		//fetch file
		result.data = fs.readFileSync("../app" + pathname);
		//set Content-type
		var fileExt = pathname.split('.');
		fileExt = fileExt[fileExt.length-1];
		switch(fileExt)
		{
			case 'js':
				result.type = 'text/javascript';	
				break;
			case 'css':
				result.type = 'text/css';
				break;
			case 'png':
			case 'jpeg':
			case 'jpg':
				result.type = 'image'
				break;
		}
		return result;
	}

	exports.route = route;