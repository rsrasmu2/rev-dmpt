document.addEventListener('DOMContentLoaded', function() {
    if (serverData.trimText) {
        console.log("Trim: " + serverData.trimText);
        document.getElementById('trim').textContent = serverData.trimText;
    } else {
        console.log("Trim: undefined");
    }

    if (serverData.wheelsTimeVar) {
        document.getElementById('wheelsTimeVar').textContent = serverData.wheelsTimeVar;
    }

    if (serverData.paintFinishTimeVar) {
        document.getElementById('paintFinishTimeVar').textContent = serverData.paintFinishTimeVar;
    }

    if (serverData.interiorFinishTimeVar) {
        document.getElementById('interiorFinishTimeVar').textContent = serverData.interiorFinishTimeVar;
    }
});