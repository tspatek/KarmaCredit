// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    let userLoggedIn;
    app.get("/", function (req, res) {
        // If the user already has an account send them to the members page
        // if (req.user) {
        //     userLoggedIn = true;
        //     //nevermind. This needs to send a file. The apiRoute will determind userlogged in.
        //     res.json([req.user, userLoggedIn]);
        //     // res.redirect("/");
        // }
        // else {
        //     userLoggedIn = false;
        //     res.json([req.user, userLoggedIn]);

        // }
        res.sendFile(path.join(__dirname, "../public/events.html"));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/");
        }
        res.sendFile(path.join(__dirname, "../public/login-2.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/byeee", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/byeee.html"));
    });
    //This is a temporary html route
    app.get("/event-mgmt", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/event-management.html"));
    });

    app.get("/event-reg", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/event-registration.html"));
    });

    app.get("/event-signup", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/event-signup.html"));
    });

    app.get("/dashboard", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/gauge.html"));
    });

    app.get("/event-created", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/postsuccess.html"));
    });

    app.get("/user-reg", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/registration-user.html"));
    });
};
