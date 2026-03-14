let minutesData = [];

async function init(){

const response = await fetch("minutes.json?nocache=" + Date.now());
minutesData = await response.json();

updateLiveMinute();
updateStats();
updateCountdown();

setInterval(updateLiveMinute, 5000);
setInterval(updateCountdown, 1000);

}

function updateLiveMinute(){

const now = new Date();

const currentTime =
now.getHours().toString().padStart(2,"0") + ":" +
now.getMinutes().toString().padStart(2,"0");

let currentMinute = minutesData.find(m => m.time === currentTime);

if(!currentMinute){
currentMinute = {
time: currentTime,
owner: "Available",
message: "This minute is free"
};
}

document.getElementById("minute").innerText = currentMinute.time;
document.getElementById("owner").innerText = currentMinute.owner;
document.getElementById("message").innerText = currentMinute.message;

renderUpcoming();

}

function renderUpcoming(){

const upcomingDiv = document.getElementById("upcoming");
upcomingDiv.innerHTML = "";

minutesData.forEach(m => {

const div = document.createElement("div");
div.className = "minute-card";

div.innerHTML = `
<div>${m.time}</div>
<div>${m.owner}</div>
`;

upcomingDiv.appendChild(div);

});

}

function updateStats(){

const sold = minutesData.length;

document.getElementById("sold").innerText =
`Minutes sold: ${sold} / 525,600`;

}

function updateCountdown(){

const now = new Date();

const seconds = now.getSeconds();

const remaining = 60 - seconds;

document.getElementById("countdown").innerText =
`Next minute in: ${remaining}s`;

}

init();
