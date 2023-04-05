const searchInput= document.getElementById('search');
var searchBtn=document.getElementById('submit');
const geoApiKey='http://api.openweathermap.org/geo/1.0/direct?q=Newark&limit=1&appid=7a02b801d5ba2290e31a45ac6b59b44a';
const weatherapiKey= 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7a02b801d5ba2290e31a45ac6b59b44a';
console.log(weatherapiKey);
console.log(searchInput);

fetch(geoApiKey)
.then(function(response){
    console.log(response)
    return response.json()
})
.then(function(data){
    console.log(data)
})
searchBtn.addEventListener('click',function(){
    console.log('click');

console.log(searchInput.value);
})


//for history 
// function myFunction() {
//     window.history.back();
//   }