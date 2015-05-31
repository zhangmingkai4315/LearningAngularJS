var express=require("express");
var router=express.Router();
var mongoose=require('mongoose');
var User=require('../../model/Users');

router.get('/profile',function(req,res,next){
    //此处应该查询redis的会话管理库来保证会话有效性
    if(req.query.token){
        //查看token绑定的用户名 此处是直接使用了mongodb的_id
        User.findOne({'_id':req.query.token},function(err,docs){
            if(err){
                res.status(500).send("ServerErro");
            }else{
                res.status(200).send(200,docs);
            }
        });

    }else{
        res.status(403).send("UnAuth");
    }
});
router.put('/profile',function(req,res){
    if(req.query.token){
        //查看token绑定的用户名 此处是直接使用了mongodb的_id
        //User.findOne({'_id':req.query.token},function(err,docs){
        //    if(err){
        //        res.status(500).send("ServerErro");
        //    }else{
        //        res.status(200).send(200,docs);
        //    }
        //});
        res.send("UpdateFinish");

    }else{
        res.status(403).send("UnAuth");
    }

});


router.get('/photosList',function(req,res){
    var photosList=["/image/photos/lucy.jpg","/image/photos/steve.jpg"];
    res.send(photosList);
});



module.exports=router;