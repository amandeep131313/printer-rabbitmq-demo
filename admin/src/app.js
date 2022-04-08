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
    connection.createChannel((err1,channel)=>{
        if(err1){
            throw err1
        }
        app.use(cors({
            origin: ['http://localhost:3000']
        }))
        app.use(express.json());
        app.post('/api/printer',(req, res)=>{
            channel.sendToQueue('printer',Buffer.from(JSON.stringify(req.body)),{persistent:true})
            res.json({message: 'Information is Send Will Send Queue Soon'})
        })
        app.listen(8000,()=>{
            console.log('listening to port 8000')
        })
       
        process.on('beforeExit',()=>{
            console.log('closing');
            connection.close()
        })
    })
})

