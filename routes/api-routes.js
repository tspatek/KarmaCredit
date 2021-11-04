const db = require("../models");
const passport = require("../config/passport");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.send("login success");
        // res.json();
    });

    app.post("/api/user", function (req, res) {
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
            // res.json(err);
            res.status(422).json(err.errors[0].message);
        });
    });

    app.post("/api/event", function (req, res) {
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
            res.json(err);
            res.status(422).json(err.errors[0].message);
        });
    });

    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
    
    app.get("/api/user", function (req, res) {
        if (!req.user) {
            let userLoggedIn = false;
            res.json({
                userLoggedIn: userLoggedIn,
            });

        }
        else {
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
