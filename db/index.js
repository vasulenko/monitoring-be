import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'root' });

export const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
    process.exit(1);
});
db.once('open', () => {
    console.log('Mongo db connected!');
});
