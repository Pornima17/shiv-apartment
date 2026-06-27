// Local Storage मधून Residents मिळवा
let residents = JSON.parse(localStorage.getItem("residents")) || [];

// Dashboard वर Count दाखवा
document.getElementById("totalResidents").textContent = residents.length;