from flask import Flask, request, render_template
import os

gradecalc = Flask(__name__)

@gradecalc.route('/')
def index():
    return render_template('index.html')

@gradecalc.route('/calculate', methods=['POST'])
def calculate():
    subject_names = request.form.getlist('subject_name[]')
    subject_grades = request.form.getlist('subject_grade[]')
    subject_percentages = request.form.getlist('subject_percentage[]')

    total_weight = 0
    total_score = 0

    for i in range(len(subject_names)):
        grade = float(subject_grades[i])
        percentage = float(subject_percentages[i]) / 100

        # Get sub-grades related to this subject
        sub_grade_names = request.form.getlist(f'sub_grade_name[{i}]')
        sub_grades = request.form.getlist(f'sub_grade[{i}]')
        sub_grade_percentages = request.form.getlist(f'sub_grade_percentage[{i}]')

        sub_grade_total_weight = 0
        sub_grade_total_score = 0

        # Process sub-grades
        for j in range(len(sub_grade_names)):
            if sub_grades[j] and sub_grade_percentages[j]:
                sub_grade = float(sub_grades[j])
                sub_grade_percentage = float(sub_grade_percentages[j]) / 100
                sub_grade_total_weight += sub_grade_percentage
                sub_grade_total_score += sub_grade * sub_grade_percentage

        if sub_grade_total_weight > 0:
            weighted_grade = sub_grade_total_score / sub_grade_total_weight
        else:
            weighted_grade = grade

        weighted_percentage = percentage * weighted_grade
        total_weight += percentage
        total_score += weighted_percentage

    average_grade = total_score / total_weight if total_weight > 0 else 0

    return f"Average Grade: {average_grade:.2f}"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    gradecalc.run(host='0.0.0.0', port=port)
