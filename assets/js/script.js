var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");

searchButtonEl.click(function(){
    artist = searchInputEl.val()
    getAttractionInfo(artist);
})

function getAttractionInfo() {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artist + "&apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                displayAttraction(data);
                console.log(data)
            })
        }
    })
}

// function getAttractionInfo(id){
//     var apiUrl = "https://app.ticketmaster.com/discovery/v2/events/" + id + ".json?apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
//     fetch(apiUrl).then(function(response){
//         if (response.ok){
//             response.json().then(function(data){
//                 displayAttraction(data)
//                 console.log(data)
//             })
//         }
//     })
// }

function displayAttraction(concertInfo){
    var cityName = concertInfo._embedded.events[0]._embedded.venues[0].city.name
    $("#attraction-display").html(`<h2>${concertInfo._embedded.events[0].name}</h2>
    <h3>Upcoming Concerts:</h3> 
    <p>${concertInfo._embedded.events[0].name} in ${cityName} - 
    <a href="${concertInfo._embedded.events[0].url}">Get Tickets</a></p>
    <p>${concertInfo._embedded.events[1].name} in ${concertInfo._embedded.events[1]._embedded.venues[0].city.name} -
    <a href="${concertInfo._embedded.events[1].url}">Get Tickets</a></p>`)  
    
}
