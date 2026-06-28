const resident = JSON.parse(localStorage.getItem("loggedInResident"));

if (!resident) {
    window.location.href = "resident-login.html";
}

document.getElementById("rid").innerText = resident.id;
document.getElementById("rname").innerText = resident.name;
document.getElementById("rflat").innerText = resident.flat;
document.getElementById("rmobile").innerText = resident.mobile;
document.getElementById("remail").innerText = resident.email;

document.getElementById("logoutBtn").addEventListener("click", function(e) {

    e.preventDefault();

    localStorage.removeItem("loggedInResident");

    alert("Logout Successful");

    window.location.href = "resident-login.html";

});