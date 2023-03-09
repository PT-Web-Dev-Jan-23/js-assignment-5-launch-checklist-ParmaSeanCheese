// const { formSubmission, myFetch, pickPlanet, addDestinationInfo } = require("./scriptHelper");


window.addEventListener("load", function() {
    // list.style.visibility = "hidden";
    const listValue = document.getElementById("faultyItems")
    const pilotInput = document.querySelector("input[name = pilotName]").value;
    const copilotInput = document.querySelector("input[name = copilotName]").value;
    const fuelLevelInput = Number(document.querySelector("input[name = fuelLevel]").value);
    const cargoLevelInput = Number(document.querySelector("input[name = cargoMass]").value);
    listValue.style.visibility = "hidden";

    const form = document.querySelector("form");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        formSubmission(document, listValue, pilotInput, copilotInput, fuelLevelInput, cargoLevelInput);
    });

    
    
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let chosenPlanet = pickPlanet(listedPlanets);
        addDestinationInfo (
            document, 
            chosenPlanet.name, 
            chosenPlanet.diameter, 
            chosenPlanet.star, 
            chosenPlanet.distance, 
            chosenPlanet.moons, 
            chosenPlanet.image
            )
    })
    
});




