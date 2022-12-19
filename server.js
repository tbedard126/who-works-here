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
            type: 'list',
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
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
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
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({ name: department.name, value: department.id }));
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What role would you like to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for the role?'
            },
            {
                name: 'departmentName',
                type: 'list',
                message: 'What depeartment does this role belong too?',
                choices: departments
            },
        ]).then((response) => {
            console.log(res)
            console.log(departments)
            connection.query(`INSERT INTO role SET ?`,
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.departmentName
                },
                (err, res) => {
                    console.log(response)
                    if (err) throw err;
                    console.log(`${response.title} added to database!`);
                    initPrompt();
                }
            )
        })
    })
}


addEmployee = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let role = res.map(role => ({ name: role.title, value: role.role_id }));
        connection.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employee = res.map(employee => ({ name: employee.first_name + '' + employee.last_name, value: employee.id }));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employees first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the employees last name?'
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'What is this employees role?',
                    choices: role
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: 'Who is this employees manager?',
                    choices: employee
                }
            ]).then((response) => {
                connection.query(`INSERT INTO employee SET ?`,
                    {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: response.role_id,
                        manager_id: response.manager,
                    }),
                    console.log(response),
                    (err, res) => {
                        if (err) throw err;
                    }
                connection.query(`INSERT INTO role SET ?`,
                    {
                        department_id: response.dept,
                    }),
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${response.first_name} ${response.last_name} added to the database!`);
                        initPrompt();
                    }
            })
        })
    })
}

updateEmployeeRole = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let role = res.map(role => ({ name: role.title, value: role.role_id }));
        connection.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employee = res.map(employee => ({ name: employee.first_name + '' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'What employee will have their role updated?',
                    choices: employee
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'What will the new employees role be?',
                    choices: role
                }
            ]).then((response) => {
                connection.query(`UPDATE employee SET ? WHERE ?`,
                    [
                        {
                            id: response.newRole,
                        },
                        {
                            id: response.employee,
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`Successfully updated role!`);
                        initPrompt();
                    })
            })
        })
    })
}

initPrompt();