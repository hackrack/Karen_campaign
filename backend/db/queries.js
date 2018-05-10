const db = require("./index");
var Geocodio = require('geocodio');
var config = { api_key: '50cad5fed331adf803989a338aee9ffaf5f04a8' };
var geocodio = new Geocodio(config);

function lookForPerson(arrayOfObjects, obj) {
  var found = ""
  for (var i = 0; i < arrayOfObjects.length; i++) {
    var person = voters[i];
    if (person.phone_number === obj.phone_number) {
      return found = person;
    } else {
      found = "no such a person";
    }
  }
  return found;
}

function getRegister(req, res, next) {
  console.log(req.body);
  db
  .any(
    `SELECT * FROM voters WHERE phone_number=${req.body.phone_number}`
  )
  .then(data => {
    console.log("data: ", data);
    res.json(data);

    var found = lookForPerson(data, req.body);
    console.log("found: ");
  })
  .catch(error => {
    res.json(error);
  });
  // if (req.body.age >= 18) {
  //   if (req.body.latitude_longitude) {
  //     geocodio.get('reverse', {q: req.body.latitude_longitude}, function(err, response){
  //         if (err) throw err;
  //         var parsed = JSON.parse(response);
  //         var formatted_address = parsed.results[0]['formatted_address']
  //         return db.none(
  //           'INSERT INTO volunteers' +
  //                 '(first_name, last_name, middle_initial, dob, interests, phone_number, email, address)' +
  //                 'VALUES (${first_name}, ${last_name}, ${middle_initial}, ${dob}, ${interests}, ${phone_number}, ${email}, ${address})',
  //                 {
  //                   first_name: req.body.first_name,
  //                   last_name: req.body.last_name,
  //                   middle_initial: req.body.middle_initial,
  //                   dob: req.body.dob,
  //                   interests: req.body.interests,
  //                   phone_number: req.body.phone_number,
  //                   email: req.body.email,
  //                   address: formatted_address
  //                 }
  //           )
  //           .then(data => {
  //
  //           })
  //           .catch(error => {
  //             res.json(error);
  //           });
  //     })
  //   } else {
  //
  //   }
  // } else {
  //   if (req.body.latitude_longitude) {
  //     geocodio.get('reverse', {q: req.body.latitude_longitude}, function(err, response){
  //       if (err) throw err;
  //       var parsed = JSON.parse(response);
  //       var formatted_address = parsed.results[0]['formatted_address']
  //       return db.none(
  //         'INSERT INTO youngvolunteers' +
  //               '(first_name, last_name, middle_initial, dob, interests, phone_number, email, address)' +
  //               'VALUES (${first_name}, ${last_name}, ${middle_initial}, ${dob}, ${interests}, ${phone_number}, ${email}, ${address})',
  //               {
  //                 first_name: req.body.first_name,
  //                 last_name: req.body.last_name,
  //                 middle_initial: req.body.middle_initial,
  //                 dob: req.body.dob,
  //                 interests: req.body.interests,
  //                 phone_number: req.body.phone_number,
  //                 email: req.body.email,
  //                 address: formatted_address
  //               }
  //       )
  //       .then(data => {
  //       })
  //       .catch(error => {
  //         res.json(error);
  //       });
  //     })
  //   }
  // }
}

module.exports = {
  getRegister
}
