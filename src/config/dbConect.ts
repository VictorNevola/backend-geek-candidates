require('dotenv').config();
import mongoose from 'mongoose';

const URL_MONGO = process.env.URL_MONGO || 'mongodb://localhost:27017/backendGeek';

const mongoConnect = () => {
    mongoose.connect(URL_MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`⚡️ BD is running at ${URL_MONGO}`))
    .catch((err) => console.log(`Error: ${err}`));
}

export default mongoConnect;