const express = require('express');
const router = express.Router();
const functionsPage = require('../services/functions');

/* Get functions*/

router.get('/', async function(req,res,next){
    try{
        res.json(await functionsPage.getMultiple(req.query.page));
    } catch (err){
        console.error(`Error while getting programming languages`,err.message);
        next(err);
    }

});
module.exports = router;