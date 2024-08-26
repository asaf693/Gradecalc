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
    document.getElementById('subjects-container').appendChild(subjectContainer);
    addExpandCheckboxEvent(subjectContainer);
}

function addExpandCheckboxEvent(container) {
    const checkbox = container.querySelector('.expand-checkbox');
    const subGradeContainer = container.querySelector('.sub-grade-container');
    checkbox.addEventListener('change', function() {
        subGradeContainer.style.display = this.checked ? 'block' : 'none';
    });
}

function removeSubject(button) {
    const subjectContainer = button.parentElement;
    if (document.querySelectorAll('.subject').length > 1) {
        subjectContainer.remove();
    } else {
        alert('You must have at least one subject.');
    }
}

function removeSubGrade(button) {
    button.parentElement.remove();
}

document.querySelectorAll('.subject').forEach(function(subject) {
    addExpandCheckboxEvent(subject);
});

function calculateAverage() {
    const form = document.getElementById('grade-form');
    const formData = new FormData(form);

    fetch('/calculate', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('resultText').innerText = data;
        const resultPopup = document.getElementById('resultPopup');
        resultPopup.style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}
