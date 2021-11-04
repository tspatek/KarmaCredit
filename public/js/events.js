

// [ ]  GET first x events from db
// whatever is the apiroute for events store that as the apiEventRoute const.
//pop them in the events array as event objects - or change the object
//[ ] clean up data for injection here

// #########end of server ajax get######################################
function getEventData() {
    $.ajax({ url: "/api/future-events", method: "GET" })
        .then(function (data) {
            if(data.userLoggedIn == true){

            }
            else{
                
            }
            let events = data;
            console.log(events);
            popEvents();
        });
};



function isUserLoggedIn() {
    $.ajax({ url: "/api/user", method: "GET" })
        .then(function (data) {
            if(data){
                console.log(data);
            } else {
                console.log("There are no Peaches :(");
            }
        });
};

// loggedIn value needs to be determined by a GET route that validates whether the user is logged in.
// let loggedIn = true;

//event constructor... same as sql structure? idk. find out & change as necessary.
function Event(title, org, street, city, date, time, volNeeded, volSigned) {
    this.title = title;
    this.org = org;
    this.street = street;
    this.city = city;
    this.date = date;
    this.time = time;
    this.volNeeded = volNeeded;
    this.volSigned = volSigned;
}


//DUMMY ARRAY of events ========[delete after syncing with db]=================
events = [
    event01 = new Event('Picking up Spoons', 'Spoon Pickers', '1313 Avenue St.', 'Arvada', '07/18/2019', "12:00pm", 8, 7),
    event02 = new Event('Saving Rabbits', 'Rabbit Savers', '1412 Street Ave.', 'Aurora', '07/18/2019', "3:00pm", 9, 2),
    event03 = new Event('Flipping Pancakes', 'IHOP Survivors', '1910 Poor Pl.', 'Denver', '07/18/2022', '4:00pm', 5, 5)
]

// +loads up all the events from the array into a new div
// + appends event info all onto an .eventTile div.
// + handles the click event for each submit button

function popEvents() {
    events.forEach((e, i) => {
        $('<div>')
            .addClass('eventTile')
            .attr('id', `eventTile${i}`)
            .appendTo($('#eventsBox'));
        $("<div>")
            .addClass('eventTitle')
            .appendTo(`#eventTile${i}`)
            .text(`${e.title}`)
        $("<div>")
            .addClass('eventOrg')
            .appendTo(`#eventTile${i}`)
            .text(`${e.org}`)
        $("<div>")
            .addClass('eventDate')
            .appendTo(`#eventTile${i}`)
            .text(`${e.date}`)
        $("<div>")
            .addClass('eventTime')
            .appendTo(`#eventTile${i}`)
            .text(`${e.time}`)
        $("<div>")
            .addClass('eventStreet')
            .appendTo(`#eventTile${i}`)
            .text(`${e.street}`)
        $("<div>")
            .addClass('eventCity')
            .appendTo(`#eventTile${i}`)
            .text(`${e.city}`)
        $("<div>")
            .addClass('volunteers')
            .appendTo(`#eventTile${i}`)
            .html(`<span id='vols${i}'>${e.volSigned}</span>of ${e.volNeeded} volunteers signed up.`)
        $("<div>")
            .addClass('registerButton')
            .attr('id', `registerBtn${i}`)
            // .html('<a href="#">Sign Up<a>')
            .text("Sign Up")
            .appendTo(`#eventTile${i}`)
    });

    //click handler
    for (let i = 0; i < events.length; i++) {
        if (loggedIn == false) {
            $(`#registerBtn${i}`).css('opacity', '0.5');
        } else {
            if (events[i].volNeeded == events[i].volSigned) {
                $(`#registerBtn${i}`).css('opacity', '0.5')
                    .text('Event Full');
            } else {
                $(`#registerBtn${i}`).css('opacity', '1');
                $(`#registerBtn${i}`).on('click', () => {
                    //logic for posting user to event database or verse visa
                    if ($(`#registerBtn${i}`).text() == 'Sign Up') {
                        $(`#registerBtn${i}`).css('background-image', 'url("./images/rug-blue.png"')
                            .text('Cancel')
                            .css('color', 'red');
                        events[i].volSigned++;
                        $(`#vols${i}`).text(events[i].volSigned);
                    } else {
                        $(`#registerBtn${i}`).css('background-image', 'url("./images/rug-red.png"')
                            .text('Sign Up')
                            .css('color', 'whitesmoke');
                        events[i].volSigned--;
                        $(`#vols${i}`).text(events[i].volSigned);
                    }
                    console.log(events[i].title);
                });
            }
        }
    };
}

// getEventData();

// popEvents();
isUserLoggedIn();