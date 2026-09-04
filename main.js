express = require("express");
cors = require("cors");
dotenv =require('dotenv').config();

// Delete ts when deploying to production
console.log("PORT:", process.env.PORT);