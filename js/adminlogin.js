const loginForm = document.getElementById("adminLoginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "admin" && password === "admin123"){

        localStorage.setItem("adminLoggedIn","true");

        alert("Admin Login Successful");

        window.location.href="dashboard.html";

    }else{

        message.innerHTML="Invalid Username or Password";
        message.style.color="red";

    }

});