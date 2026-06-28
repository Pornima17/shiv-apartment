// ==========================
// LOAD LOGGED IN RESIDENT
// ==========================

function loadProfile(){

    let resident = JSON.parse(localStorage.getItem("loggedInResident"));

    // If not logged in
    if(!resident){

        alert("Please login first!");
        window.location.href = "resident-login.html";
        return;

    }

    document.getElementById("profileName").innerText = resident.name;
    document.getElementById("profileFlat").innerText = resident.flat;
    document.getElementById("profileMobile").innerText = resident.mobile;
    document.getElementById("profileEmail").innerText = resident.email;

}

// ==========================
// LOGOUT
// ==========================

function logout(){

    localStorage.removeItem("loggedInResident");

    window.location.href = "resident-login.html";

}

// ==========================
// INIT
// ==========================

loadProfile();