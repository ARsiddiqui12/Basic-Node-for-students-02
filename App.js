var http = require('http');
var fs = require('fs');
var nodemailer = require('nodemailer');
var fromidabel = require('formidable');
var form = require('./Form');
var config = require('./Config');

http.createServer(function(req,res){

    if(req.url=="/mailer")
    {
        var formx = fromidabel.IncomingForm();

        formx.parse(req,function(err,fields,files){

        var transporter =   nodemailer.createTransport({
            service: config.HOST,
            port:config.PORT,
            auth: {
              user: config.USER,
              pass: config.PASS
            }
        });

        let email = fields.email;
        let subject = fields.subject;
        let message = fields.message;

        var mailOption = {
            from: config.EMAIL,
            to: email,
            subject: subject,
            text: message
          };

          transporter.sendMail(mailOption,function(error,info){

            if (error) {
                console.log(error);
              } else {
                var msg = 'Email sent: ' + info.response;
                var log = "Email: "+email+", Subject: "+subject+", Message: "+message+" Date: "+ new Date();
                fs.appendFile('log.txt',log,function(err){

                    if(err) throw err;

                    console.log(err);

                });

                form.Form(req,res,msg);

              }

          });


        });
        
    

    }else{
  
        form.Form(req,res,"Send Email<br><br>");

    }



}).listen(3000);