var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  start()
    .then((settings) => {
      if (!settings || typeof settings !== 'object') {
        throw new Error('Invalid settings object received');
      }
      const trim = settings.trim;
      const wheels = settings.wheels;
      const exterior = settings.exterior;
      const interior = settings.interior;
      const trimTime = settings.trimTime.toFixed(2);
      const wheelsTime = settings.wheelsTime.toFixed(2);
      const exteriorTime = settings.exteriorTime.toFixed(2);
      const interiorTime = settings.interiorTime.toFixed(2);
      const questionaireTime = settings.questionaireTime.toFixed(2);
      const totalTime = (parseFloat(wheelsTime) + parseFloat(exteriorTime) + parseFloat(interiorTime)).toFixed(2);
      let trimPercent = "";
      let wheelsPercent = "";
      let exteriorPercent = "";
      let interiorPercent = "";
      if (totalTime > 0) {
        trimPercent = Math.round(parseFloat(trimTime) / parseFloat(totalTime) * 100) + "%";
        wheelsPercent = Math.round(parseFloat(wheelsTime) / parseFloat(totalTime) * 100) + "%";
        exteriorPercent = Math.round(parseFloat(exteriorTime) / parseFloat(totalTime) * 100) + "%";
        interiorPercent = Math.round(parseFloat(interiorTime) / parseFloat(totalTime) * 100) + "%";
      }
      const time = Math.round(parseFloat(questionaireTime) + parseFloat(totalTime));
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      const timeInSurvey = `${minutes}:${seconds}`;
      const question1 = settings.question1;
      const question2 = settings.question2;
      const question3 = settings.question3;
      const question4 = settings.question4;
      const question5 = settings.question5;
      const surveyTotal = question1 + question2 + question3 + question4 + question5;
      const avgRating = surveyTotal / 5;
      let surveyRating;
      if (avgRating < 4) {
        surveyRating = "Bad";
      } else if (avgRating < 7) {
        surveyRating = "Decent";
      } else if (avgRating < 9) {
        surveyRating = "Good";
      } else {
        surveyRating = "Excellent";
      }
      res.render('index', { 
        trim: trim,
        trimTime: trimTime,
        trimPercent: trimPercent,
        wheels: wheels,
        exterior: exterior,
        interior: interior,
        wheelsTime: wheelsTime,
        exteriorTime: exteriorTime,
        interiorTime: interiorTime,
        totalTime: totalTime,
        wheelsPercent: wheelsPercent,
        exteriorPercent: exteriorPercent,
        interiorPercent: interiorPercent,
        questionaireTime: questionaireTime,
        timeInSurvey: timeInSurvey,
        question1: question1,
        question2: question2,
        question3: question3,
        question4: question4,
        question5: question5,
        surveyTotal: surveyTotal,
        surveyRating: surveyRating
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
        const settings = data.Item;
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
