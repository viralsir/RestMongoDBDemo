var express = require('express');
var router = express.Router();
var {insertQuery,update,removedata,finde,findfilter} = require('../DBMongo/DBDemo')
const database_name="Demo"
const collection_name='Student'


/* GET users listing. */
router.get('/', async function (req, res, next) {


     let output=await finde(database_name,collection_name);
     if(output!=1) {//res.send("testing");
       res.json(output);
     }
     else
     {
       res.send("record not found");
     }

});
router.get('/:property/:pavale', async function (req, res, next) {
        let prop = req.params.property;
        let pvalue=req.params.pavale;
        let filter={}
          filter[prop]=pvalue;
    let output=await findfilter(database_name,collection_name,filter);
    if(output!=1) {//res.send("testing");
        res.json(output);
    }
    else
    {
        res.send("record not found");
    }

});


router.post('/', async function (req, res, next) {

  let output = await insertQuery(database_name, collection_name,req.body);
  console.log(output);

  if (output == 0) {
    res.send('0');
    //res.json({msg:'record inserted successfully.'});
  } else {
    res.send('1');
    //res.json({msg:'record not inserted '});
  }

})

router.put('/', async function (req, res, next) {
  let output = await update(database_name,collection_name,req.body.id,req.body);
  console.log(output);
  if (output === 0) {
    res.send('record updated successfully.');
  } else {
    res.send('record not updated ');
  }

})

router.delete("/", async function (req, res, next) {
     let output = await removedata(database_name,collection_name,req.body.id);
     console.log(output);
     if (output===0)
     {
       res.send("record has been deleted.");
     }
     else
     {
       res.send("record has not been deleted.");
     }

})



module.exports = router;
