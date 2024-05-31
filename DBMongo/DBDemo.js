const {MongoClient} = require('mongodb');
let url = 'mongodb://localhost:27017';


async function insertQuery(database_name,collection_name,allemp){

    let mongoClient
    try {
        mongoClient = new MongoClient(url);

        mongoClient.connect();

        let DataBase = mongoClient.db(database_name);
        let Collection = DataBase.collection(collection_name);

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
async function update(database_name,collection_name, updateid,allemp) {
    let Mongodb
    try {
        Mongodb = new MongoClient(url);
        Mongodb.connect();

        let Database=Mongodb.db(database_name);
        let Collection = Database.collection(collection_name);
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
async function removedata(database_name,collection_name,deleteid){
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
async function finde(database_name,collection_name) {
    let mongodb
    try {
        mongodb = new MongoClient(url);
        mongodb.connect();
        let database = mongodb.db(database_name);
        let collection = database.collection(collection_name);
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
async function findfilter(database_name,collection_name,filter) {
    let mongodb
    try {
        mongodb = new MongoClient(url);
        mongodb.connect();
        let database = mongodb.db(database_name);
        let collection = database.collection(collection_name);
        let result = await collection.find(filter).toArray();
        console.log(result);
        return result;

    }catch(err) {
        console.log(err);
        return 1;

    }finally {
        await mongodb.close();
    }
}


module.exports = {insertQuery ,update,removedata,finde,findfilter}