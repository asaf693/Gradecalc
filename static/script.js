// Function to add a new subject container
function addSubject() {
    // We're really building a new subject div. It is basically the same div element as the subject div in the HTML file
    // first we create the div, then we add features (like classname etc) to it.
    // then, we add a complete HTML code (the same as the base subject code) using ''.
    // At the end, we find the subjects-container by it's id, and appendChild to it, as well as a checkbox for sub_grade
    // Create a new div element for the subject
    let subjectContainer = document.createElement('div');
    // Set the class name of the div to 'subject'
    subjectContainer.className = 'subject';
    // Set the inner HTML of the subject container, including the input fields and buttons
    subjectContainer.innerHTML = `
        <button type="button" class="remove-button" onclick="removeSubject(this)">−</button>
        <label>Subject Name:</label>
        <input type="text" name="subject_name[]" placeholder="Enter subject name" required>
        <label>Grade:</label>
        <input type="number" name="subject_grade[]" min="0" max="100" placeholder="Enter grade" required>
        <label>Percentage of Total:</label>
        <input type="number" name="subject_percentage[]" min="0" max="100" placeholder="Enter percentage of total" required>
        <label>
            <input type="checkbox" class="expand-checkbox"> Add Sub-Grades
        </label>
        <div class="sub-grade-container">
            <div class="sub-grade" style="display: none;">
                <label>Sub-Grade Name:</label>
                <input type="text" name="sub_grade_name[]" placeholder="Enter sub-grade name">
                <label>Sub-Grade:</label>
                <input type="number" name="sub_grade[]" min="0" max="100" placeholder="Enter sub-grade">
                <label>Sub-Grade Percentage:</label>
                <input type="number" name="sub_grade_percentage[]" min="0" max="100" placeholder="Enter sub-grade percentage">
                <button type="button" class="remove-sub-grade" onclick="removeSubGrade(this)">Remove Subject</button>
            </div>
        </div>
    `;
    // Append the new subject container to the 'subjects-container' div
    document.getElementById('subjects-container').appendChild(subjectContainer);
    // Add event listener to the checkbox for expanding sub-grades
    addExpandCheckboxEvent(subjectContainer);
}

// Function to add an event listener to the checkbox for expanding sub-grades
function addExpandCheckboxEvent(container) {
    // Find the checkbox within the container
    const checkbox = container.querySelector('.expand-checkbox');
    // Find the sub-grade container within the container
    const subGradeContainer = container.querySelector('.sub-grade-container');
    // Add a change event listener to the checkbox
    checkbox.addEventListener('change', function() {
        // Show or hide the sub-grade container based on whether the checkbox is checked
        subGradeContainer.style.display = this.checked ? 'block' : 'none';
    });
}

// Function to remove a subject container
function removeSubject(button) {
    // Find the parent element (subject container) of the clicked button
    const subjectContainer = button.parentElement;
    // Check if there is more than one subject container
    // The string '.subject' is a CSS selector. In this case, it selects all elements in the document
    // that have the class name subject.
    if (document.querySelectorAll('.subject').length > 1) {
        // Remove the subject container
        subjectContainer.remove();
    } else {
        // Show an alert if trying to remove the last subject
        alert('You must have at least one subject.');
    }
}

// Function to remove a sub-grade container
function removeSubGrade(button) {
    // Remove the parent element (sub-grade container) of the clicked button
    button.parentElement.remove();
}

// Add event listeners to all existing subject containers when the page loads
document.querySelectorAll('.subject').forEach(function(subject) {
    addExpandCheckboxEvent(subject);
});

// Function to calculate the average grade
function calculateAverage() {
    // Get the form element by its ID
    const form = document.getElementById('grade-form');
    // Create a FormData object from the form
    const formData = new FormData(form);

    // Send a POST request to the server with the form data
    fetch('/calculate', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Convert the response to text
    .then(data => {
        // Update the result text with the calculated average
        document.getElementById('resultText').innerText = data;
        // Display the result popup
        const resultPopup = document.getElementById('resultPopup');
        resultPopup.style.display = 'block';
    })
    .catch(error => console.error('Error:', error)); // Log any errors
}
