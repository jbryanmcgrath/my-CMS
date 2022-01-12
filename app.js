const inquirer = require("inquirer");
const db = require('./db/connection');
const cTable = require('console.table');
const { response } = require("express");

db.connect(() => {
    menu()
})

function menu() {
    inquirer.prompt(
        [{
            type: 'list',
            message: 'PLEASE SELECT FROM THE FOLLOWING OPTIONS',
            name: 'options',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }]
    )
        .then(response => {
            if (response.options === 'view all departments') {
                viewDepartment();
            } else if (response.options === 'view all roles') {
                viewRoles();
            } else if (response.options === 'view all employees') {
                viewEmployees();
            } else if (response.options === 'add a department') {
                addDepartment();
            } else if (response.options === 'add a role') {
                addRole();
            } else if (response.options === 'add an employee') {
                addEmployee();
            } else {
                updateEmployee();
            }
        })
}

function viewDepartment() {
    db.query('select * from department', (err, data) => {
        console.table(data);
        menu();
    })
}

function viewRoles() {
    db.query('select * from roles', (err, data) => {
        console.table(data);
        menu();
    })
}

function viewEmployees() {
    db.query('select * from employee', (err, data) => {
        console.table(data);
        menu();
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        message: "PLEASE ADD THE DEPARTMENT NEEDED",
        name: "departmentName"
    }])
        .then(response => {
            db.query('insert into department (name) values (?)', [response.departmentName], (err, data) => {
                viewDepartment();
            })
        })
}

function addRole() {
    inquirer.prompt([{
        type: 'input',
        message: 'WHAT IS THE TITLE OF THE ROLE',
        name: "title"
    },
    {
        type: 'input',
        message: 'WHAT IS THE SALARY OF THE ROLE',
        name: "salary"
    },
    {
        type: 'input',
        message: 'WHAT IS THE DEPARTMENT ID OF THE ROLE',
        name: "departmentID"
    }
    ])
        .then(response => {
            db.query('insert into roles (title, salary, department_id) values (?,?,?)', [response.title, response.salary, response.departmentID], (err, data) => {
                viewRoles();
            })
        })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "What is the first name?",
        name: "firstname"
    },
    {
        type: "input",
        message: "What is the last name?",
        name: "lastname"
    },
    {
        type: "input",
        message: "what is the employees corresdoponding role id",
        name: "roleid"
    },
    {
        type: "input",
        message: "Please enter the corresponding manager id or none if the employee has no manager",
        name: "managerid"
    }
    ])
        .then(response => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
                [response.firstname, response.lastname, response.roleid, response.managerid], (err, data) => {
                    viewEmployees()
                })
        })
}

function updateEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "Please select the employee corresponding to the desired update",
        name: "id"
    },
    {
        type: "input",
        message: "Please select the new role corresponding to the desired update",
        name: "newrole"
    }])
        .then(response => {
            db.query(`UPDATE employee SET role_id = "?" WHERE id = "${response.id}"`,
                [response.newrole], (err, data) => {
                    viewEmployees()
                })
        }
        )
}
