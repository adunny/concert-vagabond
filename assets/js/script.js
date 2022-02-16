var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
var searchFormEl = $("#search-form");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-btn");
var artistSearchEl = $("#artist-search");
var searchedAritist = [];

searchFormEl.submit(function(event){
    event.preventDefault();
    artist = searchInputEl.val()
    getAttractionInfo(artist);

    search = document.createElement("li");
    search.innerHTML = "<a href='#'>" + artist + "</a>"; 
    artistSearchEl.append(search);
    
    searchedAritist.push(artist);

    localStorage.setItem("searchedArtist", JSON.stringify(searchedAritist));
    //clear input
    searchInputEl.val("");
});

function getAttractionInfo(artist) {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artist + "&apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                if(data.page.totalElements === 0 || data.page.totalElements > 100){
                    modal.style.display = "block";
                }else if (searchInputEl.val()){
                    alert("please enter an artist")
                }
                else{
                displayAttraction(data);
                getArtistInfo(artist);
                console.log(data)
                }
            });
        };
    });
};

function getArtistInfo(artist){
    var apiUrl = "https://api.napster.com/v2.2/search?query=" + artist + "&type=artist&apikey=NGRhNzQ5MWEtZTUxNS00Mjk5LTk0YTYtYTI1YTMwN2ZkMGUw"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                // console.log(data);
                displayArtistInfo(data);
            })
        }
        if (response.status === 400){
            throw new Error('bad request')
        }
    }).catch(function(error){
        console.log(error)
    })

};

function displayArtistInfo(artistInfo){
    var artistName = artistInfo.search.data.artists[0].name
    $("#artist-info").html(`<h2>${artistName}</h2>
    <img src="https://api.napster.com/imageserver/v2/artists/${artistInfo.search.data.artists[0].id}/images/230x153.jpg">`)

};

function displayAttraction(concertInfo){
    var concertListContainer = document.createElement("ul");
    var concertListEl = "";
    $("#artist-concerts").empty();
    for (var i = 0; i < 5; i++){   
        var cityName = concertInfo._embedded.events[i]._embedded.venues[0].city.name
        var concertDate = concertInfo._embedded.events[i].dates.start.localDate
        var concertName = concertInfo._embedded.events[i].name
        var ticketUrl = concertInfo._embedded.events[i].url
        concertListEl += `<li class="card horizontal"><p class="card-content">${concertDate} ${concertName} in ${cityName}</p> 
        <a class="waves-effect waves-light btn" href="${ticketUrl}">Tickets</a></li>`

    }
    concertListContainer.innerHTML = concertListEl
    $("#artist-concerts").append(concertListContainer);  
};

closeBtn.onclick = function(){
    modal.style.display = "none"
};

function displayArtistSearch(){
    
    var storedArtist = JSON.parse(localStorage.getItem("searchedArtist"));
    
    if (storedArtist === null){
        return;
    }else{

        for (var i = 0; i < storedArtist.length; i++) {
            search = document.createElement("li");
            search.innerHTML = "<a href='#'>" + storedArtist[i] + "</a>";

            artistSearchEl.append(search);
        }
       
        // artistSearchEl.append(artistList);
    }
   
}

displayArtistSearch();

var artistSaved = function(event) {
    var artist = event.target.innerText;
    getAttractionInfo(artist);
}


artistSearchEl.click(artistSaved);
