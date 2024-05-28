var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
let url = 'mongodb://localhost:27017';

async function insertQuery(allemp){

  let mongoClient
  try {
    mongoClient = new MongoClient(url);

    mongoClient.connect();

    let DataBase = mongoClient.db("Demo");
    let Collection = DataBase.collection("Course");

    // let allemp = [
    //   {id: 1, name: "ZEEL", age: 23},
    //   {id: 2, name: "Nidhi", age: 24},
    //   {id: 3, name: "Piyush", age: 24},
    // ]

    let result = await Collection.insertOne(allemp)
    console.log(result + 'Documet inserted successfully.')
    return 0;
  }catch (e){
    console.log(e);
    return 1;
  }finally {
    await mongoClient.close();
  }
}

async function update(updateid,allemp) {
  let Mongodb
  try {
    Mongodb = new MongoClient(url);
    Mongodb.connect();

    let Database=Mongodb.db("Demo");
    let Collection = Database.collection("Course");
    //let result = await Collection.updateOne({id:1},{$set:{name:"Zil",age:24}});
      let result = await Collection.replaceOne({id:updateid},allemp);
    console.log(result+'Documet updated successfully.');
       return 0;
  }catch (e){
    console.log(e);
    return 1;
  }finally {
    await Mongodb.close();
  }
}

async function removedata(deleteid){
  let mongodb
  try {
    mongodb = new MongoClient(url);
    mongodb.connect();

    let database = mongodb.db("Demo");
    let collection = database.collection("Course");
    let result = await collection.deleteMany({id:deleteid,});
    console.log(result+'Recoerd has been deleted');
    return 0;
  }catch(err){
    console.log(err);
    return  1;
  }finally {
    await mongodb.close();
  }
}


async function finde() {
  let mongodb
  try {
    mongodb = new MongoClient(url);
    mongodb.connect();

    let database = mongodb.db("Demo");
    let collection = database.collection("Course");
    let result = await collection.find().toArray();
    console.log(result);
    return result;

  }catch(err) {
    console.log(err);
    return 1;

  }finally {
    await mongodb.close();
  }
}

/* GET users listing. */
router.get('/', async function (req, res, next) {

     let output=await finde();
     if(output!=1) {//res.send("testing");
       res.json(output);
     }
     else
     {
       res.send("record not found");
     }

});

router.post('/', async function (req, res, next) {
  let output = await insertQuery(req.body);
  console.log(output);
  if (output == 0) {
    res.send('record inserted successfully.');
  } else {
    res.send('record not inserted ');
  }

})

router.put('/', async function (req, res, next) {
  let output = await update(req.body.id,req.body);
  console.log(output);
  if (output === 0) {
    res.send('record updated successfully.');
  } else {
    res.send('record not updated ');
  }

})

router.delete("/", async function (req, res, next) {
     let output = await removedata(req.body.id);
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
