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
      const trimTime = toTime(settings.trimTime);
      const wheelsTime = toTime(settings.wheelsTime);
      const exteriorTime = toTime(settings.exteriorTime);
      const interiorTime = toTime(settings.interiorTime);
      const questionaireTime = toTime(settings.questionaireTime);
      const totalTimeValue = (parseFloat(settings.trimTime) + parseFloat(settings.wheelsTime) + parseFloat(settings.exteriorTime) + parseFloat(settings.interiorTime));
      let trimPercent = "";
      let wheelsPercent = "";
      let exteriorPercent = "";
      let interiorPercent = "";
      if (totalTimeValue > 0) {
        trimPercent = Math.round(parseFloat(settings.trimTime) / parseFloat(totalTimeValue) * 100) + "%";
        wheelsPercent = Math.round(parseFloat(settings.wheelsTime) / parseFloat(totalTimeValue) * 100) + "%";
        exteriorPercent = Math.round(parseFloat(settings.exteriorTime) / parseFloat(totalTimeValue) * 100) + "%";
        interiorPercent = Math.round(parseFloat(settings.interiorTime) / parseFloat(totalTimeValue) * 100) + "%";
      }
      const timeInSurvey = toTime(totalTimeValue + parseFloat(settings.questionaireTime));
      const totalTime = toTime(totalTimeValue);
      const question1 = settings.question1;
      const question2 = settings.question2;
      const question3 = settings.question3;
      const question4 = settings.question4;
      const question5 = settings.question5;
      const surveyTotal = question1 + question2 + question3 + question4 + question5;
      const avgRating = surveyTotal / 5;
      let surveyRating;
      if (avgRating < 2) {
        surveyRating = "Bad";
      } else if (avgRating < 3) {
        surveyRating = "Decent";
      } else if (avgRating < 4) {
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

function toTime(time) {
  const minutes = Math.floor(time / 60).toString().padStart(2, '0');
  const remainingSeconds = Math.round(time % 60);
  const seconds = remainingSeconds.toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
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
