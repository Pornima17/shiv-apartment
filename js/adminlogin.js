const form = document.getElementById("loginForm");

console.log("JS Loaded");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Username:", username);
    console.log("Password:", password);

    if (username === "admin" && password === "1234") {

        console.log("Login Success");

        localStorage.setItem("isLoggedIn", "true");

        console.log("Stored Value:", localStorage.getItem("isLoggedIn"));

        window.location.href = "dashboard.html";

    } else {

        console.log("Login Failed");

        alert("Invalid Login");
    }
});