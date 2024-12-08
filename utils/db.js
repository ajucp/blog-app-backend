const mongodb=require('mongodb');

const mongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=async(callback)=>mongoClient.connect(process.env.MONGO_URI)
    .then(client=>{
        console.log("DATA_BASE IS CONNECTED");
        _db=client.db('blogging-APP')
        callback()
    })
    .catch(err=>{
        console.log(err);
        throw err
        }     
    )
        
    
const getDb=()=>{
    if(_db){
        return _db;
    }
    throw "NO DATABASE IS FOUND"
}

module.exports={mongoConnect,getDb};
// exports.getDb=getDb;
    
