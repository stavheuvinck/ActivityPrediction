"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector('button[type="submit"]').addEventListener("click", predictActivity);
}


function predictActivity(e) {
    e.preventDefault();

    const distance = document.getElementById("inputDistance").value;
    const time = document.getElementById("inputTime").value;
    const avgHR = document.getElementById("inputAvgHr").value;
    const maxHR = document.getElementById("inputMaxHr").value;
    const avgSpeed = document.getElementById("inputAvgSpeed").value;
    const maxSpeed = document.getElementById("inputMaxSpeed").value;

    const body = {
        data: distance + "," +time+ "," +avgHR+ "," +maxHR+ "," +avgSpeed+ "," +maxSpeed
    };

    print(body)

    fetch(config.API + "/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      let pred = data["predictions"][0]["predicted_label"];
      var predictedLabel = ""
      var tips = ""
      if (pred == 0) {
        predictedLabel = "Itensive endurance training";
        tips = "Many athletes incorporate massage in their training to reduce muscle soreness."
      } else if (pred == 1) {
        predictedLabel = "Calm endurance training";
        tips = "Dehydration can impair your muscles’ ability to repair themselves. You’re especially prone to becoming dehydrated if you exercise in hot or humid weather."
      } else if (pred == 2) {
        predictedLabel = "Intensive training";
        tips = "When you exercise, the proteins that make up your muscle fibers become damaged. Consuming protein after your workout can help give your body the raw material it needs to repair this muscle damage."
      } else if (pred == 3) {
        predictedLabel = "Recovery training";
        tips = "Sleep gives your muscles time to recover from exercise. People who exercise intensely need even more rest than the average person. Some professional athletes allegedly sleep 10 hours or more per night."
      }

      document.getElementById('predictedValue').innerHTML = "Predicted activity: " + "<span style='color: #007bff;'>" + predictedLabel + "</span>"
      document.getElementById('tipsBasedOnPrediction').innerHTML = tips;
    })
    
}