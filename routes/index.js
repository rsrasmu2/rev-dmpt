var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  start()
    .then((settings) => {
      console.log('Settings in route handler:', settings); // Log settings here
      if (!settings || typeof settings !== 'object') {
        throw new Error('Invalid settings object received');
      }
      const trimText = settings.trim || 'Default Trim'; // Provide a default value
      res.render('index', { 
        trimText: trimText
      });
    })
    .catch(error => {
      console.error('Error in route handler:', error);
      res.status(500).render('error', { message: 'Internal Server Error' });
    });
});

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
        console.log('Full data:', data); // Log the full data
        const settings = data.Item;
        console.log('Full settings:', settings); // Log the full settings object
        if (!settings || typeof settings !== 'object') {
          throw new Error('Invalid settings object');
        }
        return settings;
      } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
      }
  } catch (error) {
      console.error(`Error: ${error.message}`);
  }
}

module.exports = router;
