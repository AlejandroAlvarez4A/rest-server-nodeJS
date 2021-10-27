const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect( process.env.MONGO_CNN, {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
        console.log( 'Data Base online', process.env.MONGO_CNN );

    } catch (error) {
        console.log( error );
        throw new Error('Error witht the bbdd');
    }
}

module.exports = {
    dbConection
}