var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  start()
    .then((settings) => {
      res.render('index', { trimText: settings.trim });  
    }).catch(error => {
      console.error(error);
      res.status(500).send('Error triggering start() function');
    });
});

class VehicleSettings {
  constructor(trim, paint, wheels, interior, msrp, session_id) {
      this.trim = trim;
      this.paint = paint;
      this.wheels = wheels;
      this.interior = interior;
      this.msrp = msrp;
      this.session_id = session_id;
  }
}

class SessionId {
  constructor(session_id) {
      this.session_id = session_id;
  }
}

function start() {
  return tryGet(1);
}

async function tryGet(session_id) {
  const url = `${process.env.INVOKE_URL}/get-vehicle-settings`;

  const body = JSON.stringify(new SessionId(session_id));

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.API_KEY
          },
          body: body
      });

      if (!response.ok) {
          throw new Error(`Failed to retrieve data: ${response.statusText}`);
      }

      try {
        const data = await response.json();
        if (data && data.Item) {
          return JSON.parse(data.Item);
        } else {
          throw new Error('Invalid data structure received');
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Failed to parse response data');
      }
  } catch (error) {
      console.error(`Error: ${error.message}`);
  }
}

module.exports = router;
