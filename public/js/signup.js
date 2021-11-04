$(document).ready(() => {
    // When the signup button is clicked, we validate 
    // the required fields are not blank
    let userData;

    $("#submit-btn").click(function (event) {
        event.preventDefault();

        if (
            $("#password").val().trim() !==
            $("#password-confirm").val().trim()
        ) {
            $("#password").val("");
            $("#password-confirm").val("");

            console.log("Password confirmation does not match");
            return;
        }

        userData = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim(),
            firstName: $("#first-name").val().trim(),
            lastName: $("#last-name").val().trim(),
            birthDate: $("#birthdate").val().trim(),
            phone: $("#phone").val().trim(),
            street: $("#street").val().trim(),
            street2: $("#street2").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zipcode: $("#zipcode").val()
        };

        if (
            !userData.email ||
            !userData.password ||
            !userData.firstName ||
            !userData.lastName ||
            !userData.birthDate ||
            !userData.phone ||
            !userData.street ||
            !userData.city ||
            !userData.state ||
            !userData.zipcode
        ) {
            console.log("Required entry missing")
            return;
        }

        // If we have required fields, 
        // run the signUpUser function
        signUpUser(userData);

        $("#email").val("");
        $("#password").val("");
        $("#password-confirm").val("");
        $("#first-name").val("");
        $("#last-name").val("");
        $("#birthdate").val("");
        $("#phone").val("");
        $("#street").val("");
        $("#street2").val("");
        $("#city").val("");
        $("#state").val("");
        $("#zipcode").val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(data) {
        $.post("/api/user", {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            phone: data.phone,
            street: data.street,
            street2: data.street2,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,

        }).then(function (data) {
            console.log(data);
            window.location.replace("/login");
            // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
