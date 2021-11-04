// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("Look at me, I'm in the post!");
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the main page because the redirect will happen on the front end
          // They won't get this or even be able to access this page if they aren't authed
        res.send("login success");
        // res.json();
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/user", function (req, res) {
        console.log("got to app.post for /api/user")
        console.log("req.firstName", req.firstName);
        console.log("req.body.firstName", req.body.firstName);
        console.log("req.body.first_name", req.body.first_name);
        db.User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            street: req.body.street,
            street2: req.body.street2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            date_of_birth: req.body.birthDate
            // karma_points_user: 0,
        }).then(function (data) {
            // res.redirect(307, "/login");
            res.json(data);
        }).catch(function (err) {
            console.log(err);
            // res.json(err);
            res.status(422).json(err.errors[0].message);
        });
    });

    app.post("/api/event", function (req, res) {
        console.log("posted event");
        db.Event.create({
            event_name: req.body.event_name,
            event_owner: req.body.event_owner,
            organization: req.body.organization,
            event_date: req.body.event_date,
            street: req.body.street,
            street_2: req.body.street_2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            event_description: req.body.event_description,
            karma_points_event: req.body.karma_points_event

        }).then(function (data) {
            // res.redirect(307, "/api/login");
            res.json(data)
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            res.status(422).json(err.errors[0].message);
        });
    });



    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            console.log("user not logged in")
            let userLoggedIn = false;
            res.json({
                userLoggedIn: userLoggedIn,
            });

        }
        else {
            // Otherwise send back the user's info
            // Sending back a password, even a hashed password, isn't a good idea
            let userLoggedIn = true;
            console.log(userLoggedIn);
            // db.User.findOne({
            //     where: {
            //         user_email: req.user.email,
            //         user_password: req.user.password
            //     }
            // });
            res.json({
                userLoggedIn: userLoggedIn,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                street: req.user.street,
                street2: req.user.street2,
                city: req.user.city,
                state: req.user.state,
                zipcode: req.user.zipcode,
                email: req.user.email,
                password: req.user.password,
                phone: req.user.phone,
                date_of_birth: req.user.date_of_birth,
                karma_points_user: req.user.karma_points_user,
            });
        }
    });

    // user specific events 
    app.get("/api/user/event", function (req, res) {
        if (!req.user) {
            console.log("user not logged in");
            res.json({});
        }
        else {
            db.EventUser.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [{
                    model: Event
                }]
            }).then((results) => {
                res.json(results)
            });
        }
    });

    // Route for all future events
    app.get("/api/future-events", function (req, res) {
        db.Event.findAll({
            where: {
                event_date: {
                    [Op.gte]: new Date()
                }
            }
        }).then(results => {
            res.json(results);
        })
    })

};
