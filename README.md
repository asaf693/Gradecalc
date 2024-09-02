# Grade Calculator

This **Grade Calculator** is a web application designed to help students calculate their average grades across multiple subjects, with support for sub-grades and weighted percentages. It is built using Flask for the backend, with HTML, CSS, and JavaScript for the frontend.

## Features

- **Add and Remove Subjects**: Easily add or remove subjects dynamically.
- **Sub-Grades Support**: Add multiple sub-grades for each subject, with individual percentages.
- **Weighted Calculation**: Calculate weighted averages based on the percentage of each subject and sub-grade.
- **User-Friendly Interface**: A clean and intuitive interface that simplifies the grade calculation process.
- **Responsive Design**: The application is optimized for various screen sizes.

## How It Works

1. **Add Subjects**: Click the "Add Subject" button to create a new subject entry.
2. **Enter Details**: For each subject, enter the subject name, grade, and the percentage it contributes to the total grade.
3. **Add Sub-Grades (Optional)**: If a subject has sub-grades, click "Add Sub-Grade" to add them. Enter the type, grade, and percentage for each sub-grade. The sub-grades will be automatically calculated and averaged into the main subject grade.
4. **Calculate Average**: Once all subjects and sub-grades are entered, click "Calculate Average" to get your weighted average grade.

## Files

- **HTML (`index.html`)**: The main structure of the web application, including the form for entering subjects and sub-grades.
- **CSS (`styles.css`)**: Styles for the application, providing a clean and responsive design.
- **JavaScript (`script.js`)**: Handles dynamic interactions, including adding/removing subjects and sub-grades and calculating the weighted average.
- **Python (`gradecalc.py`)**: The Flask backend that processes the form data, performs calculations, and returns the final weighted average.

## Setup Instructions

### Prerequisites

- Python 3.x
- Flask

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/grade-calculator.git
    cd grade-calculator
    ```

2. Install the required dependencies:
    ```bash
    pip install Flask
    ```

3. Run the application:
    ```bash
    python gradecalc.py
    ```

4. Open your web browser and go to `http://localhost:5001` to use the application.

## Usage

- To add a subject, click the "Add Subject" button.
- To add sub-grades, click the "Add Sub-Grade" button under the relevant subject.
- To calculate the average, click the "Calculate Average" button.
- The average grade will be displayed at the bottom of the page.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
