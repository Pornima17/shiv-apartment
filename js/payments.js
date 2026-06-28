const paymentForm = document.getElementById("paymentForm");
const paymentTable = document.getElementById("paymentTable");
const residentSelect = document.getElementById("resident");
const flatInput = document.getElementById("flat");
const search = document.getElementById("search");
const totalCollection = document.getElementById("totalCollection");

let residents = JSON.parse(localStorage.getItem("residents")) || [];
let payments = JSON.parse(localStorage.getItem("payments")) || [];
let paymentCounter = localStorage.getItem("paymentCounter") || 1;

// Load Residents Dropdown
function loadResidents(){

    residentSelect.innerHTML =
    '<option value="">Select Resident</option>';

    residents.forEach((resident)=>{

        residentSelect.innerHTML +=
        `<option value="${resident.id}">
            ${resident.name}
        </option>`;

    });

}

// Auto Fill Flat Number
residentSelect.addEventListener("change",function(){

    const resident = residents.find(r=>r.id===this.value);

    if(resident){

        flatInput.value = resident.flat;

    }else{

        flatInput.value="";

    }

});

// Add Payment
paymentForm.addEventListener("submit",function(e){

    e.preventDefault();

    const resident = residents.find(r=>r.id===residentSelect.value);

    const payment={

        id:"PAY"+String(paymentCounter).padStart(3,"0"),

        residentId:resident.id,

        residentName:resident.name,

        flat:resident.flat,

        month:document.getElementById("month").value,

        year:document.getElementById("year").value,

        amount:Number(document.getElementById("amount").value),

        date:document.getElementById("date").value,

        mode:document.getElementById("mode").value,

        status:document.getElementById("status").value

    };

    payments.push(payment);

    paymentCounter++;

    localStorage.setItem("paymentCounter",paymentCounter);

    localStorage.setItem("payments",JSON.stringify(payments));

    displayPayments();

    paymentForm.reset();

    flatInput.value="";

});

// Display Payments
function displayPayments(){

    paymentTable.innerHTML="";

    let total=0;

    payments.forEach((payment,index)=>{

        if(payment.status==="Paid"){

            total += payment.amount;

        }

        paymentTable.innerHTML +=`

<tr>

<td>${payment.id}</td>

<td>${payment.residentName}</td>

<td>${payment.flat}</td>

<td>${payment.month}</td>

<td>${payment.year}</td>

<td>₹${payment.amount}</td>

<td>${payment.status}</td>

<td>${payment.mode}</td>

<td>${payment.date}</td>

<td>

<button onclick="editPayment(${index})">
✏ Edit
</button>

<button onclick="deletePayment(${index})">
🗑 Delete
</button>

</td>

</tr>

`;

    });

    totalCollection.innerHTML =
    "<strong>Total Collection :</strong> ₹"+total;

}

// Delete Payment
function deletePayment(index){

    payments.splice(index,1);

    localStorage.setItem("payments",
    JSON.stringify(payments));

    displayPayments();

}

// Edit Payment
function editPayment(index){

    const payment = payments[index];

    residentSelect.value = payment.residentId;

    flatInput.value = payment.flat;

    document.getElementById("month").value = payment.month;

    document.getElementById("year").value = payment.year;

    document.getElementById("amount").value = payment.amount;

    document.getElementById("date").value = payment.date;

    document.getElementById("mode").value = payment.mode;

    document.getElementById("status").value = payment.status;

    payments.splice(index,1);

    localStorage.setItem("payments",
    JSON.stringify(payments));

    displayPayments();

}

// Search
search.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const rows=paymentTable.getElementsByTagName("tr");

    for(let row of rows){

        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    }

});

loadResidents();
displayPayments();