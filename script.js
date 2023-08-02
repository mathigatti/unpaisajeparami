const title = document.getElementById("expo-title");
const author = document.getElementById("expo-author");
const caption = document.getElementById("caption");

const params = new URLSearchParams(window.location.search);

var proy = "mp";
proy = params.get("proy", proy);

if (proy == null){
	proy = "mp"
}

devices_names = {
	mp: "UN PAISAJE PARA MÍ",
};

document.getElementById("overlay-text").innerText = devices_names[proy];

function setOverlay(on, trans = false) {
	const overlay = document.getElementById("overlay");
	overlay.style.transition = trans ? "opacity 0.4s linear" : "";
	overlay.style.opacity = on ? "1" : "0";
}

function waitForUserIneraction() {
	setOverlay(true);
	document.body.onclick = () => {
		setOverlay(false, true);
		document.body.onclick = null;

		var data = {
			"caption": "Esta obra cuenta con el apoyo de Amigos del Bellas Artes, Ensayar Museos - Fundación Williams 2022, Prodanza  y Paraíso Club de Artes Escénicas.",
			"author": "UN PAISAJE PARA MÍ",
			"title": "de Sivia Gómez Giusto y Aliana Alvarez Pacheco",
			"audio_url": "/audios/A.mp3",
		};

		caption.innerHTML = data["caption"]; // use of italic tag in captions
		author.innerText = data["author"];
		title.innerText = data["title"];
	
		document.getElementById("caption").style.fontSize = "95%";

	};
}

waitForUserIneraction();
