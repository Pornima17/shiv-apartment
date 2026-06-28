// ==========================
// Society Reports
// ==========================

function loadReports(){

    let residents = JSON.parse(localStorage.getItem("residents")) || [];
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    let payments = JSON.parse(localStorage.getItem("payments")) || [];

    let totalCollection = 0;
    let pendingPayments = 0;

    payments.forEach(payment => {

        if(payment.status === "Paid"){

            totalCollection += payment.amount;

        }

        if(payment.status === "Pending"){

            pendingPayments++;

        }

    });

    document.getElementById("totalResidents").innerText = residents.length;

    document.getElementById("totalComplaints").innerText = complaints.length;

    document.getElementById("totalNotices").innerText = notices.length;

    document.getElementById("totalCollection").innerText =
    "₹" + totalCollection;

    document.getElementById("pendingPayments").innerText =
    pendingPayments;

}

// Report Date

const today = new Date();

document.getElementById("reportDate").innerText =
today.toLocaleDateString("en-IN");

loadReports();