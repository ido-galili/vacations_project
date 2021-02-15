require("dotenv").config();

const express = require('express'),
    app = express(),
    http = require('http'),
    session = require('express-session'),
    cors = require('cors'),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    db = require('./config/db'),
    Vacation = require('./models/Vacation.js'),
    User = require('./models/User.js'),
    SECRET = 'thisismysecret@dsad12sd!@',
    Sentry = require('@sentry/node');

// Requiring Routes
const authRoutes = require("./routes/auth"),
    vacationsRoutes = require("./routes/vacations"),
    indexRoutes = require("./routes/index");

const corsOptions = {
    optionsSuccessStatus: 200,
    'allowedHeaders': ['sessionId', 'content-Type'],
    'exposedHeaders': ['sessionId'],
    'credentials': true,
    'origin': '*'
};

Sentry.init({ dsn: 'https://0384408e02674762925654d45be8ec3e@sentry.io/1519899' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(cors(corsOptions));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api/vacations", vacationsRoutes);

io.on('connection', socket => {
    console.log('New Client Connected');

    socket.on('add_vacation', (vacationObject) => {
        const vacation = new Vacation(vacationObject);
        vacation.save(function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Vacation Saved!");
            }
        });
        io.sockets.emit('add_vacation')
    });

    socket.on('update_vacation', (updateObject) => {
        Vacation.findByIdAndUpdate(updateObject._id, updateObject,{ new: true }, (err, vacation) => {
                // Handle any possible database errors
                if (err) {
                    console.log(err)
                } else {
                    console.log(vacation);
                }

            }
        );
        io.sockets.emit('update_vacation')
    });

    socket.on('delete_vacation', (vacationId) => {
        Vacation.findByIdAndRemove(vacationId, (err, vacation) => {
            if (err) console.log(err);
            const response = {
                message: "vacation successfully deleted",
                id: vacation._id
            };
            return console.log(response);
        });
        io.sockets.emit('delete_vacation', vacationId)
    });

    socket.on('add_follower', (followerObject) => {
        Vacation.findByIdAndUpdate(followerObject.vacation_id, {$inc: { followers:  1 }}, { new: true }, (err, vacation) => {
                // Handle any possible database errors
                if (err) {
                    console.log(err)
                } else {
                    console.log(vacation);
                }

            }
        );

        User.findByIdAndUpdate(followerObject.user_id, { $push: { vacationsFollowed: followerObject.vacation_id } }, { new: true }, (err, user) => {
                // Handle any possible database errors
                if (err) {
                    console.log(err)
                } else {
                    console.log(user);
                }

            }
        );
        io.sockets.emit('add_follower', followerObject.vacation_id)
    });

    socket.on('remove_follower', (followerObject) => {
        Vacation.findByIdAndUpdate(followerObject.vacation_id, {$inc: { followers:  -1 }}, { new: true }, (err, vacation) => {
                // Handle any possible database errors
                if (err) {
                    console.log(err)
                } else {
                    console.log(vacation);
                }

            }
        );

        User.findByIdAndUpdate(followerObject.user_id, { $pull: { vacationsFollowed: followerObject.vacation_id } }, { new: true }, (err, user) => {
                // Handle any possible database errors
                if (err) {
                    console.log(err)
                } else {
                    console.log(user);
                }

            }
        );

        io.sockets.emit('remove_follower', followerObject.vacation_id)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error No. 2!');
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

server.listen(5000, function(){

    User.findOne({username: 'admin'}, function(err, user) {
        if (err) {
            console.error(err);
        } else if (!user) {
            const user = new User({
                username: 'admin',
                password: 'admin',
                firstName: 'Ido',
                lastName: 'Galili',
                admin: true
            });
            user.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Admin Registered!");
                }
            });
        } else {
            console.log("Admin already registered");
        }
    });

    console.log("The Vacations Server Has Started!");
});
