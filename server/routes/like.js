
const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");


const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


//=================================
//        Like , Dislike
//=================================



// #19 9:00
router.post('/getLikes', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId}
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })
});


// #19 9:00
router.post('/getDislikes', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId }
    } else {
        variable = { commentId: req.body.commentId}
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })

});


// #20 3:00
router.post('/upLike', (req, res) => {

    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    // Like collection 에 클릭 정보 넣어줌
    const like = new Like(variable)

    like.save((err, likeResult) => {
        if (err) return res.json({ success : false, err })

        // Dislike 이 이미 클릭되어있다면, Dislike 를 1 down 해줌
        Dislike.findOneAndDelete(variable)
            .then((err, dislikeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
});

// #20 9:00
router.post('/unLike', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
    
});

// #20 12:30
router.post('/unDislike', (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
    
});

// #20 14:00
router.post('/upDislike', (req, res) => {

    let variable = {}

    if(req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    // Dislike collection 에 클릭 정보 넣어줌
    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });

        // Like 이 이미 클릭되어있다면, Like 를 1 down 해줌
        Like.findOneAndDelete(variable)
            .then((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })
    })
});


module.exports = router;
