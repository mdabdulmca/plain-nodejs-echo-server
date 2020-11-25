var http = require('http');
const querystring = require('querystring');

requestHandler = function (req, res) {

    var body = "";
    req.on("data", function (chunk) {
        body += chunk;
    });

    req.on("end", function(){
        res.writeHead(200, { "Content-Type": "text/html" });
        body = querystring.parse(body.toString('utf8'));
        
        res.write("<html>");
        res.write("<body>");
        res.write("<style>");
        res.write("table, th, td {");
        res.write("border: 1px solid black;");
        res.write("padding: 5px; }");
        res.write("table {");
        res.write("border-spacing: 15px; }");
        res.write("</style>");
        res.write("<table>");
        res.write("<tr>");
        res.write("<th>Body Param Name</th>");
        res.write("<th>Body Param Value</th>");
        res.write("</tr>");
        res.write("<tr>");

        for(var attributename in body){
            console.log(attributename+": "+ body[attributename]);
            res.write("<tr>");
            res.write("<td>" + attributename + "</th>");
            res.write("<td>" + body[attributename] + "</th>");
            res.write("</tr>");
        }
        
        res.write("</table>");
        res.write("</body>");
        res.end("</html>");
        
    });
}

var server = http.createServer();
server.on('request', requestHandler);
server.listen(7070);
