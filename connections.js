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
    console.log("connected as id " + connection.threadId);

});


//function to s each action 

determineAction()
async function determineAction() {

    const results = await inquirer.prompt(questions.actions);
    switch (results.actions) {
        case 'Add new employee':
            addEmployee();
            break;
        case 'Remove an employee':
            removeEmployee()
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
            addRole();
            break;
        case 'Remove role':
            rmvRole();
            break;
        case 'View all departments':
            viewAllDpt(); //ok
            break;
        case 'Add department':
            addDpt(); //ok
            break;
        case 'Remove department':
            rmvDpt();
            break;
        default:
            connection.end();
            break;

    }
}
// function addEmployee() {

//     inquirer.prompt(questions.addEmployee).then(function (res) {

//         console.log(res)
//         connection.query("SELECT id from role insert into  ",
//             {
//                 first_name: res.firstname,
//                 last_name: res.lastname,
//                 role_id: select role.id
//                 manager_id: employee(id)
//             },




//             function (err) {
//                 if (err) throw err;
//                 console.log("Employee added")
//             }

//         )
//     })


// }

function viewAll() {
    connection.query("SELECT first_name as FirstName , last_name as LastName From employee", function (err, results) {
        console.table(results);
        if (err) throw err;
        determineAction()

    });
}

function viewAllDpt() {
    connection.query("Select name as Departments from department ", function (err, results) {
        console.table(results);
        if (err) throw err;
        determineAction()
    });
}

function viewAllRoles() {
    connection.query("Select title as Role from role ", function (err, results) {
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
            connection.query("INSERT INTO department SET?", {
                name: result.newDpt
            }, function (err) {
                console.table("Department Created Successfully!");
                determineAction()
            });

        })
}

function addRole() {
    inquirer
        .prompt({
            name: "newRole",
            type: "input",
            message: "Which Role would you like to add?"
        },
            {
                name: "newRole",
                type: "input",
                message: "Whats the salary?"
            })

        .then(function (result) {
            connection.query("INSERT INTO department SET?", {
                name: result.newDpt
            }, function (err) {
                console.table("Department Created Successfully!");
                determineAction()
            });

        })

}