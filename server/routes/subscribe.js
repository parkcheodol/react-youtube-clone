
const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");


const { Subscriber } = require("../models/Subscriber");


//=================================
//             Subscribe
//=================================



// #11
router.post('/subscribeNumber', (req, res) => {
    
    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })
});

// #11 14:50
router.post('/subscribed', (req, res) => {
    
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            let result = false
            if(subscribe.length !== 0){
                result = true
            }
            res.status(200).json({ success: true, subscirbed: result })


        })
});



module.exports = router;
