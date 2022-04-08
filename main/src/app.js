const express = require('express');
const cors = require('cors')
const app = express();
const amqp = require('amqplib/callback_api');
const fs = require('fs');
const path = require('path')

amqp.connect('amqps://jbqriwys:gG8jbljBdwwDB9CUGz2Qqd32pE-QZPvt@beaver.rmq.cloudamqp.com/jbqriwys',(err0,connection)=>{
    if(err0){
        throw err0
    }
    connection.createChannel( async(err1,channel)=>{
        if(err1){
            throw err1
        }
        await channel.assertQueue('printer',{durable:true})
       // await channel.prefetch(1)
        app.use(cors({
            origin: ['http://localhost:3000']
        }))
        app.use(express.json());
       
        app.listen(8001,()=>{
            console.log('listening to port 8001')
        })
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
       
        app.get('/api/printer',(req,res)=>{
            fs.readFile(path.join(__dirname,'../../db/test.json'), function (err, data) {
                if(err){
                    console.log('err',err);
                }else{
                    res.json(JSON.parse(data.toString().replace(/\\/g, '')))
                }
            })
        })
        
        process.on('beforeExit',()=>{
            console.log('closing');
            connection.close();
        })
    })
})
// app.use(cors({
//     origin: ['http://localhost:3000']
// }))
// app.use(express.json());
// app.get('/api/products',(req, res)=>{
//     res.json({message: 'Information is Send Will Send Queue Soon'})
// })
// app.listen(8001,()=>{
//     console.log('listening to port 8000')
// })
