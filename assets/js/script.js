var searchInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
var searchFormEl = $("#search-form")
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-btn");
var artistSearchEl = $("#artist-search");
var searchedAritist = [];

searchFormEl.submit(function(event){
    event.preventDefault();
    artist = searchInputEl.val()
    getAttractionInfo(artist);

    search = document.createElement("li");
    search.innerHTML = "<a href='#' class='collection-item'>" + artist + "</a>"; 
  
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
    $("#artist-info").html(`<h3 class='orange-text text-lighten-2'>${artistName}</h3>
    <img src="https://api.napster.com/imageserver/v2/artists/${artistInfo.search.data.artists[0].id}/images/230x153.jpg">`)

};

function displayAttraction(concertInfo){
    var cityName = concertInfo._embedded.events[0]._embedded.venues[0].city.name
    $("#artist-concerts").html(`
    <div class='row'>
    <div class='col s12'>
    <div class='card orange lighten-2'>
    <div class='card-content white-text'>
    <h3>Upcoming Concerts:</h3> 
    <p class='left-align'>${concertInfo._embedded.events[0].dates.start.localDate} ${concertInfo._embedded.events[0].name} in ${cityName} - 
    <a href="${concertInfo._embedded.events[0].url}">Get Tickets</a></p>
    <p class='left-align'>${concertInfo._embedded.events[1].dates.start.localDate} ${concertInfo._embedded.events[1].name} in ${concertInfo._embedded.events[1]._embedded.venues[0].city.name} -
    <a href="${concertInfo._embedded.events[1].url}">Get Tickets</a></p>
    <p class='left-align'>${concertInfo._embedded.events[2].dates.start.localDate} ${concertInfo._embedded.events[2].name} in ${concertInfo._embedded.events[2]._embedded.venues[0].city.name} - 
    <a href="${concertInfo._embedded.events[2].url}">Get Tickets</a></p>
    <p class='left-align'>${concertInfo._embedded.events[3].dates.start.localDate} ${concertInfo._embedded.events[3].name} in ${concertInfo._embedded.events[3]._embedded.venues[0].city.name} - 
    <a href="${concertInfo._embedded.events[3].url}">Get Tickets</a></p>
    <p class='left-align'>${concertInfo._embedded.events[4].dates.start.localDate} ${concertInfo._embedded.events[4].name} in ${concertInfo._embedded.events[4]._embedded.venues[0].city.name} - 
    <a href="${concertInfo._embedded.events[4].url}">Get Tickets</a></p>
    </div>
    </div>
    </div>
    </div>
    `)  
};

closeBtn.onclick = function(){
    modal.style.display = "none"
};

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
       
        // artistSearchEl.append(artistList);
    }
   
}

displayArtistSearch();

var artistSaved = function(event) {
    var artist = event.target.innerText;
    getAttractionInfo(artist);
}


artistSearchEl.click(artistSaved);
