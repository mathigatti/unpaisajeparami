const langButton = document.getElementById("lang-btn");
const menuButton = document.getElementById("menu-btn");
const caption = document.getElementById("caption");
const code = document.getElementById("expo-code");
const author = document.getElementById("expo-author");
const title = document.getElementById("expo-title");
const proyText = document.getElementById("player-proy-txt");
const progress = document.getElementById("progress");
const progressCircle = document.getElementById("progress-circle");
const currentTimePos = document.getElementById("current-time");
const remainingTimePos = document.getElementById("remaining-time");
const playButton = document.getElementById("play-icon");

const params = new URLSearchParams(window.location.search);


var captions = {};
var authors = {};
var lang = "en";
var proy = "mp";

proy = params.get("proy", proy);

if (proy == null){
	proy = "mp"
}

devices_names = {
	mp: "UN PAISAJE PARA MÍ",
};

proyText.innerText = devices_names[proy];
document.getElementById("overlay-text").innerText = devices_names[proy];


function getProjectorIdFrom(device, lang) {
	return device.toString() + lang;
}

function errorCatch(error) {
	if (!params.get("ignore-error"))
		window.location.href = `menu.html?lang=${lang}`;
	else throw error;
}

var player = new Tone.Player().toDestination();
player.loop = false;
// player.onstop(() => {
// 	tick();
// });

// made up parameters
player.src = "";
player.started = 0;
player.seekedTo = 0;
player.currentTime = function () {
	return this.now() + this.seekedTo - this.started;
};

function metadataUpdate(current, expected) {
	caption.innerHTML = expected["caption"]; // use of italic tag in captions
	code.innerText = expected["code"];
	author.innerText = expected["author"];
	title.innerText = expected["title"];

	current.started = current.now();
	current.seekedTo = expected["current_time"] - 4;
	current.seekedTo = current.seekedTo >= 0 ? current.seekedTo : 0;
	current.src = expected["audio_url"];
	current.duration = expected["duration"];
}

const date = new Date();
const timezone_offset = date.getTimezoneOffset();

function correctAudioState2(current, expected) {
	if (!current.src.includes(expected["audio_url"])) {
		let seekTo =
			(Date.now() +
				timezone_offset * 60 * 1000 -
				(Date.parse(expected["song_start_time"]) + 4000)) /
			1000;

		current.load(expected["audio_url"]).then(() => {
			current.start();
			current.seek(0);
			metadataUpdate(current, expected);
			current.started = current.now();
			current.seekedTo = 0;
		});
	}
}

async function tick2() {
	var data = {
		"code": "",
		"author": "UN PAISAJE PARA MÍ",
		"title": "de Sivia Gómez Giusto y Aliana Alvarez Pacheco",
		"caption": "Esta obra cuenta con el apoyo de Amigos del Bellas Artes, Ensayar Museos - Fundación Williams 2022, Prodanza  y Paraíso Club de Artes Escénicas.",
		"audio_url": "/audios/A.mp3",
		"current_time": 1764,
		"duration": 1764,
		"song_start_time": "12-Oct-2022 20:11:41.525167"
	};
	correctAudioState2(player, data);
}

tick2();

function updateProgress() {
	var currentTime = player.currentTime();
	var duration = player.duration;

	var progressPercent = (currentTime / duration) * 100;
	if (progressPercent) {
		progressPercent = progressPercent <= 100 ? progressPercent : 100;
		progressPercent = progressPercent >= 0 ? progressPercent : 0;
		progress.style.width = `${progressPercent}%`;
		progressCircle.style.left = `${progressPercent}%`;
	}
}

function getCurrentTimeInMinutes() {
	var currentTime = player.currentTime();
	var duration = player.duration;

	currentTime = currentTime >= 0 && duration ? currentTime : 0;
	if (currentTime > duration) {
		currentTime = duration;
	}
	let min = currentTime ? Math.floor(currentTime / 60) : 0;
	let sec = currentTime ? Math.floor(currentTime - min * 60) : 0;
	return timeFormat(min, sec);
}

function getRemainingTimeInMinutes() {
	var currentTime = player.currentTime();
	var duration = player.duration;

	let remainingTime = currentTime ? duration - currentTime : 0;
	remainingTime = remainingTime >= 0 ? remainingTime : 0;
	let min = currentTime ? Math.floor(remainingTime / 60) : 0;
	let sec = currentTime ? Math.floor(remainingTime - min * 60) : 0;
	if (remainingTime > 0) {
		return "-" + timeFormat(min, sec);
	} else {
		return timeFormat(min, sec);
	}
}

function updateTimeInfo() {
	currentTimePos.innerText = getCurrentTimeInMinutes();
	remainingTimePos.innerText = getRemainingTimeInMinutes();
}


var playing = true;

const clock = new Tone.Clock((time) => {
	try {
		if (playing){
			updateProgress();
			updateTimeInfo();	
		}
	} catch (e) {
		console.log(e);
	}
}, 1);

function zfill2(n) {
	n = Number(n).toString();
	return n.padStart(2, "0");
}

function timeFormat(min, sec) {
	min = min ? Number(min).toString() : 0;
	sec = sec ? sec : 0;
	return min + ":" + zfill2(sec);
}

function iOS() {
	return (
		[
			"iPad Simulator",
			"iPhone Simulator",
			"iPod Simulator",
			"iPad",
			"iPhone",
			"iPod",
		].includes(navigator.platform) ||
		// iPad on iOS 13 detection
		(navigator.userAgent.includes("Mac") && "ontouchend" in document)
	);
}

var first = true;

function waitForUserIneraction() {
	setOverlay(true);
	document.body.onclick = () => {
		Tone.start().then(() => {
			clock.start();
		});
		setOverlay(false, true);
		document.body.onclick = null;
	};
}

function setOverlay(on, trans = false) {
	const overlay = document.getElementById("overlay");
	overlay.style.transition = trans ? "opacity 0.4s linear" : "";
	overlay.style.opacity = on ? "1" : "0";
}

function makeSeekable() {
	const progressBar = document.getElementById("progress-bar");
	progressBar.onclick = (ev) => {
		const ratio = (ev.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
		const secs = player.duration * ratio;
		player.start(0, secs);
		player.seekedTo = secs;
		player.started = player.now();
	};
}

document.addEventListener("DOMContentLoaded", function () {
	lang = params.get("lang");
	//lang == 'es' ? setEspanol() : setEnglish();
	if (Tone.context.state == "suspended" || iOS()) {
		waitForUserIneraction();
	} else {
		Tone.start()
			.then(() => {
				clock.start();
			})
			.then(() => {
				setOverlay(false);
				document.body.onclick = null;
			});
	}
	if (proy == "mp") {
		document.getElementById("player-proy-txt").style.visibility = "hidden";
		document.getElementById("caption").style.fontSize = "95%";
		makeSeekable();
	}
	// document.body.opacity = "0";
	// document.body.transition = "opacity 0.4s linear";
	// document.body.opacity = "1";
	//getLocation();
});


var last_secs = null;

playButton.addEventListener("click", function () {
    if (player.state === "started") {
		last_secs = player.currentTime();
        player.stop();
        playButton.innerHTML = "&#xE037;"; // Pause symbol
		playing = false;
    } else {
        playButton.innerHTML = "&#xE034;"; // Play symbol
		playing = true;
		player.start(0, last_secs);
		player.seekedTo = last_secs;
		player.started = player.now();

	}
});