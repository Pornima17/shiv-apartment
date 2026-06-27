const form = document.getElementById("complaintForm");
const table = document.getElementById("complaintTable");
const search = document.getElementById("searchComplaint");

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

let complaintCounter = Number(localStorage.getItem("complaintCounter")) || 1;

let editIndex = -1;

const submitBtn = form.querySelector("button");

// Add Complaint
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const complaint = {

        id: "CMP" + String(complaintCounter).padStart(3, "0"),

        name: document.getElementById("complaintName").value,

        flat: document.getElementById("flatNo").value,

        subject: document.getElementById("subject").value,

        status: document.getElementById("status").value

    };

    if(editIndex === -1){

    complaints.push(complaint);

    complaintCounter++;

    localStorage.setItem("complaintCounter", complaintCounter);

}else{

    complaint.id = complaints[editIndex].id;

    complaints[editIndex] = complaint;

    editIndex = -1;

    submitBtn.textContent = "Add Complaint";

}

localStorage.setItem("complaints", JSON.stringify(complaints));

    form.reset();

    displayComplaints();

});

// Display Complaints
function displayComplaints() {

    table.innerHTML = "";

    complaints.forEach((complaint, index) => {

        table.innerHTML += `
        <tr>
            <td>${complaint.id}</td>
            <td>${complaint.name}</td>
            <td>${complaint.flat}</td>
            <td>${complaint.subject}</td>

            <td class="${complaint.status.replace(/\s/g,'')}">
                ${complaint.status}
            </td>

            <td>

<button onclick="editComplaint(${index})">
✏ Edit
</button>

<button onclick="deleteComplaint(${index})">
🗑 Delete
</button>

</td>
        </tr>
        `;

    });

    document.getElementById("complaintCount").innerHTML =
        "<strong>Total Complaints :</strong> " + complaints.length;

    filterComplaints();
}

// Delete Complaint
function deleteComplaint(index) {

    if (confirm("Are you sure you want to delete this complaint?")) {

        complaints.splice(index, 1);

        localStorage.setItem("complaints",
            JSON.stringify(complaints));

        displayComplaints();

    }

}

function editComplaint(index){

    document.getElementById("complaintName").value = complaints[index].name;

    document.getElementById("flatNo").value = complaints[index].flat;

    document.getElementById("subject").value = complaints[index].subject;

    document.getElementById("status").value = complaints[index].status;

    editIndex = index;

    submitBtn.textContent = "Update Complaint";

}

// Search Function
function filterComplaints() {

    const value = search.value.trim().toLowerCase();

    const rows = table.querySelectorAll("tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

    });

}

// Search Event
search.addEventListener("keyup", filterComplaints);

// Initial Display
displayComplaints();