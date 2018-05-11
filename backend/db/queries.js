const db = require("./index");
var Geocodio = require('geocodio');
var config = { api_key: '50cad5fed331adf803989a338aee9ffaf5f04a8' };
var geocodio = new Geocodio(config);

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function isVotedBefore(votersData, volunteerData) {
  var existedVoter = "";
  var volunteer_full_name = volunteerData.first_name + " " + volunteerData.middle_initial + " " + volunteerData.last_name;
  var first_last = volunteerData.first_name + " " + volunteerData.last_name;
  for (var i = 0; i < votersData.length; i++) {
    var voter = votersData[i];
    if (
          (
            voter.phone_number === volunteerData.phone_number &&
            (volunteer_full_name === voter.full_name || first_last === voter.full_name)
          ) ||
          (
            volunteerData.age == Number(voter.age) + getAge(voter.date_last_contacted) &&
            (volunteer_full_name === voter.full_name || first_last === voter.full_name)
          ) ||
          (
            voter.phone_number === volunteerData.phone_number &&
            volunteerData.age == Number(voter.age) + getAge(voter.date_last_contacted) &&
            volunteer_full_name.split(/(\s).+\s/).join("") === voter.full_name.split(/(\s).+\s/).join("")
          )
        ) {
            return existedVoter = voter;
    } else {
      existedVoter = "never voted before";
    }
  }
  return existedVoter;
}

function getRegister(req, res, next) {
  return db
  .any(
    `SELECT * FROM voters`
  )
  .then(data => {
    if (req.body.age >= 18) {
      if (req.body.latitude_longitude) {
        geocodio.get('reverse', {q: req.body.latitude_longitude}, function(err, response) {
            if (err) throw err;
            var existedVoter = isVotedBefore(data, req.body);
            var parsed = JSON.parse(response);
            var formatted_address = parsed.results[0]['formatted_address'];
            return db.none(
              'INSERT INTO volunteers' +
                    '(first_name, last_name, middle_initial, dob, interests, phone_number, email, address, voter_id)' +
                    'VALUES (${first_name}, ${last_name}, ${middle_initial}, ${dob}, ${interests}, ${phone_number}, ${email}, ${address}, ${voter_id})',
                    {
                      first_name: req.body.first_name,
                      last_name: req.body.last_name,
                      middle_initial: req.body.middle_initial,
                      dob: req.body.dob,
                      interests: req.body.interests,
                      phone_number: req.body.phone_number,
                      email: req.body.email,
                      address: formatted_address,
                      voter_id: existedVoter.voter_id
                    }
              )
              .then(data => {
                if (existedVoter == 'never voted before') {
                  res.json("Thank you started to work with us")
                } else {
                  res.json("Thank you for your loyalty " + existedVoter.full_name.split(/(\s).+\s/).join("") + "!")
                }
              })
              .catch(error => {
                res.json(error);
              });
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

module.exports = {
  getRegister
}
