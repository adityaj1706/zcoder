const express=require('express');
const bodyParser=require('body-parser');
const loginRoute=require('./routes/login-route');
const path = require('path');
const connectDB=require('./database/database');
require('dotenv').config();

const app=express();
app.use(express.static(path.join(__dirname,"../build")));
app.use(express.json());

app.use(bodyParser.json());
app.use('/',loginRoute);

const port=process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();