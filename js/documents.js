const form = document.getElementById("documentForm");
const table = document.getElementById("documentTable");
const search = document.getElementById("search");

let documents = JSON.parse(localStorage.getItem("documents")) || [];
let documentCounter = localStorage.getItem("documentCounter") || 1;

form.addEventListener("submit", function(e){

    e.preventDefault();

const filePath = document.getElementById("file").value;
const fileName = filePath.split("/").pop();

    const documentData = {

        id: "DOC" + String(documentCounter).padStart(3,"0"),

        title: document.getElementById("title").value,

        type: document.getElementById("type").value,

        fileName: fileName,
filePath: filePath

    };

    documents.push(documentData);

    documentCounter++;

    localStorage.setItem("documentCounter", documentCounter);

    localStorage.setItem("documents", JSON.stringify(documents));

    displayDocuments();

    form.reset();

});

function displayDocuments(){

    table.innerHTML="";

    documents.forEach((doc,index)=>{

        table.innerHTML += `

<tr>

<td>${doc.id}</td>

<td>${doc.title}</td>

<td>${doc.type}</td>

<td>${doc.fileName}</td>

<td>

<a href="${doc.filePath}" target="_blank">

<button>

👁 View

</button>

</a>

<a href="${doc.filePath}" download>

<button>

⬇ Download

</button>

</a>

<button onclick="deleteDocument(${index})">

🗑 Delete

</button>

</td>

</tr>

`;

    });

    document.getElementById("documentCount").innerHTML =
    "<strong>Total Documents :</strong> " + documents.length;

}

function deleteDocument(index){

    documents.splice(index,1);

    localStorage.setItem("documents",
    JSON.stringify(documents));

    displayDocuments();

}

search.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const rows=table.getElementsByTagName("tr");

    for(let row of rows){

        row.style.display =
        row.innerText.toLowerCase().includes(value)
        ? ""
        : "none";

    }

});

displayDocuments();