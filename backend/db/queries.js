const db = require("./index");
var Geocodio = require('geocodio');
var config = { api_key: '50cad5fed331adf803989a338aee9ffaf5f04a8' };
var geocodio = new Geocodio(config);

function getRegister(req, res, next) {
  if (req.body.latitude_longitude) {
    geocodio.get('reverse', {q: req.body.latitude_longitude}, function(err, response){
        if (err) throw err;
        var parsed = JSON.parse(response);
        var formatted_address = parsed.results[0]['formatted_address']
        return db.none(
          'INSERT INTO volunteers' +
                '(first_name, last_name, middle_initial, dob, interests)' +
                'VALUES (${first_name}, ${last_name}, ${middle_initial}, ${dob}, ${interests})',
                {
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  middle_initial: req.body.middle_initial,
                  dob: req.body.dob,
                  interests: formatted_address
                }
          )
          .then(data => {

          })
          .catch(error => {
            res.json(error);
          });
    })
  } else {

  }
}

module.exports = {
  getRegister
}
