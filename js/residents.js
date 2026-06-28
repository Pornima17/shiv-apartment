const form = document.getElementById("residentForm");
const table = document.getElementById("residentTable");
const search = document.getElementById("search");

let residents = JSON.parse(localStorage.getItem("residents")) || [];

let residentCounter = localStorage.getItem("residentCounter") || 1;

form.addEventListener("submit", function(e){

e.preventDefault();

const resident = {

id: "RES" + String(residentCounter).padStart(3, "0"),

name: document.getElementById("name").value,

flat: document.getElementById("flat").value,

mobile: document.getElementById("mobile").value,

email: document.getElementById("email").value,

username: document.getElementById("username").value,

password: document.getElementById("password").value

};

residents.push(resident);

residentCounter++;

localStorage.setItem("residentCounter", residentCounter);

localStorage.setItem("residents", JSON.stringify(residents));

displayResidents();

form.reset();

});

function displayResidents(){

table.innerHTML="";

residents.forEach((resident,index)=>{

table.innerHTML += `

<tr>

<td>${resident.id}</td>

<td>${resident.name}</td>

<td>${resident.flat}</td>

<td>${resident.mobile}</td>

<td>${resident.email}</td>

<td>

<button onclick="editResident(${index})">✏ Edit</button>

<button onclick="deleteResident(${index})">🗑 Delete</button>

</td>

</tr>

`;

});

document.getElementById("residentCount").innerHTML =
"<strong>Total Residents :</strong> " + residents.length;

}

function deleteResident(index){

    residents.splice(index,1);

    localStorage.setItem("residents", JSON.stringify(residents));

    displayResidents();

}

function editResident(index){

document.getElementById("name").value=residents[index].name;

document.getElementById("flat").value=residents[index].flat;

document.getElementById("mobile").value=residents[index].mobile;

document.getElementById("email").value=residents[index].email;

residents.splice(index,1);

displayResidents();

}

search.addEventListener("keyup",function(){

const value=search.value.toLowerCase();

const rows=table.getElementsByTagName("tr");

for(let row of rows){

let text=row.innerText.toLowerCase();

row.style.display=text.includes(value)?"":"none";

}

});
displayResidents();