const mongoose = require("mongoose"),
    dbUrl = "mongodb://localhost/vacations";

mongoose.connect(dbUrl, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
    .then((success) => {
    })
    .catch(err => console.log(err));

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    console.log("Vacations DB Connected!")
});

