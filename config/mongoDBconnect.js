const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_CONNECT)
.then(() => {
    console.log("mongogDB connect");
}).catch((err) => {
    console.log(`Error: ${err}`);
});