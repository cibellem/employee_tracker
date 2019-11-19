//Packages 
const inquirer = require("inquirer");
const mysql = require("mysql");
const questions = require("./questions");
const consoleTable = require('console.table')

//setting up the connection with the DB

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "mycompany"
});

connection.connect(function (err) {
    if (err) throw err;


});
// bonus  case 'Remove an employee':
// removeEmployee()
// break;
// case 'Remove role':
//     rmvRole();
//     break;
// case 'Remove department':
//     rmvDpt();
//     break;

//function to s each action 

determineAction()
async function determineAction() {

    const results = await inquirer.prompt(questions.actions);
    switch (results.actions) {
        case 'Add new employee':
            addEmployee();
            break;
        case 'Update an employee':
            updateEmployee();
            break;
        case 'View all employees': //ok
            viewAll();
            break;
        case 'View employees by department':
            viewByDpt();
            break;
        case 'View employee by manager':
            viewByMng();
            break;
        case 'Update employee role':
            updateRole();
            break;
        case 'Update employee manager':
            updateManager();
            break;
        case 'View all roles':
            viewAllRoles(); //ok
            break;
        case "Add role":
            addRole(); //ok
            break;
        case 'View all departments':
            viewAllDpt(); //ok
            break;
        case 'Add department':
            addDpt(); //ok
            break;

        default:
            connection.end();
            break;

    }
}
function addEmployee() {

    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        console.log(results)


        inquirer.prompt(questions.addEmployee).then(function (res) {

            console.log(res)
            for (var i = 0; i < results.length; i++) {
                if (results[i].title === res.role) {
                    res.role_id = results[i].id;
                }
            }

            var query = "INSERT INTO employee SET ?"
            const VALUES = {
                first_name: res.firstname,
                last_name: res.lastname,
                role_id: res.role_id
                // manager_id: employee(id)
            }
            connection.query(query, VALUES, function (err) {
                if (err) throw err;
                console.log("Employee successfully added!")
            }

            )
        })


    })
}

function viewAll() {
    connection.query("SELECT first_name AS FirstName , last_name as LastName FROM employee", function (err, results) {
        console.table(results);
        if (err) throw err;
        determineAction()

    });
}

function viewAllDpt() {
    connection.query("SELECT name AS Departments FROM department ", function (err, results) {
        console.table(results);
        if (err) throw err;
        determineAction()
    });
}

function viewAllRoles() {
    connection.query("Select title as Roles from role ", function (err, results) {
        console.table(results);
        if (err) throw err;
        determineAction()
    });
}


function addDpt() {
    inquirer
        .prompt({
            name: "newDpt",
            type: "input",
            message: "Which Department would you like to add?"
        })
        .then(function (result) {
            connection.query("INSERT INTO department SET", {
                name: result.newDpt
            }, function (err) {
                if (err) throw err;
                console.table("Department Created Successfully!");

                determineAction()
            });

        })
}

function addRole() {


    //selecting all columns for department so I can further loop over and get the department ID
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;

        inquirer.prompt([

            {
                name: "newRole",
                type: "input",
                message: "Which Role would you like to add?"
            },
            {
                name: "newSalary",
                type: "input",
                message: "What is the salary you would like to add?"

            },
            {
                name: "choice",
                type: "list",
                message: "What department this role belongs to?",
                choices: [

                    "Sales",
                    "Engineering",
                    "Legal",
                    "Finance"
                ]
            }
        ]).then(function (result) {

            for (var i = 0; i < results.length; i++) {
                if (results[i].name === result.choice) {
                    result.department_id = results[i].id;
                }
            }
            var query = "INSERT INTO role SET ?"
            const VALUES = {

                title: result.newRole,
                salary: result.newSalary,
                department_id: result.department_id
            }
            connection.query(query, VALUES, function (err) {
                if (err) throw err;
                console.table("Role Successfuly created!");
                determineAction()
            });

        })

    }
    )
}