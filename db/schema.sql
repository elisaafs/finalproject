DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS reviews;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    profile_pic VARCHAR(300),
    country VARCHAR(100)
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    homepage VARCHAR(100),
    address VARCHAR(200),
    categorie VARCHAR(100) NOT NULL,
    description VARCHAR(400),
    telephone INTEGER,
    sub_categorie VARCHAR(100),
    picture VARCHAR(300),
    language VARCHAR(100) NOT NULL,
    fluence VARCHAR(15)

);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    author_id INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    rate VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
