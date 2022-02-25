const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get('/say',async (req,res) => {
        try{
        const keyword = req.query.keyword;
        let functionUrl = '';
        if(!req.query.keyword){
                functionUrl =  'https://2na50e946m.execute-api.us-east-1.amazonaws.com/my-function'
        }
        else{
                functionUrl = 'https://2na50e946m.execute-api.us-east-1.amazonaws.com/my-function?keyword=' + keyword
        }

       await axios({ method: 'get',
                url: functionUrl
       }).then( function(result) {
               res.status(200).send(result.data);
       })
}
catch (error) {
        res.status(400).send(error.message);
}
} );
module.exports = router;