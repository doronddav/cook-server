const mongoose = require('mongoose')
// require('dotenv').config();


mongoose
  .connect('mongodb+srv://dorond300:Aa123456@cluster0.qwrv9rm.mongodb.net/cookapp')
    .then((x) => console.log('Connected to mongo DB'))
  .catch((e) => console.log(e));

