import os
from flask import Flask, request, render_template


gradecalc = Flask(__name__)


@gradecalc.route('/')
def index():
    return render_template('index.html')


@gradecalc.route('/calculate', methods=['POST'])
def calculate():
    try:
        subject_names = request.form.getlist('subject_name[]')
        subject_grades = request.form.getlist('subject_grade[]')
        subject_percentages = request.form.getlist('subject_percentage[]')

        total_weight = 0
        total_grade = 0

        for i in range(len(subject_names)):
            sub_grade_weights = 0
            sub_grade_total = 0

            sub_grades = request.form.getlist(f'sub_grade[{i}][]')
            sub_grade_percentages = request.form.getlist(f'sub_grade_percentage[{i}][]')

            if sub_grades and sub_grade_percentages and len(sub_grades) > 0:
                for j in range(len(sub_grades)):
                    sub_grade_str = sub_grades[j].strip()
                    sub_percentage_str = sub_grade_percentages[j].strip()

                    if sub_grade_str == '' or sub_percentage_str == '':
                        raise ValueError("Sub-grade values and percentages cannot be empty.")

                    try:
                        sub_grade = float(sub_grade_str)
                        sub_percentage = float(sub_percentage_str)
                    except ValueError:
                        raise ValueError("Sub-grade and percentage must be valid numbers.")

                    if sub_percentage <= 0:
                        raise ValueError("Percentage must be greater than zero.")
                    sub_grade_total += sub_grade * sub_percentage
                    sub_grade_weights += sub_percentage

                subject_grade = sub_grade_total / sub_grade_weights if sub_grade_weights > 0 else 0
            else:
                subject_grade = float(subject_grades[i])

            subject_percentage_str = subject_percentages[i].strip()

            if subject_percentage_str == '':
                raise ValueError("Subject percentage cannot be empty.")
            subject_percentage = float(subject_percentage_str)

            if subject_percentage <= 0:
                raise ValueError("Subject percentage must be greater than zero.")

            total_weight += subject_percentage
            total_grade += subject_grade * subject_percentage

        weighted_average = total_grade / total_weight if total_weight > 0 else 0
        return f'Weighted Average: {weighted_average:.2f}'

    except ValueError as e:
        return str(e), 400  # Return the error message with a 400 Bad Request status


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    gradecalc.run(host='0.0.0.0', port=port)
