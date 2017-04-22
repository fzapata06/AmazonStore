CREATE DATABASE IF NOT EXISTS BamazonDB;

USE BamazonDB;


CREATE TABLE IF NOT EXISTS products (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    item_id INTEGER(200) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER (200) NULL,
    PRIMARY KEY (id)
);


SELECT * FROM products;