const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Tweets = require('../models/Tweet');

router.get('/', async (req, res) => {
	res.json({Data: await Tweets.find()});
});

router.post('/', async (req, res) => {
	console.log("add")
	try{
		let newTweet = req.body.tweet;
		let tweet = new Tweets({tweetBody: newTweet});
		let savedData = await tweet.save();
		console.log(savedData);
		res.redirect('/tweets');
	}catch(err){
		console.log(err);
		res.status(400).json("Error while adding...");
	}
});

//Get a specific user
router.get('/:id', async (req, res) => {
	try{
		const tweet = await Tweets.findById(req.params.id);
		if(!tweet){
			res.status(400).json({msg:"404 - tweet not found"});
		}
		res.json(tweet);
	}catch(err){
		console.log(err);
		res.status(404).json("Error while getting the tweet 404");
	};

})

// delete a student
router.delete('/:id', async (req, res) => {
	try{
		const tweet = await Tweets.findByIdAndDelete(req.params.id);
		if(!tweet){
			res.status(400).json({msg:"404 - tweet not found"});
		}
		res.redirect("/tweets");
	}catch(err){
		console.log(err);
		res.status(404).json("Error while deleting the tweet 404");
	};
});

router.patch('/:id', async (req, res) => {
	try{
		const tweet = await Tweets.findByIdAndUpdate(req.params.id,  {tweetBody: req.body.newTweet});
		if(!tweet){
			res.status(400).json({msg:"404 - tweet not found"});
		}
		res.redirect("/tweets");
	}catch(err){
		console.log(err);
		res.status(404).json("Error while modifying the tweet 404");
	};
});

module.exports = router;