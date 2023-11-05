var submitButton = document.getElementById('submit');
const weatherEl=document.querySelector(".weather");
const forecastEL=document.getElementById("forecast-cards");
var APIkey='427b6e060e396ad75184ba7b9f4658e6';

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  //clear dynamically made elements
  //from https://betterprogramming.pub/dynamically-removing-children-from-a-dom-element-in-javascript-new-node-new-you-6143dabaea89
    while (weatherEl.firstChild) {
      weatherEl.removeChild(weatherEl.firstChild);
    };
    while(forecastEL.firstChild) {
      forecastEL.removeChild(forecastEL.firstChild);
    };

  var citySearchInput= document.querySelector("#search-city-input").value;
  
  if(!citySearchInput) {
    console.log("You need a search input value!");
    return;
  }

  getWeather(citySearchInput);
  handleSearchHistory(citySearchInput)
 
});

function getWeather(citySearchInput) {

  //url using template literals to blend in variables to the string
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${citySearchInput}&appid=${APIkey}&units=metric`

  fetch(url)
  .then(response=>response.json())
  .then((data)=>{
  console.log(data);
    getForecast(data.coord.lat, data.coord.lon)
    displayWeather(data)
  })
};

//use parameters lat and lon in this function, in order for the previous fetch to share the values
function getForecast(lat, lon){
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`
    fetch(url)
  .then(response=>response.json())
  .then((data)=>{
    displayForecast(data.list)
  });
};

// create card according to bootstrap
// append the elements to the page for the basic information
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

  //appending order back to the identified element within the html
  span.append(icon)
  h2.append(span)
  cardHeader.append(h2)
  cardBody.append(temp, humidity,wind)
  card.append(cardHeader, cardBody)
  weatherEl.append(card)
};

//create card elements according to bootstrap and append elements 
function displayForecast(data){
  //for loop necessary to choose selected items from the list of 40 forecast recordings taken every 3 hours
  for (let i = 0; i <5; i++) {
    const index= i * 8 + 4

    const card= document.createElement("div")
    card.setAttribute("class", "card")
    const cardHeader=document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    const h2=document.createElement("h2")
    const span=document.createElement("span")
    const icon= document.createElement("img")
    //put icon in span element using setAttirbute to dynamically create the element.
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
  };
};

let searchHistory = [];  

//THESE ARE THE CHANGES I MADE
function handleSearchHistory(citySearchInput) {
  const anchorEl = document.getElementById('search-buttons');
  if (searchHistory.includes(citySearchInput)) {
    console.log("searched it before");
    return;
  }

  searchHistory.push(citySearchInput);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  
  for (i = 0; i < searchHistory.length; i++) {
    let searchButton = document.createElement('button');
  
    if (citySearchInput === searchHistory[i]) {
      console.log("city search already complete. Check the search History buttons below");
      return;
    } else { 
      searchButton.setAttribute('type', 'button');
      searchButton.setAttribute('class', 'btn');
      searchButton.setAttribute('class', 'btn-info');
      searchButton.setAttribute('class', 'btn-primary');
      searchButton.textContent = searchHistory[i];
     
      anchorEl.append(searchButton);}

  };
  

};

