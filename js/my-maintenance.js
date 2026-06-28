// ==========================
// LOAD LOGGED IN RESIDENT
// ==========================

function loadMaintenance(){

    let resident = JSON.parse(localStorage.getItem("loggedInResident"));

    if(!resident){
        alert("Please login first!");
        window.location.href = "resident-login.html";
        return;
    }

    let maintenance = JSON.parse(localStorage.getItem("maintenance")) || [];

    let table = document.getElementById("maintenanceTable");

    // Filter only logged-in resident data
    let myData = maintenance.filter(item =>
        item.owner === resident.name || item.flatNo === resident.flat
    );

    table.innerHTML = "";

    if(myData.length === 0){
        table.innerHTML = `
            <tr>
                <td colspan="3">No Maintenance Records Found</td>
            </tr>
        `;
        return;
    }

    myData.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.dueDate}</td>
            <td>₹${item.amount}</td>
            <td class="${item.status.toLowerCase()}">
                ${item.status}
            </td>
        </tr>
        `;

    });
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

loadMaintenance();