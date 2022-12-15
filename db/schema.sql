DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT(100) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT(100) UNSIGNED PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT(100) UNSIGNED NOT NULL
    -- FOREIGN KEY (department_id)
    -- REFERENCES department(id)
);

CREATE TABLE employee (
    id INT(100) UNSIGNED  PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT

);
