// Add Course Button functionality
document.getElementById('add-course-btn').addEventListener('click', function() {
    const courseInputs = document.getElementById('course-inputs');
    
    const newCourse = document.createElement('div');
    newCourse.className = 'course';
    newCourse.innerHTML = `
        <label>Grade Point:</label>
        <input type="number" class="grade-point" min="0" max="10" step="0.1">
        <label>Credits:</label>
        <input type="number" class="credit" min="1" value="1">
        <button type="button" class="remove-course-btn" onclick="removeCourse(this)">Remove</button>
    `;
    
    // Insert before the "Add Course" button
    courseInputs.insertBefore(newCourse, document.getElementById('add-course-btn'));
});

// Remove Course Button functionality
function removeCourse(button) {
    button.parentElement.remove();
}

// Calculate CGPA function
function calculateCGPA() {
    const courses = document.querySelectorAll('.course');
    let totalWeightedGrades = 0;
    let totalCredits = 0;
    let isValid = true;

    courses.forEach(course => {
        const gradePoint = parseFloat(course.querySelector('.grade-point').value);
        const credit = parseFloat(course.querySelector('.credit').value);

        // Validation
        if (isNaN(gradePoint) || isNaN(credit) || gradePoint < 0 || gradePoint > 10 || credit < 1) {
            isValid = false;
            return;
        }

        totalWeightedGrades += gradePoint * credit;
        totalCredits += credit;
    });

    if (!isValid || totalCredits === 0) {
        alert('Please enter valid Grade Points (0-10) and Credits (≥1) for all courses.');
        return;
    }

    const cgpa = totalWeightedGrades / totalCredits;
    document.getElementById('cgpa-output').textContent = cgpa.toFixed(2);
}
