const mongoose = require("mongoose");

require('dotenv').config();

const connection = mongoose.connect(process.env.url);


module.exports = {connection};
 


// mongodb+srv://viv30:viv1@cluster0.83zmt12.mongodb.net/atlas-007?retryWrites=true&w=majority
// mongodb+srv://vi:gu@cluster0.83zmt12.mongodb.net/atlas-007


