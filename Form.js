var fs= require('fs');

exports.Form = (req,res,Msg) =>{

    fs.readFile('index.html',function(err,data){

        res.writeHead(200,{'Content-Type': 'text/html'});
        
        res.write(Msg);

        res.end(data);
    
        });

};