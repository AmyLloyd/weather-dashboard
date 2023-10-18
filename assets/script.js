
//search input pastes elements below dynamically

var searchFormEl = $('#search-form');
var locationListEl = $('#search-list');

// create function to handle form submission


function handleFormSubmit(event) {
  event.preventDefault();

  // select form element by its `name` attribute and get its value
  searchItem = $('input[name="search-input"]').val();
  

  // if there's nothing in the form entered, don't print to the page
  if (!searchItem) {
    console.log('No location entered!');
    return;
  }

  // print to the page
 locationListEl.append('<li>' + searchItem + '</li>');

 getApi(searchItem);
 
  // clear the form input element
  $('input[name="search-input"]').val('');

}

// Create a submit event listener on the form element
searchFormEl.on('submit', handleFormSubmit);

//search API for the city name and return data

//use API to get coordinates for city may need to add ,{state code},{country code}
function getApi(searchItem) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchItem + '&limit=5&appid=427b6e060e396ad75184ba7b9f4658e6';
    
    fetch(requestUrl)
    .then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
};

