const title = document.getElementById("expo-title");
const author = document.getElementById("expo-author");
const caption = document.getElementById("caption");

const caption_txt = "Esta obra cuenta con el apoyo de Amigos del Bellas Artes, Ensayar Museos - Fundación Williams 2022, Prodanza  y Paraíso Club de Artes Escénicas.";
const author_txt = "de Sivia Gómez Giusto y Aliana Alvarez Pacheco";
const title_txt = "UN PAISAJE PARA MÍ";

function setOverlay(on, trans = false) {
	const overlay = document.getElementById("overlay");
	overlay.style.transition = trans ? "opacity 0.4s linear" : "";
	overlay.style.opacity = on ? "1" : "0";
}

function waitForUserIneraction() {
	document.getElementById("overlay-text").innerText = title_txt;
	setOverlay(true);
	window.onclick = () => {
		setOverlay(false, true);
		window.onclick = null;

		title.innerText = title_txt;
		author.innerText = author_txt;
		caption.innerHTML = caption_txt; // use of italic tag in captions
	
		document.getElementById("caption").style.fontSize = "95%";

	};
}

waitForUserIneraction();

const audioPlayer = document.getElementById('audioPlayer');

const interval = 10;
const totalDuration = 1765;

function simulateLoop(i) {
  if (i < totalDuration) {
    audioPlayer.currentTime = i;
    i += interval;
    setTimeout(() => simulateLoop(i), 1000);
  }
}

var first_time = true;
/*
audioPlayer.addEventListener('play', function () {
	if(first_time) {
		first_time=false;
		audioPlayer.pause();
		simulateLoop(0);
	}
});
*/