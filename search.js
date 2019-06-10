function searchAnime() {
    document.getElementById("animeGenre").selectedIndex = 0;
    event.preventDefault();
    var searchInput = document.getElementById("searchInput").value;
    var xhr = new XMLHttpRequest();
    var data;
    xhr.onreadystatechange = function () {
        //readyState 0-unsent 1-open has been called 2-send has been called 3-loading 4-done
        //status UNSENT: 0 OPENED: 0 LOADING: 200 DONE: 200
        if (this.readyState == 4 && this.status == 200) {
            //responseText returns the text received from a server following a request being sent.
            //console.log(this.responseText);
            //display(this.responseText);
            data = JSON.parse(this.response);
            data.results.forEach(element => {
                console.log(element.title);
            });
            displaySearchResults(data.results);
        }
    }
    var url = "https://api.jikan.moe/v3/search/anime?q="+searchInput+"&page=1";
    console.log(url);
    xhr.open("GET", url, true);
    xhr.send();
}

function getAnimeByGenre(){
    document.getElementById("searchInput").value = "";
    var animeGenre = document.getElementById("animeGenre").value;
    var xhr = new XMLHttpRequest();
    var data;
    xhr.onreadystatechange = function () {
        //readyState 0-unsent 1-open has been called 2-send has been called 3-loading 4-done
        //status UNSENT: 0 OPENED: 0 LOADING: 200 DONE: 200
        if (this.readyState == 4 && this.status == 200) {
            //responseText returns the text received from a server following a request being sent.
            //console.log(this.responseText);
            //display(this.responseText);
            data = JSON.parse(this.response);
            data.anime.forEach(element => {
                console.log(element.title);
            });
            displaySearchResults(data.anime);
        }
    }
    var url = "https://api.jikan.moe/v3/genre/anime/"+animeGenre;
    console.log(url);
    xhr.open("GET", url, true);
    xhr.send();
}


function displaySearchResults(data){
    var contentBox = document.getElementById("searchContent");
    var fc = contentBox.firstChild;
    while( fc ) {
        contentBox.removeChild( fc );
        fc = contentBox.firstChild;
    }
    data.forEach(element =>{
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.onclick = function(){
            document.location.href = element.url;
        };

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "container")
        cardBody.setAttribute("id", "cardBody");
        let image = document.createElement("img");
        image.src = element.image_url;
        image.width = 150;
        image.height = 200;
        let textBox = document.createElement("div");
        textBox.setAttribute('style', 'white-space: normal;');
        textBox.setAttribute('class', "textBox");
        textBox.innerHTML = "Score: ".bold() + element.score +'\n'
        + "Episodes: ".bold() + element.episodes +'\n'
        +"Synopsis: ".bold() + element.synopsis;
        cardBody.appendChild(image);
        cardBody.appendChild(textBox);

        let footer = document.createElement("div");
        let title = document.createElement("h4");
        title.innerHTML = element.title;
        let detail = document.createElement("p");
        detail.innerHTML = element.type;
        footer.setAttribute("class", "container");
        footer.appendChild(title);
        footer.appendChild(detail);

        card.appendChild(cardBody);
        card.appendChild(footer);
        contentBox.appendChild(card);
    });
}