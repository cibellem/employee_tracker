const actions = [

    {
        type: "list",
        name: "actions",
        message: "What would you like to to?",
        choices: [

            "Add new employee",
            "Remove an employee",
            "Update an employee",
            "View all employees",
            "View employees by department",
            "View employees by manager",
            "Update employee role",
            "Update employee manager",
            "View all roles",
            "Add role",
            "Remove role",
            "View all departments",
            "Add department",
            "Remove department",
            "Exit"

        ]

    }
]


const addEmployee = [

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
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [

            "Sales Lead",
            "Software Engineer",
            "Lawyer",
            "Accountant",
            "Salesperson",
            "Lead Engineer",
            "Legal Team Lead"
        ]
    },
    {
        type: "input",
        name: "emanager",
        message: "What is the employee's manager?"
    }
]


module.exports = { actions, addEmployee }