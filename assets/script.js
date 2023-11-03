var submitButton = document.getElementById('submit');

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var citySearchInput= document.querySelector("#search-city-input").value;
  var countrySearchInput = document.querySelector("#search-country-input").value;
  
  if(!citySearchInput) {
    console.log("You need a search input value!");
    return;
  }
 
  //Uses search input to build the query string for LATITUDE AND LONGITUDE of location
  var requestCoordinatesUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearchInput + ',' + countrySearchInput + '&limit=1&appid=427b6e060e396ad75184ba7b9f4658e6'
  console.log(requestCoordinatesUrl);
  console.log(citySearchInput);
  console.log(countrySearchInput);
  
  //fetches coordinates for search Item and pushes them to a searchLocations array
  let searchLocations = [];

  fetch(requestCoordinatesUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Convert the response body to JSON
  })
  .then(data => {
    // Assign the response data to the outer variable
    console.log(data);
    let responseCoordinatesData = JSON.stringify(data);
    console.log(responseCoordinatesData);
    searchLocations.push(responseCoordinatesData);
    console.log(searchLocations);
    // You can now access 'responseData' outside the fetch scope
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  //Append an element with searchLocation data

  //Take coordinates from searchLocation for weather fetch
  

 
});

