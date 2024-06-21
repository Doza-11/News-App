const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userdb",{
    useNewUrlParser: true,
    UseUnifiedTopology: true,
    // UseCreateIndec: true
}).then(() =>{
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`Error`);
})