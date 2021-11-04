$(document).ready(function () {
    // Getting references to our form and inputs
    const loginForm = $("#login-form");
    const emailInput = $("#username");
    const passwordInput = $("#password");

    // When the form is submitted, we validate there's an email and password entered
    $("#submit").click(function (event) {
        event.preventDefault();
        console.log("i hit submit");
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        console.log(userData);

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });



    // loginUser does a post to our "api/login" route and if successful, redirects us to the the events page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (data) {
            console.log("look at me, I'm in the")
            window.location.replace("/");
            console.log(data);
            console.log("success");
            getUserData();
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    }
function getUserData() {
    $.ajax({ url: "/api/user", method: "GET" })
        .then(function (data) {
            console.log(data);
        });
};

});