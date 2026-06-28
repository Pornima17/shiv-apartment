// ==========================
// LOAD PAYMENT HISTORY
// ==========================

function loadPaymentHistory(){

    let resident = JSON.parse(localStorage.getItem("loggedInResident"));

    if(!resident){
        alert("Please login first!");
        window.location.href = "resident-login.html";
        return;
    }

    let payments = JSON.parse(localStorage.getItem("payments")) || [];

    let table = document.getElementById("paymentHistoryTable");

    // Filter only logged-in resident payments
    let myPayments = payments.filter(payment =>
        payment.residentId === resident.id ||
        payment.residentName === resident.name
    );

    table.innerHTML = "";

    if(myPayments.length === 0){

        table.innerHTML = `
        <tr>
            <td colspan="5">No Payment Records Found</td>
        </tr>
        `;
        return;
    }

    myPayments.forEach(payment => {

        table.innerHTML += `
        <tr>
            <td>${payment.id}</td>
            <td>${payment.month} ${payment.year}</td>
            <td>₹${payment.amount}</td>
            <td class="${payment.status.toLowerCase()}">
                ${payment.status}
            </td>
            <td>${payment.mode}</td>
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

loadPaymentHistory();