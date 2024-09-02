// Function to add a new subject container
function addSubject() {
    let subjectContainer = document.createElement('div');
    subjectContainer.className = 'subject';
    subjectContainer.innerHTML = `
        <button type="button" class="remove-button" onclick="removeSubject(this)">Remove Subject</button>
        <label>Subject Name:</label>
        <input type="text" name="subject_name[]" placeholder="Enter subject name" required>
        <label>Grade:</label>
        <input type="number" name="subject_grade[]" min="0" max="100" placeholder="Enter grade" required>
        <label>Percentage of Total:</label>
        <input type="number" name="subject_percentage[]" min="0" max="100" placeholder="Enter percentage of total" required>
        <div class="sub-grade-container">
            <!-- Sub-grades will be added here -->
        </div>
        <button type="button" class="add-sub-grade-button" onclick="addSubGrade(this)">Add Sub-Grade</button>
        <button type="button" class="calculate-sub-grade" onclick="calculateSubGrade(this)" style="display:none;">Calculate Sub-Grade</button>
    `;
    document.getElementById('subjects-container').appendChild(subjectContainer);
}

// Function to add a sub-grade to the respective subject
function addSubGrade(button) {
    const subjectContainer = button.parentElement;
    const subGradeContainer = subjectContainer.querySelector('.sub-grade-container');
    const subGradeDiv = document.createElement('div');
    subGradeDiv.className = 'sub-grade';
    subGradeDiv.innerHTML = `
        <label>Sub-Grade Type:</label>
        <input type="text" name="sub_grade_type[]" placeholder="Enter sub-grade type" required>
        <label>Sub-Grade:</label>
        <input type="number" name="sub_grade[]" min="0" max="100" placeholder="Enter sub-grade" required>
        <label>Sub-Grade Percentage:</label>
        <input type="number" name="sub_grade_percentage[]" min="0" max="100" placeholder="Enter sub-grade percentage" required>
        <button type="button" class="remove-sub-grade" onclick="removeSubGrade(this)">Remove Sub-Grade</button>
    `;
    subGradeContainer.appendChild(subGradeDiv);

    const calculateButton = subjectContainer.querySelector('.calculate-sub-grade');
    calculateButton.style.display = 'inline-block';
    subGradeContainer.appendChild(calculateButton); // Move the button to the end
}

// Function to remove a subject container
function removeSubject(button) {
    const subjectContainer = button.parentElement;
    subjectContainer.remove();
}

// Function to remove a sub-grade container
function removeSubGrade(button) {
    const subGradeContainer = button.parentElement;
    const subjectContainer = subGradeContainer.parentElement.parentElement;
    subGradeContainer.remove();

    const subGradeContainers = subjectContainer.querySelectorAll('.sub-grade');
    const calculateButton = subjectContainer.querySelector('.calculate-sub-grade');
    if (subGradeContainers.length === 0) {
        calculateButton.style.display = 'none';
    } else {
        subGradeContainers[subGradeContainers.length - 1].appendChild(calculateButton);
    }
}

function calculateSubGrade(button) {
    const subjectContainer = button.closest('.subject');
    const subGradeContainers = subjectContainer.querySelectorAll('.sub-grade');
    let totalSubGrade = 0;
    let totalPercentage = 0;
    let isValid = true;

    subGradeContainers.forEach(function (subGradeContainer, i) {
        const gradeInput = subGradeContainer.querySelector('input[name="sub_grade[]"]');
        const percentageInput = subGradeContainer.querySelector('input[name="sub_grade_percentage[]"]');

        const gradeValue = gradeInput.value.trim();
        const percentageValue = percentageInput.value.trim();

        if (gradeValue === '' || percentageValue === '') {
            isValid = false;
            alert("Please fill in all sub-grade fields.");
            return;
        }

        const grade = parseFloat(gradeValue);
        const percentage = parseFloat(percentageValue);

        if (isNaN(percentage) || percentage <= 0) {
            isValid = false;
            alert("Please enter a valid percentage greater than zero for all sub-grades.");
            return;
        }

        if (!isNaN(grade) && !isNaN(percentage)) {
            totalSubGrade += grade * (percentage / 100);
            totalPercentage += percentage;
        }
    });

    if (!isValid) return;

    if (totalPercentage > 0) {
        const finalGrade = totalSubGrade / (totalPercentage / 100);
        subjectContainer.querySelector('input[name="subject_grade[]"]').value = finalGrade.toFixed(2);
    } else {
        alert("Total percentage of sub-grades cannot be zero. Please enter valid percentages.");
    }
}

function calculateAverage() {
    const form = document.getElementById('grade-form');
    const formData = new FormData(form);

    // Check if all required fields are filled
    const subjectNames = formData.getAll('subject_name[]');
    const subjectGrades = formData.getAll('subject_grade[]');
    const subjectPercentages = formData.getAll('subject_percentage[]');

    let isValid = true;

    subjectNames.forEach((name, i) => {
        if (name.trim() === '' || subjectGrades[i].trim() === '' || subjectPercentages[i].trim() === '') {
            isValid = false;
            alert("Please fill in all required fields for each subject.");
        }
    });

    if (!isValid) return;

    // Proceed with fetching data from the server if all fields are valid
    fetch('/calculate', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Updated to display in the new container instead of a popup
        const resultContainer = document.getElementById('averageResultContainer');
        resultContainer.innerText = `Average Grade: ${data}`;
        resultContainer.style.display = 'block'; // Show the container
    })
    .catch(error => console.error('Error:', error));
}

