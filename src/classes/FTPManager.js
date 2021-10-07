let Client = require("ftp"); 
let path = require("path");
let fs = require("fs");
class FtpManager {
    constructor(host=process.env.FTP_HOST, port = process.env.FTP_PORT){
        this.client = new Client({
            host, port
        })

        this.connectionReady = false;
        this.connect()
    }


    download(file){
        this.client.get(file, function(error, stream){
            if (error) throw error;
            stream.pipe(fs.createWriteStream(path.join(process.env.FTP_DOWNLOAD_DIR, file)));
        })
    }

    upload(file){
        this.client.put(file, file, function(err){
            if(err) throw err;
        })
    }
    
    connect(){
        this.client.connect();

        this.client.on('ready', ()=>{
            this.connectionReady = true;
        })
    }
}


module.exports = FtpManager