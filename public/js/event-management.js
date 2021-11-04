function getEventData() {
    $.ajax({ url: "/api/user/event", method: "GET" })
        .then(data => {
            console.log(data);
        })
};

getEventData();
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

volunteers.forEach(e => {
    f = new Volunteer(e.name, e.id);
    volunteerObjects.push(f);
});

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
                })
            );
    });
};

popTable();
