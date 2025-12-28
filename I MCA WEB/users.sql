CREATE DATABASE login_db;

USE login_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Sample user (password: 123456)
INSERT INTO users (username, email, password)
VALUES ('admin', 'admin@gmail.com', MD5('123456'));
