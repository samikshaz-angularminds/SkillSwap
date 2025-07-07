
import mongoose from 'mongoose';
import { envConfig } from './config/envConfig.js'
import app from './app.js';
let server;


mongoose.connect(envConfig.mongo_url+envConfig.db_name).then((db) => {    
    server = app.listen(envConfig.port, () => console.log(`listening to ${envConfig.port}`))
})