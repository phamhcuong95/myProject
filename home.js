var today = new Date();
var season = today.getMonth() + 1;
var year = today.getFullYear();
if(season >= 1 && season <=3) season = "winter";
else if(season >= 4 && season <=6) season = "spring";
else if(season >= 7 && season <=9) season = "summer";
else if(season >= 10 && season <=12) season = "fall";
var xhr = new XMLHttpRequest();
var data;
xhr.onreadystatechange = function(){
    //readyState 0-unsent 1-open has been called 2-send has been called 3-loading 4-done
    //status UNSENT: 0 OPENED: 0 LOADING: 200 DONE: 200
    if(this.readyState == 4 && this.status == 200){
        //responseText returns the text received from a server following a request being sent.
        //console.log(this.responseText);
        //display(this.responseText);
        data = JSON.parse(this.response);
        data.anime.forEach(element => {
            console.log(element.title);
        });
        displayCurrentSeason(data);
    }
}
var url = "https://api.jikan.moe/v3/season/"+year +"/"+season;
console.log(url);
xhr.open("GET", url, true);
xhr.send();

function displayCurrentSeason(data){
    var contentBox = document.getElementById("currentSeasonContent");
    data.anime.forEach(element =>{
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
        //var genres = getGenres(element.genres);
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

function getGenres(genres){
    var str = "";
    genres.forEach(genre =>{
        str+= genre.name + ", ";
    });
    return str.substring(0, str.length - 2);;
}