document.addEventListener('DOMContentLoaded', function() {
    if (serverData.trim) {
        document.getElementById('trim').textContent = serverData.trim;
    }

    if (serverData.wheels) {
        document.getElementById('wheels').textContent = serverData.wheels;
    }

    if (serverData.exterior) {
        document.getElementById('exterior').textContent = serverData.exterior;
    }

    if (serverData.interior) {
        document.getElementById('interior').textContent = serverData.interior;
    }

    if (serverData.trimTime) {
        document.getElementById('trimTime').textContent = serverData.trimTime;
    }

    if (serverData.wheelsTime) {
        document.getElementById('wheelsTime').textContent = serverData.wheelsTime;
    }

    if (serverData.exteriorTime) {
        document.getElementById('exteriorTime').textContent = serverData.exteriorTime;
    }

    if (serverData.interiorTime) {
        document.getElementById('interiorTime').textContent = serverData.interiorTime;
    }

    if (serverData.totalTime) {
        document.getElementById('totalTime').textContent = serverData.totalTime;
    }

    if (serverData.trimPercent) {
        document.getElementById('trimPercent').textContent = serverData.trimPercent;
    }

    if (serverData.wheelsPercent) {
        document.getElementById('wheelsPercent').textContent = serverData.wheelsPercent;
    }

    if (serverData.exteriorPercent) {
        document.getElementById('exteriorPercent').textContent = serverData.exteriorPercent;
    }

    if (serverData.interiorPercent) {
        document.getElementById('interiorPercent').textContent = serverData.interiorPercent;
    }

    if (serverData.questionaireTime) {
        document.getElementById('questionaireTime').textContent = serverData.questionaireTime;
    }

    if (serverData.timeInSurvey) {
        document.getElementById('timeInSurvey').textContent = serverData.timeInSurvey;
    }

    if (serverData.question1) {
        document.getElementById('question1').textContent = serverData.question1;
    }

    if (serverData.question2) {
        document.getElementById('question2').textContent = serverData.question2;
    }

    if (serverData.question3) {
        document.getElementById('question3').textContent = serverData.question3;
    }

    if (serverData.question4) {
        document.getElementById('question4').textContent = serverData.question4;
    }

    if (serverData.question5) {
        document.getElementById('question5').textContent = serverData.question5;
    }

    if (serverData.surveyTotal) {
        document.getElementById('surveyTotal').textContent = serverData.surveyTotal;
    }

    if (serverData.surveyRating) {
        document.getElementById('surveyRating').textContent = serverData.surveyRating;
    }
});
