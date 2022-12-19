DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT(100) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT UNSIGNED,
    FOREIGN KEY (department_id)  REFERENCES department(id)
    
   
);

CREATE TABLE employee (
    id INT UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT UNSIGNED,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
   
);

