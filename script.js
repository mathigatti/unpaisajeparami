const title = document.getElementById("expo-title");
const author = document.getElementById("expo-author");
const caption = document.getElementById("caption");

var caption_txt = "Esta obra cuenta con el apoyo de Amigos del Bellas Artes, Ensayar Museos - Fundación Williams 2022, Prodanza  y Paraíso Club de Artes Escénicas.";
var author_txt = "UN PAISAJE PARA MÍ";
var title_txt = "de Sivia Gómez Giusto y Aliana Alvarez Pacheco";

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

		caption.innerHTML = caption_txt; // use of italic tag in captions
		author.innerText = author_txt;
		title.innerText = title_txt;
	
		document.getElementById("caption").style.fontSize = "95%";

	};
}

waitForUserIneraction();
