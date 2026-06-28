// ==========================
// LOAD DASHBOARD
// ==========================

function loadDashboard(){

    let residents = JSON.parse(localStorage.getItem("residents")) || [];
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    let payments = JSON.parse(localStorage.getItem("payments")) || [];

    // Residents
    document.getElementById("resCount").innerText = residents.length;

    // Complaints
    document.getElementById("compCount").innerText = complaints.length;

    // Notices
    document.getElementById("noticeCount").innerText = notices.length;

    // Payment Calculation
    let totalCollection = 0;
    let monthlyCollection = 0;
    let pendingPayments = 0;

    const currentMonth = new Date().toLocaleString("default", {
        month: "long"
    });

    payments.forEach(payment => {

        if(payment.status === "Paid"){

            totalCollection += payment.amount;

            if(payment.month === currentMonth){

                monthlyCollection += payment.amount;

            }

        }

        if(payment.status === "Pending"){

            pendingPayments++;

        }

    });

    document.getElementById("collection").innerText =
    "₹" + totalCollection;

    document.getElementById("monthlyCollection").innerText =
    "₹" + monthlyCollection;

    // ==========================
// Paid vs Pending Chart
// ==========================

let paidCount = 0;
let pendingCount = 0;

payments.forEach(payment => {

    if(payment.status === "Paid"){

        paidCount++;

    }else if(payment.status === "Pending"){

        pendingCount++;

    }

});

new Chart(document.getElementById("paymentChart"),{

    type:"pie",

    data:{

        labels:["Paid","Pending"],

        datasets:[{

            data:[paidCount,pendingCount]

        }]

    },

    options:{

        responsive:true

    }

});

    document.getElementById("pendingCount").innerText =
    pendingPayments;

    // ==========================
// Monthly Collection Chart
// ==========================

const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

let monthlyData = [];

monthNames.forEach(month => {

    let total = 0;

    payments.forEach(payment => {

        if(payment.month === month && payment.status === "Paid"){

            total += payment.amount;

        }

    });

    monthlyData.push(total);

});

new Chart(document.getElementById("collectionChart"), {

    type: "bar",

    data: {

        labels: monthNames,

        datasets: [{

            label: "Monthly Collection",

            data: monthlyData,

            borderWidth: 1

        }]

    },

    options: {

        responsive: true,

        scales: {

            y: {

                beginAtZero: true

            }

        }

    }

});

}



// ==========================
// LOGOUT
// ==========================

function logout(){

    localStorage.removeItem("isLoggedIn");

    window.location.href="adminlogin.html";

}

// ==========================
// LOAD
// ==========================

loadDashboard();