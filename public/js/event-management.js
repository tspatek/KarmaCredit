
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//GET: 
// the current event, (it will be logged to the vol's 'journal')
//the volunteer's name & id (will be used to identify the vol, and to put their name on the page)
// I think that's all I need here.

function getEventData() {
    $.ajax({ url: "/api/user/event", method: "GET" })
        .then(data => {
            console.log(data);
        })
};

getEventData();
//dummy array of volunteers
//get the real data from the db. do the logic on the server side
const Volunteer = function (name, id) {
    this.name = name;
    this.id = id;
    this.record = function () {
        $(this).click(() => {
            console.log(this);
        });
    };
};

const volunteers = [
    {
        name: "Barbara Holland",
        id: 01
    }, {
        name: "Michael Meyers",
        id: 02
    },
    {
        name: "Pete Townsend",
        id: 03
    },
    {
        name: "Art Garfunkel",
        id: 04
    }, {
        name: "Paul Rudd",
        id: 05
    },
];

let volunteerObjects = [];

//this creates a volunteerObject for each entry of the volunteers array.
volunteers.forEach(e => {
    f = new Volunteer(e.name, e.id);
    volunteerObjects.push(f);
});

//popTable goes through the array of volunteers and populates the table with their names and buttons to assign them karma.
function popTable() {
    volunteerObjects.forEach((entry, index) => {
        $("#karma-table").find('tbody')
            .append($('<tr>')
                .append($('<td>')
                    .text(`${entry.name}`)
                    .data('id', entry.id)
                    .data('name', entry.name)
                )
                .append($('<td>')
                    .html(`<input id='${entry.id}-good' class='karma-btn' name='${entry.name}-karma' value='good' type='radio'>`)
                )
                // .append($('<td>')
                //     .html(`<input id='${entry.id}-neutral' class='karma-btn' name='${entry.name}-karma' value='neutral' type='radio'>`)
                // )
                .append($('<td>')
                    .html(`<input id='${entry.id}-bad' class='karma-btn' name='${entry.name}-karma' value='bad' type='radio'>`)
                )
                .click(() => {
                    // console.log(entry.name, $(`.karma-btn[name='${entry.name}-karma']:checked`).val());
                    let name = entry.name;
                    let karma = $(`.karma-btn[name='${entry.name}-karma']:checked`).val();
                    //$$$$$$$$$$$$$$$$$$$ POST method to post:
                    //user id
                    //local karma score
                    //event id
                    //these will be used to update:
                    //user's database with an added event and associated karma
                    //user's database with karma calculation (within server logic)
                    //event's database with volunteers attended.
                })
            );
    });
};

//calling functions to make the page go.
popTable();