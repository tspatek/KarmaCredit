
function isLogged() {
    $.ajax(
        {
            url: 'api/user',
            method: 'GET'
        }

    ).then(data => {
        if (data.userLoggedIn === true) {
            $("#loginLinks").html(`<a href='byeee.html'>Logout</a>`);;
        } else {
            $('#dropBtn').hide();
        }
    });

}
// let logged = true;



$('#dropBtn').click(() => {
    $('#dropMenu').show();
});

$(document).click((e) => {
    let target = $(e.target);
    if (!$(e.target).is('#dropBtn')) {
        $('#dropMenu').hide();
    };
});

// if (logged == false) {
//     $('#dropBtn').hide();
// } else if (logged == true) {
//     $("#loginLinks").html(`<a href='byeee.html'>Logout</a>`);
//     // $("loginLinks").click(() => {
//     //     //$$$$$$$$$$$$$$$$$$$ POST for logout
//     // })
// };

isLogged();