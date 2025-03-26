const form = document.getElementById("registrationForm");
const userTableBody = document.getElementById("userTable").querySelector("tbody");

// Load saved data from local storage on page load
window.addEventListener("load", function () {
    const savedEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
    savedEntries.forEach(addEntryToTable);
});

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dobInput = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    // Validate age (18–55 years)
    const dob = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("Date of Birth must be for people aged between 18 and 55.");
        return;
    }

    // Save entry to local storage
    const newEntry = { name, email, password, dob: dobInput, acceptTerms };
    const savedEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
    savedEntries.push(newEntry);
    localStorage.setItem("userEntries", JSON.stringify(savedEntries));

    // Add entry to the table
    addEntryToTable(newEntry);

    // Reset form
    form.reset();
});

function addEntryToTable(entry) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptTerms ? "Yes" : "No"}</td>
    `;
    userTableBody.appendChild(row);
}
