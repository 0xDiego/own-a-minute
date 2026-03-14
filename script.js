let minutesData = [];

async function init(){

const response = await fetch("minutes.json");
minutesData = await response.json();

updateLiveMinute();

// revisar cada 5 segundos si cambió el minuto
setInterval(updateLiveMinute, 5000);

}

function updateLiveMinute(){

const now = new Date();

const currentTime =
now.getHours().toString().padStart(2,"0") + ":" +
now.getMinutes().toString().padStart(2,"0");

let currentMinute = minutesData.find(m => m.time === currentTime);

// fallback si no hay minuto en el json
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

init();
