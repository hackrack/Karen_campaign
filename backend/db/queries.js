const db = require("./index");
var Geocodio = require('geocodio');
var config = { api_key: '50cad5fed331adf803989a338aee9ffaf5f04a8' };
var geocodio = new Geocodio(config);

/*------------------------------Helper Functions------------------------------------*/
function getYearDifferenceFromDateLastContacted(dateString) {
    var today = new Date();
    var dateLastContacted = new Date(dateString);
    var yearOfDifference = today.getFullYear() - dateLastContacted.getFullYear();
    var month = today.getMonth() - dateLastContacted.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dateLastContacted.getDate())) {
        yearOfDifference--;
    }
    return yearOfDifference;
}

function findExactMatch(voters, volunteer) {
  for (var i = 0; i < voters.length; i++) {
    var voter = voters[i];
    var voterMiddleInitial = voter.full_name.split(" ")[1][0].toLowerCase();
    if (voter.phone_number === volunteer.phone_number) {
      return voter;
    } else if (voterMiddleInitial === volunteer.middle_initial && volunteer.age == (Number(voter.age) + getYearDifferenceFromDateLastContacted(voter.date_last_contacted))) {
      return voter;
    }
  }
  return 'undefined';
}

/*------------------------------GET Request------------------------------------*/
function volunteersCounted(req, res, next) {
  db.one(
    'SELECT COUNT (volunteer_id) AS counted FROM volunteers'
  )
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  });
}

/*------------------------------POST Request------------------------------------*/
function getRegister(req, res, next) {
  let first_name = req.body.first_name + "%";
  let last_name = "%" + req.body.last_name;
  console.log("req.body: ", req.body);
  return db
  .any("SELECT * FROM voters WHERE LOWER (full_name) LIKE ${first_name} AND LOWER (full_name) LIKE ${last_name};",
  {
    first_name, last_name
  })
  .then(data => {
    console.log("data after New Like Postgress: ", data);
    if (req.body.age >= 18) {
      if (req.body.latitude_longitude) {
        geocodio.get('reverse', {q: req.body.latitude_longitude}, function(err, response) {
            if (err) throw err;
            var hasVotedBefore = findExactMatch(data, req.body);
            var parsed = JSON.parse(response);
            var formatted_address = parsed.results[0]['formatted_address'];
            if (formatted_address.match(/NY/g)) {
              return db.one(
                'INSERT INTO volunteers' +
                      '(first_name, last_name, middle_initial, dob, interests, phone_number, email, address, voter_id)' +
                      'VALUES (${first_name}, ${last_name}, ${middle_initial}, ${dob}, ${interests}, ${phone_number}, ${email}, ${address}, ${voter_id}) RETURNING volunteer_id',
                      {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        middle_initial: req.body.middle_initial,
                        dob: req.body.dob,
                        interests: req.body.interests,
                        phone_number: req.body.phone_number,
                        email: req.body.email,
                        address: formatted_address,
                        voter_id: hasVotedBefore.voter_id
                      }
                )
                .then( data => {
                  if (hasVotedBefore === 'undefined') {
                    res.json({backendMessage: "firsttimevolunteer", volunteer_id: data.volunteer_id});
                  } else {
                    res.json({backendMessage: "loyal " + hasVotedBefore.full_name.split(/(\s).+\s/).join(""), volunteer_id: data.volunteer_id});
                  }
                })
                .catch(error => {
                  res.json(error);
                });
            } else {
              var state = formatted_address.split(" ");
              res.json({backendMessage: "outofstate", state: state[state.length-2]});
            }
        })
      }
    } else {
      if (req.body.latitude_longitude) {
        geocodio.get('reverse', {q: req.body.latitude_longitude}, function(err, response){
          if (err) throw err;
          var parsed = JSON.parse(response);
          var formatted_address = parsed.results[0]['formatted_address'];
          return db.none(
            'INSERT INTO youngvolunteers' +
                  '(first_name, last_name, middle_initial, dob, interests, phone_number, email, address)' +
                  'VALUES (${first_name}, ${last_name}, ${middle_initial}, ${dob}, ${interests}, ${phone_number}, ${email}, ${address})',
                  {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    middle_initial: req.body.middle_initial,
                    dob: req.body.dob,
                    interests: req.body.interests,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    address: formatted_address,
                  }
          )
          .then(data => {
            res.json('youngvolunteers')
          })
          .catch(error => {
            res.json(error);
          });
        })
      }
    }
  })
  .catch(error => {
    res.json(error);
  });
}

function volunteerOptions(req, res, next) {
  var backendMessage = req.body.backendMessage1;
  return db.none(
    'INSERT INTO volunteeroptions' +
    '(volunteer_id, option1, option2, option3, option4, option5, option6, option7, option8, option9)' +
    'VALUES (${volunteer_id}, ${option1}, ${option2}, ${option3}, ${option4}, ${option5}, ${option6}, ${option7}, ${option8}, ${option9})',
    {
      volunteer_id: req.body.volunteer_id,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      option5: req.body.option5,
      option6: req.body.option6,
      option7: req.body.option7,
      option8: req.body.option8,
      option9: req.body.option9
    }
  )
  .then(data => {
    res.json({backendMessage: backendMessage});
  })
  .catch(error => {
    res.json(error);
  });
}

module.exports = {
  volunteersCounted,
  getRegister,
  volunteerOptions
}
