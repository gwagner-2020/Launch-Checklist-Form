// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {
   console.log('Page loaded.');
   init();
});


function init() {

   let endpointURL = "https://handlers.education.launchcode.org/static/planets.json";

   fetch(endpointURL).then(function(response){
         response.json().then(function(data){

            let container = document.getElementById("missionTarget");

     
            randomIndex = (Math.floor(Math.random()*data.length));
    
            container.innerHTML += `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${data[randomIndex].name}</li>
                     <li>Diameter: ${data[randomIndex].diameter}</li>
                     <li>Star: ${data[randomIndex].star}</li>
                     <li>Distance from Earth: ${data[randomIndex].distance}</li>
                     <li>Moons: ${data[randomIndex].moons}</li>
                  </ol>>
                  <img src= ${data[randomIndex].image}> 
                  `;
        
         });
   });
   

   let button = document.getElementById("formSubmit");
   let pilotName = document.getElementById("pilotName");
   let copilotName = document.getElementById("copilotName");
   let fuelLevel = document.getElementById("fuelLevel");
   let cargoMass = document.getElementById("cargoMass");

   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems")
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   document.addEventListener("click", function(event) {
      
      if (event.target.id === "formSubmit") {

         if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
           window.alert("All fields are required!")
         
         } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)){
            window.alert("Make sure to enter a valid integer for Fuel Level and Cargo Mass!");
         
         } else if (!(isNaN(Number(pilotName.value))) || !(isNaN(Number(copilotName.value)))) {
            window.alert("Make sure to enter a string for Pilot Name and Co-pilot Name!");
         }
         event.preventDefault();

         function launchList() {
            pilotStatus.innerText = `${pilotName.value} Ready`
            copilotStatus.innerText = `${copilotName.value} Ready`
            faultyItems.style.visibility = "visible"
         }

         if (fuelLevel.value <= 10000 && cargoMass.value >= 10000) {
            launchList();
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            fuelStatus.innerText = `Fuel level of ${fuelLevel.value}L is too low for launch.`
            cargoStatus.innerText = `Cargo mass of ${cargoMass.value}kg is too high for launch.`
         } else if (fuelLevel.value <= 10000) {
            launchList();
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            fuelStatus.innerText = `Fuel level of ${fuelLevel.value}L is too low for launch.`
         } else if (cargoMass.value >= 10000) {
            launchList();
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            cargoStatus.innerText = `Cargo mass of ${cargoMass.value}kg is too high for launch.`
         } else {
            launchList();
            launchStatus.innerHTML = "Shuttle is ready for launch"
            launchStatus.style.color = "green";
         }

         
      };

    });

}
