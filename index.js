document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('accepted-terms').checked;

    // Validate Date of Birth
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const month = today.getMonth() - dobDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert('Date of Birth must be for individuals aged between 18 and 55.');
        return;
    }

    // Create an object for the entry
    const entry = { name, email, password, dob, acceptedTerms };

    // Get existing data from localStorage or create a new array
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.push(entry);

    // Store updated data back in localStorage
    localStorage.setItem('formData', JSON.stringify(existingData));

    // Add data to the table
    addEntryToTable(entry);

    // Clear the form after submission
    document.getElementById('registration-form').reset();
});

// Function to add an entry to the table
function addEntryToTable(entry) {
    const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = entry.name;
    newRow.insertCell(1).textContent = entry.email;
    newRow.insertCell(2).textContent = entry.password;
    newRow.insertCell(3).textContent = entry.dob;
    newRow.insertCell(4).textContent = entry.acceptedTerms;
}

// Function to load saved data from localStorage into the table on page load
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    savedData.forEach(entry => addEntryToTable(entry));
}

// Load saved data when the page is refreshed
window.onload = loadSavedData;
