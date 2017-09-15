var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://takis:takis@ds135394.mlab.com:35394/takis',['klatses']);

//get all tasks
router.get('/tasks', function(req,res, next){
db.klatses.find(function(err,tasks){
    if(err){
        res.send(err);
    }
    res.json(tasks);
});
});

//get single task
router.get('/task/:id', function(req,res, next){
    db.klatses.findOne({_id:mongojs.ObjectID(req.params.id)},function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//post a task
router.post('/task',function (req,res,next) {
    var task= req.body;
    if(!task.title || task.isDone +'' )
    {
        res.status(400);
        res.json({
            "error":"Bad data"
        })
    }
    else
    {
        db.tasks.save(task,function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

//delete task
router.get('/task/:id', function(req,res, next){
    db.klatses.remove({_id:mongojs.ObjectID(req.params.id)},function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//update task
router.put('/task/:id', function(req,res, next){
    db.klatses.remove({_id:mongojs.ObjectID(req.params.id)},function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router;
