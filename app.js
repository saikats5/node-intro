var fs = require('fs');
var url = require('url');

function onRequest(path, response){
/*     response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello World');
    response.end(); */
    fs.readFile(path, null, function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File not found');
        }else{
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
    handleRequest: function(request, response){
        response.writeHead(200, {"Content-Type": "text/html"});
        var path = url.parse(request.url).pathname;
        console.log("PATH",path);
        switch(path){
            case '/':
                onRequest('./index.html', response);
                break;
            case '/login':
                onRequest('./login.html', response);
                break; 
            default:
                response.writeHead(404);
                response.write('File not found');
                response.end();   
        }
    }
}