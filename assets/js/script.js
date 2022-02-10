var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");

searchButtonEl.click(function(){
    artist = searchInputEl.val()
    getAttractionInfo(artist);
});

function getAttractionInfo() {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artist + "&apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                if(data.page.totalElements === 0){
                    // this needs to be a modal instead of an alert window
                    alert("No results found.")
                }else{
                displayAttraction(data);
                console.log(data)
                console.log(data.page.totalElements)
                }
            });
        };
    });
};

function getArtistInfo(){

};

function displayArtistInfo(){

};

function displayAttraction(concertInfo){
    var cityName = concertInfo._embedded.events[0]._embedded.venues[0].city.name
    $("#artist-concerts").html(`<h2>${concertInfo._embedded.events[0].name}</h2>
    <h3>Upcoming Concerts:</h3> 
    <p>${concertInfo._embedded.events[0].dates.start.localDate} ${concertInfo._embedded.events[0].name} in ${cityName} - 
    <a href="${concertInfo._embedded.events[0].url}">Get Tickets</a></p>
    <p>${concertInfo._embedded.events[1].dates.start.localDate} ${concertInfo._embedded.events[1].name} in ${concertInfo._embedded.events[1]._embedded.venues[0].city.name} -
    <a href="${concertInfo._embedded.events[1].url}">Get Tickets</a></p>`)  
    
};
