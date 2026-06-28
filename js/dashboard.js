// COUNTERS FROM LOCALSTORAGE

function loadDashboard(){

    let residents = JSON.parse(localStorage.getItem("residents")) || [];
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let notices = JSON.parse(localStorage.getItem("notices")) || [];

    let collection = localStorage.getItem("totalCollection") || 0;

    document.getElementById("resCount").innerText = residents.length;
    document.getElementById("compCount").innerText = complaints.length;
    document.getElementById("noticeCount").innerText = notices.length;
    document.getElementById("collection").innerText = "₹" + collection;
}

// LOGOUT
function logout(){
    localStorage.removeItem("isLoggedIn");
    window.location.href = "adminlogin.html";
}

// LOAD ON START
loadDashboard();