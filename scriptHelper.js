// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
// Here is the HTML formatting for our mission target div.
/*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
*/
    let missionTarget = document.getElementById("missionTarget");
    let htmlString = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
        `;
    missionTarget.innerHTML = htmlString;
}

function validateInput(testInput) {
    if (testInput === "" || testInput === " ") {
        return "Empty"
    } else if (isNaN(testInput)) {
        return "Not a Number"
    } else if (!isNaN(testInput)){
        return "Is a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let launchStatus = document.getElementById("launchStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    // fuelStatus.innerHTML = "Fuel level high enough for launch";

    if (validateInput(pilot) === "Not a Number" &&
        validateInput(copilot) === "Not a Number" && 
        validateInput(fuelLevel) === "Is a Number" && 
        validateInput(cargoLevel) === "Is a Number") {
            pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
            copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;
            
            if (fuelLevel < 10000){
                list.style.visibility = "visible";
                launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                launchStatus.style.color = "rgb(199, 37, 78)";
                fuelStatus.innerHTML = "Fuel level too low for launch";
            }
            if (cargoLevel > 10000) {
                list.style.visibility = "visible";
                launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                launchStatus.style.color = "rgb(199, 37, 78)";
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                fuelStatus.innerHTML = "Fuel level high enough for launch"
            }
            if (cargoLevel > 10000 && fuelLevel < 10000) {
                launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                launchStatus.style.color = "rgb(199, 37, 78)";
                list.style.visibility = "visible";
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
                fuelStatus.innerHTML = "Fuel level too low for launch"
            }
            if (cargoLevel <= 10000 && fuelLevel >= 10000) {
                launchStatus.innerHTML = "Shuttle is Ready for Launch";
                launchStatus.style.color = "rgb(65, 159, 106)";
                list.style.visibility = "visible";
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
                fuelStatus.innerHTML = "Fuel level high enough for launch"
            }
            
    } else {
        alert("All fields are required and need valid inputs.")
        window.event.preventDefault();
    }
    
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = planets[Math.floor(Math.random()*(planets.length))];
    return randomPlanet
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

