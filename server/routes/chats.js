var express = require('express');
var router = express.Router();
const Chat = require('../model/chat');

router.get('/', function(req, res) {
    Chat.find(function (err,response) {
        if (err) {
            res.status(400).json({'error':err});
        } else {
            res.status(200).json(response);
        }
    })
});

router.post('/', function(req,res) {
    let name = req.body.name;
    let chat = req.body.chat;
    try {
        const newChat = new Chat({'name':name,'chat':chat});
        newChat.save().then((dataCreated) => {
            res.status(201).json({success:true,message:'data have been added',data:dataCreated});
        })
    } catch (error) {
        res.status(400).json({success:false,'error':error.message});
    }
})

router.delete('/:idChat', function (req,res) {
    let id = req.params.idChat;
    Chat.findOneAndDelete({_id:id},function (err, response) {
        if (err) {
            res.status(400).json({success:false,message:err});
        } else {
            res.status(201).json({success:true,message:'data has been deleted',data:response});
        }
    })
})

module.exports = router;
