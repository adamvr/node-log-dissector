# Dissector

A toolkit for dissecting information from logfiles.

## Example Usage

    var dissector = require('log-dissector').dissectors;
    
    var stream = fs.createReadStream('./my_s3.log', {flags: 'r', encoding: 'utf-8', autoClose: true}).on('readble', function() {
        self.read(0);
    });
    
    var apache = dissector['s3'];
    
    stream.on('data', function(data) {
        console.log(apache.dissect(data));
    });


## Log Dissectors included
- ssh invalid users
- ssh login
- ssh logout
- sudo failure
- sudo sucess
- Amazon S3 access logs
