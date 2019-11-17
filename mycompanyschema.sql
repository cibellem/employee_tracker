CREATE DATABASE mycompany;
USE mycompany;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    name  VARCHAR(30) NOT NULL,
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30)NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL, -- hold reference to department role belongs to
    FOREIGN KEY(department_id) REFERENCES department (id)
   
);

CREATE TABLE employee (
    id - INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, --to hold reference to role employee has
    manager_id - INT 
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    FOREIGN KEY(role_id) REFERENCES role(id)
);



INSERT INTO department (name) 
VALUES ("Sales", "Engineering","Legal", "Finance");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 60000 ,1);
VALUES("Software Enginner", 80000,2);
VALUES("Lawyer", 100000, 3);
VALUES("Accountant",75000,4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jameela", "James", 1);
VALUES("Aline", "Nunes", 2);
VALUES("Louise", "Akemi",3);
VALUES("Chimeny","Louise",4);