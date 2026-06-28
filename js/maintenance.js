const form = document.getElementById("maintenanceForm");
const table = document.getElementById("maintenanceTable");

const filterStatus = document.getElementById("filterStatus");
const searchBox = document.getElementById("searchBox");

let maintenance = JSON.parse(localStorage.getItem("maintenance")) || [];
let counter = localStorage.getItem("maintenanceCounter") || 1;

// SAVE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        id: "MNT" + String(counter).padStart(3, "0"),
        flatNo: document.getElementById("flatNo").value,
        owner: document.getElementById("owner").value,
        amount: document.getElementById("amount").value,
        dueDate: document.getElementById("dueDate").value,
        paidDate: document.getElementById("paidDate").value || "-",
        status: document.getElementById("status").value,
        mode: document.getElementById("mode").value
    };

    maintenance.push(data);

    localStorage.setItem("maintenance", JSON.stringify(maintenance));

    counter++;
    localStorage.setItem("maintenanceCounter", counter);

    form.reset();
    renderTable();
});

// DELETE
function deleteItem(id) {
    maintenance = maintenance.filter(item => item.id !== id);
    localStorage.setItem("maintenance", JSON.stringify(maintenance));
    renderTable();
}

// FILTER + SEARCH + RENDER
function renderTable() {

    let filtered = maintenance;

    // STATUS FILTER
    if (filterStatus.value !== "All") {
        filtered = filtered.filter(item => item.status === filterStatus.value);
    }

    // SEARCH FILTER
    if (searchBox.value !== "") {
        filtered = filtered.filter(item =>
            item.flatNo.toLowerCase().includes(searchBox.value.toLowerCase()) ||
            item.owner.toLowerCase().includes(searchBox.value.toLowerCase())
        );
    }

    table.innerHTML = "";

    filtered.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.flatNo}</td>
            <td>${item.owner}</td>
            <td>₹${item.amount}</td>
            <td><span class="due-date">${item.dueDate}</span></td>
<td>
    ${item.paidDate ? `<span class="paid-date">${item.paidDate}</span>` : `<span class="pending-date">Not Paid</span>`}
</td>
            <td class="${item.status.toLowerCase()}">${item.status}</td>

            <td>${item.mode}</td>

            <td>
                <button onclick="deleteItem('${item.id}')" class="delete-btn">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

filterStatus.addEventListener("change", renderTable);
searchBox.addEventListener("input", renderTable);

renderTable();