#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    courseEnrolled;
    feesAmount;
    constructor(id, name, courseEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.courseEnrolled = courseEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "please select an option :\n",
        choices: ["enroll a student", "show student status"],
    });
    if (action.ans === "enroll a student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "please enter your Name :",
        });
        let trimedStudentName = studentName.ans.trim().toLowerCase();
        let studentNameCheck = students.map((obj) => obj.name);
        if (studentNameCheck.includes(trimedStudentName) === false) {
            if (trimedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\tYour account has been created");
                console.log(`Welcome ${trimedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "please select a course",
                    choices: [
                        "computer science",
                        "information Technology(IT)",
                        "English",
                    ],
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "computer science":
                        courseFees = 8000;
                        break;
                    case "information Technology(IT)":
                        courseFees = 10000;
                        break;
                    case "English":
                        courseFees = 5000;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course?",
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("you have enrolled in this course");
                }
            }
            else {
                console.log("invalid name");
            }
        }
        else {
            console.log("This name is already Exits");
        }
    }
    else if (action.ans === "show student status") {
        if (students.length !== 0) {
            let studentNamesCheck = students.map(e => e.name);
            let selectedstudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "please select name:",
                choices: studentNamesCheck
            });
            let foundStudent = students.find(Student => Student.name === selectedstudent.ans);
            console.log("Student Information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record is Empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
