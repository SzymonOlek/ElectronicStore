'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors');

exports.list_all_actors = function(req, res) {
    Actor.find({}, function(err, actors) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(actors);
        }
    });
};

exports.create_an_actor = function(req, res) {
    var new_actor = new Actor(req.body);
    new_actor.save(function(err, actor) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(actor);
        }
    });
};

exports.read_an_actor = function(req, res) {
    Actor.findById(req.params.actorId, function(err, actor) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
};

exports.update_an_actor = function(req, res) {
    Actor.findOneAndUpdate({_id: req.params.actorId}, req.body, {new: true}, function(err, actor) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(actor);
        }
    });
};

exports.delete_an_actor = function(req, res) {
    Actor.deleteOne({_id: req.params.actorId}, function(err, actor) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Actor successfully deleted' });
        }
    });
};