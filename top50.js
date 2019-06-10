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
        data.top.forEach(element => {
            console.log(element.title);
        });
        createList(data);
    }
}
xhr.open("GET", "https://api.jikan.moe/v3/top/anime", true);
xhr.send();

/*
<div class="card">
  <img src="img_avatar.png" alt="Avatar" style="width:100%">
  <div class="container">
    <h4><b>John Doe</b></h4> 
    <p>Architect & Engineer</p> 
  </div>
</div>
*/
function createList(data){
    var contentBox = document.getElementById("topContent");
    data.top.forEach(element =>{
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
        textBox.setAttribute('style', 'white-space: pre;');
        textBox.innerHTML = "Rank: ".bold() + element.rank +'\n'
        + "Score: ".bold() + element.score +'\n'
        + "Episodes: ".bold() + element.episodes;
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
