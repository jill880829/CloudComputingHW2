var cells = document.getElementsByClassName("date")
var input = document.getElementById("cal-input")
var color = document.getElementById("cal-color")
var button = document.getElementById("cal-button")
input.value = ''
color.value = '#b0b0b0'
var date_checked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
updateCalander({});
input.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        addInput();
    }
  });
function clickDate(date){
    if(date_checked[date]===0){
        date_checked[date] = 1;
        cells[date].style.backgroundColor = "#000000";
        cells[date].style.color = "white";
    }
    else{
        date_checked[date] = 0;
        cells[date].style.backgroundColor = "";
        cells[date].style.color = "";
    }
}
function addInput(){
    var val = input.value;
    var newAddEvent = {};
    for(id in date_checked){
        if(date_checked[id] === 1){
            // cells[id].innerHTML += ("<font color="+color.value+">"+val+"</font><br>");
            newAddEvent[id.toString()] = "<font color="+color.value+">"+val+"</font><br>";
            date_checked[id] = 0;
            cells[id].style.backgroundColor = "";
            cells[id].style.color = "";
        }
    }
    updateCalander(newAddEvent);
}
function updateCalander(newEvent){
    console.log(newEvent);
    console.log(JSON.stringify(newEvent));
    fetch("https://us-central1-cloudcomputing-291813.cloudfunctions.net/maintainCalander", {
            body: JSON.stringify(newEvent), // must match 'Content-Type' header
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => {
            for(let id in data){
                cells[parseInt(id)].innerHTML = (parseInt(id)+4) + "<br>" + data[id];
            }
        })
}
//Sets the page's theme. No need to modify
var themeButton = document.getElementsByClassName("ChooseTheme")
for(var i=0; i<themeButton.length; ++i) {
    themeButton[i].addEventListener('click', e => {
        document.body.setAttribute('class', e.target.id)
    }, false)
}