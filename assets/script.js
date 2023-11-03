var submitButton = document.getElementById('submit');
const weatherEl=document.querySelector(".weather")
const forecastEL=document.getElementById("forecast-cards")

var APIkey='427b6e060e396ad75184ba7b9f4658e6'

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  var citySearchInput= document.querySelector("#search-city-input").value;
  var countrySearchInput = document.querySelector("#search-country-input").value;
  
  if(!citySearchInput) {
    console.log("You need a search input value!");
    return;
  }

  getWeather(citySearchInput);
 
  //Uses search input to build the query string for LATITUDE AND LONGITUDE of location
 
  //Append an element with searchLocation data

  //Take coordinates from searchLocation for weather fetch



 
});

function getWeather(citySearchInput) {

const url=`https://api.openweathermap.org/data/2.5/weather?q=${citySearchInput}&appid=${APIkey}&units=metric`

fetch(url)
.then(response=>response.json())
.then((data)=>{
console.log(data);
  getForecast(data.coord.lat, data.coord.lon)
  displayWeather(data)
})



  // let requestCoordinatesUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearchInput + ',' + countrySearchInput + '&limit=1&appid=427b6e060e396ad75184ba7b9f4658e6'
  
  // let response = fetch(requestCoordinatesUrl);

  // let searchLocation;


  // console.log(requestCoordinatesUrl);
  // console.log(citySearchInput);
  // console.log(countrySearchInput);
  
  // //fetches coordinates for search Item and pushes them to a searchLocations array
 

  // fetch(requestCoordinatesUrl)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json(); // Convert the response body to JSON
  // })
  // .then(data => {
  //   // Assign the response data to the outer variable
   
  //   searchLocations = data;

  //     name: JSON.stringify(data[0].name),
  //     lat: JSON.stringify(data[0].lat),
  //     lon: JSON.stringify(data[0].lon),
  //   }

  //   console.log(searchLocations);

  //   //Use coordinates for weather API
  //   let requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + searchLocations.lat + '&lon=' + searchLocations.lon + '&appid=427b6e060e396ad75184ba7b9f4658e6'
    
  //   fetch(requestWeatherUrl)
  //   .then(response => {
  //     if(!response.ok) {
  //       console.log("There is an error");
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })

  // })
  // console.log(searchLocations);
}

function getForecast(lat, lon){
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`
  fetch(url)
.then(response=>response.json())
.then((data)=>{
  console.log(data);
  displayForecast(data.list)
})


}

function displayWeather(data){

  const card= document.createElement("div")
  card.setAttribute("class", "card")
  const cardHeader=document.createElement("div")
  cardHeader.setAttribute("class", "card-header")
  const h2=document.createElement("h2")
  const span=document.createElement("span")
  const icon= document.createElement("img")
  icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
  h2.textContent=data.name

  const cardBody=document.createElement("div")
  cardBody.setAttribute("class", "card-body")

  const temp=document.createElement("h5")
  const humidity=document.createElement("h5")
  const wind=document.createElement("h5")

  temp.textContent=`Temperature: ${data.main.temp} Celsius`
  humidity.textContent=`Humidity: ${data.main.humidity} %`
  wind.textContent=`Wind Speed:${data.wind.speed} MPH`


span.append(icon)
h2.append(span)
cardHeader.append(h2)
cardBody.append(temp, humidity,wind)
card.append(cardHeader, cardBody)
weatherEl.append(card)

}

function displayForecast(data){

  for (let i = 0; i <5; i++) {
    const index= i * 8 + 4

    const card= document.createElement("div")
    card.setAttribute("class", "card")
    const cardHeader=document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    const h2=document.createElement("h2")
    const span=document.createElement("span")
    const icon= document.createElement("img")
    icon.setAttribute("src", "https://openweathermap.org/img/w/" + data[index].weather[0].icon + ".png")
    const day= new Date(data[index].dt*1000).toDateString()
    h2.textContent=day
  
    const cardBody=document.createElement("div")
    cardBody.setAttribute("class", "card-body")
  
    const temp=document.createElement("h5")
    const humidity=document.createElement("h5")
    const wind=document.createElement("h5")
  
    temp.textContent=`Temperature: ${data[index].main.temp} Celsius`
    humidity.textContent=`Humidity: ${data[index].main.humidity} %`
    wind.textContent=`Wind Speed:${data[index].wind.speed} MPH`
  
  
  span.append(icon)
  h2.append(span)
  cardHeader.append(h2)
  cardBody.append(temp, humidity,wind)
  card.append(cardHeader, cardBody)
  forecastEL.append(card)
  

    
  }

}