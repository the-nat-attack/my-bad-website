/*TIMER*/
var minute = 0
var second = 0
var count = 0
var timer = true

if (localStorage.getItem("minString") !== null) {
    minute = parseInt(localStorage.getItem("minString"))
}
if (localStorage.getItem("secString") !== null) {
    second = parseInt(localStorage.getItem("secString"))
}
if (localStorage.getItem("countString") !== null) {
    count = parseInt(localStorage.getItem("countString"))
}

function stopBtn() { 
    timer = false; 
};

function resetWatch() { 
    timer = false; 
    minute = 0; 
    second = 0; 
    count = 0; 
    if (localStorage.getItem("bonusheart")!= null){
        localStorage.setItem('heart', 4)
        localStorage.removeItem("bonusheart")
    }
    else{
        localStorage.setItem('heart', 3)
    }
    localStorage.removeItem("minString")
    localStorage.removeItem("secString")
    localStorage.removeItem("countString")
    document.getElementById('min').innerHTML = "00"; 
    document.getElementById('sec').innerHTML = "00"; 
    document.getElementById('count').innerHTML = "00"; 
    timer = true; 
    stopWatch();
}; 
  
function stopWatch() { 
    if (timer) { 
        count++; 
  
        if (count == 100) { 
            second++; 
            count = 0; 
        } 
  
        if (second == 60) { 
            minute++; 
            second = 0; 
        } 
  
        if (minute == 60) { 
            hour++; 
            minute = 0; 
            second = 0; 
        } 
  
        localStorage.setItem("minString",minute)
        localStorage.setItem("secString",second)
        localStorage.setItem("countString",count)
  
        if (minute < 10) { 
            localStorage.setItem("minString", "0" + localStorage.getItem("minString"))
        } 
  
        if (second < 10) { 
            localStorage.setItem("secString", "0" + localStorage.getItem("secString")); 
        } 
  
        if (count < 10) { 
            localStorage.setItem("countString", "0" + localStorage.getItem("countString")); 
        } 
  
        document.getElementById('min').innerHTML = localStorage.getItem("minString"); 
        document.getElementById('sec').innerHTML = localStorage.getItem("secString"); 
        document.getElementById('count').innerHTML = localStorage.getItem("countString"); 
        setTimeout(stopWatch, 10); 
    } 
}

function noescape(){
    alert("There is no escape.")
}

function health(){
    for (let i = 0; i < localStorage.getItem("heart"); i++){
        const image = document.createElement('img');
        image.setAttribute('src', 'img/heart.webp');
        image.setAttribute('width', '50px');
        image.setAttribute('alt','heart');
        image.setAttribute('id','heart-img');
        document.getElementById('health').appendChild(image);
    }
}

function delHealth(){
    localStorage.setItem('heart',localStorage.getItem('heart')-1)
    document.getElementById('heart-img').remove()
    if (localStorage.getItem('heart') <= 0){
        window.location.replace("game-over.html") 
    }
}

function bonusHeart(){
    localStorage.setItem("bonusheart", true)
}

function hint(value){
    $("#myModal").click()
    document.getElementById('hint-q').remove()
    const hint = document.createElement('p')
    if (value===2){
        hint.innerHTML = "Hover to reveal the true position."
    }
    else if (value===3){
        hint.innerHTML = "There is only one 'button' on this page."
    }
    else if (value===4){
        hint.innerHTML = "Sometimes a change in scenery will reveal something new."
    }
    hint.classList.add('hint-reveal')
    document.getElementById("hint-section").appendChild(hint)
    second+= 30; 
    if (second >= 60) { 
        minute++; 
        second -= 60; 
    } 
}

function pageLoad(){
    stopWatch()
    health()
}

function endpageLoad(){
    stopWatch()
    stopBtn()
}


