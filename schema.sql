DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
department VARCHAR(30) NOT NULL,
price INT(9) NOT NULL,
stock INT(9) NOT NULL,
PRIMARY KEY(id)
);

INSERT INTO products (name, department, price, stock)
VALUES
("Cup", "home", 5, 25),
("Plate", "home", 10, 28),
("Lightbulb", "home", 8, 10),
("Jacket", "clothing", 50, 12),
("Pants", "clothing", 35, 25),
("Shirt", "clothing", 25, 60),
("Laptop", "electronics", 500, 20),
("Keyboard", "electronics", 65, 10),
("Ketchup", "food", 5, 255),
("Mustard", "food", 5, 256);