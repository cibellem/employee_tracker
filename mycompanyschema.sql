DROP DATABASE IF EXISTS mycompany;
CREATE DATABASE mycompany;
USE mycompany;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30)NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department (id)
   
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT ,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY(role_id) REFERENCES role(id)
);



INSERT INTO department (name) 
VALUES ("Sales"), ("Engineering"),("Legal"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 60000 ,1),
("Software Enginner", 80000,2),
("Lawyer", 100000, 3),
("Accountant",75000,4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jameela", "James", 1),
("Aline", "Nunes", 2),
("Louise", "Akemi",3),
("Chimeny","Louise",4);