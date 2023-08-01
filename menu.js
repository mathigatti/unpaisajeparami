const proybtns = document.getElementsByClassName("btn");
const proyButtons = Array.from(proybtns);
const proytxts = document.getElementsByClassName("proy-txt");
const proyTexts = Array.from(proytxts);
const langButton = document.getElementById("lang-btn");
const params = new URLSearchParams(window.location.search);

var lang = 'en';
var proy = 1;

/*
langButton.addEventListener('click', ()=>{
    lang == 'es' ? setEnglish() : setEspanol()
})
*/

proyButtons.forEach((x,i) => {
    let ignoreError = params.get("ignore-error") ? "&ignore-error=true" : "";
    x.addEventListener('pointerup', () => window.location.href = "player.html?proy="+x.id+"&lang="+lang+ignoreError)
});

function setEnglish(){
    lang = 'en'
    langButton.innerHTML = "ESP"
    proyTexts.forEach(x => {x.innerText = "PROJECTOR"});
    window.history.pushState({},null,window.location.href.replace("lang=es","lang=en"));
}

function setEspanol(){
    lang = 'es'
    langButton.innerHTML = "ENG"
    proyTexts.forEach(x => {x.innerText = "PROYECTOR"});
    window.history.pushState({},null,window.location.href.replace("lang=en","lang=es"));
}

function setOverlay(on) {
    const overlay = document.getElementById("overlay")
	overlay.style.opacity = on ? "1" : "0";
    overlay.style.transition = on ? "" : "opacity 0.4s linear";
}

document.addEventListener("DOMContentLoaded", function() {
    lang = params.get("lang") || 'en';
    //lang == 'es' ? setEspanol() : setEnglish()
    //getLocation();
    // transition:
    // setOverlay(true); setOverlay(false);
    // setTimeout(()=>{overlay.style.display="none"},500);
});
