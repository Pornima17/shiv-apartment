const form = document.getElementById("noticeForm");
const list = document.getElementById("noticeList");

let notices = JSON.parse(localStorage.getItem("notices")) || [];

// Render Notices
function renderNotices() {
    list.innerHTML = "";

    notices.forEach((notice, index) => {
        list.innerHTML += `
        <div class="notice">
            <div>
                <h3>${notice.title}</h3>
                <p>${notice.message}</p>
                <small>📅 ${notice.date}</small>
            </div>

            <button onclick="deleteNotice(${index})">
                <i class="fa fa-trash"></i>
            </button>
        </div>
        `;
    });
}

// Add Notice
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const newNotice = {
        title: document.getElementById("title").value,
        message: document.getElementById("message").value,
        date: document.getElementById("date").value
    };

    notices.push(newNotice);
    localStorage.setItem("notices", JSON.stringify(notices));

    form.reset();
    renderNotices();
});

// Delete Notice
function deleteNotice(index) {
    notices.splice(index, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    renderNotices();
}

// Initial Load
renderNotices();