var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");

searchButtonEl.click(function(){
    artist = searchInputEl.val()
    getAttractionId(artist);
})

function getAttractionId() {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artist + "&apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                var attractionId = data._embedded.events[0].id
                getAttractionInfo(attractionId);
                console.log(attractionId);
                console.log(data)
            })
        }
    })
}

function getAttractionInfo(id){
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events/" + id + ".json?apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                displayAttraction(data)
                console.log(data)
            })
        }
    })
}

function displayAttraction(concertInfo){
    var cityName = concertInfo._embedded.venues[0].city.name
    $("#attraction-display").html(`<h2>${concertInfo.name}</h2>
    <p>Upcoming Concerts:</br> 
    ${concertInfo.name} in ${cityName}</p>
    <a href="${concertInfo.url}">Get Tickets</a>`)  
    
}
