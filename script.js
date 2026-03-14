async function loadMinutes(){

const response = await fetch("minutes.json");
const minutes = await response.json();

const now = new Date();
const currentTime =
now.getHours().toString().padStart(2,"0") + ":" +
now.getMinutes().toString().padStart(2,"0");

let currentMinute = minutes.find(m => m.time === currentTime);

if(!currentMinute){
currentMinute = minutes[0];
}

document.getElementById("minute").innerText = currentMinute.time;
document.getElementById("owner").innerText = currentMinute.owner;
document.getElementById("message").innerText = currentMinute.message;

const upcomingDiv = document.getElementById("upcoming");

minutes.forEach(m => {

const div = document.createElement("div");
div.className = "minute-card";

div.innerHTML = `
<div>${m.time}</div>
<div>${m.owner}</div>
`;

upcomingDiv.appendChild(div);

});

}

loadMinutes();
