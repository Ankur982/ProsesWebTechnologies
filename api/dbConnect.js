const mongoose = require('mongoose');


// functtion to connect mongodb

const dbConnect = () => {

    mongoose.set('strictQuery', false);

    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("DB connected Successfully")
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = dbConnect;

