//Packages 
const inquirer = require("inquirer");
const mysql = require("mysql");
const questions = require("./questions");
const consoleTable = require('console.table');

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


//initial function that will input the  user what they would like to do 
determineAction()
async function determineAction() {

    const results = await inquirer.prompt(questions.actions);
    switch (results.actions) {
        case 'Add new employee': //ok
            addEmployee();
            break;
        case 'View all employees': //ok
            viewAll();
            break;
        case 'View employees by department':
            viewByDpt();
            break;
        case 'Update employee role': //ok
            updateRole();
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

        inquirer.prompt([

            {
                type: "input",
                name: "firstname",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the employee's last name?"
            },
            {
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }

                    return choiceArray;
                },
                message: "What is the employee's role?"
            },

            {
                type: "input",
                name: "emanager",
                message: "What is the employee's manager?"
            }

        ]).then(function (res) {


            for (var i = 0; i < results.length; i++) {
                if (results[i].title === res.choice) {
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
                console.log("Employee successfully added!");
                determineAction()
            }

            )
        })
    })

}


function viewAll() {
    connection.query("SELECT first_name AS FirstName , last_name as LastName , role.title as Role, role.salary AS Salary, department.name AS Department FROM employee INNER JOIN department ON department.id = employee.role_id left JOIN role ON role.id = employee.role_id", function (err, results) {
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


            var query = "INSERT INTO department SET?"
            console.log(query)
            var query1 = connection.query(query, [{ name: result.newDpt }], function (err) {
                if (err) throw err;
                console.table("Department Created Successfully!");
                determineAction()
            });


        })
}

function addRole() {
    //selecting all columns for department so I can further loop over and get the department ID
    var roleQuery = "SELECT * FROM role;";
    var departmentQuery = "SELECT * FROM department;";


    connection.query(roleQuery, function (err, roles) {
        connection.query(departmentQuery, function (err, departments) {

            if (err) throw err;


            inquirer.prompt([

                {
                    name: "newRole",
                    type: "rawlist",
                    choices: function () {
                        var arrayOfChoices = [];
                        for (var i = 0; i < roles.length; i++) {
                            arrayOfChoices.push(roles[i].title);
                        }

                        return arrayOfChoices;
                    },
                    message: "Which Role would you like to add?"
                },
                {
                    name: "newSalary",
                    type: "input",
                    message: "What is the salary you would like to add?"

                },
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var arrayOfChoices = [];
                        for (var i = 0; i < departments.length; i++) {
                            arrayOfChoices.push(departments[i].name);
                        }

                        return arrayOfChoices;
                    },
                    message: "Which department this role belongs to?"
                },

            ]).then(function (result) {

                for (var i = 0; i < departments.length; i++) {
                    if (departments[i].name === result.choice) {
                        result.department_id = departments[i].id;
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
        })
    })
}



// function viewByDpt() {


//     const qrydepatment = "SELECT *FROM department"
//     const employeeQuery = "SELECT *FROM employee"
//     connection.query(qrydepatment, function (err, department) {
//         connection.query(employeeQuery, function (err, employee) {

//             if (err) throw err

//             inquirer.prompt([

//                 {
//                     name: "choices",
//                     type: "list",
//                     message: "Which department would like to get results from?",
//                     choices: function () {
//                         var arrayOfChoices = [];
//                         for (var i = 0; i < department.length; i++) {
//                             arrayOfChoices.push(department[i].name);
//                         }
//                         return arrayOfChoices;
//                     },
//                 }
//             ]).then(function (res) {

//                 // for (var i = 0; i < employee.length; i++) {
//                 //     if (employee[i].role_id === res.results) {
//                 //         res.department_id = results[i].id;
//                 //     }

//                 const query = "SELECT employee.first_name AS FirstName, employee.last_name fROM employee WHERE?"
//                 var values = { name: res.choices }
//                 console.log(values)
//                 var query2 = connection.query(query, values, function (err, results) {


//                     console.table(results)
//                     console.log(query2 + "----------------------")
//                     if (err) throw err
//                 })


//             })
//         })
//     })
// }


















function updateRole() {
    //selecting all columns for department so I can further loop over and get the department ID
    var roleQuery = "SELECT * FROM role;";
    var departmentQuery = "SELECT * FROM department;";


    connection.query(roleQuery, function (err, roles) {
        connection.query(departmentQuery, function (err, departments) {

            if (err) throw err;
            inquirer.prompt([

                {
                    name: "newRole",
                    type: "rawlist",
                    choices: function () {
                        var arrayOfChoices = [];
                        for (var i = 0; i < roles.length; i++) {
                            arrayOfChoices.push(roles[i].title);
                        }

                        return arrayOfChoices;
                    },
                    message: "Which Role would you like to update?"
                },
                {
                    name: "newSalary",
                    type: "input",
                    message: "What is the new salary for this role?"

                },
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var arrayOfChoices = [];
                        for (var i = 0; i < departments.length; i++) {
                            arrayOfChoices.push(departments[i].name);
                        }
                        return arrayOfChoices;
                    },
                    message: "Which department this role belongs to?"
                },
            ]).then(function (result) {

                for (var i = 0; i < departments.length; i++) {
                    if (departments[i].name === result.choice) {
                        result.department_id = departments[i].id;
                    }
                }
                var query = "UPDATE role SET title=?,salary= ? WHERE department_id= ?"
                const VALUES = [

                    { title: result.newRole },
                    { salary: result.newSalary },
                    { department_id: result.department_id }
                ]
                let query1 = connection.query(query, VALUES, function (err) {
                    if (err) throw err;
                    console.table("Role Successfuly Updated!");
                    determineAction()
                });

            })
        })
    })
}
