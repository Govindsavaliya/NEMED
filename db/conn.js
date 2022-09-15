require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE)
.then(() => {
    console.log(`Database Connected`);
})
.catch((err) => {
    console.log(`Database Not Connected`);
});


