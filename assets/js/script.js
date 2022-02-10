var searchInputEl = $("#search-input");

function getAttractionId() {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=Drake&apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                var attractionId = data._embedded.events[0].id
                // getAttractionInfo(attractionId)
                console.log(attractionId);
                console.log(data)
            })
        }
    })
}

// function getAttractionInfo(id){
//     var apiUrl = "https://app.ticketmaster.com/discovery/v2/attractions/" + id + ".json?apikey=7oZcdUQaTEQX8dezNz2rq0vTFbDBmIoE"
//     fetch(apiUrl).then(function(response){
//         if (response.ok){
//             response.json().then(function(data){
//                 console.log(data)
//             })
//         }
//     })
// }
// returns CORS error?
getAttractionId();