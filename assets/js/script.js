var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");

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
                    modal.style.display = "block";
                }else{
                displayAttraction(data);
                getArtistInfo(artist);
                console.log(data)
                }
            });
        };
    });
};

function getArtistInfo(){
    var apiUrl = "https://api.napster.com/v2.2/search?query=" + artist + "&type=artist&apikey=NGRhNzQ5MWEtZTUxNS00Mjk5LTk0YTYtYTI1YTMwN2ZkMGUw"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                displayArtistInfo(data);
            })
        }
    })

};

function displayArtistInfo(artistInfo){
    var artistName = artistInfo.search.data.artists[0].name
    $("#artist-info").html(`<h2>${artistName}</h2>
    <img src="https://api.napster.com/imageserver/v2/artists/${artistInfo.search.data.artists[0].id}/images/230x153.jpg">`)

};

function displayAttraction(concertInfo){
    var cityName = concertInfo._embedded.events[0]._embedded.venues[0].city.name
    $("#artist-concerts").html(`<h3>Upcoming Concerts:</h3> 
    <p>${concertInfo._embedded.events[0].dates.start.localDate} ${concertInfo._embedded.events[0].name} in ${cityName} - 
    <a href="${concertInfo._embedded.events[0].url}">Get Tickets</a></p>
    <p>${concertInfo._embedded.events[1].dates.start.localDate} ${concertInfo._embedded.events[1].name} in ${concertInfo._embedded.events[1]._embedded.venues[0].city.name} -
    <a href="${concertInfo._embedded.events[1].url}">Get Tickets</a></p>`)  
    
};

closeBtn.onclick = function(){
    modal.style.display = "none"
  }