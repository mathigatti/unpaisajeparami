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

function loadAndPlayAudioFromTime(timeInSeconds) {
  /*
  if (!audioPlayer.paused) {
	audioPlayer.pause();
  }
  */
  // Seek to the specified time
  audioPlayer.currentTime = timeInSeconds;

  // Load and play the audio
  audioPlayer.play();
}

// Function to go back to the beginning (0:00) and play the audio
function playFromBeginning() {
  loadAndPlayAudioFromTime(0);
}

// Add an event listener to the audio player for the 'play' event
const sleep = ms => new Promise(r => setTimeout(r, ms));

var first_time = true;
audioPlayer.addEventListener('play', function () {
	if(first_time) {
		first_time=false;

		var i = 0;
		while (i < 60 * 20) {
			loadAndPlayAudioFromTime(i);
			i = i + 10;
			sleep(100)
		}
		playFromBeginning();
		audioPlayer.pause();
	}
});