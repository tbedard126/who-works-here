const inquirer = require('inquirer');
const mysql = require('mysql2');
// const table = require('console.table');
// const sequelize = require('../config/connection');



// connection.connect((err) => {
//     if (err) throw err;
//     console.log(`Connected as id ${connection.threadId} \n`);
//     initPrompt();
// });


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});




initPrompt = () => {
    inquirer.prompt([
        {
            name: 'initialInquiry',
            type: 'rawlist',
            message: 'Welcome to the employee database application. Please make a selection on what you would like to do.',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee\'s role', 'Exit program']
        }
    ]).then((response) => {
        switch (response.initialInquiry) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addARole();
                break;
            case 'Add an employee':
                addAnEmployee();
                break;
            case 'Update employee\'s role':
                updateEmployeeRole();
                break;
            case 'Exit program':
                connection.end();
                console.log('\n You have exited the employee management program. Thanks for using! \n');
                return;
            default:
                break;
        }
    })
}


//     connection.query(`SELECT role.role_id, role.title, role.salary, department.department_name, department.department_id FROM role JOIN department ON role.department_id = department.department_id ORDER BY role.role_id ASC;`, (err, res) => {


viewAllDepartments = () => {
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.table(res)
    })
    initPrompt()
}

viewAllRoles = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        console.table(res)
    })
    initPrompt()
}

viewAllEmployees = () => {
    connection.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    initPrompt()
}


addDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDept',
            type: 'input',
            message: 'What deparment would you like to add'
        }
    ]).then((response) => {
        connection.query(`INSERT INTO department SET ?`,
            {
                name: response.newDept,
            },
            (err, response) => {
                if (err) throw err;
                console.log(`\n ${response.newDept} successfully added to database! \n`);
                initPrompt();
            })
    })

};


addRole = () => {
    inquirer.prompt([
        {

        }
    ])
}

initPrompt();