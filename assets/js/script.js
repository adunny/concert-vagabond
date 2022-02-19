var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
var searchFormEl = $("#search-form");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-btn");
var artistSearchEl = $("#artist-search");
var searchedAritist = [];

// function for search button
searchFormEl.submit(function (event) {
    event.preventDefault();
    artist = searchInputEl.val()
    getAttractionInfo(artist);
    saveArtists(artist)
});

// Get data from ticketmaster API
function getAttractionInfo(artist) {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artist + "&apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.page.totalElements === 0 || data.page.totalElements > 100) {
                    modal.style.display = "block";
                }
                else {
                    displayAttraction(data);
                    getArtistInfo(artist);
                    console.log(data)
                }
            });
        };
    });
};

//Get data from Napster API
function getArtistInfo(artist) {
    var apiUrl = "https://api.napster.com/v2.2/search?query=" + artist + "&type=artist&apikey=NGRhNzQ5MWEtZTUxNS00Mjk5LTk0YTYtYTI1YTMwN2ZkMGUw"
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayArtistInfo(data);
            })
        }
        if (response.status === 400) {
            throw new Error('bad request')
        }
    }).catch(function (error) {
        console.log(error)
    })

};

//function to display artist name and image
function displayArtistInfo(artistInfo) {
    var artistName = artistInfo.search.data.artists[0].name
    $("#artist-info").html(`<h3>${artistName}</h3>
    <img src="https://api.napster.com/imageserver/v2/artists/${artistInfo.search.data.artists[0].id}/images/230x153.jpg">`)

};

//function to display upcoming concert list
function displayAttraction(concertInfo) {
    var concertListContainer = document.createElement("ul");
    var concertListEl = "";
    $("#artist-concerts").empty();
    for (var i = 0; i < 5; i++) {
        var cityName = concertInfo._embedded.events[i]._embedded.venues[0].city.name
        var concertDate = concertInfo._embedded.events[i].dates.start.localDate
        var concertName = concertInfo._embedded.events[i].name
        var ticketUrl = concertInfo._embedded.events[i].url
        concertListEl += `<li class="card horizontal"><p class="card-content left-align">${concertDate} ${concertName} in ${cityName}</p> 
        <a class="waves-effect waves-light btn ticket" href="${ticketUrl}">Tickets</a></li>`

    }
    concertListContainer.innerHTML = concertListEl
    $("#artist-concerts").append(concertListContainer);  
};

//function to close modal
closeBtn.onclick = function () {
    modal.style.display = "none"
};

//function to save to localstorage
function saveArtists(artist) {
    search = document.createElement("li");
    if (searchInputEl.val() === "") {
        return;
    }
    else {

        search.innerHTML = "<a href='#' class='collection-item'>" + artist + "</a>";
        artistSearchEl.append(search);

        searchedAritist.push(artist);

        localStorage.setItem("searchedArtist", JSON.stringify(searchedAritist));
        searchInputEl.val("");
    }
}

//function to get data from localstorage
function displayArtistSearch(){
    
    var storedArtist1 = JSON.parse(localStorage.getItem("searchedArtist"));
    var storedArtist2 =[];
    if (storedArtist1 === null){
        return;
        // remove duplicates for local storage
    }else{
        for (var i=0; i<storedArtist1.length; i++) {
            if(storedArtist2.indexOf(storedArtist1[i]) === -1){
                storedArtist2.push(storedArtist1[i]);
            }

        }


        for (var i = 0; i < storedArtist2.length; i++) {
            search = document.createElement("li");
            search.innerHTML = "<a href='#' class='collection-item'>" + storedArtist2[i] + "</a>";

            artistSearchEl.append(search);
        }


    }

}

displayArtistSearch();

//function to make search list item functional
var artistSaved = function (event) {
    var artist = event.target.innerText;
    getAttractionInfo(artist);
}


artistSearchEl.click(artistSaved);
