
//need to GET karmaScore from user database.
//[ ] show friends' karma scores?
//[ ] GET user's events
//[ ] if no appraisal ~ 24 hours after event, demerits. (on server side)
//[ ] options on event management page: 
// [ ] good karma, no karma, bad karma (in case they had a good excuse);

const user = {
  name: "David",
  karma_score: 761,
  past_events: [
    {
      name: "Eating Pies for the Homeless",
      date: '2010/03/11',
      karma: 'good'
    },
    {
      name: "Donating Kidneys",
      date: '2010/03/12',
      karma: 'bad'
    },
    {
      name: "Sewing People Together",
      date: '2010/03/13',
      karma: 'good'
    },
    {
      name: "Help Greg move his fridge.",
      date: '2010/03/14',
      karma: 'good'
    },
    {
      name: "Giving a Hand to Amputees",
      date: '2010/03/15',
      karma: 'good'
    },
  ],
  future_events: [
    {
      name: "Saving Rabbits",
      date: "07/18/2019",
      address: "1412 Street Ave., Aurora"
    },
  ]
}

let karmaScore = user.karma_score;
let username = user.name;
let meterScore = karmaScore / 1000 * 90
let pos = meterScore;
const needleTime = 1500;
const bell = new Audio("./noises/bell.wav");


//==============This ajax call will be unmuted when the server can run.==========
// $.ajax({ url: currentURL + "/api/dashboard", method: "GET" })
//   .then(function (data) {
//     let user = data;
//     karmaScore = user.karma_score;
//     username = user.first_name;
//    events = user.events;
//     console.log(user);
//  ****Populate the modal body with user's previous events.
//   });

//this function animates the needle
function animateNeedle() {
  $('.needle').animate({ degrees: -90 }, {
    step: function (now, fx) {
      // $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
      // $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
      $(this).css('transform', 'rotate(' + now + 'deg)');
    },
    duration: 0
  }, 'linear');

  $('.needle').animate({ degrees: meterScore }, {
    step: function (now, fx) {
      // $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
      // $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
      $(this).css('transform', 'rotate(' + now + 'deg)');
    },
    duration: needleTime
  }, 'swing');



  setTimeout(() => {
    $('.needle').addClass('shadow-pulse');
  }, needleTime);

  setTimeout(() => {
    bell.play();
  }, needleTime - 150);

  $("#karmaScore").html(`<h2>${karmaScore}<h2>`)
  $("#usersname").html(`${username}`)

};


function decreaseNeedle() {
  $('.needle').animate({ degrees: meterScore }, {
    step: function (now, fx) {
      // $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
      // $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
      $(this).css('transform', 'rotate(' + now + 'deg)');
    },
    duration: 0
  }, 'linear');

  $('.needle').animate({ degrees: (karmaScore/1000 * 90) }, {
    step: function (now, fx) {
      // $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
      // $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
      $(this).css('transform', 'rotate(' + now + 'deg)');
    },
    duration: needleTime
  }, 'swing');



  setTimeout(() => {
    $('.needle').addClass('shadow-pulse');
  }, needleTime);

  setTimeout(() => {
    bell.play();
  }, needleTime - 150);

  $("#karmaScore").html(`<h2>${karmaScore}<h2>`)
  $("#usersname").html(`${username}`)

};

$(document).ready(animateNeedle);

$('#spendKarma').on('click', () => {
  console.log('why";');
  decreaseNeedle();
  karmaScore -= 100;
  
  $("#karmaScore").html(`<h2>${karmaScore}<h2>`)
});

$('#findKarma').on('click', () => {
});

// Modal logic

$('#karmaJournal').on('click', () => {
  $('.modal').show();
});


$(".close").on('click', () => {
  $(".modal").hide();
})

user.past_events.forEach((item, index) => {
  $("#journal-table").find('tbody')
    .append($('<tr>')
      .append($('<td>')
        .text(`${item.name}`)
      )
      .append($('<td>')
        .text(`${item.date}`)
      )
      .append($('<td>')
        .text(`${item.karma}`)
      ))
});

user.future_events.forEach((item, index) => {
  $("#future-journal-table").find('tbody')
    .append($('<tr>')
      .append($('<td>')
        .text(`${item.name}`)
      )
      .append($('<td>')
        .text(`${item.date}`)
      )
      .append($('<td>')
        .text(`${item.address}`)
      ))
});
