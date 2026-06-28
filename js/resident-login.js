const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const residents = JSON.parse(localStorage.getItem("residents")) || [];

    const resident = residents.find(function(r) {
        return r.username === username && r.password === password;
    });

    if (resident) {

        localStorage.setItem("loggedInResident", JSON.stringify(resident));

        alert("Login Successful!");

        window.location.href = "resident-dashboard.html";

    } else {

        message.innerHTML = "Invalid Username or Password";
        message.style.color = "red";

    }

});