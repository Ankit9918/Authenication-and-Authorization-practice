const mongoose = require('mongoose');

const mongodb = ()=>{
    mongoose.connect(`mongodb://localhost:27017/authtestapp`)
    .then(console.log("MongoDb database connectes Successfully !"))
    .catch(Error);
}
mongodb();

const userSchema = mongoose.Schema({
 username : String,
 email : String,
 password : String,
 age : Number,
});

module.exports = mongoose.model("user" , userSchema);