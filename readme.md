1) First go to admin folder ,click on npm install npm start
2) Go to Main Folder click on npm install npm start
3) In the Admin App.js connected to rabiit MQ amqp.connect('amqps://jbqriwys:gG8jbljBdwwDB9CUGz2Qqd32pE-QZPvt@beaver.rmq.cloudamqp.com/jbqriwys'
4) created Queue  channel.sendToQueue('printer',Buffer.from(JSON.stringify(req.body)),{persistent:true}) in the app file
5) this queues will be consumed by Main/src/app.js
 channel.consume('printer',(msg)=>{
            
             fs.readFile(path.join(__dirname,'../../db/test.json'), function (err, data) {
                if(err){
                    console.log('err',err);
                }else{
                    console.log('data',data.toString());
                    let existingData = data !='' ? JSON.parse(data) : [];
                    console.log('existingData',existingData)
                    const msg1 = msg.content.toString();
                    console.log('msgq1',JSON.parse(msg1))
                    console.log('existingData',existingData)
                    existingData = [JSON.parse(msg1),...existingData]
                    console.log('existingData1',existingData)
                   
                    fs.writeFile(path.join(__dirname,'../../db/test.json'),JSON.stringify(existingData) , function (err) {
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                     });
                   
                }
            })
        },{noAck: true})

6) This will write the content in file db/test.json
7) In MyPrinter We have webapplication
where app.js I am calling api for post (http://localhost:8000/api/printer) this will return api response
immediately and return result and there is get api http://localhost:8001/api/printer
will show current queue data. 

    
