// ==========================
// LOAD SETTINGS
// ==========================

function loadSettings(){

    let settings = JSON.parse(localStorage.getItem("settings"));

    if(settings){

        document.getElementById("societyName").value = settings.societyName;
        document.getElementById("contact").value = settings.contact;
        document.getElementById("email").value = settings.email;

    }

}

// ==========================
// SAVE SETTINGS
// ==========================

document.getElementById("settingsForm").addEventListener("submit", function(e){

    e.preventDefault();

    let settings = {

        societyName: document.getElementById("societyName").value,
        contact: document.getElementById("contact").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value

    };

    localStorage.setItem("settings", JSON.stringify(settings));

    alert("Settings Saved Successfully!");

});

// INIT
loadSettings();